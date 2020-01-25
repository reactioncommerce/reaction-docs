---
id: version-1.14.0-release-process
title: Release Guide
original_id: release-process
---

The [Reaction engineering team and invited community collaborators](https://github.com/orgs/reactioncommerce/people) creates new release branches of Reaction.

The process is:
1. Create a release branch!
1. Change destination branch from `trunk`  to release branch for all PR that should be included.
1. When PRs have been approved, tests pass, and there are no conflicts, merge PRs into release branch
1. Create a `Release x.x.x` pull request.
1. Create release notes
1. Add release notes to the CHANGELOG.MD file
1. Ask for review from QA when release is ready
1. QA Reviews release and verifies that automated tests pass
1. Create PR to update [sample data](https://github.com/reactioncommerce/reaction-catalog-sample-data/) migrations.
1. Merge to `trunk` , wait for tests, then tag release.
1. After successful merge, delete the release branch.

## Release branch

1. Create a branch from `trunk`  named **release-x.x.x**
2. Commit incremented `package.json` version
3. run `meteor npm install` to bump `package-lock.json` version
4. Should ~follow [SemVer](http://semver.org/) guidelines:

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards-compatible manner, and
- PATCH version when you make backwards-compatible bug fixes.

## Accept pull requests and i18n

- Merge approved patches/fixes/features pull requests for this release into the `release-x.x.x` branch.
- Create [LingoHub Pull Request](https://translate.lingohub.com/reaction-commerce/dashboard) if  i18n translations need updating in the release branch. LingoHub will automatically create files that are missing for all languages when only a `en.json` is provided, so a review of _i18n imports_ should also be performed before merging the i18n translation PR into the release branch.
- run `meteor npm install` as well as `reaction run` to make sure that all `package.json` and `package-lock.json` files get updated.
- Create a new pull request, with title `Release x.x.x` from the `release-x.x.x` branch to `trunk` .

## Release notes

- Create release notes - a summary of all PR and notable changes in the release.
- Run the following from the directory of the repo you are releasing:

```sh
git log <firstCommitHash>..<lastCommitHash> | pcregrep -A 2 -M 'Merge pull request' | perl -pe 's/Merge.*(#[0-9]{4}).*/$1/' | perl -pe 's/^(\-|#| |(\[[a-zA-Z]+\])+|\n)*//g' | perl -0777pe 's/([0-9]{4})\n(.+)\n/ - $2 (#$1)\n/g'
```

- Write extended notes about anything that is a breaking change or potentially breaking change.
- Write extended notes about anything that is interesting, adds exciting new functionality, or improves the app significantly in some way

Notes:

- You'll need `pcregrep` on your system which you can install on osx with brew `brew install pcre`
- Replace `<firstCommitHash>` and `<lastCommitHash>` with the first and last commit or tag of the release respectively. You can use prev tag and `HEAD` for this if you have the release branch checked out. e.g. `git log v1.5.5..HEAD | ...`
- Copy release notes to PR

## Release docs

- Merge outstanding documentation pull requests.
- Tag and release reaction-docs for major versions.

## Release review

- All Automated checks MUST PASS - even for admins.
- Scores should always be 90+, no vulnerabilities.
- Request two release reviewers to approve the PR.
- Neither reviewer can be the person who submitted the PR.
- Release on approval.

## Release

- **Merge** the `Release x.x.x` pull request into `trunk`
- Allow all tests and builds to complete
- [Draft and publish a new GitHub Release](https://github.com/reactioncommerce/reaction/releases)
- Wait for all `trunk`  tests to pass.
- Follow the format of previous release, copy change log from release PR into the release notes.

## Post-release checklist: All releases

- Core team: Review issues that the release resolves, that they are closed and stale branches removed.
- Community team: Update Gitter with links to the latest release, changelog and update instructions.

## Post-release checklist: Major releases

- Community team: Tag a new Documentation release and update Editorial about any new documentation tutorial links, new FAQ questions and other relevant content for social media channels.

- Community / Editorial team: If a release is noteworthy enough for a blog post, assign a blog post writer for the release post. The post should include instructions on how to upgrade.

- Community team: Assign team members to review and test supported repositories and tutorials. Make issues if any of these fail or break with the newest release:
  - [reaction-example-plugin](https://github.com/reactioncommerce/reaction-example-plugin/)
  - [`reaction-devtools`](https://github.com/reactioncommerce/reaction-devtools)
  - [`reaction-swag-shop`](https://github.com/reactioncommerce/reaction-swag-shop)
  - [`payments-cod`](https://github.com/reactioncommerce/payments-cod)
  - [YouTube video tutorials](https://www.youtube.com/playlist?list=PLJ1TVRVOrm2O5OsXqzDn5iZez4WEnKRZH)
