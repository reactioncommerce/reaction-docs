---
id: version-v1.6.4-contributing-to-reaction
title: Contributing Guide
original_id: contributing-to-reaction
---

At Reaction Commerce, we're dedicated to the open source community. In fact, we've designed our entire platform and business to grow from the passion and creativity that an open source community ignites. We've already attracted a small, dedicated team of open source contributors, and there's always room for more. If you'd like to join us, here's how to get started:

## Step 1: Get Reaction running

If you haven't already, get Reaction running locally:

```sh
curl https://install.meteor.com | /bin/sh
git clone https://github.com/reactioncommerce/reaction.git
cd reaction
reaction
```

## Step 2: Finding an issue

Explore the interface and the code to give you a good overview of the product and a sense for what's already built. Keep an eye out for bugs and interface issues, as well as features you'd like to see created.

Explore the [Pull Requests Encouraged](https://github.com/reactioncommerce/reaction/issues?q=is%3Aissue+is%3Aopen+label%3Apull-requests-encouraged) issues on our GitHub repo. If you find something you want to work on, let us know right there in the comments. If you are interested in a specific aspect of the project but aren't sure where to begin, feel free to ask.

Start small and open up a dialogue with us. This will help to get your contributions accepted easily.

## Step 3: The pull request and review process

[Create a pull request](https://help.github.com/articles/creating-a-pull-request/) to propose and collaborate on changes to Reaction. These changes are proposed in a PR branch, and are reviewed before being merged into a `release-x.x.x` branch, and then released to `trunk` .

-   Should reference an issue if one exists, or provide detailed information on the goal of the PR.
-   Should pass CI / Tests. New functionality should include new tests.
-   Should passing a linter code review and follow Reaction style guidelines.
-   Contributors should review the CLA.
-   Code reviewed before merge acceptance.

### Here's what to expect when you make a pull request to Reaction

As soon as pull requests are pushed, automated test are run to ensure:

-   All linting rules pass without errors or ignores.
-   Dependencies are not failing.
-   All tests pass.
-   No new security vulnerabilities are introduced.

You can run these checks yourself by running these commands:

-   `eslint .` for linting
-   `reaction test` for all tests

### Community team pull request review

The Community team triages all new pull requests as soon as possible. The team reviews code quality rules including:

-   No new Atmosphere or Meteor dependencies are introduced.
-   No hard-coded copy: All copy and alerts should have i18n keys and values.
-   Updated LingoHub translations.
-   All new methods and files have jsdoc summaries, as outlined in [JSDoc guide](https://github.com/reactioncommerce/reaction-jsdoc#how-to-write-docs).
-   All folders, variables, method names follow naming conventions, outlined in [Reaction style guide](styleguide.md).

The team also encourages in-line commenting.

Use comments to:

-   Explain functionality to someone new to the code
-   Link to any external documentation

### Getting feedback early and often

Want to get feedback on your pull request before it's ready for merging?

Push up the branch and add `[WIP]` for Work in Progress to the title and ask a question in GitHub.

## Step 4: Congrats! It's approved and merged. What's next?

Once a pull request goes through both the automated and Core team reviews, it's ready to be merged. Here are some things you may want to consider after that:

-   If your pull request referenced an issue, close that issue.
-   Does your new feature require new user documentation or developer documentation? Make an issue for that in [reaction-docs](https://github.com/reactioncommerce/reaction-docs/issues).
