---
id: storefront-login
title: Add ability to log in
---

This article is part of the [Storefront UI Development Guide](./storefront-intro.md).
- Previous Task: [Build an order view page](./storefront-order-view-page.md)
- Next Task: [Build an account management page](./storefront-account-management.md)

See [Concepts: Accounts](./concepts-accounts.md) for background.

After you've implemented a storefront that allows anonymous shopping and checkout, you'll most likely want to add the ability to log in. For details, see [Developer Concepts: Authentication](./developer-authentication).

Actual implementation will vary depending on whether you're creating a single page app, an app with a server, a native app, or something else. For the purposes of this guide, we're just going to assume that you have an authentication flow working.

## Authenticating GraphQL requests

A successful login flow will result in your application being given an access token. You should store this access token either in a cookie or in `localStorage` such that you retain it until it expires or until the user logs out.

You then need to adjust your Apollo Client initialization code to pass the access token as the `Authorization` header with all requests. Refer to [their example code](https://www.apollographql.com/docs/react/recipes/authentication.html#Header).

## Silent reauthentication

If an access token has expired, you'll see a 401 Unauthorized response for the next GraphQL request after the expiration. Anytime you see such a response, you should first attempt to silently reauthorize the token with the identity provider server. If that fails, you should clear the access token from wherever you store it and display the UI as if they are not logged in. You may also want to show a temporary message to explain that their session has expired and they'll need to log in again.

With Apollo Client, you can use Apollo Link and code similar to the following to watch for 401 errors and attempt silent reauthentication.

```js
import { onError } from "apollo-link-error";

const STATUS_UNAUTHORIZED = 401;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    const errorCode = networkError.response && networkError.response.status;
    if (errorCode === STATUS_UNAUTHORIZED) {
      // If a 401 Unauthorized error occurred, redirect to /signin on the IDP host.
      // This will re-authenticate the user without showing a login page and a new token is issued.
      window.location = IDP_SIGN_IN_URL;
      return;
    }
    console.error("Unable to access the GraphQL API. Is it running and accessible from the Storefront UI server?");
  }
});
```

This code will work in a browser. If your UI has a server handling URL requests, the idea is similar but you'll do something like a `302` redirect with the `Location` set to the `IDP_SIGN_IN_URL`.

## Cart reconciliation

When a user logs in and every time your app loads, you must attempt to load either an anonymous cart or an account cart. The logic looks something like this:

1. If we are logged in, use the `accountCartByAccountId` GraphQL query to get the account cart.
2. Check for an anonymous cart ID and token in your persistent app state. If you find a cart there and you are not logged in, use the `anonymousCartByCartId` GraphQL query to get it.

You may find that you now have both an anonymous cart and an account cart for the current shop. This will not do. When this happens, a client is expected to reconcile the carts as soon as possible using the `reconcileCarts` mutation. Reconciliation should be quick and nearly unnoticeable to the user, but depending on your needs, you may choose to prompt the shopper to decide how to reconcile instead of guessing what they want.

`reconcileCarts` has 3 available modes: `merge`, `keepAnonymousCart`, and `keepAccountCart`.
- `merge` is the default mode, where the anonymous cart is combined with the account cart, items are deduplicated, and quantities are incremented to match the combined quantity of the items in the carts.
- `keepAnonymousCart` will keep only the items and the checkout information in the anonymous cart.
- `keepAccountCart` will keep only the items and the checkout information in the account cart.

After the server has reconciled the carts as instructed, regardless of which mode you choose, it will have deleted the anonymous cart. Only a single account cart remains. At this time you should delete the anonymous cart ID and token from persistent application state, thus “forgetting” it. If you then log out, you will have no cart for that shop until you add another item or log back in.

```graphql
mutation reconcileCartsMutation($input: ReconcileCartsInput!) {
  reconcileCarts(input: $input) {
    cart {
      ...CartFragment
    }
  }
}
```

With `input` variable similar to this:

```js
// All values come from application state or config.
// There is no need to provide the account cart ID because an account
// may only have one cart and the server will find it based on who is
// authenticated.
{
  anonymousCartId,
  anonymousCartToken,
  shopId
}
```

To avoid confusing your user, we recommend hiding all cart data and showing loading state until you've finished the full get-and-reconcile logic on app startup or login.

Next Task: [Build an account management page](./storefront-account-management.md)
