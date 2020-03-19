---
id: version-v1.12.0-graphql-intro
title: Tutorial: Getting started with GraphQL
original_id: graphql-intro
---

## Install

- Make sure you are on Reaction 1.11 and above.
- Check your current Reaction version by running: `reaction -v`

> Note: The GraphQL API is an experimental, alpha prototype. Do **not** use for production.

## Your first query

To try a simple query, open the GraphiQL interface by going to `http://localhost:3000/graphiql` in your browser.

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

The GraphiQL interface allows you to not only make queries, but also read the corresponding documentation and go through your history.

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

To authenticate, simply log in to a shop as any user in a browser tab in the same browser.

- Open `http://localhost:3000`
- Log in as an user

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
