---
id: version-v1.3.0-styleguide
title: Style Guide
original_id: styleguide
---
    
Our rules are similar to AirBnB or Meteor rules, [standard template of ESLint rules](https://www.npmjs.com/package/eslint-config-airbnb), although we have tweaked them a little with what is working best for us.

A couple of notable Reaction specific style rules:

* Double quoted strings
* Well spaced function
* 160 character line length
* `import` order
  * React npm packages (`React`, `prop-types`, etc...)
  * other npm packages
  * meteor core packages
  * meteor (Atmosphere) packages
  * local app files

Review [Meteor Code Style](https://guide.meteor.com/code-style.html) for additional guidelines that are typical of Meteor projects.

## Editor Configuration

In the Reaction app root, we have Reaction specific configuration files that can be used with most editors with the appropriate tools installed.

* `.eslintrc` - [http://eslint.org/](https://eslint.org/)
* `.jsbeautifyrc` - [http://jsbeautifier.org/](https://jsbeautifier.org/)
* `.editorconfig` - [http://editorconfig.org/](https://editorconfig.org/)

These configurations also include additional rules supporting [ES2015](https://docs.meteor.com/packages/ecmascript.html#Supported-ES2015-Features) and `React`.

### Atom

We've been using the Open Source [Atom](https://atom.io/) editor for some time now and can recommend it.

Setting up Atom is a quick command where we use the shell command `apm` to install the same [Atom linting packages](https://atom.io/users/AtomLinter) as we use for Reaction.

```sh
apm install editorconfig atom-beautify linter linter-eslint linter-markdown linter-jsonlint linter-docker
```

### Lint

Reaction installs the `eslint` v3.x packages _eslint_, _eslint-plugin-react_, _babel-eslint_ from [npm](https://www.npmjs.com/) as development dependencies.

In the Reaction app root, we have a Reaction `eslint` configuration.

`.eslintrc` - [http://eslint.org/](https://eslint.org/)

For more details, see the [ESLint Getting Started Guide](http://eslint.org/docs/user-guide/getting-started).

#### Markdown

In our Markdown documentation, we use [remark-lint](https://github.com/wooorm/remark-lint) to ensure consistent Markdown styling.

### Pull Requests

Pull request branches are evaluated using [BitHound](https://www.bithound.io/github/reactioncommerce/reaction) for insecure dependencies and code quality.

* must pass a Linting check and _no errors_ are accepted.
* must pass a Dependency check and no priority packages are accepted.
* must pass `reaction test`

In many cases, documentation updates can be required as well.

Pull requests are submitted to a peer code review process before acceptance.

### File Naming Conventions

In general we use hyphens (-) and camelCase for folder names, and camelCase alone for file names. Underscores are not to be used for file or folder names unless expressly required.  Be aware that not all operating systems are case sensitive, so it's not ok to have two files named the same with differing case.

#### Folder Names

**Good**

* Folder names for packages must contain only lowercased alpha numeric characters and may be hyphenated if joining more than one word
* Folder names all normal directories must start with a lowercased letter and may camel cased if joining more than one word

```
// Packages in /imports/plugins
ui-grid/
example-paymentmethod/
social/
taxes-avalara/

// All other folder names everywhere
addressBook/

```

**Bad**

* Package name should contain hyphens to make it easier to read.
* Underscores are not to be used unless expressly required.

```
reactionpackagename/
address_book/
```

#### File Names

**Good**

* File names must start with a lowercased letter and may be camel cased if joining more than one word.
* File names may contain multiple (.) characters as needed

```
settingsContainer.js
publishContainer.js
addressBook.js
bootstrap.rtl.js
index.js

// This is an exception as it's part of Meteor's naming convention
addressBook.app-test.js
```

**Bad**

* Hyphens and underscores are not to be used unless expressly required; such is the case with Meteor for `*.app-test.js` files. Or for migration files to make the filename more readable.

```
settings_container.js
publish-container.js
address_book.js
```
