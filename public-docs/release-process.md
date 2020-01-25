---
id: release-process
title: Release Guide
---

# How-to: Creating a new Reaction Release

The [Reaction engineering team and invited community collaborators](https://github.com/orgs/reactioncommerce/people) creates new release branches of Reaction.

> A "Reaction Release" consists of coordinated releases in four repositories: [Reaction Development Platform](https://github.com/reactioncommerce/reaction-development-platform), [Reaction](https://github.com/reactioncommerce/reaction), [Reaction Hydra](https://github.com/reactioncommerce/reaction-hydra), and [Example Storefront](https://github.com/reactioncommerce/example-storefront).

## Preparing each project

- Create a release branch
    1. Decide if this is a `major` / `breaking` (`X.-,-`), `minor` (`-.X.-`), or `patch` (`-.-.X`) release
    2. Create a branch off of the `develop` branch (or `trunk`  if `develop` is not present), and name it `release-vX.X.X`

- Increment version numbers in `package.json`
    1. If applicable (`Reaction` & `Example Storefront`), update the version number accordingly in `package.json`, and run the app in order to get an updated `package-lock.json` file, and commit these files.
- Update the `CHANGELOG` with release notes

    Because of the nature of our product, it's possible, and even likely, that `Reaction` will be the only project with substantive changes. It's OK and necessary to create a release for all four projects, even if there are no changes in some of them. If there are ***ANY*** changes in a project, use the first set of instructions here. If this is just a version bump to coordinate with the other projects, use the second set of instructions.

    - Creating release notes on a project with changes
        1. Use the following script to get a list of all PR's that will be in this release, replacing `PREVIOUS-RELEASE-TAG` with the previous release version, such as `v2.3.0`

            git log HEAD...{PREVIOUS-RELEASE-TAG} | pcregrep -A 2 -M 'Merge pull request' | perl -pe 's/Merge.*(#[0-9]{4}).*/$1/' | perl -pe 's/^(\-|#| |(\[[a-zA-Z]+\])+|\n)*//g' | perl -0777pe 's/([0-9]{4})\n(.+)\n/ - $2 (#$1)\n/g'

        1. Then, update the `CHANGELOG` with notes in the following format:

            # v{X.X.X}

            Reaction v{X.X.X} adds {major|minor} features and performance enhancements, fixes bugs and contains no breaking changes since v{X.X.X - 1version}.

            This release is being coordinated with [Reaction Development Platform](https://github.com/reactioncommerce/reaction-development-platform) and is designed to work with `v{X.X.X}` of [Reaction Hydra](https://github.com/reactioncommerce/reaction-hydra) and [Example Storefront](https://github.com/reactioncommerce/example-storefront).

            ## Notable changes

            ### {Change 1: Provide details of a notable change here}

            {Description of change 1}

            ### {Change 2: Provide details of a notable change here}

            {Description of change 2}

            ## Feature

            - {list all `feature` PR's here, in this format}
            - feat: this is the description of the PR ([#1234](https://github.com/reactioncommerce/reaction/pull/1234))

            ## Fixes

            - {list all `fix` PR's here, in this format}
            - fix: this is the description of the PR ([#1234](https://github.com/reactioncommerce/reaction/pull/1234))

            ## Refactors

            - {list all `refactor` PR's here, in this format}
            - refactor: this is the description of the PR ([#1234](https://github.com/reactioncommerce/reaction/pull/1234))

            ## Tests

            - {list all `test` PR's here, in this format}
            - tests: this is the description of the PR ([#1234](https://github.com/reactioncommerce/reaction/pull/1234))

            ## Contributors

            Thanks to @{outside-contributor} for contributing to this release! 🎉

        This is an example of a `CHANGELOG` for the `Reaction` project, please update accordingly if this is for `Reaction Development Platform`, `Reaction Hydra`, or `Example Storefront`.

    - Creating release notes on a project with no changes, just a version bump to keep the project in sync

        As previously mentioned, because of the nature of our product, not all projects will have updates with every release. If there are no updates aside from a version bump, use the following as the notes for the `CHANGELOG`:

        *Be sure to change the version number and the type of release.*

        ### Example Storefront

            # v{X.X.X}

            This is a {major|minor|patch} version update to keep this projects versioning coordinated with [Reaction Development Platform](https://github.com/reactioncommerce/reaction-development-platform), [Reaction](https://github.com/reactioncommerce/reaction), and [Reaction Hydra](https://github.com/reactioncommerce/reaction-hydra).

        ### Reaction

            # v{X.X.X}

            This is a {major|minor|patch} version update to keep this projects versioning coordinated with [Reaction Development Platform](https://github.com/reactioncommerce/reaction-development-platform), [Reaction Hydra](https://github.com/reactioncommerce/reaction-hydra), and [Example Storefront](https://github.com/reactioncommerce/example-storefront).

        ### Reaction Hydra

            # v{X.X.X}

            This is a {major|minor|patch} version update to keep this projects versioning coordinated with [Reaction Development Platform](https://github.com/reactioncommerce/reaction-development-platform), [Reaction](https://github.com/reactioncommerce/reaction), and [Example Storefront](https://github.com/reactioncommerce/example-storefront).

        ### Reaction Development Platform

            # v{X.X.X}

            This is a {major|minor|patch} version update to keep this projects versioning coordinated with [Reaction](https://github.com/reactioncommerce/reaction), [Reaction Hydra](https://github.com/reactioncommerce/reaction-hydra), and [Example Storefront](https://github.com/reactioncommerce/example-storefront).

- Create a PR from your release branch to the `trunk`  branch, using the updated `CHANGELOG` notes as the PR description
- Ask QA for a review
- `Reaction`, `Reaction Hyrda`, and `Example Storefront` can be merged as soon as they are approved.

Do not merge `Reaction Development Platform` at this time.

## Creating releases for `Reaction`, `Reaction Hydra`, and `Example Storefront`

Once `Reaction`, `Reaction Hydra`, and `Example Storefront` have been merged, and all CI steps have passed, it's time to create a release for each project.

- In each project, click the `Draft new release` button to begin the process
- Copy the updates from the `CHANGELOG` into the description portion of the release notes
- Use the version number, including the `v`, as both the `Tag Version` and `Release Title`. It should look similar to this:

![](New_release__reactioncommerce_reaction-c6930940-2eb9-40dd-a09c-3891bba481a4.png)

- Save the release as a draft, and have your fellow release manager (or anyone) take a look to make sure everything, but especially the tag, looks correct. Once published, the tag cannot be changed.
- If everything looks good, `Publish release`

## Creating a release for `Reaction Development Platform`

Once `Reaction`, `Reaction Hydra`, and `Example Storefront` have been released, we can update `Reaction Development Platform` to use these new releases, and release the platform.

1. Update `[config.mk](http://config.mk)` to use the latest version numbers in the `define SUBPROJECT_REPOS` block of code:

    ![](reaction-platform_config_mk_at_master__reactioncommerce_reaction-platform-63e424d3-0c72-4328-9765-838441aacf0f.png)

2. Ask QA for a review of the platform, using the updated releases
3. `Reaction Development Platform` can now be merged as soon as they are approved.
4. Next, create a release using the same instructions as above.
5. Once published, the release is official! Send a notice to the engineering channel to give everyone a heads up!

## Pulling changes back into `develop`

The `develop` branches of `Reaction` and `Example Platform` need to pull in the version bump and `CHANGELOG` changes we just made directly to their `trunk`  branches. You ***DO NOT*** need to create an official PR for this, just merge the `trunk`  branch back into `develop` and push.

## Updating our sample data for the new release

Once we have a new release, we need to update our Sample Data to go along with the release. Even if you are certain no data has changed, we still want a new version of data to match version numbers.

Follow the instructions [here](https://github.com/reactioncommerce/reaction-catalog-sample-data#how-to-update-and-export-for-a-new-reaction-release) to update the data.

## Links

- Release guide in our docs: [https://docs.reactioncommerce.com/docs/release-process](https://docs.reactioncommerce.com/docs/release-process)
- Catalog data update instructions: [https://github.com/reactioncommerce/reaction-catalog-sample-data#how-to-update-and-export-for-a-new-reaction-release](https://github.com/reactioncommerce/reaction-catalog-sample-data#how-to-update-and-export-for-a-new-reaction-release)
