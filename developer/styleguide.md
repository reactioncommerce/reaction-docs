# Style Guide

Our rules are similar to AirBnB or Meteor rules, [standard template of ESLint rules](https://www.npmjs.com/package/eslint-config-airbnb), although we have tweaked them a little with what is working best for us.

A couple of notable Reaction specific style rules:

* Double quoted strings
* Well spaced function
* 160 character line length
* `import` order
  * npm packages
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

Installed as a [npm](https://www.npmjs.com/) dependency in development mode, Reaction provides `eslint` v3 with the `babel-eslint`

In the Reaction app root, we have a Reaction `eslint` configuration.

* `.eslintrc` - [http://eslint.org/](https://eslint.org/)

For more details, see the [ESLint Getting Started Guide](http://eslint.org/docs/user-guide/getting-started).

#### Markdown

In our markdown documentation, we use [remark-lint](https://github.com/wooorm/remark-lint) to ensure consistent Markdown styling.


### Pull Requests

Pull request branches are evaluated using [BitHound](https://www.bithound.io/github/reactioncommerce/reaction) for insecure dependencies and code quality.


- must pass a Linting check and _no errors_ are accepted.
- must pass a Dependency check and no priority packages are accepted.
- must pass `reaction test`

In many cases, documentation updates can be required as well.

Pull requests are submitted to a peer code review process before acceptance.
