---
id: version-2.0.0-rc.1-understanding-hydra-auth-setup
title: Understanding Hydra Auth Setup
sidebar_label: Understanding Hydra Auth Setup
original_id: understanding-hydra-auth-setup
---

Reaction Commerce uses [ORY Hydra](https://github.com/ory/hydra) (Hydra) for authentication. Hydra is an OAuth 2.0 and OpenID Connect Provider. As such, it is capable of issuing access, refresh, and ID Tokens. 

Hydra does not offer user management (it does not provide user sign up, user log in, password reset flow),
but instead uses a redirection-based flow and a REST API to connect with an existing identity provider.

We’ve setup Hydra to use our existing Meteor application as the Identity provider.
This gives us the benefits of OAuth2 and OpenID Connect while allowing us to use our existing user system.

Read more about Hydra, OAuth2 and OpenID Connect on Hydra docs [here](https://www.ory.sh/docs/guides/master/hydra/).

## OAuth 2.0 Client Setup

We’ve setup the reaction-hydra repository with a sample client creation script.
This script registers an OAuth 2.0 Client for the sample storefront ([reaction-next-starterkit](https://github.com/reactioncommerce/reaction-next-starterkit)) into Hydra.

The reaction-next-starterkit app is configured with PassportJS to initiate an OAuth flow for user signin.
For other available libraries that can be used in interacting with the OAuth server, see this [list](https://www.ory.sh/docs/guides/master/hydra/6-how-to/2-architecture#interacting-with-oauth-20).

If your OAuth client (relying party) is a Single-Page Application, consider using the Implicit flow and client-side OIDC libraries (example [repo on GitHub](https://github.com/IdentityModel/oidc-client-js)).

## Identity Provider Setup (IDP)

As mentioned above, Hydra does not provide user management. We are using our existing Meteor User Accounts system in the Reaction API app. We’ve added a `hydra-oauth` plugin that adds IDP features to the app.
This plugin enables both User Login and Consent Flows. Read more about these flows [here](https://www.ory.sh/docs/guides/master/hydra/3-overview/1-oauth2#implementing-a-login--consent-provider).

The `hydra-oauth` plugin can serve as a reference for creating extra IDP features.
Note that the Consent flow in this plugin skips showing a Consent UI because it’s built for  the storefront as a is a first-party [known and trusted] client, if your use case is different, you should have a setup that shows a Consent UI when necessary. Read more about this on Hydra [docs](https://www.ory.sh/docs/guides/master/hydra/3-overview/1-oauth2#user-consent).


## Troubleshooting Guide

* Read the Debugging guide on the [Hydra docs](https://www.ory.sh/docs/guides/master/hydra/6-how-to/4-debug)
* If you’re getting errors about your client configuration options (e.g `unknown client no client authentication included, or unsupported authentication method`), use the examples in the [Ory Examples repo on Github](https://github.com/ory/examples/tree/master/full-stack/config/hydra/clients) as reference
* To edit or delete a client configuration (in case of a wrong configuration), use the hydra CLI contained in the image to run provided commands e.g
    * `hydra clients delete $CLIENT_NAME`
    * `hydra -h` (shows full list of options)
    * You can run the commands with docker-compose as: `docker-compose run --rm -e "HYDRA_ADMIN_URL=$HYDRA_ADMIN_URL” hydra clients get $CLIENT_NAME`


## Hydra in Production
* Read the [ORY Hydra in Production Guide](https://www.ory.sh/docs/guides/master/hydra/6-how-to/1-production)
* Read the [“Securing Hydra Guide"](https://www.ory.sh/docs/guides/master/hydra/2-environment/1-securing-ory-hydra)
