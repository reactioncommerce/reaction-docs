---
id: version-3.0.0-developer-authentication
title: Developer Concepts: Authentication
sidebar_label: Authentication
original_id: developer-authentication
---

All Reaction API servers authenticate users and clients using OAuth 2.0. This is done through a [Hydra](https://www.ory.sh/docs/hydra/) service and another service called Reaction Identity, which is what is referred to in auth-speak as an "identity provider".

## API

In an API service, the authentication process is pretty simple. It is implemented as an Express middleware function that does the following:
- Check whether an HTTP request includes an "Authorization" header.
- If it does, assume the value of that header is an OAuth access token issued by Hydra.
- Send the access token to the Hydra service directly across the Docker network.
- If the token is valid (exists and isn't expired), receive back a user ID from Hydra. Look up the user with that user ID in MongoDB (`users` collection) and attach the user document to the request.
- If the token is invalid, send a "401 Unauthorized" response.

This all is implemented in a small built-in plugin called "authentication".

### How to Get an Access Token for Development

For development purposes, you'll want to try out GraphQL requests in GraphQL Playground or another GraphQL client. The normal way of getting OAuth access tokens is by going through an OAuth flow from a browser or native client, but this is a lot of extra work when you just want to test some requests on your local computer.

To obtain an access token for local testing purposes, install the [@reactioncommerce/hydra-token](https://github.com/reactioncommerce/hydra-token) CLI globally on your development computer.

```
npm install -g @reactioncommerce/hydra-token
```

Now whenever you need a token, verify that you have the Hydra service running in Docker and then run the following command:

```
hydra-token get <userId>
```

Substitute a real user ID, which is the internal user ID you see in the `_id` field in the MongoDB `users` collection.

An access token is printed, which you can then copy and paste into the "Authorization" header for your GraphQL request.

NOTE: The token will last only 1 hour with default Hydra configuration, and then you'll need to obtain a new one.

Refer to the [@reactioncommerce/hydra-token](https://github.com/reactioncommerce/hydra-token) documentation for more details.

The rest of this article explains how the normal OAuth flow from a client works.

## Hydra

The Hydra service is not in any way customized for Reaction. It is a standard Docker image that is configured using environment variables to communicate with several HTTP endpoints on the Reaction Identity service. This means you can learn everything you need to know about Hydra by reading [their documentation](https://www.ory.sh/docs/hydra/).

[Hydra REST API Reference](https://www.ory.sh/docs/hydra/sdk/api)

### Hydra Clients

Every client application (e.g., web storefront, web admin, mobile app) will need a unique client name for its Hydra requests, and you will need to create that client using the Hydra admin API. Reaction projects that have a server do this automatically on startup, but if you create your own single-page static app, you will need to do it manually and then embed the client name into the app code.

If your OAuth client, the relying party, is a Single-Page Application, consider using the implicit flow and client-side OpenID Connect libraries (example [repo on GitHub](https://github.com/IdentityModel/oidc-client-js)).

## Reaction Identity

Reaction Identity is a small Meteor service that takes Meteor's [accounts packages](https://docs.meteor.com/api/accounts.html) and adds OAuth 2.0 endpoints that are compatible with Hydra. It serves both the UI pages (for login, register, reset password, change password, etc.) and the OAuth 2.0 endpoints. There is not much specific to Reaction here. You could feasibly use Reaction Identity + Hydra with minor changes to implement user accounts for any project.

Reaction Identity implements User Login, Consent, and Logout flows. Read more about these flows [here](https://www.ory.sh/docs/hydra/implementing-consent).

Note that the Consent flow skips showing a Consent UI because it’s built for the storefront as a first-party (known and trusted) client. If your use case is different, you will need to customize Reaction Identity UI code to show a Consent UI when necessary. Read more about this on Hydra [docs](https://www.ory.sh/docs/guides/master/hydra/3-overview/1-oauth2#user-consent).

## Registration Flow

The following is the OAuth 2.0 registration flow from any Reaction client. It is nearly identical to the login flow except that the user is taken to the registration form on Reaction Identity instead of the login form.

1. Click Register.
2. Start OAuth 2.0 authentication flow by redirecting to the Hydra endpoint with the additional parameter `loginAction=signup`.
3. Hydra redirects to /login on Reaction Identity with a `login_challenge` query string parameter as well as the `loginAction=signup` parameter passed through.
4. The Reaction Identity /login handler communicates with the Hydra service over the internal network to request more details about the login request using the provided `login_challenge` value.
5. If Hydra has indicated that it is already able to authenticate the user (i.e., they were already signed in), then the /login handler immediately accepts the login request. Otherwise, based on the `loginAction` parameter being "signup", it redirects to `/account/enroll` on Reaction Identity and passes along the `login_challenge` parameter. `/account/enroll` is an HTML route that displays a user account registration form.
6. After the user fills out the registration form, they click Register. Browser code call `Accounts.createUser({ email, password })`, part of the Meteor Accounts API, to create the new user. If this is successful, they are now logged in on the Reaction Identity app (in Meteor) but the OAuth 2.0 flow is not yet complete.
7. Browser code now calls the `oauth/login` Meteor method over DDP, which uses the original `login_challenge` to now accept the login request. When accepting the request, Hydra provides a redirect URI based on which client started the whole request.
8. The redirect URI is passed back to the Reaction Identity browser code, which does a client-side redirect. The user is now back on the page they were on when they clicked Register in step one, except now they have a valid access token and are therefore "logged in" to make API requests.

## Sign In Flow

The following is the OAuth 2.0 login flow from any Reaction client. It is nearly identical to the registration flow except that the user is taken to the login form on Reaction Identity instead of the registration form.

1. Click Sign In.
2. Start OAuth 2.0 authentication flow by redirecting to the Hydra endpoint with the additional parameter `loginAction=signin`.
3. Hydra redirects to /login on Reaction Identity with a `login_challenge` query string parameter as well as the `loginAction=signin` parameter passed through.
4. The Reaction Identity /login handler communicates with the Hydra service over the internal network to request more details about the login request using the provided `login_challenge` value.
5. If Hydra has indicated that it is already able to authenticate the user (i.e., they were already signed in), then the /login handler immediately accepts the login request. Otherwise, based on the `loginAction` parameter being "signin", it redirects to `/account/login` on Reaction Identity and passes along the `login_challenge` parameter. `/account/login` is an HTML route that displays a user account sign in form.
6. After the user fills out their email address and password, they click Sign In. Browser code call `Meteor.loginWithPassword(email, password)`, part of the Meteor Accounts API, to authenticate the user. If this is successful, they are now logged in on the Reaction Identity app (in Meteor) but the OAuth 2.0 flow is not yet complete.
7. Browser code now calls the `oauth/login` Meteor method over DDP, which uses the original `login_challenge` to now accept the login request. When accepting the request, Hydra provides a redirect URI based on which client started the whole request.
8. The redirect URI is passed back to the Reaction Identity browser code, which does a client-side redirect. The user is now back on the page they were on when they clicked Sign In in step one, except now they have a valid access token and are therefore "logged in" to make API requests.

## Sign Out Flow

1. Click Sign Out.
2. Log out the local server session.
3. Start OpenID logout flow by redirecting to the Hydra logout endpoint. The `id_token` must be included in the URL query string. This is received during the auth flow and must be cached in the session cookie.
4. Hydra redirects to `/logout` on Reaction Identity, which automatically accepts the logout request. The Meteor account on Reaction Identity should already be logged out because we do not stay logged in.
5. Reaction Identity now redirects back to the logout callback URL on the OAuth client, which can redirect to the same page the user was on when they clicked Sign Out.

## Change Password Flow

NOTE: This is not a standard OAuth 2.0 flow.

1. Click Change Password.
2. Redirect to `/account/change-password` on the Reaction Identity public domain. Include `email` query string parameter to auto-fill the Email field. Include `from` query string parameter to specify the URL you want to redirect to after the password is changed.
3. On Reaction Identity, `/account/change-password` is an HTML route that displays a user account change password form.
4. After the user fills out their email address, old password, and new password, they click Change Password. Browser code calls `Meteor.loginWithPassword(email, password)`, part of the Meteor Accounts API, to authenticate the user. If this is successful, it then calls `Accounts.changePassword(oldPassword, newPassword)`. Finally, it logs out of Meteor Accounts.
5. Browser code now redirects to the `from` query string parameter value if one was provided.

## Reset Password Flow

1. After clicking Sign In and being redirected to Reaction Identity, there is a Forgot Password button. The user clicks this.
2. User enters their email address and submits the form.
3. Reaction Identity calls the public `sendResetAccountPasswordEmail` GraphQL mutation on the Reaction API. This generates a temporary password reset token and emails it using the email template defined for this type of email. The link in the email is the `REACTION_IDENTITY_PUBLIC_PASSWORD_RESET_URL` API environment variable with `TOKEN` placeholder replaced with the real token.
4. User clicks the link in the email, which takes them to the `ResetPassword` form on Reaction Identity, which grabs the reset token from the URL.
5. After the user enters their new password, they click Set Password. Browser code calls `Accounts.resetPassword(token, password)`, part of the Meteor Accounts API. If this is successful, it logs out of Meteor Accounts and shows a success message to the user.
6. The user can now finish the OAuth login flow.
