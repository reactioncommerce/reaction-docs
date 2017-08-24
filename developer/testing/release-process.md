# Release Process

Anyone from the [Reaction engineering team and invited community collaborators](https://github.com/orgs/reactioncommerce/people) can create new release branches of Reaction.

1.  Create a release branch.
2.  Merge accepted PR's into release branch.
3.  Create release notes and docs
4.  Release review
5.  Merge to `master` and tag release.

## Release Branch

-   Create a branch from `master` named **release-x.x.x**
-   Commit incremented `package.json` version
-   Should ~follow [SemVer](http://semver.org/) guidelines.
    -   MAJOR version when you make incompatible API changes,
    -   MINOR version when you add functionality in a backwards-compatible manner, and
    -   PATCH version when you make backwards-compatible bug fixes.

## Merge Pull Requests

-   Create LingoHub Pull Request to update i18n translations to the release branch.
-   Create a Pull request, with title `Release x.x.x` to master.

## Release notes

-   Create release notes - a summary of all PR and notable changes in the release.
-   Using <https://github.com/aaronjudd/git-release-notes>, you can run the following from the directory of the repo you are releasing

```sh
../repos/git-release-notes/index.js  -t "^([a-z]+) #(\d+) (.*)$" -b development <firstCommitHash>..<lastCommitHash> templates/reaction.ejs > History.md
```

-   Replace <firstCommitHash> and <lastCommitHash> with the first and last commit of the release respectively.
-   Copy release notes to PR

## Release Docs

-   Merge outstanding docs PRs
-   Create development => master PR
-   Tag and Release reaction-docs

## Release Review

-   All Automated checks MUST PASS - even for admins.
-   Scores should always be 90+, no vulnerabilities.
-   Request two release reviewers to approve the PR.
-   Neither reviewer can be the person who submitted the PR.
-   Release on approval.

## Release

-   **Squash and merge** the `Release x.x.x` pull request into `master`
-   Allow all tests and builds to complete
-   [Draft and Publish a new Github Release](https://github.com/reactioncommerce/reaction/releases)
-   Follow the format of previous release, copy change log from release PR into the release notes.

## Cleanup

-   Review issues that the release resolves, that they are closed and stale branches removed.
