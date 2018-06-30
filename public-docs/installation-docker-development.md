---
id: installation-docker-development
title: Developing in Docker
sidebar_label: Developing in Docker
---

We recommend doing all development in Docker containers using Docker Compose configuration to link containers together and link your host machine files into the containers. You may be able to get away with doing some development directly on your host machine, but learning the container development pattern will be necessary as we move the app toward microservice architecture.

## Getting Started

Follow the normal [Installation](installation.md) steps. After that:

1. Install [Docker](https://www.docker.com/products/docker). (Use "Docker for Mac" installer if on Mac. Use "Docker for Windows" installer if on Windows.)
2. Install [Kitematic](https://github.com/docker/kitematic) (recommended for container management through a nice UI)
3. Install [Docker Compose](https://docs.docker.com/compose/install/) if necessary. If you installed "Docker for Mac" or "Docker for Windows", it's already included.

## Alias Docker Compose Commands

Because they can be a lot to type and you'll type them often, we recommend at least two command aliases. In Mac OSX for example, add these two lines to `~/.bash_profile`:

```bash
alias dc="docker-compose"
alias dcrun="docker-compose run --rm"
```

Then wherever these instructions say `docker-compose`, you can type only `dc`, and wherever these instructions say `docker-compose run --rm`, you can type only `dcrun`.

## Run the Apps

Thanks to the Dockerfiles and `docker-compose.yml` file in the root of the main Reaction project repo, you can start all necessary apps in Docker containers by running:

```bash
docker-compose up -d
```

(If you are asked to run a command to create a network, then do so and retry.)

This will start a MongoDB container, a Reaction Meteor container, and a Reaction Node container, with necessary links between them and environment variables for local development. The containers will start in the background.

Since the Meteor app is much slower to start than the Node app, you may want to start only the Node app, especially if you are doing development that doesn't require Meteor code.

```bash
docker-compose up -d devserver
```

## Stop the Apps

Bring them all down and delete the containers:

```bash
docker-compose down
```

Or just stop one:

```bash
docker-compose stop <service_name>
```

## View Service Logs

While development containers are running, you can view the logs for any of the services. One easy way is to open the Kitematic app and click on the service. You can also follow the logs in a terminal with:

```bash
docker-compose logs -f <service_name>
```

Reaction Meteor logs:

```bash
docker-compose logs -f reaction
```

Reaction Node logs:

```bash
docker-compose logs -f devserver
```

MongoDB logs:

```bash
docker-compose logs -f mongo
```

## Make Code Changes

The Docker Compose config links all files except node_modules into the app containers. Therefore you can just modify code as you normally would, and the development app server running inside the container should detect your changes and restart. If for some reason it gets "stuck" and isn't seeing your changes, just stop and then restart the stuck service using the `docker-compose` commands or the Kitematic UI.

## Useful Commands

Bring all services up, but force them all to rebuild their image first:

```bash
docker-compose up -d --build
```

Delete all volumes when bringing the services down:

```bash
docker-compose down -v
```

Delete all images when bringing the services down:

```bash
docker-compose down --rmi local
```

You can put these last two together for a fresh slate:

```bash
docker-compose down -v --rmi local
```

To delete unused containers or images, which is useful to do now and then, run the "prune" commands. But beware that any remote images deleted will need to be re-downloaded, and you'll also lose any local images you may have created for other purposes.

```bash
docker container prune
docker image prune
```

If you have big problems, there is a "Reset" option in the Docker for Mac or Docker for Windows app preferences UI.

## Troubleshooting

If you are experiencing issues, first make sure that you are allowing Docker sufficient memory to run. In your Docker preferences, we suggest adjusting the `Memory` setting to allow `3.0GiB`, and the `Swap` setting to allow `1.5GiB`.

![advanced_and_reaction](https://user-images.githubusercontent.com/4482263/41941033-a31bc834-794f-11e8-8638-934220650730.png)