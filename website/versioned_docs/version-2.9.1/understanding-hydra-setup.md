---
id: version-2.9.1-understanding-hydra-auth-setup
title: Understanding Hydra Auth Setup
sidebar_label: Understanding Hydra Auth Setup
original_id: understanding-hydra-auth-setup
---

As of version 2.0, Reaction Commerce uses [ORY Hydra](https://github.com/ory/hydra) (Hydra), an OAuth 2.0 and Open ID Connect Provider, for authentication across the `reaction` and `example-storefront` apps.

Hydra issues access, refresh, and ID Tokens, but does not offer user management (like user sign up, log in, password reset flows). Instead, Hydra uses redirects and a REST API to connect with an existing identity provider.

The Reaction implementation sets up Hydra to use our existing Meteor application as the Identity provider. This gives us the benefits of OAuth2 and OpenID Connect, while allowing us to use our existing user system.

At a high level, when a user of the storefront logs in, the user is redirected from the storefront to Hydra, and then to the Identity provider, in this case, the Reaction API. When the authentication is complete on the Reaction app, Hydra handles the redirects between the Reaction app to the Storefront. From the user interface perspective, the authentication process is seamless across the application.

Read more about Hydra, OAuth2 and OpenID Connect on Hydra docs [here](https://www.ory.sh/docs/guides/master/hydra/).

To get started with [`reaction-hydra`](https://github.com/reactioncommerce/reaction-hydra), make sure you have upgraded to Reaction version 2.0. The easiest way to install and run all the application is to use [`reaction-development-platform`](https://github.com/reactioncommerce/reaction-development-platform).

## Setting up the client

The [`reaction-hydra`](https://github.com/reactioncommerce/reaction-hydra) repository is set up with a [sample client creation script](https://github.com/reactioncommerce/reaction-hydra/blob/master/bin/create-clients.sh). This script registers an OAuth 2.0 Client for the sample storefront ([`example-storefront`](https://github.com/reactioncommerce/example-storefront)) into Hydra.

The [`example-storefront`](https://github.com/reactioncommerce/example-storefront/) is configured with [Passport.js](http://www.passportjs.org/) to initiate an OAuth flow for user signin. See the [`server.js`](https://github.com/reactioncommerce/example-storefront/blob/v0.1.0/src/server.js) file for configuration details. For other available libraries that can be used in interacting with the OAuth server, see this [list](https://www.ory.sh/docs/guides/master/hydra/6-how-to/2-architecture#interacting-with-oauth-20).

If your OAuth client, the relying party, is a Single-Page Application, consider using the implicit flow and client-side OpenID Connect libraries (example [repo on GitHub](https://github.com/IdentityModel/oidc-client-js)).

## Setting up the Identity Provider (IDP)

As mentioned above, Hydra does not provide user management. Reaction uses the existing Meteor User Accounts system in the Reaction API app. The [`hydra-oauth`](https://github.com/reactioncommerce/reaction/tree/v2.0.0-rc.3/imports/plugins/core/hydra-oauth) core plugin in [`reaction`](https://github.com/reactioncommerce/reaction/) adds IDP features to the app.

This plugin enables both User Login and Consent Flows. Read more about these flows [here](https://www.ory.sh/docs/guides/master/hydra/3-overview/1-oauth2#implementing-a-login--consent-provider).

Note that the Consent flow in this plugin skips showing a Consent UI because it’s built for the storefront as a first-party [known and trusted] client. If your use case is different, you should have a setup that shows a Consent UI when necessary. Read more about this on Hydra [docs](https://www.ory.sh/docs/guides/master/hydra/3-overview/1-oauth2#user-consent).

This plugin can serve as a reference to create extra IDP features.

## Customizing the interface

The [`hydra-oauth`](https://github.com/reactioncommerce/reaction/tree/v2.0.0-rc.3/imports/plugins/core/hydra-oauth) also provides the React component for the log in user interface. To change basic colors and typography, use the CSS styles applied in [`templates.html`](https://github.com/reactioncommerce/reaction/blob/v2.0.0-rc.3/imports/plugins/core/hydra-oauth/client/templates.html). To use your own login form and add different user interactions, look at the React template in the [`client`](https://github.com/reactioncommerce/reaction/tree/v2.0.0-rc.3/imports/plugins/core/hydra-oauth/client) and replace the component with your own using the Reaction [`replaceComponent`](components-api#replacing-components) API.

## Troubleshooting Guide

* Read the Debugging guide on the [Hydra docs](https://www.ory.sh/docs/guides/master/hydra/6-how-to/4-debug)
* If you’re getting errors about your client configuration options (e.g `unknown client no client authentication included, or unsupported authentication method`), use the examples in the [ORY Examples repo on Github](https://github.com/ory/examples/tree/master/full-stack/config/hydra/clients) as reference
* To edit or delete a client configuration (in case of a wrong configuration), use the Hydra CLI contained in the image to run provided commands e.g
    * `hydra clients delete $CLIENT_NAME`
    * `hydra -h` (shows full list of options)
    * You can run the commands with docker-compose as: `docker-compose run --rm -e "HYDRA_ADMIN_URL=$HYDRA_ADMIN_URL” hydra clients get $CLIENT_NAME`

## Hydra in Production
* Read the [ORY Hydra in Production Guide](https://www.ory.sh/docs/guides/master/hydra/6-how-to/1-production)
* Read the [“Securing Hydra Guide"](https://www.ory.sh/docs/guides/master/hydra/2-environment/1-securing-ory-hydra)
