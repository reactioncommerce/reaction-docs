# Code Style Guide

Reaction's code style guides are similar to AirBnB or Meteor's rules, although we have a few notable differences:

* Double-quoted strings
* Well-spaced functions
* 160 character line-length
* Place `import`s in the following order:
  * React npm packages (`React`, `prop-types`, etc...)
  * other npm packages
  * Meteor core packages
  * Meteor (Atmosphere) packages
  * local app files

Read more about [Meteor Code Style](https://guide.meteor.com/code-style.html) for additional guidelines

## Configuring your editor

At Reaction, we use [Atom](http://atom.io) with [Atom Linter](https://atom.io/users/AtomLinter) packages that support the linting and code formatting rules configured with Reaction: [ESLint](https://eslint.org/), [JS Beautifier](https://jsbeautifier.org/) and [EditorConfig](https://editorconfig.org/).

If you use Atom, you can install all the recommended linting tools by running:

```sh
apm install editorconfig atom-beautify linter linter-eslint linter-markdown linter-jsonlint linter-docker
```

You can find all the rules for these tools in their respective configuration files:
* [`.eslintrc`](https://github.com/reactioncommerce/reaction/blob/master/.eslintrc) - for linting rules for [ES2015](https://docs.meteor.com/packages/ecmascript.html#Supported-ES2015-Features) and [React](https://github.com/facebook/react)
* [`.jsbeautifyrc`](https://github.com/reactioncommerce/reaction/blob/master/.jsbeautifyrc) - for reformatting JavaScript files
* [`.editorconfig`](https://github.com/reactioncommerce/reaction/blob/master/.editorconfig) - for general editor configuration



## Naming things

In general, use hyphens (`-`) and camelCase for names of folders, and camelCase for names of files. Don't use underscores (`_`).

Not all operating systems are case sensitive, so make sure to avoid having two files named the same with differing case.

#### Naming folders and plugins

**Do**

* Start with a lowercase letter
* Use alphanumeric characters
* For plugins: Use hyphens to concatenate
* For all other folders: Use camelcase to concatenate

```
// Plugins in /imports/plugins

ui-grid/
example-paymentmethod/
social/
taxes-avalara/

// All other folders

addressBook/

```

**Don't**

* Don't use underscores
* Do use hyphens to make names easier to read

```
reactionpackagename/
address_book/
```

#### Naming files

**Do**

* Start with a lowercase letter
* Use alphanumeric characters
* Use camelcase to concatenate
* Use multiple (`.`) characters as needed

```
index.js
addressBook.js
bootstrap.rtl.js


// This hyphen is an exception as it's part of Meteor's naming convention
addressBook.app-test.js
```

**Don't**

* Don't use hyphens (`-`) and underscores (`_`) unless explicitly required.
* Exception: Meteor's migration and testing filenames, like `*.app-test.js`

```
settings_container.js
publish-container.js
address_book.js
```


## Submitting pull requests

First of all, thank you for contributing to Reaction! We use  [BitHound](https://www.bithound.io/github/reactioncommerce/reaction) to check all incoming pull requests for insecure dependencies and code quality.


* must pass all linting rules
* must pass a dependency check and no priority packages are accepted.
* must pass `reaction test`

In many cases, documentation updates can be required as well.

Pull requests are submitted to a peer code review process before acceptance.
