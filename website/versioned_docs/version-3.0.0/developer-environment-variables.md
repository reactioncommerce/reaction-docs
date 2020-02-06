---
id: version-3.0.0-developer-environment-variables
title: Developer Concepts: Environment Variables
sidebar_label: Environment Variables
original_id: developer-environment-variables
---

Container-based microservice deployments typically get much of their configuration from environment variables, and Reaction is no exception. Some environment variables are required because they tell a container service how to connect to another service or a database. Others are optional with sensible defaults, but allow you to customize the system to meet your needs.

Each project repository has a root-level `.env.example` file which you must copy into a `.env` file, which is then used by the `docker-compose` commands (and is not committed). Each project also has a `bin/setup` script; enter `bin/setup` to copy all new lines from `.env.example` to `.env`, but be aware that lines that exist but have a different value are not copied, and removed lines are not removed. Feel free to change the `.env` file as necessary for your development, while understanding the consequences.

In some cases, projects may look for additional environment variables that are not listed in `.env.example` because they are optional and have default values in the code. You may manually set them in `.env` if necessary. *In a NodeJS project, search for "cleanEnv" to find the full list of variables that are used.*

Refer to [Environment Variables](./environment-variables) for a full list of the environment variables used by all Reaction Commerce projects. When doing development using our standard Docker Compose configuration, all necessary environment variables should be automatically set correctly for you, but you may need to reference this to understand what is happening or to set up specific scenarios.
