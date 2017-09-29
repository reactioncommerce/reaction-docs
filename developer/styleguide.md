# Style guide

As a community, Reaction follows guidelines for JavaScript style and syntax conventions, along with guidelines for naming variables, methods and filenames.

## Syntax and style conventions

Our rules are similar to [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and [Meteor Code Style](https://guide.meteor.com/code-style.html), [standard template of ESLint rules](https://www.npmjs.com/package/eslint-config-airbnb), with a few custom Reaction-specific rules:

- Double-quoted strings
- Well-spaced functions
- Spaces around brackets
- 120 character line-length
- `import` order
  - React npm packages (`React`, `prop-types`, etc...)
  - other npm packages
  - Meteor core packages
  - Meteor (Atmosphere) packages
  - local app files

Reaction uses various linting libraries to automate style checking. Find the exact rules in the code:
- [`.eslintrc`](https://github.com/reactioncommerce/reaction/blob/master/.eslintrc) - [ESLint](http://eslint.org) checks JavaScript style, including [ES2015](https://docs.meteor.com/packages/ecmascript.html#Supported-ES2015-Features), React and Babel.
- [`.jsbeautifyrc`](https://github.com/reactioncommerce/reaction/blob/master/.jsbeautifyrc) - [JS Beautifier](jsbeautifier.org) automates code formatting
- [`.editorconfig`](https://github.com/reactioncommerce/reaction/blob/master/.editorconfig) - [Editor Config](https://editorconfig.org/) standardizes file formatting

To see the rules in action, run `eslint .` from the command line or use [ESLint code editor tools](https://eslint.org/docs/user-guide/integrations).

💡 **ProTip!** If you're using [Atom](https://atom.io/), like the Core team, you can install all the necessary tools in one line:  `apm install editorconfig atom-beautify linter linter-eslint linter-markdown linter-jsonlint linter-docker`

## Naming conventions

### Avoid camel-casing files and folders

Not all operating systems are case sensitive, so avoid having two files named the same with differing case. Instead of camel-casing, use hyphens. Underscores are not to be used for file or folder names unless expressly required.

Names of folders should be:
- Lowercased
- Alphanumeric characters
- Hyphenated to join more words
- Avoid camelCase, undescore_casing

File names follow the same conventions as folder names, and also allow for names to contain multiple (.) characters as needed.

**Do**

```sh
  ui-grid/
  example-payment-method/
  social/
```

```sh
  bootstrap.rtl.js
  index.js
```

**Don't**

```sh
  reactionpackagename/
  address_book/
  addressBook/
```

```sh
  settingsContainer.js
  addressBook.js
  address_book.js
```

### Create strong package names

Name package folders in this format: `<functionality>-<package-name>`

```sh
/imports/plugins/custom/payments-custom-provider
/imports/plugins/included/shipping-provider
```

Registry package names should preferably use some organizational namespacing as a prefix.

```js
reaction-paypal
reaction-google-analytics
yourorg-your-package
```

### Group related files together into folders

As a convention, if there are multiple files that provide functionality that is broken down across multiple files, these files should be grouped within a folder. If the files are stand-alone and the name needs to represent functionality, you can use a hyphen for the separator.

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

## Variables

### Naming variables

Variable names should be:

- Meaningful. Avoid single-letter variables.
- Use `error`, instead of `e` or `err`
- Variables that contains a boolean value should use a `isThisTrue` style.
- Variables that return arrays should be plural.

Publication names should:

- Use TitleCase

### Working with variables

- Use `const` except when a variable is being reassigned.

## Methods

### Method names should:
- Methods names should use a verb/noun style when possible, e.g. `checkConfiguration` or `addToCart`.
- Methods that return a single value should be singular.
- Methods whose main purpose is to return a value should use the get prefix.

- Avoid ternary operators and one-line `if` statements

### Use parenthesis for clarity

- Use parenthesis around all method arguments.

**Don't**
```
cartItems.find(item => item.status === picked)
```

**Do**
```
cartItems.find((item) => item.status === picked)
```

- When specifying a callback, always use the parenthesis to indicate the argument being accepted over the bare arrow-function form. This way, it's clear it's not another argument to the original function:

**Don't**
```
thisMethodTakesACallback(arg1, arg2, result => {
  doStuff
});
```
**Do**

```
thisMethodTakesACallback(arg1, arg2, (result) => {
  dostuff();
});
```


### Avoid multi-line shorthand arrow functions

If you have to break your arrow function into multiple lines, use curly brackets and a return rather than trying to break the shorthand arrow function into multiple lines.


**Don't**
 ```
cartItems.find(
   (item) => item.status === status
 )
```

**Do**
 ```
cartItems.find((item) => {
  return item.status === status;
})
```

### Working with collections

Be explicit in querying:

**Don't**
```
Products.findOne("abc123")
```
**Do**
```
Products.findOne({ _id: "abc123" })
```

### Replacing lodash with ES2015

Use native ES6 elements over lodash whenever there is a 1-for-1 replacement. Here are some examples of lodash methods that can be replaced with native elements:

- Replace `_.map`, with  `Array.prototype.map`
- Replace `_.reduce`, with  `Array.prototype.reduce`
- Replace `_.filter`, with  `Array.prototype.filter`
- Replace `_.each`, `_.forEach`, with  `Array.prototype.forEach`
- Replace `_.isArray`, with `Array.isArray`
- Replace `_.extend` with `Object.assign`
