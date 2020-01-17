---
id: version-2.9.1-troubleshooting-development
title: Troubleshooting issues during development
sidebar_label: Development Troubleshooting
original_id: troubleshooting-development
---

When working in the Reaction codebase as a developer, many issues can arise due to misconfiguration, missing dependencies, operating system differences, and software bugs. Here are some tips for diagnosing and fixing these issues.

## General Issues

### I cloned the Reaction repo but when I run "meteor" it doesn't work

You need to install and use the Reaction command line tool in order to run Reaction. It does some work building the application
before the app starts that is not optional. You can install the CLI by doing `npm install -g reaction-cli`. Then you should be able to run `meteor npm install` and then start the app by running `reaction run` or just `reaction`.

### I get a "defined in resolvers, but not in schema" error on startup

This happens when you pull in changes to files with the `.graphql` extension but Meteor does not realize they've changed, due to aggressive caching and/or not watching them. The fix is to delete Meteor's cache, and the simplest way to do that is:

```bash
reaction reset
```

But note that this will delete Meteor's local database, too.

If you are running the app in Docker, the same command works and will not affect your data. You can run it in the Docker container if you want, but it's fine to run on the host machine since `.meteor/local` path is shared between them.

## Docker Issues

These are potential issues you might encounter when running Reaction within a local Docker environment using Docker Compose and the docker-compose.yml file.

### Memory errors or errors about "Meteor rawLogs"

Make sure that you are allowing Docker sufficient memory to run. In your Docker preferences, we suggest adjusting the `Memory` setting to allow at least `3.0GiB`, and the `Swap` setting to allow at least `1.5GiB`. If you are running many containers, make these as high as possible as long as it doesn't negatively affect the performance of your computer.

![advanced_and_reaction](https://user-images.githubusercontent.com/4482263/41941033-a31bc834-794f-11e8-8638-934220650730.png)

### "$MONGO_OPLOG_URL must be set to the 'local' database of a Mongo replica set" error on startup

This usually happens when the `mongo-init-replica` service doesn’t finish setting up the replica set before Meteor tries to set up oplog. (See `mongo-init-replica` command in `docker-compose.yml`.) Although the `reaction` service depends on the `mongo-init-replica` service, there is no guarantee that Mongo has started and the replica set has been created prior to the `reaction` service starting.

You should only have to restart the `reaction` service to resolve this.

### "FATAL ERROR: CALL_AND_RETRY_LAST" error when building a custom Docker image

Be sure to use this command to build your custom Docker image:

```sh
docker build --build-arg TOOL_NODE_FLAGS="--max-old-space-size=2048" -t mycustom .
```

This seems to force Meteor to use less memory when building and work around this issue.
