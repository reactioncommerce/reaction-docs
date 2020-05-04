---
id: upgrading
title: Upgrading from 2.x to 3.x
sidebar_label: Upgrading from 2.x
---

This article explains the differences between Reaction 2.x releases and 3.x releases and the steps necessary to upgrade from 2.x to 3.x. Some steps are necessary both for deployed environments and for development environments; others are specific either deployed environments or development environments.

## Overview

|                | 2.x                                                                                                                                                                                                                                                                                                                                  | 3.x                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Projects       | The Reaction Admin UI, the Reaction Identity UI (for oauth flows), and the headless GraphQL API are all in a single project:  https://github.com/reactioncommerce/reaction                                                                                                                                                           | In 3.x the Reaction Admin UI, the Reaction Identity UI (for oauth flows), and the headless GraphQL API are each in their own project: <br><br>API: https://github.com/reactioncommerce/reaction <br>Identity UI: https://github.com/reactioncommerce/reaction-identity <br>Admin UI: https://github.com/reactioncommerce/reaction-admin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Meteor         | The project is a Meteor app                                                                                                                                                                                                                                                                                                          | The API project is a Node 12 program that uses ECMAScript modules.<br>The Reaction Identity project is a Meteor app.<br>The Reaction Admin project is a Meteor app.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Plugins        | The project has a plugin system, where plugins are included in the same repo or can be added to a custom folder as Git submodules. Each plugin may register server code, browser code (for Reaction Admin), or both.<br><br>Plugins are auto-loaded by a script whenever you start the development app, or build the production app. | **API**:<br>The API project has a plugin system, where some plugins are included in the project and others can be installed as NPM packages.<br><br>There is nothing preventing you from adding a custom folder and adding custom plugins directly in the project, but we recommend that all plugins be loaded as NPM packages.<br><br>Plugins are not auto-loaded. You must import and register them in a file named registerPlugins.js.<br><br>API plugins may only contain server code, for extending the GraphQL API, for extending the Express server that serves it, or for registering internal functions that other plugins call.<br><br>**Reaction Admin**:<br>The Reaction Admin project has a plugin system that works the same as the old 2.x plugin system, except that API code can no longer be registered.<br><br>Plugins may register routes and other client code, or may register Meteor server code such as publications and server methods. However, using Meteor server code is strongly discouraged because this app will eventually be moved off of Meteor, too.<br><br>**Reaction Identity**:<br>The Reaction Identity project has no plugin system. It is a relatively small project, which you can fork and modify directly if needed. |
| MongoDB        | The minimum version of MongoDB for Reaction 2.x system is MongoDB 3.6.x. A replica set is also required for change streams.                                                                                                                                                                                                          | The minimum version of MongoDB for Reaction 3.x system is MongoDB 4.x. A replica set is also required for change streams.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Migrations     | The app runs "up" migrations automatically as necessary during startup. If "down" migrations would be necessary, the app refuses to start.                                                                                                                                                                                           | In 3.x, all 2.x migrations have been removed, and migrations no longer run automatically during startup. Also, there is a check during startup to ensure that all 2.x migrations have been run against your database. If not, the API will refuse to start. If this happens, you must run Reaction 2.7 connected to that database one time, wait for all migrations to run on startup, and then stop Reaction 2.7 and retry running 3.x.<br><br>There will soon be a new migration system available for 3.x, which will be a tool that you run separately to manage database migrations across your development and production environments.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Hydra          | Hydra v1.0.0-beta.9 is used for Oauth2 authentication flows (login, register, and logout from the storefront)<br><br>The **Reaction Meteor** app serves as the identity server and UI, and uses the Meteor Accounts system to manage identity.                                                                                       | In 2.x, Hydra v1.0.8 is used for Oauth2 authentication flows (login, register, and logout from the storefront).<br><br>The **Reaction Identity** Meteor app serves as the identity server and UI, and uses the Meteor Accounts system to manage identity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Login Services | Signing in with email and password or third-party services such as Google and Facebook is supported.                                                                                                                                                                                                                                 | Only signing in with email and password is supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| SMTP Email     | SMTP settings can be provided with a MAIL_URL environment variable or through a Reaction Admin form that stores them in the database.                                                                                                                                                                                                | SMTP settings can be provided with a MAIL_URL environment variable only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Stripe         | The Stripe secret API key can be entered in a Reaction Admin form and stored in the database.                                                                                                                                                                                                                                        | The Stripe secret API key must be supplied as an environment variable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

## Environment Variables

The following is a summary of all of the environment variables needed by all Reaction services, and how they changed from 2.9.1 to 3.0.0.

In a development environment, if you clone a new Reaction Development Platform, check out the 3.0.0 branch, and run `make`, all of these should be handled automatically for you.

In a development environment, if you reuse a Reaction Development Platform folder that has already been used to run Reaction 2.x, **you must make some manual adjustments to the `.env` files in each project**. Reaction Development Platform runs the `bin/setup` script in each project, but this script will not overwrite existing variables to new values or remove variables that are no longer needed. This is why we recommend a separate Reaction Development Platform clone for 3.x, but if you must switch between 2.x and 3.x in the same Reaction Development Platform, then you should **manually copy `.env.example` to `.env` in every project, completely overwriting the `.env` file contents**. If you have intentionally customized some variables, you can redo your customizations after copying over the entire `.env.example` file.

In a deployed environment, you can go service by service and start from your 2.x variables, adding, removing, or changing some of them as described below.

### API

Unchanged environment variables:
- `GRAPHQL_INTROSPECTION_ENABLED`: Optional. Set to `true` to allow introspection of the GraphQL API when `NODE_ENV` is `production`.
- `GRAPHQL_PLAYGROUND_ENABLED`: Optional. Set to `true` to serve the GraphQL Playground UI from `/graphql` when `NODE_ENV` is `production`.
- `HYDRA_OAUTH2_INTROSPECT_URL`: Required for the API to authenticate requests that include an `Authorization` token generated by Hydra.
- `MAIL_URL`: Required if the `email-smtp` plugin is registered. An SMTP mail url, e.g. `smtp://user:pass@example.com:465`.
- `MONGO_URL`: Required. The MongoDB connection string URL, including the name of the database you want to use.
- `PORT`: Optional. Set to any port number to run the Express server on a port other than 3000.
- `REACTION_GRAPHQL_SUBSCRIPTIONS_ENABLED`: Optional. Set this to false if you do not need GraphQL subscription support
- `REACTION_LOG_LEVEL`: Optional. If you don't set this, the development default is "DEBUG" and the production default is "WARN".
- `REACTION_WORKERS_ENABLED`: Optional. Set to `false` to disable background job workers. Be careful because at least one instance must be working background jobs or features such as emailing and file uploads won't work.
- `ROOT_URL`: Required. The root URL with protocol, such as `https://shop.mydomain.me`.

Environment variables you no longer need:
- `HYDRA_ADMIN_URL`: Moved to Identity service
- `HYDRA_TOKEN_URL`: Moved to Identity service
- `IDENTITY_PROVIDER_MODE`: Unnecessary because Identity is a separate service
- `METEOR_DISABLE_OPTIMISTIC_CACHING`: The API is no longer a Meteor project
- `METEOR_WATCH_POLLING_INTERVAL_MS`: The API is no longer a Meteor project
- `MONGO_OPLOG_URL`: The API is no longer a Meteor project
- `OAUTH2_CLIENT_DOMAINS`: Moved to Identity service
- `REACTION_AUTH`: Initial admin user is no longer auto-created
- `REACTION_EMAIL`: Initial admin user is no longer auto-created
- `REACTION_SECURE_DEFAULT_ADMIN`: Initial admin user is no longer auto-created
- `REACTION_USER_NAME`: Initial admin user is no longer auto-created
- `REACTION_USER`: Initial admin user is no longer auto-created

New environment variables:
- `REACTION_ADMIN_PUBLIC_ACCOUNT_REGISTRATION_URL`: Required. The registration URL to be used in new account invitation emails.
- `REACTION_IDENTITY_PUBLIC_PASSWORD_RESET_URL`: Required. The URL of the password reset UI (e.g., `/reset-password/TOKEN`) on the Reaction Identity domain, with all-uppercase `TOKEN` as the placeholder for the reset token.
- `REACTION_IDENTITY_PUBLIC_VERIFY_EMAIL_URL`: Required. The URL of the email verification UI (e.g., `/#/verify-email/TOKEN`) on the Reaction Identity domain, with all-uppercase `TOKEN` as the placeholder for the verification token.
- `REACTION_SHOULD_INIT_REPLICA_SET`: Optional. If this is `true`, on startup the API will auto-initialize a MongoDB replica set if one isn't found. This is `true` by default when `NODE_ENV` is `development`; otherwise, it's `false`.
- `STRIPE_API_KEY`: Required if you want Stripe payments to work. If you aren't using Stripe but you have the `payments-stripe` plugin registered, set this to any string.

### Hydra

> Other environment variables or configuration options may be available. Refer to the [Hydra documentation](https://www.ory.sh/docs/hydra/configuration).

Environment variables you no longer need:
- `DATABASE_URL`: Renamed to `DSN`
- `OAUTH2_CONSENT_URL`: Renamed to `URLS_CONSENT`
- `OAUTH2_ERROR_URL`: Renamed to `URLS_ERROR`
- `OAUTH2_ISSUER_URL`: Renamed to `URLS_SELF_ISSUER`
- `OAUTH2_LOGIN_URL`: Renamed to `URLS_LOGIN`
- `OIDC_SUBJECT_TYPES_SUPPORTED`: Renamed to `OIDC_SUBJECT_IDENTIFIERS_ENABLED`
- `OIDC_SUBJECT_TYPE_PAIRWISE_SALT`: Renamed to `OIDC_SUBJECT_IDENTIFIERS_PAIRWISE_SALT`
- `SYSTEM_SECRET`: Renamed to `SECRETS_SYSTEM`

New environment variables:
- `DSN`: Required. The Postres database connection string.
- `OAUTH2_EXPOSE_INTERNAL_ERRORS`: Optional. Useful for debugging. Refer to https://www.ory.sh/docs/next/hydra/debugging#first-aid
- `OIDC_SUBJECT_IDENTIFIERS_ENABLED`: Required. Be careful not to change this in production. Refer to https://www.ory.sh/docs/oryos.9/hydra/advanced#openid-connect
- `OIDC_SUBJECT_IDENTIFIERS_PAIRWISE_SALT`: Required. Be careful not to change this in production. Refer to https://www.ory.sh/docs/oryos.9/hydra/advanced#openid-connect
- `SECRETS_SYSTEM`: Required. A key or keys used to encrypt sensitive data using AES-GCM (256 bit) and validate HMAC signatures. Must be at least 16 characters long. This may be a single key or a comma-separated list where the first item in the list is used for signing and encryption and the whole list is used for verifying signatures and decryption. See https://www.ory.sh/docs/hydra/configuration
- `SECRETS_COOKIE`: Optional. A secret or secrets that are used to encrypt cookie sessions. Defaults to the same keys from `SECRETS_SYSTEM` but Hydra recommends using a separate secret in production. See https://www.ory.sh/docs/hydra/configuration
- `SERVE_PUBLIC_CORS_ALLOWED_ORIGINS`: Required. Set this to a comma-delimited list of origin URLs that should be allowed to do browser-based login. In particular, set this to the public root URL of your Reaction Admin site, plus any single-page apps you have built to use standard browser-based OIDC authentication flows.
- `SERVE_PUBLIC_CORS_ENABLED`: Required. Set this to `true` to enable browser-based login flows. See also `SERVE_PUBLIC_CORS_ALLOWED_ORIGINS`.
- `URLS_CONSENT`: Required. Reaction Identity consent URL (the root URL plus `/consent`).
- `URLS_ERROR`: Required. Reaction Identity errors URL (the root URL plus `/account/oauth-error`).
- `URLS_LOGIN`: Required. Reaction Identity login URL (the root URL plus `/login`).
- `URLS_LOGOUT`: Required. Reaction Identity logout URL (the root URL plus `/logout`).
- `URLS_SELF_ISSUER`: Required. The public URL of Hydra.

### Example Storefront

Unchanged environment variables:
- `CANONICAL_URL`
- `ENABLE_SPA_ROUTING`
- `EXTERNAL_GRAPHQL_URL`: Ensure this is the public API URL.
- `INTERNAL_GRAPHQL_URL`: Ensure this is the internal API URL.
- `OAUTH2_ADMIN_PORT`
- `OAUTH2_AUTH_URL`
- `OAUTH2_CLIENT_ID`
- `OAUTH2_CLIENT_SECRET`
- `OAUTH2_HOST`
- `OAUTH2_TOKEN_URL`
- `PORT`
- `SEGMENT_ANALYTICS_SKIP_MINIMIZE`
- `SEGMENT_ANALYTICS_WRITE_KEY`
- `SESSION_MAX_AGE_MS`
- `SESSION_SECRET`
- `STRIPE_PUBLIC_API_KEY`

Environment variables you no longer need:
- `OAUTH2_REDIRECT_URL`: Now built automatically from `CANONICAL_URL`

Environment variables you need to change:
- `NODE_ENV`: When running locally, you must be sure that `NODE_ENV` is NOT in your `.env` file. For deployed environments (including non-production), be sure to set `NODE_ENV` to `production` or NextJS will run in development mode, which makes pages take a long time to load.
- `OAUTH2_IDP_HOST_URL`: Required. Specify the full internal URL and port for the new Reaction Identity service. In 2.x this pointed to the API service.

New environment variables:
- `OAUTH2_PUBLIC_LOGOUT_URL`: Required. Hydra's public OpenID Connect logout URL, where the path portion is `/oauth2/sessions/logout`.
- `OAUTH2_IDP_PUBLIC_CHANGE_PASSWORD_URL`: Required. The full public URL for the change password page on Reaction Identity. The path portion should be `/account/change-password?email=EMAIL&from=FROM`. Uppercase `EMAIL` and `FROM` placeholders are replaced with the current user's email address and the current page URL.

### Admin
This project is new for Reaction 3.0.0. You need to set all of the environment variables listed in the `.env.example` file.

### Identity
This project is new for Reaction 3.0.0. You need to set all of the environment variables listed in the `.env.example` file.

## Data Versions

There are two databases involved when upgrading a Reaction 2.x environment to 3.0.0: the main MongoDB database and a Postgres SQL database used by Hydra.

### Hydra - Postgres

For Hydra, in a deployed environment your upgrade path will be something like this:
1. Stop the 2.x Hydra service
1. Run the SQL migration command provided by Hydra to ensure the database is at the proper version for the newer release of Hydra.
1. Start the 3.0.0 Hydra service pointing at the same database.

Alternatively, if you do not mind all of your users having to log in again, you can create a new database for the Reaction 3.0.0 Hydra service.

### Reaction - MongoDB

In 3.x, all 2.x migrations have been removed, and migrations no longer run automatically during startup. Also, there is a check during startup to ensure that all 2.x migrations have been run against your database. If not, the API will refuse to start.

This means that **you must upgrade to Reaction 2.9.1 and wait for all migrations to run on API startup before you can upgrade to 3.0.0+**.

There will soon be a new migration system available for 3.x, which will be a tool that you run separately to manage database migrations across your development and production environments.

## Creating the First Administrator User and Shop

On a new database, the first admin user and the primary shop are no longer auto-created when you start the API. After starting the API and Reaction Hydra services, start Reaction Admin. Then open the Reaction Admin UI in your browser, click `Register`, and register the first user yourself. Because they are the first user, they will be given `shop/create` permission and global ownership. After you're logged in, you'll see a form to create the primary shop, which you should do. At this point, both Reaction Admin and the Example Storefront should load as you would expect.

## Updating Your Custom API Plugins

See [Updating a 2.x API plugin to work with Reaction API 3.x](./devs-update-custom-plugin)

## Notes for Developers

- We highly recommend that you clone `reaction-development-platform` into a separate folder for 3.x. When you run the `git clone` command, add `reaction-development-platform3` or something similar at the end, and it will clone into a folder with that name instead of defaulting to the repo name. This way you will avoid having to change your `.env` file back and forth if you switch from 2.x to 3.x. Just run 2.x from one the `reaction-development-platform2` folder and 3.x from the `reaction-development-platform3` folder.
- Every project now has a `.nvmrc` file listing the proper expected version of NodeJS. Always run `nvm use` after you `cd` to any project directory. If prompted, run the `nvm install` command that is shown.
  - If you don't have the `nvm` command, go here to download NVM: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
  - There are [shell extensions](https://github.com/nvm-sh/nvm/blob/master/README.md#deeper-shell-integration) you can install to automatically do `nvm use` whenever you `cd` to a directory that has a `.nvmrc` file.
  - You may be thinking that all Reaction projects run in Docker for development and therefore running `nvm use` on the host machine isn't important. But because you may accidentally run `npm` commands on your host machine, and because code editor extensions sometimes run Node or NPM commands on your host machine, we find it helps avoid confusing errors if you always do it.
- Reaction API 3.x uses MongoDB 4.2 by default for development, whereas Reaction 2.x uses MongoDB 3.6 by default. Because of this, they have different volume names in the `docker-compose.yml` file. **This means that when you run Reaction 3.x you will see different data versus when you run Reaction 2.x.** However, both run on the standard port, so **you don't need to do anything differently in whatever Mongo client you use** to look at the data. Just be aware that you can't run both 2.x and 3.x at the same time, unless you manually change that port.
- Continuing from the above point, if you choose to point to a different database with your `MONGO_URL` environment variable, and that database has been used by Reaction 2.x, you will get an error unless you are at the highest migration version. (See "Migrations" in the summary table.) If you delete the "Migrations" collection, the error will go away, but you may experience other problems, especially if you did not upgrade the database to Mongo 4+.
- Using the `meteor-login-token` header to authenticate GraphQL requests is no longer supported. Refer to [Developer Concepts: Authentication](./developer-authentication) for details about how to use `@reactioncommerce/hydra-token` to get tokens for local development and testing.
