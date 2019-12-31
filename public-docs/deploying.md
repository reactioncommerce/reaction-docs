---
id: deploying
title: Deploying
---

Reaction is an open source multi-service platform. All services are either publicly available Docker images on DockerHub or are Git repositories that include a `Dockerfile` so that you can build your own Docker image after customizing the service. This means that you can deploy the Reaction system on any infrastructure that supports running a Docker container cluster with a shared network.

## Docker Images

You can find the published Reaction images [on our DockerHub page](https://hub.docker.com/u/reactioncommerce).

## Container Requirements

We recommend that you make at least **2GB of memory** available to each container.

## MongoDB Database

In a development environment, a local MongoDB database is created for you. In production, you will need to set up a separate production-ready MongoDB server and create a database in it. You then provide this database connection string in an environment variable for services that need to connect to it.

Because some services use change streams, your MongoDB server must be part of a replica set and must have oplog enabled.

> Don't forget to set up periodic database backups. Do them as often as you can afford to do.

## Postgres SQL Database

Reaction uses Hydra for OAuth2 login, and Hydra requires a Postgres SQL database. In a development environment, a local database is created for you. In production, you will need to set up a separate production-ready Postgres server and create a database in it. You then provide this database connection string in an environment variable for the `hydra` service.

> Don't forget to set up periodic database backups. Do them as often as you can afford to do.

## Database Migrations

When you deploy, the services will not start properly unless your Postgres and MongoDB databases are on the expected data version. Use the Reaction migration tools to migrate your data up or down before deploying. In some cases, migrating down is not possible. If you are rolling back to a previous Reaction version and migrating down is not possible, you will need to restore from the last backup prior to the upgrade.

## Environment Variables

See [Environment Variables](./environment-variables).

## Authentication

See [Authentication in Production](./authentication-in-prod).
