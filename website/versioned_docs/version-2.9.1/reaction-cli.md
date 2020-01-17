---
id: version-2.9.1-reaction-cli
original_id: reaction-cli
title: Reaction CLI
---

> **Note:** As of Reaction 2.0 the CLI is deprecated and unsupported. You can use the Docker commands listed in this doc, to achieve the same results.

This document lists some handy commands to use while developing on Reaction.

## Check Version

Use `grep version package.json` to check what version of Reaction you are currently running.

```sh
> grep version package.json
"version": "2.0.0-rc.10",
          "last 2 versions"
```

## Run Tests

To run the server integration tests:

```sh
docker-compose run --rm reaction npm run test
```

To run the tests for a specific file use the following commands. Replace `file` with the name of the file you want to test.

```sh
docker-compose run --rm reaction npm run test:file
```

## Lint Files

Use the following command to lint your local files. This ensures you are running the same version of Reaction's ESLint.

```sh
docker-compose run --rm reaction npm run lint
```

## Debug Server Code

To learn more on how to set up the inspector, check out our [debugging documentation](testing-debugging-server-code.md).

## SKIP_FIXTURES=true

Tun Reaction _without_ the default sample data store and products:
1. Edit `.env` and add the following variable: `SKIP_FIXTURES=true`
2. Restart Reaction with `docker-compose restart`
