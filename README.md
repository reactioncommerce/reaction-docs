# Reaction Documentation

This repository contains source for Reaction Commerce documentation.

The `master` and `development` branches are both published to <https://docs.reactioncommerce.com>

## Contributing

Pull requests should be made to the `development` branches.

### Style

Reaction Docs uses [remark-lint](https://github.com/wooorm/remark-lint) for linting Markdown style. You can install and use it in this repo by running:

```sh
npm install
```

If you're using [Atom](https://atom.io), you can install the supported plugin [linter-markdown](https://atom.io/packages/linter-markdown) to get linting feedback as you write. If you're using a different editor, see the list of [available editor integrations](https://github.com/wooorm/remark-lint#editor-integrations).

#### Usage

```sh
# get lint results for the whole repo in your console
npm run lint

# fix anything that can be fixed automatically
npm run lint-fix
```
