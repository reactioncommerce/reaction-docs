# Coding style guide

A guide to working on code at Reaction, in bite-size steps!

## Git: Issues, branches, commits

Git version control is how we work together as a team. Follow these guidelines to make releases and code reviews smoother.

1. Find a GitHub issue for what you're working on.

2. Branch name: Create a branch name, with the ID number of the GitHub issue, in the following style:
`fix-###-yourname-slug`

```
feat-123-spencern-add-email
docs-333-machiko-email
fix-111-impactmass-fix-email-retries
```

3. Make atomic commits in Angular.js style, with a `(scope)` and `subject`, in the following style:

```
(feat): add sendEmail() job
(docs): add doc for sendEmailJob() method
(fix): bug fix for issue
```

All of the types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

Note the following styles:
- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end
- use `BREAKING CHANGES:` to note breaking changes

More details: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commit-message-format
Examples: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.8sw072iehlhg

4. When you're ready to make a pull request, make sure the PR title and body contain the ### of the issue.

## JavaScript

<Add sentence here about why consistent JavaScript file and function conventions are important.>

### Files

- Organizing functions within a file:
  1. Private methods at the top
  2. Export at the bottom
- Naming files:

### Function

- Naming functions:
- Write JSDoc
- How to deprecate methods:

## React

> Link to React Best Practices

- Do not use i18next. Use Translation.Component.

## CSS



