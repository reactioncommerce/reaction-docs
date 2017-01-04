# Deploying

All Reaction [configuration options](configuration.md) can be used with these deployment choices.

Reaction can be deployed as a [standard Node application](https://guide.meteor.com/deployment.html) or as a [Docker container](https://www.docker.com/).

The Reaction core team recommends using Docker for deploying Reaction.

We recommend you deploy with at least **2GB of memory** for Node and Reaction to run well.

- [Docker and AWS](deploying/docker.md)
- [Heroku](deploying/heroku.md)
- [Galaxy (MDG)](deploying/galaxy.md)

## Launchdock

[Launchdock](https://github.com/reactioncommerce/launchdock) is an open source, multi-tenant orchestration platform from the Reaction Core team. Launchdock supports custom domains, SSL certificate creation and clustered scaling deployments of Docker containers, with some added functionality to act as a Reaction authority for creation of new tenant deployments.
