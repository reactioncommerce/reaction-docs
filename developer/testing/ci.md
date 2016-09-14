# CI Builds

When a Pull Request is made to the Reaction repo, there are four acceptance steps that should pass before we merge into the `development` branch.

When successful, Docker images are also pushed to [Docker Hub](https://hub.docker.com/u/reactioncommerce/).

## Continuous Integration

[Circle CI](https://circleci.com/gh/reactioncommerce/reaction) runs our tests, with Docker images pushed after a successful test build.

## Lint Review

Automated duplication, security, style review using Code Climate.

Follows project `eslint` and [style guide](/developer/styleguide.md) guide.

## Code Review

At least two core team members or collaborators will review Pull requests.

## CLA

Contributor License Agreement acceptance for new collaborators.
