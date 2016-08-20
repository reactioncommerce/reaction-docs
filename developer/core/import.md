# Import

Reaction.Import provides some general importing infrastructure, to be used with more specific integration packages. The export module can be found in `server/api/core/import.js` and is can be imported from the `/server/api`.

```js
import { Meteor} from "meteor/meteor";
import { Reaction } from "/server/api";

Meteor.startup(function () {
  Reaction.Import.process(Assets.getText("data/Shipping.json"), ["name"], Reaction.Import.shipping);
  Reaction.Import.flush();
});
```

## Contents  

- [Architecture](#architecture)

  - [Batch inserts and fixture data](#batch-inserts-and-fixture-data)

- [Choosing a suitable key](#choosing-a-suitable-key)

- [Importing from files](#importing-from-files)

- [Automatic collection detection](#automatic-collection-detection)

- [Image uploader](#image-uploader)

- [Reference](#reference)

  - [`Reaction.Import.flush`](#flush)
  - [`Reaction.Import.fixture`](#fixture)
  - [`Reaction.Import.object`](#object)
  - [`Reaction.Import.process`](#process)
  - [`Reaction.Import.identify`](#identify)
  - [`Reaction.Import.load`](#load)
  - [`Reaction.Import.indication`](#indication)
  - [`Reaction.Import.shop`](#shop)
  - [`Reaction.Import.tag`](#tag)
  - [`Reaction.Import.product`](#product)

## Architecture

`Reaction.Import` is structured around an import buffer. This buffer is used to support fast bulk updates and inserts by sending all the queries at once to the database server. The import buffer can be filled with a number of shop entities. Currently supported are:

- Shops
- Packages
- Translations
- Tags
- Products
- Shipping
- Taxes

All the import functions have a similar signature:

```js
import { Reaction } from "/server/api";

Reaction.Import.entity = function (key, value [, ...]) { ... }
```

The key is an object used to identify the product in the database (and is passed on directly as the first argument of the `db.collection.update()` call). This allows one to update the entity if it was already imported before. The value object contains any other values to be updated which do not identify the update. These functions are used to populate the import buffer, the only flush the buffer if it reaches a certain size. To force a buffer flush, call `Reaction.Import.flush()`.

When importing entities which need to be referenced by other entities it is recommended to provide a custom unique `_id` value as the `key`, thus avoiding an extra query to obtain this `_id`.

### Batch inserts and fixture data

By default documents are inserted with the MongoDB `$set` modifier. This however poses a problem when importing data which only needs to be imported if it's not already present in the database, ignoring changes made to the document after it was imported. To accomodate such situations, `Reaction.Import` provides the `fixture()` modifier method. This method modifies `Reaction.Import` to use the `$setOnInsert` modifier when sending documents to the database. It can be used as follows:

```js
import { Reaction } from "/server/api";

Reaction.Import.fixture().process(...);
```

This can also be used for doing batch inserts, with the restriction that a key has to provided for each imported document. Direct database inserts should be avoided since they can potentially create multiple copies of an import document (if the key provided isn't defined on the MongoDB collection as a unique key). Imports often need to handle a lot of data and should be stoppable and resumable. This is why `Reaction.Import` avoids messing up the database by not supporting direct inserts.

### Choosing a suitable key

In general, a chosen key should uniquely determine the imported object in the data source.

When importing a document together with some documents referencing it, try to use a foreign key available while importing the data. Specifically if the `_id` field is used as a foreign key, it might be a good idea to provide an `_id` field in the imported document. Otherwise an extra query is needed to consult the document in the database, which is not possible without flushing the import buffer.

### Importing from files

The package includes a helper function, [`Reaction.Import.process`](#process), which accepts json arrays. It can be used to populate the database, importing some products might be as easy as:

```js
Reaction.Import.process(Assets.getText(file), ['title'], Reaction.Import.product);
```

### Automatic collection detection

The `Reaction.Import.identify()` method is provided to determine the collection associated with a document. It is internally called by `Reaction.Import.load()` which tries to load any document thorwn at it. These methods are mainly intented to be used with `Reaction.Import.process()`, allowing json arrays mixing data from multiple collections to be imported.

## Image uploader

This package also includes a bulk image uploader as these often need to be uploaded separately when importing from an ERP solution. Currently a filename in the format `${product.variants.barcode}.[${priority}.]${extension}` is expected (where the priority is optional). Images will be used for the product if the priority is equal to zero, but will always show when the corresponding variant is consulted. This uploader can be accessed through the reaction dashboard.

## Reference

### `Reaction.Import.flush(collection)`

Send the contents of the import buffer to the database. Accepts an optional parameter (a collection object) restricting flushing data to a certain MongoDB collection.
Executes `Reaction.Import.commit(collection)`

### `Reaction.Import.fixture()`

Tell `Reaction.Import` to use the `$setOnInsert` modifier when sending documents to MongoDB.

### `Reaction.Import.object(collection, key, value)`

Import a document with an associated key into a designated collection. Keep in mind that the other import methods specific to a certain collection usually only wrap this method, but can potentially extend it with extra logic. As an example, `Reaction.Import.shop()` also loads translations associated with a given shop.

### `Reaction.Import.process(json, key, callback)`

Processes a json array with a given callback. The `key` argument should be used to pass an array containing the fields to be used as the import key.

The callback should accept two parameters: a key and the data to be imported. Usually this will be one of the `Reaction.Import` entity import functions, although a custom callback can be used as well. A custom callback can, for example, be used to pass the parent key when importing products/variants.

### `Reaction.Import.identify(value)`

Tries to associate a MongoDB collection with a certain document. Throws an error if it fails to do so or if results are ambiguous.

### `Reaction.Import.load(key, value)`

Try to import any document with an associated key, using `Reaction.Import.identify()` to determine the collection.

### `Reaction.Import.indication(field, collection, probability)`

Allow packages to extend the auto collection detection facility of `Reaction.Import`. It is used to add a certain field as an indication that the document belongs to a certain collection. The probability should be a number between zero and one, where one is the strongest possible indication.

### `Reaction.Import.tag(key, value)`

As explained above, for importing tags it might be interesting to provide a suitable `_id` as the key:

```js
import { Reaction } from "/server/api";
let tag;
...
Reaction.Import.tag({ '_id': tag }, { 'name': tag, 'isTopLevel': true });
```

We can now directly use the `tag` value as a value in the `hashtags` array in the product schema. If we didn't know the `_id` for our tag we'd need to commit the import buffer first and query for the tag with the key we provided, only to obtain this `_id`.

### `Reaction.Import.product(key, value, parent)`

The product import provides an extra optional argument `parent` to accomodate for the product hierarchy structure planned for reaction. Currently this extra argument is used to import a variant where `key` identifies the variant and `parent` identifies the product. When called with two arguments the function will import a product. An example:

```js
import { Reaction } from "/server/api";

const title, description, tag, ean, price;
...
Reaction.Import.product({ 'title': title }, { 'description': description, 'hashtags': [tag] });
Reaction.Import.product({ 'ean': ean }, { 'price': price }, { 'title': title });
```
