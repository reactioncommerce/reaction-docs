# Getting started with GraphQL

## Install

- Make sure you are on Reaction 1.10 and above.
- Check your current Reaction version by running: `reaction -v`

> Note: The GraphQL API is an experimental, alpha prototype. Do **not** use for production.

## Authentication

To access the GraphQL API, you need to be authenticated as an administrator via the app first:

- Start Reaction as you normally would by running `reaction`
- Open `http://localhost:3000`
- Log in as an admin user

## Your first query

To test the endpoint, run your first query to fetch the `viewer` resource with its name:

```js
{
  viewer {
    name
  }
}
```

You should see a successful response:

```js
{
  "data": {
    "viewer": {
      "name": "Reaction Commerce"
    }
  }
}
```

To also get the viewer's email addresses, run:

```js
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

You should see the email address you used to log in to this admin user's account included in the result.

## A query with a parameter

First, find your admin account's ID by using this query:

```js
{
   viewer {
      _id
   }
}
```

Then, use that `id` as a parameter in the next query for an `account`:

```js
{
   account(id: "cmVhY3Rpb24vYWNjb3VudDpaN3pTcVlHZzJNbU1wazlTRw==") {
     name
   }
}
```

## Adding and updating data with mutations

Now, we'll try making a `mutation` to update the admin user's address and the `addAccountAddressBookEntry` method:

```js
mutation {
  addAccountAddressBookEntry(input: {
    accountId: "cmVhY3Rpb24vYWNjb3VudDpaN3pTcVlHZzJNbU1wazlTRw",
    address: {
      fullName: "Reaction Documentation",
      country: "USA",
      address1: "2110 Main St."
      city: "Santa Monica",
      region: "CA",
      postal: "90405",
      isBillingDefault: true,
      isShippingDefault: true,
      isCommercial: true,
      phone: "310-123-4567"
    }
  }) {
    clientMutationId
    address {
      _id
      fullName
      address1
      phone
      region
    }
  }
}
```

Once you've added an entry successfully, check in your database or your running application app to confirm the changes were made correctly.

## More on GraphQL
- [Reaction Commerce: Running Jest Tests for GraphQL](https://docs.reactioncommerce.com/reaction-docs/master/running-jest-tests)
- [GraphQL: Introduction to GraphQL](http://graphql.org/learn/)
- [Apollo GraphQL: Bind GraphQL data](https://www.apollographql.com/client/)
