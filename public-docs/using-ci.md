---
id: using-ci
title: CI Builds
---

Whenever a Pull Request or merge request is made to the Reaction repo, there are automated acceptance steps that must pass before we merge into the `develop` branch.

## Checks

- code style and lint rules adherence
- unit and integration tests
- docker builds on release branches
- DCO (commit signing)

## Builds

Docker images are pushed when Reaction successfully builds and passes all tests on the primary branch (usually `trunk` or `master`). These images are released on [Reaction Commerce Docker Hub](https://hub.docker.com/u/reactioncommerce/).
