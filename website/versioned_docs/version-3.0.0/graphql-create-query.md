---
id: version-3.0.0-graphql-create-query
title: How To: Create a new GraphQL query
original_id: graphql-create-query
---

## Step 1: Identify which plugin owns the query

The complete Reaction Commerce GraphQL API is created by stitching together domain-specific APIs from all of the API plugins. So when adding a new query, the first step is to decide which plugin should own it. This is usually obvious, but not always. You should think about whether any other plugins or services will need to call your query. If the query is fundamental to the system, then it may need to go in the "core" plugin, if no better alternative exists.

## Step 2: Understand the difference between a plugin query function and a GraphQL query resolver

See [Resolver Mutations and Queries vs. Plugin Mutations and Queries](graphql-developing.md#resolver-mutations-and-queries-vs-plugin-mutations-and-queries)

## Step 3: Name the query

When choosing a name for the query, there are a few rules to follow:
- In keeping with general GraphQL best practices, do not use verbs such as "list", "get", or "find" at the beginning of your query name. For example, use "cart" instead of "getCart" and "carts" instead of "listCarts".
- Prefix with adjectives as necessary to fully describe what the query returns. For example, "anonymousCart" and "accountCart" queries.
- If there are similar queries that take slightly different parameters, add a suffix to clarify. In most cases, we begin the suffix with "By". For example, "accountCartById" and "accountCartByAccountId".

## Step 4: Define the query in the schema

1. If it doesn't already exist, create `schemas` folder in the plugin, and add an `index.js` file there.
1. If it doesn't already exist, create `schema.graphql` in `schemas` in the plugin.
1. Import the GraphQL file into `index.js` and default export it in an array:

    ```js
    import importAsString from "@reactioncommerce/api-utils/importAsString.js";

    const schema = importAsString("./schema.graphql");

    export default [schema];
    ```

    > NOTE: For large plugins, you can split to multiple `.graphql` files and export a multi-item array.

1. In the `.graphql` file, add your query within `extend type Query { }`. Add an `extend type Query` section near the top if the file doesn't have it yet.
1. If your query returns multiple documents, it should return a Relay-compatible Connection and accept standard connection arguments. This is true of any `fields` on any types you create as well.

    Example: `groups(after: ConnectionCursor, before: ConnectionCursor, first: ConnectionLimitInt, last: ConnectionLimitInt, sortOrder: SortOrder = asc, sortBy: GroupSortByField = createdAt): GroupConnection`

1. Document your query, the new types, and all fields in those types using string literals. See [Documenting a GraphQL Schema](./graphql-developing#documenting-a-graphql-schema).
1. If not already done, register your schemas in the plugin's `index.js` file:

    ```js
    import schemas from "./schemas";

    export default async function register(app) {
      await app.registerPlugin({
        graphQL: {
          schemas
        },
        // other props
      });
    }
    ```

## Step 5: Create the plugin query file

1. If it doesn't already exist, create `queries` folder in the plugin, and add an `index.js` file there.
2. In `queries`, create a file for the query, e.g. `widgets.js` for the `widgets` query. The file should look something like this:

```js
import Logger from "@reactioncommerce/logger";

/**
 * @method widgets
 * @summary TODO
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} TODO
 */
export default async function widgets(context) {
  Logger.info("widgets query is not yet implemented");
  return null;
}
```

## Step 6: Add the plugin query to the queries context

In `queries/index.js` in the plugin, import your query and add it to the default export object. Example:

```js
import widgets from "./widgets"

export default {
  widgets
};
```

If this is the first query for the plugin, you'll also need to pass the full `queries` object to `registerPlugin` in the plugin's `index.js` file:

```js
import queries from "./queries";

export default async function register(app) {
  await app.registerPlugin({
    queries,
    // other props
  });
}
```

Your plugin query function is now available in the GraphQL context as `context.queries.widgets`.

> NOTE: The queries objects from all plugins are merged, so be sure that another plugin does not have a query with the same name. The last one registered with that name will win, and plugins are generally registered in alphabetical order by plugin name. Tip: You can use this to your advantage if you want to override the query function of a core plugin without modifying core code.

## Step 7: Add a test file for your query

If your query is in a file named `widgets.js`, your Jest tests should be in a file named `widgets.test.js` in the same folder. Initially you can copy and paste the following test:

```js
import mockContext from "/imports/test-utils/helpers/mockContext";
import widgets from "./widgets";

test("expect to return a Promise that resolves to null", async () => {
  const result = await widgets(mockContext);
  expect(result).toEqual(null);
});
```

This of course should be updated with tests that are appropriate for whatever your query does.

## Step 8: Create the GraphQL query resolver file

1. If it doesn't already exist, create `resolvers` folder in the plugin, and add an `index.js` file there.
2. If it doesn't already exist, create `resolvers/Query` folder in the plugin, and add an `index.js` file there. "Query" must be capitalized.
3. In `resolvers/Query`, create a file for the query resolver, e.g. `widgets.js` for the `widgets` query. The file should look something like this initially:

```js
/**
 * @name "Query.widgets"
 * @method
 * @memberof MyPlugin/GraphQL
 * @summary resolver for the widgets GraphQL query
 * @param {Object} parentResult - unused
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} TODO
 */
export default async function widgets(parentResult, args, context) {
  // TODO: decode incoming IDs here
  return context.queries.widgets(context);
}
```

Make adjustments to the resolver function so that it reads and passes along the parameters correctly. The general pattern is:
- Decode any opaque IDs that are in the arguments
- Call `context.queries.<queryName>` (your new plugin query) with the necessary arguments, and `await` a response.
- Return a single document or an array of them using either `getPaginatedResponse` or `xformArrayToConnection` util function.

## Step 9: Register the resolver

In `resolvers/Query/index.js` in the plugin, import your query resolver and add it to the default export object. Example:

```js
import widgets from "./widgets"

export default {
  widgets
};
```

If this is the first query for the plugin, you'll also need to import the `Query` object into the `resolvers` object. In `resolvers/index.js` in the plugin, import `Query` and add it to the default export object.

```js
import Query from "./Query"

export default {
  Query
};
```

If you are returning multiple documents (see step #3) you'll need to add an additional export here, `getConnectionTypeResolvers`, in order to be able to query `edges->node`:

```js
import { getConnectionTypeResolvers } from "@reactioncommerce/reaction-graphql-utils";
import Query from "./Query"

export default {
  Query
  ...getConnectionTypeResolvers("QueryName")
};
```

Then pass the full `resolvers` object to `registerPlugin` in the plugin's `index.js` file:

```js
import resolvers from "./resolvers";
import schemas from "./schemas";

export default async function register(app) {
  await app.registerPlugin({
    graphQL: {
      resolvers,
      schemas
    },
    // other props
  });
}
```

Calling your query with GraphQL should now work.

## Step 10: Add a test file for your query resolver

If your query resolver is in a file named `widgets.js`, your Jest tests should be in a file named `widgets.test.js` in the same folder. Initially you can copy and paste the following test:

```js
import widgets from "./widgets";

test("calls queries.widgets and returns the result", async () => {
  const mockResponse = "MOCK_RESPONSE";
  const mockQuery = jest.fn().mockName("queries.widgets").mockReturnValueOnce(Promise.resolve(mockResponse));

  const result = await widgets(null, { /* TODO */ }, {
    queries: { widgets: mockQuery },
    userId: "123"
  });

  expect(result).toEqual(mockResponse);
  expect(mockQuery).toHaveBeenCalled();
});
```

This of course should be updated with tests that are appropriate for whatever your query resolver does. For example, verify that all ID and schema transformations happen.

## Step 11: Finish implementing your query

Adjust the query function and the query resolver function until they work as expected, with tests that prove it. This will likely involve adding additional arguments, ID transformations, permission checks, and MongoDB queries.

Refer to [Developing the GraphQL API](./graphql-developing) for answers to any questions you might have while implementing your mutation.

## Step 12: Update the JSDoc comments

Write/update jsdoc comments for the plugin query function, the query resolver, and any util functions. The resolver function must have `@memberof <PluginName>/GraphQL` in the jsdoc, and the `@name` must be the full GraphQL schema path in quotation marks, e.g., "Query.widgets". (The quotation marks are necessary for the output API documentation to be correct due to the periods.)
