---
id: version-2.9.1-storefront-apollo-client
title: Add and configure Apollo Client
original_id: storefront-apollo-client
---

This article is part of the [Storefront UI Development Guide](./storefront-intro.md).
- Previous Task: *None*
- Next Task: [Build a product listing page](./storefront-product-listing-page.md)

To add Apollo Client to your UI app, read the [excellent Apollo docs](https://www.apollographql.com/docs/react/essentials/get-started.html). For local development, the Reaction GraphQL endpoint `uri` is `http://localhost:3000/graphql-beta`, but we recommend storing that value in app config where it can be set differently per environment.

For your test query, try this:

```js
import gql from "graphql-tag";

const testQuery = gql`{
  primaryShop {
    _id
    name
  }
}`;

client
  .query({ query: testQuery })
  .then(result => console.log(result));
```

> If it doesn't work in your storefront UI code, try it directly in the GraphQL Playground at http://localhost:3000/graphql-beta. If it works there, then check over your Apollo Client setup code again and check for any errors.

Assuming your test query works, you're ready to start building your storefront UI. You will eventually need to configure authentication, but most of a storefront UI can be built without authenticating, so we'll do that later.

Next Task: [Build a product listing page](./storefront-product-listing-page.md)
