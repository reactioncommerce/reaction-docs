# Style Guide

Our rules are similar to AirBnB or Meteor rules, although we have tweaked them a little with what is working best for us.

A couple of notable Reaction specific style rules:

* Double-quoted strings
* Well-spaced functions
* 160 character line-length
* `import` order
  * React npm packages (`React`, `prop-types`, etc...)
  * other npm packages
  * Meteor core packages
  * Meteor (Atmosphere) packages
  * local app files

Read more about [Meteor Code Style](https://guide.meteor.com/code-style.html) for additional guidelines

## Editor Configuration

In the Reaction app root, we have Reaction specific configuration files that can be used with most editors with the appropriate tools installed.

* [`.eslintrc`](https://github.com/reactioncommerce/reaction/blob/master/.eslintrc) - [http://eslint.org/](https://eslint.org/)
* [`.jsbeautifyrc`](https://github.com/reactioncommerce/reaction/blob/master/.jsbeautifyrc) - [http://jsbeautifier.org/](https://jsbeautifier.org/)
* [`.editorconfig`](https://github.com/reactioncommerce/reaction/blob/master/.editorconfig) - [http://editorconfig.org/](https://editorconfig.org/)

These configurations also include additional rules supporting [ES2015](https://docs.meteor.com/packages/ecmascript.html#Supported-ES2015-Features) and [React](https://github.com/facebook/react).

### Atom

We've been using GitHub's open source code editor, [Atom](https://atom.io/), for some time now and recommend it.

Use this command to set up Atom with the [linting packages](https://atom.io/users/AtomLinter) that we use for Reaction:

```sh
apm install editorconfig atom-beautify linter linter-eslint linter-markdown linter-jsonlint linter-docker
```

### Lint

Reaction installs [`eslint`](https://eslint.org/), [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react) and [`babel-eslint`](https://github.com/babel/babel-eslint) from [npm](https://www.npmjs.com/) as development dependencies for JavaScript linting.

For more details, see the [ESLint Getting Started Guide](http://eslint.org/docs/user-guide/getting-started) and check the Reaction [`.eslintrc`](https://github.com/reactioncommerce/reaction/blob/master/.eslintrc) configuration file for the linting options and rules.

### Markdown

In our documentation, we use [`remark-lint`](https://github.com/wooorm/remark-lint) to ensure consistent Markdown styling.

### Pull requests

Pull request branches are evaluated using [BitHound](https://www.bithound.io/github/reactioncommerce/reaction) for insecure dependencies and code quality.

* must pass a linting check - _no errors_ are accepted.
* must pass a dependency check and no priority packages are accepted.
* must pass `reaction test`

In many cases, documentation updates can be required as well.

Pull requests are submitted to a peer code review process before acceptance.

### Naming files and folders

In general we use hyphens (-) and camelCase for folder names, and camelCase alone for file names. Do not use underscores (_) for file or folder names, unless expressly required. Be aware that not all operating systems are case sensitive, so make sure to avoid having two files named the same with differing case.

#### Folder names

**Good**

* Start with a lowercase letter
* Use alphanumeric characters
* For plugins: Use hyphens to join more than one word
* For all other folders: Use camelcase to join more than one word

```
// Plugins in /imports/plugins

ui-grid/
example-paymentmethod/
social/
taxes-avalara/

// All other folders

addressBook/

```

**Bad**

* Do not use underscores
* Do use hyphens to make names easier to read

```
reactionpackagename/
address_book/
```

#### File names

**Good**

* Start with a lowercase letter
* Use alphanumeric characters
* Use camelcase to join more than one word
* Use multiple (.) characters as needed

```
index.js
addressBook.js
bootstrap.rtl.js


// This hyphen is an exception as it's part of Meteor's naming convention
addressBook.app-test.js
```

**Bad**

* Do not use hyphens (-) and underscores (_) unless expressly required
* Exception: Meteor's migration and testing filenames for `*.app-test.js` files. 

```
settings_container.js
publish-container.js
address_book.js
```
