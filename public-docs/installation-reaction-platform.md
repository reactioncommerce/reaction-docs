---
id: installation-reaction-platform
title: Install with Reaction Platform
---

Follow these instructions to run the entire Reaction Platform. 

The Platform will install and run the the entire suite of Reaction services in the these directories:

| Directory                                                                                  | Services                        |
| ------------------------------------------------------------------------------------------ | ------------------------------- |
| [`reaction`](https://github.com/reactioncommerce/reaction)                                 | GraphQL API, Classic UI, Mongo  |
| [`reaction-hydra`](https://github.com/reactioncommerce/reaction-hydra)                     | Authentication server, Postgres |
| [`reaction-next-starterkit`](https://github.com/reactioncommerce/reaction-next-starterkit) | Next.js storefront application  |

## Installation

1. Requirements:

- Install Docker and Docker Compose ([Mac](https://docs.docker.com/docker-for-mac/install/) | [Windows](https://docs.docker.com/docker-for-windows/install/) | [Linux](https://docs.docker.com/compose/install/#install-compose)) 
- Install [Node.js](https://nodejs.org/en/)
- A GitHub account with a <a href="https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/">configured SSH key</a>

> **Windows**: Reaction Platform has not been fully tested in Windows at this time.

> **Linux**: Docker Compose is included when installing Docker on Mac and Windows, but will need to be installed separately on Linux.

1. Before you get started, make sure you are not running any applications the necessary ports: `3000`, `4000`, `4444`.

2. Clone [**Reaction Platform**](https://github.com/reactioncommerce/reaction-platform)

```sh
git clone git@github.com:reactioncommerce/reaction-platform.git
```

4. Now you're ready to install. Run this command to bootstrap and start all of the services:

```sh
cd reaction-platform
make
```

This process may take some time. The Platform is checking that dependencies are present, cloning the sub-projects from GitHub, downloading and building Docker images, and starting services.

5. As the various repositories are downloading and services are starting, check the logs by running `docker-compose logs -f` in the specific repository. For example, to display the `reaction` logs, run:

```sh
cd reaction
docker-compose logs -f
```

To display the `reaction-next-starterkit` logs, run:

```sh
cd reaction-next-starterkit
docker-compose logs -f
```

6. Once the initial `make`  process finishes, the services will be accessible at the following URLs:

| Directory: Service                                                                         | URL                                                           |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [`reaction`](https://github.com/reactioncommerce/reaction): GraphQL API                    | [localhost:3000/graphpql-alpha](localhost:3000/graphql-alpha) |
| [`reaction`](https://github.com/reactioncommerce/reaction): GraphQL API playground         | [localhost:3000/graphiql](localhost:3000/graphiql)            |
| [`reaction`](https://github.com/reactioncommerce/reaction): Classic UI                     | [localhost:3000](localhost:3000)                              |
| [`reaction`](https://github.com/reactioncommerce/reaction): MongoDB                        | [localhost:27017](localhost:27017)                            |
| [`reaction-hydra`](https://github.com/reactioncommerce/reaction-hydra): oryd/hydra         | [localhost:4444](localhost:4444)                              |
| [`reaction-next-starterkit`](https://github.com/reactioncommerce/reaction-next-starterkit) | [localhost:4000](localhost:4000)                              |

7. Congrats 🎉 Now you're running the entire suite of Reaction Platform services and ready to start developing.

## Developing with Reaction Platform

Once you've bootstrapped the entire Reaction development in Docker, use `make start` to start all containers.

### Reaction Platform commands

Run these commands from the `reaction-platform` directory:

| Command                    | Description                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------- |
| `make`                     | Boostraps the entire Reaction development environment in Docker.                      |
| `make stop`                | Stops all containers.                                                                 |
| `make start`               | Starts all containers.                                                                |
| `make rm`                  | Removes all containers. Volumes are not removed.                                      |
| `make clean`               | Removes all containers, networks, and volumes. Any volume data will be lost.          |
| `make init-<project-name>` | Example: `make init-reaction-next-starterkit`. Does clone/setup for a single project. |

Learn more about [Reaction Platform](https://github.com/reactioncommerce/reaction-platform).

### Docker commands

Run these commands from each respective application's directory:

| Command                  | Description                         |
| ------------------------ | ----------------------------------- |
| `docker-compose logs -f` | Display logs and follow log output. |
| `docker-compose `        | Display logs and follow log output. |
| `docker-compose logs -f` | Display logs and follow log output. |

Learn more about [developing in Docker](https://docs.reactioncommerce.com/docs/next/installation-docker-development#run-the-apps) and [troubleshooting Docker development](https://docs.reactioncommerce.com/docs/next/troubleshooting-development#docker-issues).

### Git

Each sub-project has its own respective Git repository. If you want to run a different branch of `reaction` against `reaction-next-starterkit`, for example, change directories into `reaction` and change branches there.
