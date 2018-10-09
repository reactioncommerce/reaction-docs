---
id: version-2.0.0-graphql-create-mutation
title: How To: Create a new GraphQL mutation
original_id: graphql-create-mutation
---

## Step 1: Identify which plugin owns the mutation

The complete Reaction Commerce GraphQL API is created by stitching together domain-specific APIs from all of the API plugins. So when adding a new mutation, the first step is to decide which plugin should own it. This is usually obvious, but not always. You should think about whether any other plugins or services will need to call your mutation. If the mutation is fundamental to the system, then it may need to go in the "core" plugin, if no better alternative exists.

## Step 2: Understand the difference between a plugin mutation function and a GraphQL mutation resolver

See [Resolver Mutations and Queries vs. Plugin Mutations and Queries](graphql-developing.md#resolver-mutations-and-queries-vs-plugin-mutations-and-queries)

## Step 3: Define the mutation in the schema

1. If it doesn't already exist, create `/server/no-meteor/schemas` folder in the plugin, and add an `index.js` file there.
1. If it doesn't already exist, create `schema.graphql` in `/server/no-meteor/schemas` in the plugin.
1. Import the GraphQL file into `index.js` and default export it in an array:

    ```js
    import schema from "./schema.graphql";

    export default [schema];
    ```

    > NOTE: For large plugins, you can split to multiple `.graphql` files and export a multi-item array.

1. In the `.graphql` file, add your mutation within `extend type Mutation { }`. Add an `extend type Mutation` section near the top if the file doesn't have it yet.
1. Follow [the Relay recommendations](https://facebook.github.io/relay/graphql/mutations.htm) for mutation input arguments, which is to have only one argument named `input` that takes an input type that is the capitalized mutation name plus the suffix "Input", and to return a type that is the capitalized mutation name plus the suffix "Payload".

    Example: `addAccountEmailRecord(input: AddAccountEmailRecordInput!): AddAccountEmailRecordPayload`

1. Add the Input and Payload types to the schema. Both must have `clientMutationId: String` field and may have any other fields as necessary. The mutation response payload should include whatever object was mutated.
1. Document your mutation, the new types, and all fields in those types using string literals. See [Documenting a GraphQL Schema](./graphql-developing#documenting-a-graphql-schema).
1. If not already done, register your schemas in the plugin's `register.js` file:

    ```js
    import Reaction from "/imports/plugins/core/core/server/Reaction";
    import schemas from "./server/no-meteor/schemas";

    Reaction.registerPackage({
      graphQL: {
        schemas
      },
      // ...other props
    });
    ```

## Step 4: Create the plugin mutation file

1. If it doesn't already exist, create `/server/no-meteor/mutations` folder in the plugin, and add an `index.js` file there.
2. In `/server/no-meteor/mutations`, create a file for the mutation, e.g. `createSomething.js` for the `createSomething` mutation. The file should look something like this:

```js
import Logger from "@reactioncommerce/logger";

/**
 * @method createSomething
 * @summary TODO
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} TODO
 */
export default async function createSomething(context) {
  Logger.info("createSomething mutation is not yet implemented");
  return null;
}
```

## Step 5: Add the plugin mutation to the mutations context

In `/server/no-meteor/mutations/index.js` in the plugin, import your mutation and add it to the default export object. Example:

```js
import createSomething from "./createSomething"

export default {
  createSomething
};
```

If this is the first mutation for the plugin, you'll also need to pass the full `mutations` object to `registerPackage` in the plugin's `register.js` file:

```js
import Reaction from "/imports/plugins/core/core/server/Reaction";
import mutations from "./server/no-meteor/mutations";

Reaction.registerPackage({
  mutations,
  // ...other props
});
```

Your plugin mutation function is now available in the GraphQL context as `context.mutations.createSomething`.

> NOTE: The mutations objects from all plugins are merged, so be sure that another plugin does not have a mutation with the same name. The last one registered with that name will win, and plugins are generally registered in alphabetical order by plugin name. Tip: You can use this to your advantage if you want to override the mutation function of a core plugin without modifying core code.

## Step 6: Add a test file for your mutation

If your mutation is in a file named `createSomething.js`, your Jest tests should be in a file named `createSomething.test.js` in the same folder. Initially you can copy and paste the following test:

```js
import mockContext from "/imports/test-utils/helpers/mockContext";
import createSomething from "./createSomething";

test("expect to return a Promise that resolves to null", async () => {
  const result = await createSomething(mockContext);
  expect(result).toEqual(null);
});
```

This of course should be updated with tests that are appropriate for whatever your mutation does.

## Step 7: Create the GraphQL mutation resolver file

1. If it doesn't already exist, create `/server/no-meteor/resolvers` folder in the plugin, and add an `index.js` file there.
2. If it doesn't already exist, create `/server/no-meteor/resolvers/Mutation` folder in the plugin, and add an `index.js` file there. "Mutation" must be capitalized.
3. In `/server/no-meteor/resolvers/Mutation`, create a file for the mutation resolver, e.g. `createSomething.js` for the `createSomething` mutation. The file should look something like this initially:

```js
/**
 * @name "Mutation.createSomething"
 * @method
 * @memberof MyPlugin/GraphQL
 * @summary resolver for the createSomething GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} CreateSomethingPayload
 */
export default async function createSomething(parentResult, { input }, context) {
  const { clientMutationId = null } = input;
  // TODO: decode incoming IDs here
  const renameMe = await context.mutations.createSomething(context);
  return {
    renameMe,
    clientMutationId
  };
}
```

Make adjustments to the resolver function so that it reads and passes along the parameters correctly. The general pattern is:
- Destructure `input`. Include `clientMutationId`.
- Decode any opaque IDs that are in the input object
- Call `context.mutations.<mutationName>` (your new plugin mutation) with the necessary arguments, and `await` a response.
- Return an object that contains the `clientMutationId` and the object returned by the plugin mutation. (This must match the "Payload" type from the schema.)

## Step 8: Register the resolver

In `/server/no-meteor/resolvers/Mutation/index.js` in the plugin, import your mutation resolver and add it to the default export object. Example:

```js
import createSomething from "./createSomething"

export default {
  createSomething
};
```

If this is the first mutation for the plugin, you'll also need to import the `Mutation` object into the `resolvers` object. In `/server/no-meteor/resolvers/index.js` in the plugin, import `Mutation` and add it to the default export object.

```js
import Mutation from "./Mutation"

export default {
  Mutation
};
```

Then pass the full `resolvers` object to `registerPackage` in the plugin's `register.js` file:

```js
import Reaction from "/imports/plugins/core/core/server/Reaction";
import resolvers from "./server/no-meteor/resolvers";
import schemas from "./server/no-meteor/schemas";

Reaction.registerPackage({
  graphQL: {
    resolvers,
    schemas
  },
  // ...other props
});
```

Calling your mutation with GraphQL should now work.

## Step 9: Add a test file for your mutation resolver

If your mutation resolver is in a file named `createSomething.js`, your Jest tests should be in a file named `createSomething.test.js` in the same folder. Initially you can copy and paste the following test:

```js
import createSomething from "./createSomething";

test("correctly passes through to mutations.createSomething", async () => {
  const fakeResult = { /* TODO */ };

  const mockMutation = jest.fn().mockName("mutations.createSomething");
  mockMutation.mockReturnValueOnce(Promise.resolve(fakeResult));
  const context = {
    mutations: {
      createSomething: mockMutation
    }
  };

  const result = await createSomething(null, {
    input: {
      /* TODO */
      clientMutationId: "clientMutationId"
    }
  }, context);

  expect(result).toEqual({
    renameMe: fakeResult,
    clientMutationId: "clientMutationId"
  });
});
```

This of course should be updated with tests that are appropriate for whatever your mutation resolver does. For example, verify that all ID and schema transformations happen.

## Step 10: Finish implementing your mutation

Adjust the mutation function and the mutation resolver function until they work as expected, with tests that prove it. This will likely involve adding additional input fields, ID transformations, permission checks, MongoDB calls, and event emitting.

> NOTE: If the plugin mutation function is calling `context.callMeteorMethod`, these calls will be faked outside of running the full Meteor app. If you need this to work from the devserver app, you'll need to convert those methods (and the methods they call, and so on) to mutations, too.

Refer to [Developing the GraphQL API](./graphql-developing) for answers to any questions you might have while implementing your mutation.

### Copying code from an existing Meteor method
If the plugin mutation you’re creating is essentially the same as an existing Meteor method, you can copy the method code and make a few changes to “demeteorize” it.

1. Copy the contents of the existing method function into your new mutation function. Copy over the imports, too. Then read through the function line by line and convert anything that relies on Meteor to not rely on Meteor, according to the following guidelines.
2. Change `Meteor.call` to `context.callMeteorMethod`. Do not `await` these calls unless you need the result or need to be sure that the database changes are done.
3. Remove any collections that are imported. Instead, use `context.collections.<CollectionName>`. However, these are the raw collections from the `mongodb` Node package rather than the Meteor collections, so there are a few differences:
    - When using `findOne`, the first argument can't be just the ID. Change any `findOne(id)` to `findOne({ _id: id })`.
    - For a `find`, change `.fetch()` to `.toArray()`. If `.map` or `.forEach` is called directly after the `.find`, then update the code to await a `.toArray()` call first, and then loop through the array.
    - Change `.insert` to `.insertOne`.
    - Change `.update` to `.updateOne` or `.updateMany`
    - Change `.remove` to `.deleteOne` or `.deleteMany`
    - Change `.upsert` to `.updateOne` with `upsert: true` in the options.
    - Be sure to `await` any of these that return promises.
    - See [Meteor Collections vs. Node Collections](graphql-developing.md#meteor-collections-vs-node-collections)
4. Change `Reaction.hasPermission` to `context.userHasPermission`. The API is a bit different. No need to pass in the user, but you must pass in the shop ID and the first argument must be an array. (Wrap string in array brackets if a string is being passed in.)
5. Change `this.userId` or `Reaction.getUserId()` calls to `context.userId` or `context.accountId` depending on which you need.
6. Change all `Meteor.user()` to `context.user` or `context.account` depending on which you need.

## Step 11: Update the JSDoc comments

Write/update jsdoc comments for the plugin mutation function, the mutation resolver, and any util functions. The resolver function must have `@memberof <PluginName>/GraphQL` in the jsdoc, and the `@name` must be the full GraphQL schema path in quotation marks, e.g., "Mutation.createSomething". (The quotation marks are necessary for the output API documentation to be correct due to the periods.)
