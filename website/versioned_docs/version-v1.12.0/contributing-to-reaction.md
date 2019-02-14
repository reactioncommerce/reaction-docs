---
id: version-v1.12.0-contributing-to-reaction
title: Contributing Guide
original_id: contributing-to-reaction
---

At Reaction Commerce, we're dedicated to the open source community. In fact, we've designed our entire platform and business to grow from the passion and creativity that an open source community ignites. We've already attracted a small, dedicated team of open source contributors, and there's always room for more. If you'd like to join us, here's how to get started.

## Step 1: Get Reaction running

If you haven't already, get Reaction running locally.

Instructions are here for [Windows](installation-windows.md), [Mac OSX](installation-osx.md) and [Linux](installation-linux.md).

## Step 2: Find or open an issue

There are three ways to go about contributing to Reaction: file a bug, work on an issue or bug that is already created and vetted by the team, or propose a new feature in our [Reaction Feature Requests](https://github.com/reactioncommerce/reaction-feature-requests) repository.

### File a bug

1. Before you file a bug, please [search existing issues](https://github.com/reactioncommerce/reaction/issues) first.
2. Are you looking for support instead? Please go to our [Gitter room](https://gitter.im/reactioncommerce/reaction) instead.
3. Make sure to follow the issue template.

Once your bug issue is filed, the community team will evaluate and prioritize using the following label/criteria:

- **impact-critical** (do now): Blocks core functionality which would include checking out, processing orders, adding a product, etc.
- **impact-major** (do next): Blocks important functionality but there is a workaround or the problem doesn't inhibit shopping/purchasing
- **impact-minor** (do eventually): Impacts peripheral functionality or there is a reasonable workaround (UI glitches, etc)

Once it's been triaged and verified, a Community Engineering team member will work on it according the above criteria.

### Find an issue and claim it

1. Explore the [Help Wanted](https://github.com/reactioncommerce/reaction/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) or [Good First Issue](https://github.com/reactioncommerce/reaction/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) issues on our GitHub repo.
2. If you find something you want to work on, let us know right there in the comment with how you want to approach the problem.
3. If you are a first-time contributor, also mention the `@reactioncommerce/community` team in the comment so you can  request to be made a contributor.

### Create a Feature Request issue

Don't see a ticket for a feature you'd like to see in Reaction? Follow these steps:

1. Create an issue in the [Reaction Feature Requests](https://github.com/reactioncommerce/reaction-feature-requests) repository detailing the feature.
2. Upon team review, the team will provide next steps for how to get started on the feature.

If you are interested in a specific aspect of the project but aren't sure where to begin, feel free to ask us on Gitter.

## Step 3: Prepare a pull request for review

Branch off `develop` for your PR branch, unless you're fixing an urgent issue to a specific release that is still supported.

Once your branch fulfills the issue it tackles, you are ready to [create a pull request](https://help.github.com/articles/creating-a-pull-request/) (PR).

Select `develop` as the base branch (the branch you want your changes pulled into).

### Use our Git commit message conventions

Follow the [Git Style Guide](git-style-guide.md) rules outlined in the docs for branch names and commit message styles.

### Give your PR a good title

Title the PR with the ID number of the GitHub issue. Add `WIP` (work in progress) to the beginning of the title if your PR is still in development and you do not want it to be merged.

### Fill out the pull request template

Before you are ready for a team code review, you will also have to fill out the following sections in the template:

- **Resolves** - Note issue number
  - Link to the GitHub issue number
  - If you're resolving an unreported bug, note: `Resolves unreported issue`
  - We do not accept PRs for features without issues.

- **Impact** - Choose from one of the following:
  - **breaking** - introduces breaking changes to the app.
  - **critical** - resolves a **critical** bug blocking core functionality. Examples include browsing products, adding products to cart, checking out, processing orders, etc.
  - **major** - resolves a **major** bug or introduces significant new feature.
  - **minor** - resolves a `minor` bug, minor changes to the app, or minor new feature

- **Type** - Choose from one of the following:
  - **feature**: A new feature or functionality
  - **bugfix**: A bug fix
  - **performance**: A code change that improves performance
  - **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  - **test**: Adding missing or correcting existing tests
  - **refactor**: A code change that neither fixes a bug nor adds a feature
  - **docs**: Documentation only changes
  - **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

- **Issue Description**
  - Describe the issue this PR is solving with the knowledge you've gained by fixing it. This may differ from the original ticket as you now have more information at your disposal.
  - Include additional information gathered during the process of resolving the ticket that might be helpful to reviewers or other users who might encounter the same problem.
  - Include _all_ information necessary to understand the issue this PR resolves so that the reviewer does not need to look at the original ticket.

- **Solution**
  - Summarize your solution to the problem. Please include short descriptions of any solutions you tested before arriving at your final solution. This will help reviewers know why you decided to solve this problem in this particular way and will speed up the review process.
  - **Note new dependencies**: If you have introduced any new dependencies, please list them, explain how they are used in your solution and any other libs that you considered.

- **Breaking changes:** List breaking changes, or otherwise list none.
  - Changing file names
  - Moving files
  - Deleting files
  - Renaming functions or exports
  - Changes to code which might cause previous versions of Reaction or third-party code not to work as expected.
  - Note any work that you did to mitigate the effect of any breaking changes such as creating migrations, deprecation warnings, etc.

- **Testing Instructions**
  - Write instructions for testing your changes. You can assume that reviewers know how to start the app and how to perform basic setup tasks. For any task where there may be multiple ways to do something, be explicit. (e.g. there are several ways to "Create a Product" and many options once created before a product is published).
  - The steps you list should guide the reviewer through testing the feature or fix you've implemented. These steps will generally be very similar to the reproduction steps in the issue.

### Pass all tests

As soon as your PR is pushed, automated tests run to ensure:

- `npm run lint`: Code style is correct
- `npm run test`: All unit and integration tests pass

## Step 4: PR review process begins

The Community team triages all new pull requests as soon as the PR is complete.

### PR gets reviewed

The team reviews code quality rules including:

- **PR template:** If the PR doesn't follow the our template, reject and point the author of the PR to this doc.
  - **Issue description:** Use this information as the starting point for your review. If something is not clear, reject the PR and ask for clarity by requesting changes. While the original issue may have useful information, the PR should contain the most up to date representation of the issue.
  - **Solution:** Use this information to help determine a path to test this PR. Research any included packages or techniques that may have been used that you're not familiar with. Ask questions if you're confused.
  - **Breaking changes:** Test by applying this patch to an existing install of Reaction with existing users, orders, carts, etc. Specifically, test any parts of the app where the breaking change is involved and any data set that is involved in a migration.
  - **Testing:** Run through the author's steps to verify that it works as they've tested it. Then run through the app on your own as you would test it. Run through the app as many times as you feel comfortable before approving or requesting changes.

- **Readability:** The linter will help with this, but call out anything that is difficult to understand or that you feel needs comments

- **Documentation:** all code added or touched should have proper JSDoc, any new functionality should be documented, as outlined in [JSDoc Style Guide](jsdoc-style-guide.md).

- **Security:**
  - Code should only be usable by users with the correct roles. Any data published should be filtered to ensure that only users with the correct roles for the correct shops have access to it.
  - Synk should not fail. Any failing automated tests should not be approved.

- **Performance:** Code should be written with performance in mind. Data publications should only publish data necessary to accomplish the specific goal at hand.

- **Tests:** Any new functionality should include tests

- **Dependencies:** Any newly introduced dependencies should be updated to the latest version. No Meteor dependencies.

- **i18n:** All static copy should use i18next. Include definitions in the appropriate `en.json` file.

- **a11y:** Code should be a11y compliant.

- **Linting:** Pass all linting tests. If there are minor linting errors, the reviewer may fix them for speed.

Reviewers will note any changes that they will want to QA in the app, even if they aren't listed in the testing steps (e.g if the code changes a `cart` button, ensure that the button still works).

## Step 5: Congrats! It's approved. What happens next?

The Reaction team reviewer is responsible for merging the PRs they approved, unless the PR submitter has requested otherwise.

Does your new feature require new user documentation or developer documentation? Make an issue for that in [reaction-docs](https://github.com/reactioncommerce/reaction-docs/issues).

## Step 5: Congrats! It's merged. What happens next?

Now that your PR is merged, the feature will be released in the next release. Head on over to our [Release Guide](release-process.md) for more on how we release versions of Reaction.
