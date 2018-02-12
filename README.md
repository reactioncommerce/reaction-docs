# Reaction Documentation

This repository contains source for Reaction Commerce documentation.

All pushed branches are published to <https://docs.reactioncommerce.com>

## Contributing

1. Click on `Edit on GitHub` from any Reaction Commerce documentation page.
2. Click on the :pen: to enter edit mode.
3. Make changes and commit changes with the `Create a new branch for this commit and start a pull request.` option.
4. Make a pull request against the `master` branch.

## Linting

Reaction Docs uses [remark-lint](https://github.com/wooorm/remark-lint) for linting Markdown style:

- Install command-line tool: `npm install remark-lint` and run `npm run lint` or `npm run lint-fix`
- Install a code editor integration: [linter-markdown](https://atom.io/packages/linter-markdown) for Atom and [more supported editors](https://github.com/wooorm/remark-lint#editor-integrations).

## Linking

1. To link from one documentation page to another, always use `.md` file extension:

`[Store Operator Guide](/admin/dashboard.md)`
Example: [Store Operator Guide](/admin/dashboard.md)

2. To link to a specific point within the same page, use a `#` anchor tag:

`[Testing](#testing)`
Example: [Testing](#testing)

3. To link to a specific point in a different page, use both `.md` and `#`:

`[Variable naming convention](/developer/styleguide.md#variables)`
Example: [Variable naming convention](/developer/styleguide.md#variables)

### 

## Testing

You can view and test your branch live on <https://docs.reactioncommerce.com/>.

1. Go to <https://docs.reactioncommerce.com/>
2. Open browser console and run: `Meteor.call("redoc/flushDocCache")`
3. Find your branch in the drop-down menu. The URL should change to <https://docs.reactioncommerce.com/reaction-docs/your-branch-name/intro> and you should be able to see and test your changes here.
