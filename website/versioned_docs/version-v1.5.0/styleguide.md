---
id: version-v1.5.0-styleguide
title: Style Guide
original_id: styleguide
---

As a community, Reaction follows guidelines for code style and naming conventions for variables, methods and filenames. The guide also includes tips on working with libraries in Reaction, like React, MongoDB, lodash and more.

## On this page

-   [General rules](#syntax-and-style-conventions)
-   [Naming files and folders](#naming-conventions)
-   [Packages](#working-with-packages)
-   [Variables](#variables)
-   [Methods](#methods)
-   [MongoDB](#working-with-collections)
-   [Native JavaScript](#using-native-javascript)
-   [React](#working-with-react)

## Syntax and style conventions

Our rules are similar to [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and [Meteor Code Style](https://guide.meteor.com/code-style.html), [standard template of ESLint rules](https://www.npmjs.com/package/eslint-config-airbnb), with a few custom Reaction-specific rules:

-   Always double-quote strings
-   Give methods space
-   Add spaces around brackets
-   120 character line-length
-   `import` listed in this order:
    1.  React npm packages (`React`, `prop-types`)
    2.  Other npm packages
    3.  Meteor core packages
    4.  Meteor (Atmosphere) packages
    5.  Local app files

Other Reaction-specific rules are checked using various linting libraries. Find all the rules in the code:

-   [`.eslintrc`](https://github.com/reactioncommerce/reaction/blob/v1.5.0/.eslintrc) - [ESLint](http://eslint.org) checks JavaScript style, including [ES2015](https://docs.meteor.com/packages/ecmascript.html#Supported-ES2015-Features), React and Babel.
-   [`.jsbeautifyrc`](https://github.com/reactioncommerce/reaction/blob/v1.5.0/.jsbeautifyrc) - [JS Beautifier](http://jsbeautifier.org) automates code formatting
-   [`.editorconfig`](https://github.com/reactioncommerce/reaction/blob/v1.5.0/.editorconfig) - [Editor Config](https://editorconfig.org/) standardizes file formatting

To see the rules in action, run `eslint .` from the command line or use [ESLint code editor tools](https://eslint.org/docs/user-guide/integrations).

💡 **ProTip!** If you're using [Atom](https://atom.io/), like the Core team, you can install all the necessary tools in one line:  `apm install editorconfig atom-beautify linter linter-eslint linter-markdown linter-jsonlint linter-docker`

## Naming conventions

### Use hyphens to separate words in names

File and directory names should be hyphenated. Not all operating systems are case sensitive, so avoid having two files named the same with differing case.

Names of folders and files should be:

-   Lowercased
-   Alphanumeric characters
-   Hyphenated to join more words
-   Avoid `camelCase`, `undescore_casing`
-   Files may use multiple `.` as needed

**Do**

```sh
  /ui-grid/
  /example-payment-method/
  /social/
  /bootstrap.rtl.js
  /index.js
```

**Don't**

```sh
  /reactionpackagename/
  /address_book/
  /addressBook/
  /settingsContainer.js
  /addressBook.js
  /address_book.js
```

## Working with packages

### Create strong package names

Namespace package folders in this format: `<functionality>-<package-name>` or `<organization-name>-<package-name>`

```sh
/imports/plugins/custom/payments-authnet
/imports/plugins/included/connectors-shopify
/imports/plugins/custom/connectors-magento
/reaction-paypal/
/yourorg-your-package/
```

### Group related files together into folders

If there are multiple files that provide functionality that is broken down across multiple files, these files should be grouped within a folder.

If the files are stand-alone and the name needs to represent functionality, you can use a hyphen for the separator.

**Do**

```sh
/container/settings.js
/container/settings.html
/container/ <more files>
```

or

```sh
/settings-container.js
/settings-container.html
```

**Don't**

```sh
/container/settings-containers.js
/container/settingsContainer.html
settingsContainer.js
```

## JavaScript style recommendations

### Variables

#### Naming variables

Variable names should be:

-   Meaningful. Avoid single-letter variables.
-   Use `error`, instead of `e` or `err`
-   Variables that contain a boolean value should use a `isThisTrue` style.
-   Variables that return arrays should be plural.

Publication names should:

-   Use TitleCase

#### Working with variables

-   Use `const` except when a variable is being reassigned.
-   Use string template notation, `${thisVariable} is true` over string concatenation

### Methods

#### Naming methods

-   Methods names should use a verb/noun style when possible, e.g. `checkConfiguration` or `addToCart`.
-   When naming multiple methods acting on the same resource should follow this style, e.g. `cart/items/add`, `cart/items/remove`
-   Methods that return a single value should be singular.
-   Methods whose main purpose is to return a value should use the `get` prefix, e.g. `getShop`.

#### Working with methods

-   Avoid ternary operators and one-line `if` statements (except in React componenets)
-   Use parenthesis around all method arguments.

**Do**

    cartItems.find((item) => item.status === picked)

**Don't**

    cartItems.find(item => item.status === picked)

-   When specifying a callback, always use the parenthesis to indicate the argument being accepted over the bare arrow-function form. This way, it's clear it's not another argument to the original function:

**Do**

    thisMethodTakesACallback(arg1, arg2, (result) => {
      dostuff();
    });

**Don't**

    thisMethodTakesACallback(arg1, arg2, result => {
      doStuff
    });

-   When breaking arrow functions into multiple lines, use curly brackets and a `return`:

**Do**

    cartItems.find((item) => {
     return item.status === status;
    })

**Don't**

    cartItems.find(
       (item) => item.status === status
     )

### Working with collections

Be explicit in querying:

**Don't**

    Products.findOne("abc123")

**Do**

    Products.findOne({ _id: "abc123" })

### Using native JavaScript

Use native JavaScript over libraries like lodash and Underscore whenever there is a suitable replacement.

-   Replace `_.map`, with `Array.prototype.map`
-   Replace `_.reduce`, with `Array.prototype.reduce`
-   Replace `_.filter`, with `Array.prototype.filter`
-   Replace `_.isArray`, with `Array.isArray`
-   Replace `_.extend` with `Object.assign`
-   Replace `_.find` with `Array.prototype.find`
-   Replace `_.keys` and `_.values`, with `Object.keys` and `Object.values`
-   Replace `_.first`, `_.rest` and `_.restParam`, with [destructuring syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
-   Replace `_.uniq`, with using a `Set`: `[...new Set(cartItems.map((item) => item.product._id))]`
-   Replace `pluck` from Underscore with `.map`:


    const people = [{name: "George"}, {name: "Katherine"}, {name: "Kip"}]

    _.pluck(people, name) => people.map((person) => person.name)

-   Replace `_.each`, `_.forEach`, with `Array.prototype.forEach` or loop over an object with:


    sum = 0;
    lastKey = undefined;
    for (const [key, value] of Object.entries(foo)) {
      sum += value;
      lastKey = key;
    }

### Working with React

-   Use `isRequired` for validating PropTypes
-   Use the return shorthand with arrow functions in React components:

**Don't**

    const MyComponent = ({ title, content }) => {
      return (
        <div>
          <h1>{title}</h1>
          <div>{content}/</div>
        </div>
      );
    }

**Do**

    const MyComponent = ({ title, content }) => (
      <div>
        <h1>{title}</h1>
        <div>{content}/</div>
      </div>
    );

When iterating over arrays in a component:

**Do**

    const MyThings = ({ things }) => (
      <ul>
        {things.map((thing) => <li>{thing}</li>)}
      </ul>
    );

    // or

    const MyThings = ({ things }) => (
      <ul>
        {things.map((thing) => (
          <li>{thing}</li>
        ))}
      </ul>
    );
