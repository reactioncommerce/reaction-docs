---
id: graphql-developing
title: Developing the GraphQL API
---

## Extending and Modifying the GraphQL API

The GraphQL schema is written in multiple `.graphql` files, which contain type definitions in the GraphQL schema language. These files live in the plugins to which they relate, in a `schemas` folder. Refer to one of the How To articles:

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

Every plugin that extends the GraphQL schema should also have a `resolvers` folder, which should have an `index.js` file in which the default export is the full `resolvers` object. This object should be built by importing other files and folders in that directory, such that the folder and file tree looks the same as the `resolvers` object tree.

For example, there are typically folders named `Mutation` and `Query`. In the `accounts` plugin there is also an `Account` folder, where resolvers for that type live. You may choose either folders or single files, depending on how many resolvers there are and how complex they are.

The `resolvers` object for each plugin is deep merged with all the `resolvers` exported by all the other plugins, and the result is the full resolver function tree.

## Resolver Mutations and Queries vs. Plugin Mutations and Queries

The path a GraphQL query or mutation takes is first to a resolver function, which then calls a query or mutation function provided by one of the plugins. It’s important to understand what happens in each.

The resolver function:
- Lives in `resolvers` in a plugin folder
- Returns a Promise (is async)
- Transforms IDs (see [IDs in GraphQL](#ids-in-graphql)) and data structures (where they don’t match internal data structures)
- May pull things from the GraphQL context to pass to the plugin function
- May throw a `ReactionError` if anything goes wrong
- Includes `clientMutationId` in the response (for mutations only)

The plugin function:
- Lives in `queries` or `mutations` in a plugin folder
- Is available on the GraphQL context in `context.queries` or `context.mutations`, and as such can be called by code elsewhere in the app
- Returns a Promise (is async)
- Does all permission checks
- May throw a `ReactionError` if anything goes wrong
- Performs the actual database mutations or queries

TIP: If you’re confused about where to draw the line, imagine what would have to change if we decided to add a REST API. All of that stuff goes in the resolver, while everything that would be shared between GraphQL and REST goes in the plugin function.

## The Endpoint

The GraphQL server and `/graphql` endpoint is configured and returned by the `createApolloServer` function, which is called from the `ReactionAPI` class instance.

`createApolloServer` does pretty standard configuration of an Express app using `apollo-server-express`. The main things it does are:
- Checks the identity token using Express middleware
- Builds the `context` object that’s available in all resolver functions. See [The Reaction GraphQL Context](#the-reaction-graphql-context)
- Formats the `errors` array that is returned to clients, to make errors as helpful as possible
- Provides the merged GraphQL schema
- Sets the path as `/graphql` and exposes a GraphQL Playground for GET requests on `/graphql`

## The Reaction GraphQL Context

All GraphQL resolvers receive a [context](https://www.apollographql.com/docs/apollo-server/essentials/data.html#context) object as their third argument. The base context is built within the `ReactionAPI` constructor, and additional request-specific properties (like `accountId` and `userHasPermission`) are added to it in `buildContext.js`.

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
- To check permissions and throw error: `context.checkPermissions(role, shopId)`
- MongoDB collections: `context.collections[CollectionName]`
- The `ReactionAPI` instance: `context.app`
- App events object:
    - To emit: `context.appEvents.emit`
    - To listen: `context.appEvents.on`
- To retrieve all functions registered as a specific type of function: `context.getFunctionsOfType(type)`
- The app root URL: `context.rootUrl`
- To convert a relative URL to absolute (prefix with the root URL): `context.getAbsoluteUrl(path)`

## How Auth Works

Refer to [Developer Concepts: Authentication](./developer-authentication)

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

To convert internal IDs to opaque UUIDs, we first prefix them with "reaction/\<namespace\>" and then base64 encode them. The primary transformation functions that handle this are in the `api-utils` package.

The GraphQL resolver functions are the place where ID encoding and decoding happens. They then call out to plugin functions that deal exclusively with internal IDs. Any IDs returned by such functions must also be transformed before returning them, although this typically and preferably happens in a type resolver.

## Using MongoDB in GraphQL

The source-of-truth database for most data used by GraphQL resolvers is currently MongoDB. The MongoDB Node driver collections API is documented here: http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html

All collections registered by any plugin are available on the `context` object as `context.collections`.

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
