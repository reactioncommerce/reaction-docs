---
id: version-2.9.1-graphql-developing
title: Developing the GraphQL API
original_id: graphql-developing
---

## Extending and Modifying the GraphQL API

The GraphQL schema is written in multiple `.graphql` files, which contain type definitions in the GraphQL schema language. These files live in the plugins to which they relate, in a `server/no-meteor/schemas` folder. Refer to one of the How To articles:

- [How To: Create a new GraphQL query](./graphql-create-query.md)
- [How To: Create a new GraphQL mutation](./graphql-create-mutation.md)

## Documenting a GraphQL Schema

Every type, input type, enum, query, mutation, and field must have documentation. Add a description using a string literal immediately above the thing you are documenting in the `.graphql` file. <strong>This is the official API documentation, so take the time to make it clear, well-formatted, and with no spelling or grammar errors.</strong>

Tips:
- For `_id`, `clientMutationId` and anything else that appears in multiple places, copy the documentation from elsewhere so that everything matches.
- There is often a `type` and a related `input` type. If the field names match, their documentation should also be identical or very similar.

External references:
- [GraphQL "description" spec](https://facebook.github.io/graphql/draft/#sec-Documentation)
- [Apollo Server: Documenting Your Schema](https://www.apollographql.com/docs/apollo-server/v2/essentials/schema.html#documentation)

## Where Resolvers are Defined

Every plugin that extends the GraphQL schema should also have a `server/no-meteor/resolvers` folder, which should have an `index.js` file in which the default export is the full `resolvers` object. This object should be built by importing other files and folders in that directory, such that the folder and file tree looks the same as the `resolvers` object tree.

For example, there are typically folders named `Mutation` and `Query`. In the `accounts` plugin there is also an `Account` folder, where resolvers for that type live. You may choose either folders or single files, depending on how many resolvers there are and how complex they are.

The `resolvers` object for each plugin is deep merged with all the `resolvers` exported by all the other plugins, and the result is the full resolver function tree.

## Resolver Mutations and Queries vs. Plugin Mutations and Queries

The path a GraphQL query or mutation takes is first to a resolver function, which then calls a query or mutation function provided by one of the plugins. It’s important to understand what happens in each.

The resolver function:
- Lives in `server/no-meteor/resolvers` in a plugin folder
- Returns a Promise (is async)
- Transforms IDs (see [IDs in GraphQL](#ids-in-graphql)) and data structures (where they don’t match internal data structures)
- May pull things from the GraphQL context to pass to the plugin function
- May throw a `ReactionError` if anything goes wrong
- Includes `clientMutationId` in the response (for mutations only)

The plugin function:
- Lives in `server/no-meteor/queries` or `server/no-meteor/mutations` in a plugin folder
- Is available on the GraphQL context in `context.queries` or `context.mutations`, and as such can be called by code elsewhere in the app
- Returns a Promise (is async)
- Does all permission checks
- May throw a `ReactionError` if anything goes wrong
- Performs the actual database mutations or queries

Note that while we are transitioning off Meteor, some Meteor methods may wrap the same plugin query and mutation functions.

TIP: If you’re confused about where to draw the line, imagine what would have to change if we decided to add a REST API. All of that stuff goes in the resolver, while everything that would be shared between GraphQL and REST goes in the plugin function.

## The Endpoint

The GraphQL server and `/graphql-beta` endpoint is configured and returned by the `createApolloServer` function, which is called from the `ReactionNodeApp` class and the `TestApp` class for Jest integration tests.

Newer Reaction code runs within a single `ReactionNodeApp` instance, which is created by Meteor code during app startup. For development and testing purposes, it's also possible to run Reaction as a pure Node app, which also initializes a single `ReactionNodeApp` instance, but without a Meteor context available.

`createApolloServer` does pretty standard configuration of an Express app using `apollo-server-express`. The main things it does are:
- Checks the identity token using Express middleware
- Builds the `context` object that’s available in all resolver functions. See [The Reaction GraphQL Context](#the-reaction-graphql-context)
- Formats the `errors` array that is returned to clients, to make errors as helpful as possible
- Provides the merged GraphQL schema
- Sets the path as `/graphql-beta` and exposes a GraphQL Playground for GET requests on `/graphql-beta`

## The Reaction GraphQL Context

All GraphQL resolvers receive a [context](https://www.apollographql.com/docs/apollo-server/setup.html#graphqlOptions.context) object as their third argument. The base context is built within the `ReactionNodeApp` constructor, and additional request-specific properties (like `accountId` and `userHasPermission`) are added to it in `/imports/node-app/core/util/buildContext.js`.

If you call a function that needs the context object, and you’re calling from within a Meteor method or publication, you can build it like this:

```js
// At the top of the file
import getGraphQLContextInMeteorMethod from “/imports/plugins/core/graphql/server/getGraphQLContextInMeteorMethod”;

// Within a Meteor method function
const context = Promise.await(getGraphQLContextInMeteorMethod(Reaction.getUserId()));
```

In Jest tests, you can get a mock context object with mock functions on it:

```js
import mockContext from "/imports/test-utils/helpers/mockContext";
```

Here’s what's on the context object:
- Queries registered by plugins: `context.queries[queryFunctionName]`
- Mutations registered by plugins: `context.mutations[mutationFunctionName]`
- The current user: `context.user`
- The current user’s ID: `context.userId`
- The current account: `context.account`
- The current account ID: `context.accountId`
- The default shop ID (this may go away): `context.shopId`
- To check permissions: `context.userHasPermission(role, shopId)` (returns true or false)
- MongoDB collections (NOT Meteor collections): `context.collections[CollectionName]`
- A function to call a Meteor method: `context.callMeteorMethod` This is a no-op if running in the pure Node "devserver" app.
- The `ReactionNodeApp` instance: `context.app`
- App events object:
    - To emit: `context.appEvents.emit`
    - To listen: `context.appEvents.on`
- To retrieve all functions registered as a specific type of function: `context.getFunctionsOfType(type)`
- The app root URL: `context.rootUrl`
- To convert a relative URL to absolute (prefix with the root URL): `context.getAbsoluteUrl(path)`

## How Auth Works

Although we plan to change this in the future, currently we use Meteor's accounts packages, which rely on tokens stored in the `users` collection for authentication.

For the GraphQL endpoint, we have an Express middleware function that looks for a "meteor-login-token" HTTP header and tries to resolve that to a certain user record.
- If the header isn't present, the request continues unauthenticated
- If the header is present but no user has that token or that token is expired, the middleware terminates the request with a 401 status code.
- If the header is present and the token is valid, the request continues and `req.user` is set to the authenticated user document. This is then copied to the GraphQL context object and the user’s account is looked up, giving you access to `context.user`, `context.userId`, `context.account`, `context.accountId`, and `context.userHasPermission`.

## IDs in GraphQL

All IDs are exposed in GraphQL as globally unique IDs on fields named `_id`. When we finalize the GraphQL API, we may change this field name to `id`, which is more commonly used in the GraphQL world.

The GraphQL server specification has no opinion on what a type's ID field should look like, but it does provide [a built-in ID type](https://graphql.github.io/graphql-spec/draft/#sec-ID).

> The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, it is not intended to be human‐readable. While it is often numeric, it should always serialize as a String.

In particular, note that "it is not intended to be human‐readable". You should never display a field of type `ID` anywhere. They are only for references. If your data comes over from another system and has IDs with some meaning, then you should also store them on a different field where the raw value will not be obfuscated by the GraphQL layer.

Note also that the server specification does not necessarily care whether an ID is globally unique. However, we intend compatibility with both Relay and Apollo for client-side frameworks, and [the Relay specification](https://facebook.github.io/relay/graphql/objectidentification.htm#sec-Node-Interface) does have a requirement here:

> This `id` should be a globally unique identifier for this object, and given just this `id`, the server should be able to refetch the object.

Additionally, the [Apollo caching docs](https://www.apollographql.com/docs/react/advanced/caching/#normalization) have this to say:

> By default, InMemoryCache will attempt to use the commonly found primary keys of `id` and `_id` for the unique identifier if they exist

This does not specifically require global uniqueness since it also uses `__typename`, but because Relay does, we've opted to ensure IDs are globally unique.

In most cases, actual internal data IDs are in MongoDB collections, so they are guaranteed unique within the collection, but not among all collections. To add that extra layer of uniqueness, we concatenate the namespace with the internal ID, and then to keep it looking like a "not human‐readable" ID, we base64 encode.

To convert internal IDs to opaque UUIDs, we first prefix them with "reaction/\<namespace\>" and then base64 encode them. The primary transformation functions that handle this are in `/imports/plugins/core/graphql/server/no-meteor/resolvers/xforms/id.js`, but there are namespace-specific utility functions in that `xforms` folder that are usually a better choice.

The GraphQL resolver functions are the place where ID encoding and decoding happens. They then call out to plugin functions that deal exclusively with internal IDs. Any IDs returned by such functions must also be transformed before returning them, although this typically and preferably happens in a type resolver.

## Using MongoDB in GraphQL

The source-of-truth database for most data used by GraphQL resolvers is currently MongoDB. The resolvers and all plugin and utility functions that they call must be written without any Meteor dependencies. (We are slowly removing Meteor from the app.) Therefore, you should be aware of the differences between Meteor collections and MongoDB Node driver (i.e., raw) collections.

- Meteor collections API is documented here: https://docs.meteor.com/api/collections.html
- MongoDB Node driver collections API is documented here: http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html

To import Meteor collections in Meteor code:

```js
import * as collections from "/lib/collections";
```

If you have a Meteor collection and are in Meteor code, you can access the raw Node driver collection with `MyCollection.rawCollection()`.

To import raw collections directly (either in Meteor code or in non-Meteor code):

```js
import collections from "/imports/collections/rawCollections";
```

However, most non-Meteor code should be using the functional approach of having the raw `collections` object passed in to it as an argument. In the case of GraphQL resolver functions, it is available on the `context` object as `context.collections`.

### Meteor Collections vs. Node Collections

Here are a few of the main differences between Meteor and Node collections:
- Meteor allows you to pass a string ID as a selector, whereas the Node collection requires `{ _id: id }`
- In Meteor, you call `.fetch()` on a cursor to get an array. In Node, you call `.toArray()` and `await` it.
- In Meteor, there is a `find` option called `fields`. In Node, it’s called `projection` but is otherwise the same.
- In Meteor, you can call `.map` or `.forEach` directly on a cursor. In Node, you must call and await `.toArray()` first.
- In Meteor, you can use `insert`, `update`, and `remove` methods. In Node, those methods are deprecated so you should use `insertOne`, `insertMany`, `updateOne`, `updateMany`, `deleteOne`, or `deleteMany`. And you must `await` them.
- In Meteor, there is an `upsert` method. In Node, you pass `upsert: true` option to the `update` method.
- The return values of the mutation methods are different. See the documentation for each.

### Checking whether an operation was successful

For `insertOne` or `insertMany`:

```js
const { insertedCount } = await SomeCollection.insertOne(/* ... */);
if (insertedCount === 0) {
  // throw Error or otherwise handle failure
}
```

For `updateOne` or `updateMany`:

```js
const { modifiedCount } = await SomeCollection.updateOne(/* ... */);
if (modifiedCount === 0) {
  // throw Error or otherwise handle failure
}
```

For `deleteOne`:

```js
const { deletedCount } = await SomeCollection.updateOne(/* ... */);
if (deletedCount === 0) {
  // throw Error or otherwise handle failure
}
```

Keep in mind that sometimes a zero `modifiedCount` or `deletedCount` might be because nothing matched your query, and depending on the situation, this may not be an error. If you foresee this situation, you can opt to check `matchedCount` instead.

## Optimizing GraphQL resolvers

Because of the way GraphQL queries and relationships work, sometimes a query will include something like this:

```graphql
{
  order {
    shop {
      _id
    }
  }
}
```

Normally the `shop` relationship would result in a database query, but if `order` already has a `shopId` property, we can actually skip the database lookup because the client has requested only the `_id` property. There is a utility function that helps with this: `optimizeIdOnly`. Check out the `Query.viewer` resolver for an example of how to use it.

## Documenting GraphQL Functions

Reaction GraphQL resolver functions, like all JavaScript functions in all Reaction code, must have JSDoc comments above them. See the [JSDoc Style Guide](jsdoc-style-guide.md)

## Writing Tests

Reaction GraphQL is tested through a combination of unit tests and integration tests, all written in and executed with Jest. Specifically, the coverage requirements are:

- Each query or mutation function in plugins must have unit tests in a `.test.js` file alongside the file being tested.
- Each resolver that is doing anything more than just referencing another function must have a unit test in a `.test.js` file alongside the file being tested.
- The primary expected uses of all queries and mutations must be tested in integration tests in the `/tests` root folder. This helps ensure that all of the related resolvers are working together properly and using correct database calls.

Refer to [Writing Jest Unit Tests](writing-jest-unit-tests) and [Writing Jest Integration Tests](writing-jest-integration-tests)
