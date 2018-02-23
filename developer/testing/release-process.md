# Release process

The [Reaction engineering team](https://github.com/orgs/reactioncommerce/people) creates new tagged releases of Reaction.

The process is:
1. Pick a commit.
1. QA: Run through the release UAT scripts.
  - All Automated checks MUST PASS - even for admins.
  - Scores should always be 90+, no vulnerabilities.
  - Request two release reviewers to approve the PR.
  - Neither reviewer can be the person who submitted the PR.
  - Release on approval.
1. Commit incremented `package.json` version
1. Run `meteor npm install` to bump `package-lock.json` version
1. Create release notes and update CHANGELOG.
1. Make a version tag, following [semantiv versioning](http://semver.org/) guidelines:
  - MAJOR version when you make incompatible API changes,
  - MINOR version when you add functionality in a backwards-compatible manner, and
  - PATCH version when you make backwards-compatible bug fixes.
1. [Draft and publish a new GitHub Release](https://github.com/reactioncommerce/reaction/releases)

## Update package.json

- run `meteor npm install` as well as `reaction run` to make sure that all `package.json` and `package-lock.json` files get updated.
- Create a new pull request, with title `Release x.x.x` from the `release-x.x.x` branch to `master`.

## Create release notes

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


## Release documentation

- Merge outstanding documentation pull requests.
- Tag and release reaction-docs for major versions.

## Clean up issues, milestones

- Review issues that the release resolves, that they are closed and stale branches removed.
