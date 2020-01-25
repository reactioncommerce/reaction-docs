---
id: version-v1.6.4-git-style-guide
title: Git Style Guide
original_id: git-style-guide
---

Git version control is how we work together as a team. Naming branches and writing commit messages helps us keep a easy-to-understand history of the changes in the project.

## Naming Git branches

Create a branch name, with the ID number of the GitHub issue, in the following style:
`type-###-yourhandle-slug`. Example: `feat-123-impactmass-permissions`, `fix-222-spencern-shopify-hooks`

## Writing commit messages

Make atomic commits in the [Git commit message guidelines from Angular.js](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits), with a `(type):` followed by `subject`.

All of the types:
- *feat*: A new feature
- *fix*: A bug fix
- *docs*: Documentation only changes
- *style*: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- *refactor*: A code change that neither fixes a bug nor adds a feature
- *perf*: A code change that improves performance
- *test*: Adding missing or correcting existing tests
- *chore*: Changes to the build process or auxiliary tools and libraries such as documentation generation

Note the following styles:
- Use the imperative, present tense: use "change", not "changed" nor "changes"
- Do not capitalize first letter
- No dot (.) at the end
- Use `BREAKING CHANGES:` to note breaking changes

Examples:
```
(feat): add sendEmail() job
(docs): add doc for sendEmailJob() method
(refactor): replace Blaze component with React component

BREAKING CHANGES: remove Header Blaze template. To migrate to the React component, use HeaderComponent.
```

See more [examples from Angular.js](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.8sw072iehlhg).

## Making a pull request

Title the pull request (PR) with the ID number of the GitHub issue. Add `WIP` (work in progress) to the beginning of the title to get feedback early on.

Follow the [PR template](https://github.com/reactioncommerce/reaction/blob/v1.6.4/.github/pull_request_template.md) provided and make sure to add `Closes ###` with the GitHub issue number.
