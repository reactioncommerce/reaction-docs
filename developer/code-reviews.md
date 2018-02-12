# Code review process

Code contributions are reviewed by the Reaction core and community contributors. All pull requests are reviewed and approved by at least one core contributor before merge.

Here's what to expect when you make a pull request to Reaction:

## Automated pull request checks

As soon as pull requests are pushed, [BitHound](https://www.bithound.io/github/reactioncommerce/reaction), [CircleCI](https://circleci.com/gh/reactioncommerce/reaction) and [Synk](https://snyk.io/) run automated tests. All checks should pass successfully to ensure:

- All linting rules pass without errors or ignores.
- Dependencies are not failing.
- All tests pass.
- No new security vulnerabilities are introduced.

You can run these checks yourself by running these commands:

- `eslint .` for linting
- `reaction test` for all tests

## Core team pull request review

Every Monday, the Core team triages all new pull requests. The Core team reviews code quality rules including:

- No new Atmosphere or Meteor dependencies are introduced.
- No hard-coded copy: All copy and alerts should have i18n keys and values.
- Updated LingoHub translations.
- All new methods and files have jsdoc summaries, as outlined in [JSDoc guide](https://github.com/reactioncommerce/reaction-jsdoc#how-to-write-docs).
- All folders, variables, method names follow naming conventions, outlined in [Reaction style guide](/developer/styleguide.md).

The Core team also encourages in-line commenting. Use comments to:

- Explain functionality to someone new to the code
- Link to any external documentation

## Getting feedback early and often

Want to get feedback on your pull request before it's ready for merging?

Push up the branch and add `[WIP]` for Work in Progress to the title and ask a question in GitHub.

## Congrats! It's approved and merged. What's next?

Once a pull request goes through both the automated and Core team reviews, it's ready to be merged. Here are some things you may want to consider after that:

- If your pull request referenced an issue, close that issue.
- Does your new feature require new user documentation or developer documentation? Make an issue for that in [reaction-docs](https://github.com/reactioncommerce/reaction-docs/issues).
