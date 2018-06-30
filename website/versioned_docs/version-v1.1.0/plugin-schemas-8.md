---
original_id: plugin-schemas-8
id: version-v1.1.0-plugin-schemas-8
title: Schemas
---
    
_If will be easier to understand this section of the tutorial if you have read and understood the
[Schemas](http://guide.meteor.com/collections.html#schemas) section of the Meteor Guide_

While Mongo is a "schemaless" database that does not mean schemas are a bad idea. In fact they are a great idea and so
Reaction Commerce uses a package called [Simple Schema](https://atmospherejs.com/aldeed/simple-schema) to build and enforce
schemas. This package is recommended in the Meteor Guide and we recommend it's use as well.

In addition to Simple Schema we use a package called [Autoform](https://github.com/aldeed/meteor-autoform) which allows
you to define a form as derived from a particular schema, saving a lot of time and repetitive code. One of the most
obvious uses is in the cart where the various forms for things like Address are derived from their corresponding Schema.
You can import Schemas from `/lib/collections/schemas` on both client and server.

## Adding Fields to a Schema

Adding fields to an existing schema is very simple. Simply declare a new instance of your schema with the additional
fields defined and attach it to your collection. Schemas are additive by default.

So this would look something like

```js
import { Accounts } from "/lib/collections";

export const myAccountSchema = new SimpleSchema({
  height: {
    type: String,
    optional: true
  }
});

Accounts.attachSchema(myAccountSchema);
```

## Removing Fields from a Schema

In ecommerce it's very important to ensure that your checkout flow is as simple as possible (but no simpler) so that customers
experience is as easy as possible. And different types of stores may have different types of data that they collect and store.
For example, a store that sells downloads has no need to collect a shipping address.

Removing fields from a Schema is relatively straight-ahead in that we just need to replace an entire Schema with a copy of
that schema with the unnecessary fields removed and specifying a replace parameter.

For example if you wanted to remove the `note` field from the `Account` schema you would create a `lib` directory (because
schemas are used on both client and serve) in the beesknees package and create a file called `schemas.js`. In that you would
make a copy of the Account schema, remove the `note` field and then add this line

```js
import { Accounts } from "/lib/collections";
import { Accounts as AccountsSchema } from "/lib/collections/schemas";
Accounts.attachSchema(AccountsSchema, {replace: true});
```

Because our package is loaded last (because we imported it last), even though there is already an Accounts schema, our
definition will override the built-in one and both forms and database inserts will use our custom one.
In order for this schema to be loaded however, you will need to add imports in the `index.js` files for both your
plugin's `client` and `server`.

Next: [Adding i18n](plugin-i18n-9)

## Read More

[Reaction Schemas](simple-schema.md)

[Simple Schema](https://atmospherejs.com/aldeed/simple-schema)

[Autoform](https://github.com/aldeed/meteor-autoform)
