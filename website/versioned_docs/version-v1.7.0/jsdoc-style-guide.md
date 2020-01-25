---
id: version-v1.7.0-jsdoc-style-guide
title: JSDoc Style Guide
original_id: jsdoc-style-guide
---

## Requirements

The Core API Documentation uses [JSDoc](http://usejsdoc.org/) and a custom version of [docdash](https://github.com/clenemt/docdash) theme to build its static API docs site.

## Running API docs locally

1. Add JSDoc tags to your code
2. Run `npm run docs`
3. Open `file:///tmp/reaction-docs/index.html` in your browser.

> ProTip: Did you get an error? Run the command in verbose mode to see where the documentation parsing failed: `jsdoc . --verbose --configure .reaction/jsdoc/jsdoc.json`

## Documenting methods

![image](https://user-images.githubusercontent.com/1203639/30391482-b94e7666-9876-11e7-9336-3a306825fb76.png)

## The basics

Document a function by adding comments above the function definition with the following tags:

### required
- `@method` name
- `@summary` can use Markdown here
- `@param` {type} name description, use `[]` square brackets around param for optional params
- `@return` {type} name description, or `@return {undefined}`

### optional
- `@async`
- `@private`
- `@default`
- `@deprecated` - since version number
- `@since` - version number
- `@todo` - any TODO notes here
- `@ignore` - if you don't want the function to output docs
- `@author` - to indicate third-party method authors
- `@see` - link to relevant third-party documentation

### Example of a method

**Basic example:**

```js
/**
 * quantityProcessing
 * @method
 * @summary perform calculations admissibility of adding product to cart
 * @param {object} product - product to add to Cart
 * @param {number} itemQty - qty to add to cart, defaults to 1, deducts from inventory
 * @since 1.10.1
 * @return {number} quantity - revised quantity to be added to cart
 */
```

<img width="917" alt="screen shot 2017-10-04 at 9 47 43 am" src="https://user-images.githubusercontent.com/3673236/31188268-2caac880-a8e9-11e7-973d-77567b3dffcc.png">

**More examples:**

```js
/**
 * @method connectors/shopify/webhooks/create
 * @summary Meteor method for creating a shopify webhook for the active shop
 * @async
 * @param {object} options Options object
 * @param {string} options.topic - the shopify topic to subscribe to
 * @param {string} [options.absoluteUrl] - Url to send webhook requests - should only be used in development mode
 * @return {undefined}
 */
```

## Document a React component

1. Add a `@module` declaration at the top of the file, under `import`s:
```js
/**
 * @file SortableTable is a React Component wrapper around {@link https://react-table.js.org} ReactTable. Anything functionality from ReactTable should be available in SortableTable out of the box, but may require styling. For more, see {@link https://react-table.js.org/#/story/readme ReactTable docs}
 *
 * @module SortableTable
 * @extends Component
 */
```

2. Document each method with `@property` and `@param` tags:
```js
/**
  * renderComponent
  * @method
  * @summary React component for displaying a not-found view
  * @param {Object} props - React PropTypes
  * @property {String|Object} className - String className or `classnames` compatible object for the base wrapper
  * @property {String|Object} contentClassName - String className or `classnames` compatible object for the content wrapper
  * @property {String} i18nKeyMessage - i18n key for message
  * @return {Node} React node containing not-found view
  */
 ```

3. Document `propTypes` at the bottom, before the propTypes declaration using `@property` tags:
```js
/**
  * @name SortableTable propTypes
  * @type {propTypes}
  * @param {Object} props - React PropTypes
  * @property {Object} collection collection to get data from
  * @property {Array} data provides array of objects to be used in place of publication data
  * @property {Number} defaultPageSize how many results per page
  * @return {Array} React propTypes
  */
```
![screen shot 2017-10-18 at 12 12 00 pm](https://user-images.githubusercontent.com/3673236/31737844-9aaf6fba-b3fd-11e7-9939-d148a4843e47.png)
![screen shot 2017-10-18 at 12 12 09 pm](https://user-images.githubusercontent.com/3673236/31737845-9ac73c1c-b3fd-11e7-946b-ddd771e9e4e0.png)

## Document a one-file module

1. Add a `@module` declaration at the top:
```js
/**
 * Reaction transform methods on Collections
 * @file Use transform methods to return Cart and Order calculated values: count, subTotal, shipping, taxes, total. Use these methods on Cart and Orders in templates, `{{cart.getCount}}` and also in code, `Cart.findOne().getTotal()`. These are calculated by using a Mongo Collection's {@link http://docs.meteor.com/api/collections.html#Mongo-Collection transform functionality}.
 * @module cartOrderTransform
 */
 ```

2. Document each method.
The sidebar and page:
![screen shot 2017-10-18 at 11 09 29 am](https://user-images.githubusercontent.com/3673236/31734867-e7565ecc-b3f4-11e7-997c-4328fd088e3f.png)

## Document a core Schema

1. Add a `@namespace schemas` declaration at the top:
```js
/**
 * @file Reaction Core schemas
 * Reaction uses {@link https://github.com/aldeed/meteor-simple-schema SimpleSchema} to apply basic content and structure validation to Collections. See {@link https://docs.reactioncommerce.com/reaction-docs/trunk/simple-schema full documentation}.
 * @namespace schemas
 */
```

2. Document the Schema using `@name SchemaName`, `@type {SimpleSchema}` and `@property` like this:
```js
/**
 * @name Webhook
 * @type {SimpleSchema}
 * @property {Number} shopifyId required, Shopify webhook ID
 * @property {String[]} integrations required, Array of integration strings using this webhook
 * @property {Boolean} invited optional
 */
 const Webhook = new SimpleSchema({
```

![screen shot 2017-10-17 at 5 13 45 pm](https://user-images.githubusercontent.com/3673236/31695376-2bc6c7f4-b35f-11e7-8bc3-b113be10733d.png)
![screen shot 2017-10-17 at 5 13 50 pm](https://user-images.githubusercontent.com/3673236/31695396-3df493e8-b35f-11e7-86dd-966ca44287e1.png)

## Document a Schema in a plugin

1. Use `@nameSchemaName`, `@type {SimpleSchema}` along with `@memberof schemas`:
```js
/**
 * @name TaxSettings
 * @memberof schemas
 * @type {SimpleSchema}
 * @property {String} exemptionNo optional
 * @property {String} customerUsageType optional
 */
```
![screen shot 2017-10-17 at 5 14 34 pm](https://user-images.githubusercontent.com/3673236/31695432-78784758-b35f-11e7-8bfe-eb3bc770d199.png)

## Document Meteor methods, grouped together as a `@namespace`

1. In one file: Create `@namespace` at the top of the file. A namespace only needs to be declared once across the whole repository:
```js
/**
 * @file Meteor methods for Accounts
 * Reaction extends {@link https://github.com/meteor/meteor/tree/master/packages/accounts-base MeteorAccounts} with Reaction-specific behavior and user interaction.
 * @namespace Meteor/Accounts
 */
```

2. In all methods: Above the method, add, `@memberof NameOfNamespace`, along with all the standard method tags.
```js
/**
 * @name NameOfMethod
 * @method
 * @memberof NameOfNamespace
 * @summary Method summary goes here
 * @params {Object} shop - current shop
 * @returns {Object} shop - new shop
 */
```

![screen shot 2017-10-17 at 7 40 20 pm](https://user-images.githubusercontent.com/3673236/31698588-0a908e62-b373-11e7-85ba-9b7cf8f057de.png)

![screen shot 2017-10-17 at 7 40 36 pm](https://user-images.githubusercontent.com/3673236/31698619-35a4c80c-b373-11e7-9f02-942043e867f6.png)

## Document a third-party packages

1. When incorporating methods from a third-party package, use the `@author` tag to indicate the author.
2. Use the `@see` tag to link to relevant documentation.
```js
/**
 * @name Hook
 * @method
 * @author Workpop
 * @see https://github.com/Workpop/meteor-method-hooks
 */
```
