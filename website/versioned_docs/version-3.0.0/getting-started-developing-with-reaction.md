---
id: version-3.0.0-getting-started-developing-with-reaction
title: Getting Started As a Developer
original_id: getting-started-developing-with-reaction
---

## Install

To install Reaction for development, testing, or demonstration on your own computer, follow these [Reaction Development Platform instructions](https://github.com/reactioncommerce/reaction-development-platform/tree/v3.0.0#prerequisites).

Read [Developing In Docker](installation-docker-development) to understand how to do development on a multi-service application like Reaction.

## Common Commands

Reaction Commerce is made up of multiple projects (services) that work together. In most NodeJS Reaction projects, the following commands will work.

> Before running commands on your computer, always run `nvm use` to be sure the correct version of NodeJS is used. You may want to install a shell plugin that does this automatically whenever you `cd` into a directory that contains a `.nvmrc` file.

|                                     | Run in Docker container                                                                | Run on your computer                              |
|-------------------------------------|----------------------------------------------------------------------------------------|---------------------------------------------------|
| Print project version               | ``` docker-compose run --rm <service-name> npm run version --silent ```                | ``` npm run version --silent ```                  |
| Lint JavaScript files               | ``` docker-compose run --rm <service-name> npm run lint ```                            | ``` npm run lint ```                              |
| Lint GraphQL files                  | ``` docker-compose run --rm <service-name> npm run lint:gql ```                        | ``` npm run lint:gql ```                          |
| Run unit tests                      | ``` docker-compose run --rm <service-name> npm run test:unit ```                       | ``` npm run test:unit ```                         |
| Run integration tests               | ``` docker-compose run --rm <service-name> npm run test:integration ```                | ``` npm run test:integration ```                  |
| Run all tests                       | ``` docker-compose run --rm <service-name> npm test ```                                | ``` npm test ```                                  |
| Run the project in development mode | ``` docker-compose up # Run in foreground docker-compose up -d # Run in background ``` | ``` docker-compose run --rm npm run start:dev ``` |
| Run the project in production mode  | ``` docker-compose run --rm <service-name> npm start ```                               | ``` npm start ```                                 |
| View container logs                 | ``` docker-compose logs -f <service-name> ```                                          | N/A                                               |

## More Resources

- [Terms & Concepts](concepts-intro)
- [Recommended Tools](recommended-tools)
- [Troubleshooting Development](troubleshooting-development)
