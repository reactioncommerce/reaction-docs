---
id: version-3.0.0-graphql-intro
title: Tutorial: Getting started with GraphQL
original_id: graphql-intro
---

## Install

To install Reaction for development, testing, or demonstration on your own computer, follow these [Reaction Development Platform instructions](https://github.com/reactioncommerce/reaction-development-platform/tree/v3.0.0#prerequisites).

Make sure you are on Reaction 3.0.0 or above.

## Your first query

To try a simple query, open the GraphQL Playground interface by going to `http://localhost:3000/graphql` in your browser. This is the same URL that handles GraphQL POST requests, but for GET requests it serves GraphQL Playground.

In the left-hand query box, enter the following:

```graphql
{
  primaryShopId
}
```

You should see a successful response:

```graphql
{
  "data": {
    "primaryShopId": "cmVhY3Rpb24vc2hvcDpKOEJocTN1VHRkZ3daeDNyeg=="
  }
}
```

GraphQL Playground allows you to not only make queries, but also read the corresponding documentation and go through your history.

## Your first authenticated query

While some queries, such as `primaryShopId`, do not require being logged in, other queries do require authentication and may either error or return different results depending on your authentication and authorization status.

For example, let's fetch the `viewer`'s name, without logging in:

```graphql
{
  viewer {
    name
  }
}
```

You will not get any data:

```graphql
{
  "data": {
    "viewer": {
      "name": null
    }
  }
}
```

To authenticate, you'll need an access token. Follow the instructions in [How to Get an Access Token for Development](./developer-authentication#how-to-get-an-access-token-for-development).

Copy the access token. Expand the `HTTP HEADERS` box in the bottom left corner of GraphQL Playground, and add the token header:

```json
{
    "Authorization": "J_oKS8T8rHrr_7b-6c46MBEusEWJWI9oOh8QF6xvWp4.NQQ5suMcDxMj-IsGE7BxSzOXzgfmMnkzbjA2x1RoZ50"
}
```

Click the Play button to replay the `viewer` query again:

```graphql
{
  "data": {
    "viewer": {
      "name": "Reaction User"
    }
  }
}
```

To also get the viewer's email addresses, run:

```graphql
{
  viewer {
  	name
    emailRecords {
      provides
      address
      verified
    }
	}
}
```

You should see the email address you used to log in to this user's account included in the result.

## A query with a parameter

First, find your viewer account's ID by using this query:

```graphql
{
   viewer {
      _id
   }
}
```

Then, copy the `id` and pass it in as a parameter in the next query for an `account`:

```graphql
{
   account(id: "cmVhY3Rpb24vYWNjb3VudDpaN3pTcVlHZzJNbU1wazlTRw==") {
     name
   }
}
```

## Adding and updating data with mutations

Now, we'll try making a `mutation` to update a user's currency code with the `setAccountProfileCurrency` method.

Pass in the `accountId` and `currencyCode`  as inputs to the mutation:

```graphql
mutation {
  setAccountProfileCurrency(input: {
    accountId: "cmVhY3Rpb24vYWNjb3VudDpaN3pTcVlHZzJNbU1wazlTRw==",
    currencyCode: "EUR"
  })
}
```

To confirm that the mutation changed the currency as expected, you can query the viewer's currency code with:

```graphql
{
  viewer {
    currency {
      code
    }
  }
}
```

Once you've changed an entry successfully, check in your database or your running application to confirm the changes were made correctly.

## More on GraphQL
- [Reaction Commerce: Running Jest Tests for GraphQL](https://docs.reactioncommerce.com/reaction-docs/trunk/running-jest-tests)
- [GraphQL: Introduction to GraphQL](http://graphql.org/learn/)
- [Apollo GraphQL: Bind GraphQL data](https://www.apollographql.com/client/)
