# Style Guide

Our rules are similar to AirBnB or Meteor rules, [standard template of ESLint rules](https://www.npmjs.com/package/eslint-config-airbnb), although we have tweaked them a little with what is working best for us.

A couple of notable Reaction specific style rules:

-   Double quoted strings
-   Well spaced functions
-   Spaces around brackets
-   120 character line length
-   `import` order
    -   npm packages
    -   meteor core packages
    -   meteor (Atmosphere) packages
    -   local app files

Review [Meteor Code Style](https://guide.meteor.com/code-style.html) for additional guidelines that are typical of Meteor projects.

## Editor Configuration

In the Reaction app root, we have Reaction specific configuration files that can be used with most editors with the appropriate tools installed.

-   `.eslintrc` - [http://eslint.org/](https://eslint.org/)
-   `.jsbeautifyrc` - [http://jsbeautifier.org/](https://jsbeautifier.org/)
-   `.editorconfig` - [http://editorconfig.org/](https://editorconfig.org/)

These configurations also include additional rules supporting [ES2015](https://docs.meteor.com/packages/ecmascript.html#Supported-ES2015-Features) and `React`.

### Atom

We've been using the Open Source [Atom](https://atom.io/) editor for some time now and can recommend it.

Setting up Atom is a quick command where we use the shell command `apm` to install the same [Atom linting packages](https://atom.io/users/AtomLinter) as we use for Reaction.

```sh
apm install editorconfig atom-beautify linter linter-eslint linter-markdown linter-jsonlint linter-docker
```

### Lint

Reaction installs the `eslint` packages _eslint_, _eslint-plugin-react_, _babel-eslint_ from [npm](https://www.npmjs.com/) as development dependencies.

In the Reaction app root, we have a Reaction `eslint` configuration.

`.eslintrc` - [http://eslint.org/](https://eslint.org/)

For more details, see the [ESLint Getting Started Guide](http://eslint.org/docs/user-guide/getting-started).

#### Markdown

In our Markdown documentation, we use [remark-lint](https://github.com/wooorm/remark-lint) to ensure consistent Markdown styling.

### Pull Requests

Pull request branches are evaluated using [BitHound](https://www.bithound.io/github/reactioncommerce/reaction) for insecure dependencies and code quality.

-   must pass a Linting check and _no errors_ are accepted.
-   must pass a Dependency check and no priority packages are accepted.
-   must pass `reaction test`

In many cases, documentation updates can be required as well.

Pull requests are submitted to a peer code review process before acceptance.

### Naming Conventions

In general we use hyphens (-) for folder names. Underscores are not to be used for file or folder names unless expressly required.  Be aware that not all operating systems are case sensitive, so it's not ok to have two files named the same with differing case. To prevent this, we recommend not using camelCasing when naming folders or files.

As a convention, if there are multiple files that provide functionality that is broken down across multiple files, these files should be grouped within a folder. If the files are stand-alone and the name needs to represent functionality, you can use a hyphen for the seperator.

**Good**

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

**Bad**

```sh
/container/settings-containers.js
/container/settingsContainer.html
settingsContainer.js
```

#### Folders

**Good**

-   Folder names for packages should contain only lowercased alpha numeric characters and are **hyphenated** if joining more than one word

```sh
    // Packages in /imports/plugins
    ui-grid/
    example-paymentmethod/
    social/
    taxes-avalara/
```

**Bad**

-   Package name should contain hyphens to make it easier to read.
-   Underscores are not to be used unless expressly required.
-   Folder names should not be camelCased.

```sh
  reactionpackagename/
  address_book/
```

#### Files

**Good**

-   File names should contain only lowercased alpha numeric characters and are **hyphenated** if joining more than one word
-   File names may contain multiple (.) characters as needed
-   File names can use hyphens but should avoid camelCase naming.

```sh
  bootstrap.rtl.js
  index.js
```

**Bad**

-   Underscores and camelCased are not to be used unless expressly required;

```sh
  settingsContainer.js
  publishContainer.js
  addressBook.js
  settings_container.js
  publish-container.js
  address_book.js
```

#### Packages

We suggest that package folders follow a `<functionality>-<package-name>` format.

**Good**

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
