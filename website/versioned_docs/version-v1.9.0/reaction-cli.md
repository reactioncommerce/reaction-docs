---
id: version-v1.9.0-reaction-cli
title: Reaction CLI
original_id: reaction-cli
---

Reaction ships with all the standard Meteor commands, as documented in the [Meteor Guides](https://docs.meteor.com/commandline.html), along with those from Reaction's own command line interface (CLI). Here are some handy commands to use while developing on Reaction:

## Reaction CLI

### reaction -v

Before you get started using the Reaction CLI, it's important to make sure you're using the latest version. Use `reaction -v` to check what versions of Node, NPM, Meteor Node, Reaction CLI, Docker and what branch and version of Reaction you are currently running.

```sh
reaction -v

Node: 9.5.0
NPM: 5.6.0
Meteor Node: 8.9.3
Meteor NPM: 5.5.1
Reaction CLI: 0.27.0
Reaction: 1.8.0
Reaction branch: release-1.8.0
Docker: 17.12.0-ce
```

### reaction --help

Shortcut: `-h`

`reaction --help` or `-h` will give you help for the `reaction` command.

### reaction reset

Resets the Reaction database, updates npm modules, and optionally removes `node_modules` before updating.

This will give you a fresh test dataset from `private/data`.

```sh
reaction reset
```

To just reset the database, pass in the `-n` flag:

```sh
reaction reset -n
```

### reaction test

To run the server integration tests:

```sh
reaction test
```

### reaction plugin create <your-plugin-name>

This will create a template project in the `/imports/plugin/custom` directory.

## Other useful commands for development

### inspect

To learn more on how to set up the inspector, check out our [debugging documentation](testing-debugging-server-code.md).

### npm run lint

Use `npm run lint` or alternatively, `npx eslint .` for linting your local files. This ensures you are running the same version of Reaction's ESLint.

### SKIP_FIXTURES=true reaction

Run Reaction _without_ the default sample data store and products. Read more about [fixture options](configuration.md#overwrite-sample-data).

### meteor mongo

Run `meteor mongo` from your Reaction directory to view and run commands in the MongoDB database directly.

See Meteor's documentation on [`meteor mongo`](https://docs.meteor.com/commandline.html#meteormongo) and MongoDB's documentation on all the [Mongo shell commands](https://docs.mongodb.com/manual/reference/mongo-shell/#mongo-shell-command-history).

### meteor shell

Start the Meteor interactive shell with `meteor shell`. See Meteor's documentation on [`meteor shell`](https://docs.meteor.com/commandline.html#meteorshell).
