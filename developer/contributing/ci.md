# Continuous Integration

Whenever a Pull Request or merge request is made to the Reaction repo, there are automated acceptance steps that must pass before we merge into the latest `release-x.x.x` or `master` branch.

Automated tests include:

- package dependency checks for outdated, insecure packages
- code style and lint rules adherance
- reaction tests
- docker builds on release branches
- contributor agreements

## Builds

Docker images are pushed when Reaction successfully builds and passes all tests on the `master` or `release-x.x.x` branches. These images are released on [Reaction Commerce Docker Hub](https://hub.docker.com/u/reactioncommerce/).

There are two Docker images available:

- [reactioncommerce:reaction](https://hub.docker.com/r/reactioncommerce/reaction/) - the latest stable `master` image.
- [reactioncommerce:prequel](https://hub.docker.com/r/reactioncommerce/prequel/) - tagged pre-release builds.
