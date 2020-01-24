---
title: Install with Reaction Platform
sidebar_label: Install with Reaction Platform
id: installation-reaction-platform
---


The Reaction Platform is the easiest way to run the entire suite of Reaction services at once, as of Reaction version 2.0. The Platform installs and runs the entire suite of Reaction services in these directories:

| Directory                                                                                  | Services                                   |
| ------------------------------------------------------------------------------------------ | ------------------------------------------ |
| [`reaction`](https://github.com/reactioncommerce/reaction)                                 | GraphQL API, Mongo                         |
| [`reaction-hydra`](https://github.com/reactioncommerce/reaction-hydra)                     | Authentication server, PostgreSQL          |
| [`reaction-identity`](https://github.com/reactioncommerce/reaction-identity)               | MeteorJS based identity service            |
| [`reaction-admin`](https://github.com/reactioncommerce/reaction-admin)                     | Classic Admin UI                           |
| [`example-storefront`](https://github.com/reactioncommerce/example-storefront)             | Next.js storefront application             |

## Installation

### Install and setup required tooling
You'll need the following tools before continuing:
* [GNU Make](https://www.gnu.org/software/make/)
  > MacOS and Linux users should have a suitable version bundled with the OS
* Bourne Shell and POSIX tools (sh, grep, sed, awk, etc)
  > MacOS and Linux users should have a suitable version bundled with the OS
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org)
* [Yarn](https://yarnpkg.com/en/docs/install)
* A [GitHub](https://github.com/) account with a [configured SSH key][7]


###  Install and configure Docker and Docker Compose
 * Install Docker and Docker Compose ([Mac](https://docs.docker.com/docker-for-mac/install/) | [Linux](https://docs.docker.com/compose/install/#install-compose))
    > **Windows**: Reaction Platform does not officially support development on Windows currently. Development on Windows may be possible, but is untested. We are unable to provide support for developers using Windows.

    > **Linux**: Docker Compose is included when installing Docker on Mac and Windows, but will need to be installed separately on Linux.
 * Increase the memory and CPU allocated to Docker. You can set these allocations in the Docker settings. We recommend at least 4 GiB memory and much of our team runs with 8GiB. The default values are usually not sufficient to run the full Reaction system. See the [troubleshooting-development](./troubleshooting-development#memory-errors-or-errors-about-meteor-rawlogs) article for more information.

### Setup Reaction Platform
1. Clone [**Reaction Platform**](https://github.com/reactioncommerce/reaction-platform)
```sh
git clone git@github.com:reactioncommerce/reaction-platform.git
```

2. Bootstrap and start all of the services:
    > Note: before running these commands make sure you are not running any applications on the default ports that Reaction uses: `3000`, `4000`, `4444`, `4445`, `5555`, `5432`, and `27017`.

    ```sh
    cd reaction-platform
    make
    ```

    This process may take some time. The Platform is checking that dependencies are present, cloning the sub-projects from GitHub, downloading and building Docker images, and starting services.

    By the end of the initial `make` process, you should see these log messages:

    ```sh
    Successfully tagged example-storefront_web:latest
    Running post-build hook script for example-storefront.
    example-storefront post-build script invoked.
    Recreating example-storefront_web_1 ... done
    Running post-project-start hook script for example-storefront.
    example-storefront post-project-start script invoked.
    Running post-system-start hook script for reaction-hydra.
    reaction-hydra post-system-start script invoked.

    No post-system-start hook script for reaction. Skipping.
    Running post-system-start hook script for example-storefront.
    example-storefront post-system-start script invoked.
    ```

    You can confirm that all of these containers have installed and are starting up by running:

    ```sh
    docker ps
    ```
    You should see a log of all running containers with names, ports and statuses:

    ```sh
    CONTAINER ID        IMAGE                             COMMAND                  CREATED             STATUS              PORTS                                                      NAMES
    7616b75a7277        example-storefront_web      "sh -c 'yarn install…"   15 minutes ago      Up 15 minutes       0.0.0.0:4000->4000/tcp                                     example-storefront_web_1
    56053f0275fb        reaction_reaction                 "bash -c 'npm instal…"   18 minutes ago      Up 18 minutes       0.0.0.0:3000->3000/tcp                                     reaction_reaction_1
    31f4180746a4        mongo:3.6.3                       "docker-entrypoint.s…"   2 weeks ago         Up 18 minutes       0.0.0.0:27017->27017/tcp                                   reaction_mongo_1
    1f420dd7c664        oryd/hydra:v1.0.0-beta.9-alpine   "hydra serve all --d…"   2 weeks ago         Up 19 minutes       0.0.0.0:4444-4445->4444-4445/tcp, 0.0.0.0:5555->5555/tcp   reaction-hydra_hydra_1
    fc43e0a4d55b        postgres:10.3                     "docker-entrypoint.s…"   2 weeks ago         Up 19 minutes       0.0.0.0:32769->5432/tcp                                    reaction-hydra_postgres_1
    ```

3. As the various repositories are downloading and services are starting, check the logs by running `docker-compose logs -f` in the specific repository. For example, to display the `reaction` logs, run:

    ```sh
    cd reaction
    docker-compose logs -f
    ```

    To display the `example-storefront` logs, run:

    ```sh
    cd example-storefront
    docker-compose logs -f
    ```

4. Once all of the services are running, the following will be accessible at these URLs:

    | Directory: Service                                                                         | URL                                                           |
    | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
    | [`reaction`](https://github.com/reactioncommerce/reaction): GraphQL API                    | [POST localhost:3000/graphql-beta](localhost:3000/graphql-beta) |
    | [`reaction`](https://github.com/reactioncommerce/reaction): GraphQL API playground         | [GET localhost:3000/graphql-beta](localhost:3000/graphql-beta)            |
    | [`reaction`](https://github.com/reactioncommerce/reaction): Classic UI                     | [localhost:3000](localhost:3000)                              |
    | [`reaction`](https://github.com/reactioncommerce/reaction): MongoDB                        | [localhost:27017](localhost:27017)                            |
    | [`reaction-hydra`](https://github.com/reactioncommerce/reaction-hydra): oryd/hydra         | [localhost:4444](localhost:4444)                              |
    | [`example-storefront`](https://github.com/reactioncommerce/example-storefront) | [localhost:4000](localhost:4000)                              |

### You're done!
Congrats 🎉
Now you're running the entire suite of Reaction Platform services and ready to start developing.

## Repository Branches
[let's change this to match our development process as of v3.0.0]

With Reaction 2.0 release, we introduced a `develop` branch at both the [Reaction](https://github.com/reactioncommerce/reaction) and the [example-storefront](https://github.com/reactioncommerce/example-storefront) repositories. This branch contains all the latest changes, while `master` is our stable branch.

## Developing with Reaction Platform

Once you've bootstrapped the entire Reaction development in Docker, use `make start` to start all containers.

### Reaction Platform commands
[Can we leave these exclusively in the Reaction Platform docs and link to them?]

### Git

[Update for 3.0.0]

Each sub-project has its own respective Git repository. The normal bootstrapping process will give you the latest released versions of the platform subprojects and is the recommended configuration for regular development. If you want to run a different branch of `reaction` against `example-storefront`, for example, change directories into `reaction` and `git checkout` a different branch there. These steps are an alternative to the standard bootstrapping approach, you should do one or the other, not both:

As [documented above](#installation), install the prerequisites and clone the reaction-platform repository. Then:

```sh
cd reaction-platform
make clone
```

Within the necessary subproject directory or directories run the `git checkout <your-release-tag-or-branch>` commands you need to get the specific subproject versions you need checked out.

Example:

```sh
cd example-storefront
git checkout develop
```

Then run the following

```sh
cd .. # cd into reaction-platform
make
```

### Environment variables

Most Reaction services need certain environment variables set properly before they will start. Each project has a `.env.example` file that is copied to a Git-ignored `.env` file by the project's pre-build script. In most cases, these should have the correct values for running locally by default, but it's a good idea to review them.

Later, when you pull new commits for a project or check out a different branch, the project may have changed requirements for environment variables. But your `.env` file will not update automatically because it is Git-ignored. Thus, it's a good idea after every pull or checkout to either rebuild the project or `cd` into the project folder and run the `bin/setup` script. This script will copy missing environment variables from `.env.example` to `.env`. Alternatively, you can compare and update `.env` manually.

### Docker commands

Learn more about [developing in Docker](./installation-docker-development#run-the-apps) and [troubleshooting Docker development](./troubleshooting-development#docker-issues).
