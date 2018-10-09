---
title: How To: Get the shop ID for a client
---

Most GraphQL requests require that you pass a shop ID. If you are building a client, the first thing you'll need to do is determine the default shop ID, or another shop ID.

Our starter apps currently assume a single-shop environment, so the query to use when your app loads is very simple:

```
{
  primaryShopId
}
```

If you're building for a multi-shop environment, you may need to write your own GraphQL query to determine the correct shop ID. Or the ID can be part of your app routes. For example, if you're on a route prefixed with `/shop/:slug` in a marketplace or multi-shop scenario, you'll want to use that shop ID for most requests.

In general, there is no single answer to the question "which shop ID should I use?" Depending on what query or mutation you are calling, you should think about which shop it's for. In some of the trickier cases, the GraphQL API docs may have more information about which shop ID you should provide.
