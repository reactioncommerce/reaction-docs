---
id: authentication-in-prod
title: Authentication in Production
sidebar_label: Authentication in Production
---

This article focuses on the important things to consider regarding authentication when deploying Reaction Commerce. For a deeper understanding of the OAuth 2.0 flows and the Reaction services that are involved, refer to [Developer Concepts: Authentication](./developer-authentication).

All Reaction API clients (user agents) are expected to implement standard OAuth 2.0 flows to authenticate on behalf of users for GraphQL API calls. In general terms, this means "registering", "signing in", and "signing out". In technical terms, this means entering an email address and password, and being given an access token that the API understands and which identifies you as that user for a period of time.

Authentication practices, OAuth 2.0, and OpenID Connect are not specific to Reaction Commerce. As much as possible, Reaction uses out-of-the-box solutions for such things. We use an open source OAuth server called [Hydra](https://www.ory.sh/docs/hydra/) along with a MongoDB-based accounts system created by [Meteor](https://docs.meteor.com/api/accounts.html). Because these systems are not maintained by Reaction Commerce, we strongly recommend that you read their documentation and any recommendations they have about production use.

## Production Readiness Checklist

- Configure a compatible SQL database that Hydra will be able to access securely. Refer to [Database Setup and Configuration](https://www.ory.sh/docs/hydra/dependencies-environment).
- Read about [Hydra's security architecture](https://www.ory.sh/docs/hydra/security-architecture).
- Read and follow the ORY Hydra [Preparing For Production](https://www.ory.sh/docs/hydra/production) article.
- Ensure the Hydra public port is accessible from the Internet and the Hydra admin port is NOT accessible from the Internet, but IS accessible from other services on your private network.
- Generate long and random secrets and salts and set them using environment variables. Specifically `SECRETS_SYSTEM`, `OIDC_SUBJECT_IDENTIFIERS_PAIRWISE_SALT`, `OAUTH2_CLIENT_SECRET`, and `SESSION_SECRET`. Refer to [Environment Variables](./environment-variables).
- Ensure that all of your public domains are being served over HTTPS (SSL).
- Ensure `OAUTH2_EXPOSE_INTERNAL_ERRORS` environment variable is set to `false` or not set for your Hydra service.

## Troubleshooting

- Read the Hydra [Debugging](https://www.ory.sh/docs/hydra/debugging) article.
- To edit or delete a client configuration (in case of a wrong configuration), use the Hydra CLI contained in the image to run provided commands, for example:
    - `hydra clients delete $CLIENT_NAME`
    - `hydra -h` (shows full list of options)
    - You can run the commands with docker-compose as: `docker-compose run --rm -e "HYDRA_ADMIN_URL=$HYDRA_ADMIN_URL” hydra clients get $CLIENT_NAME`
