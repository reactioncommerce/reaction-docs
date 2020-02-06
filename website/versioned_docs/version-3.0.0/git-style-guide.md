---
id: version-3.0.0-git-style-guide
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

- _feat_: A new feature
- _fix_: A bug fix
- _docs_: Documentation only changes
- _style_: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- _refactor_: A code change that neither fixes a bug nor adds a feature
- _perf_: A code change that improves performance
- _test_: Adding missing or correcting existing tests
- _chore_: Changes to the build process or auxiliary tools and libraries such as documentation generation

Note the following styles:

- Use the imperative, present tense: use "change", not "changed" nor "changes"
- Do not capitalize first letter
- No dot (.) at the end
- Use `BREAKING CHANGES:` to note breaking changes

Examples:
```sh
    (feat): add sendEmail() job
    (docs): add doc for sendEmailJob() method
    (refactor): replace Blaze component with React component

    BREAKING CHANGES: remove Header Blaze template. To migrate to the React component, use HeaderComponent.
```
See more [examples from Angular.js](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.8sw072iehlhg).

### Developer Certificate of Origin
We use the [Developer Certificate of Origin (DCO)](https://developercertificate.org/) in lieu of a Contributor License Agreement for all contributions to Reaction Commerce open source projects. We request that contributors agree to the terms of the DCO and indicate that agreement by signing all commits made to Reaction Commerce projects by adding a line with your name and email address to every Git commit message contributed:
```
Signed-off-by: Jane Doe <jane.doe@example.com>
```

You can sign your commit automatically with Git by using `git commit -s` if you have your `user.name` and `user.email` set as part of your Git configuration.

We ask that you use your real name (please no anonymous contributions or pseudonyms). By signing your commit you are certifying that you have the right have the right to submit it under the open source license used by that particular Reaction Commerce project. You must use your real name (no pseudonyms or anonymous contributions are allowed.)

We use the [Probot DCO GitHub app](https://github.com/apps/dco) to check for DCO signoffs of every commit.

If you forget to sign your commits, the DCO bot will remind you and give you detailed instructions for how to amend your commits to add a signature.
