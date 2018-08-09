---
id: version-1.14.0-graphql-create-mutation
title: Tutorial: Create a new GraphQL mutation
original_id: graphql-create-mutation
---

## Prerequisites

- Understand the difference between a plugin mutation function and a GraphQL mutation function and where they live. See [Resolver Mutations and Queries vs. Plugin Mutations and Queries](graphql-developing.md#resolver-mutations-and-queries-vs-plugin-mutations-and-queries).
- Install the [Reaction Yeoman generator](https://github.com/reactioncommerce/generator-reaction).
- This tutorial assumes that the mutation has already been defined in the GraphQL schema. See [Extending and Modifying the GraphQL Schema](graphql-developing.md#extending-and-modifying-the-graphql-schema).

## Steps

1. In the Reaction repo, run `yo reaction:graphql`. Answer the prompts.
2. After the generator creates the files, it prints instructions that you may need to do in some cases to finish importing everything.
3. Your plugin mutation function is now available in the GraphQL context as `context.mutations.<pluginName>.<mutationName>`, and your GraphQL resolver should be working.
4. Make adjustments to the resolver function so that it reads and passes along the parameters correctly. The general pattern is:
    - Destructure `input`. Include `clientMutationId`.
    - Decode any opaque IDs that are in the input object
    - Call `context.mutations.<pluginName>.<mutationName>` (your new plugin mutation) with the necessary arguments, and `await` a response.
    - Return an object that contains the `clientMutationId` and the object returned by the plugin mutation. (This must match the "Payload" type from the schema.)
5. Write/update jsdoc comments for the plugin mutation function, the mutation resolver, and any util functions. The resolver function must have `@memberof <Namespace>/GraphQL` in the jsdoc, and the `@name` must be the full GraphQL schema path in quotation marks, e.g., "Mutation.addAccountAddressBookEntry". (The quotation marks are necessary for the output API documentation to be correct due to the periods.)
6. Write the plugin mutation code. If converting an existing Meteor method, see [Copying code from an existing Meteor method](#copying-code-from-an-existing-meteor-method) section below.
    - Note that if the plugin mutation function is calling `context.callMeteorMethod`, these calls will be faked outside of running the full Meteor app. If you need this to work from the devserver app, you'll need to convert those methods (and the methods they call, and so on) to mutations, too.
7. Run the app and test the mutation. Write tests (or update the generated test) and be sure they all pass.
8. If there is an existing Meteor method that is identical, you can convert it to be a small wrapper around the new plugin mutation. The method wrapper just needs the `check` calls for all arguments at the top, call `this.unblock()` if necessary, and a call to `const context = Promise.await(getGraphQLContextInMeteorMethod(this.userId));` This context can then be passed to the mutation, which you can import directly from `../no-meteor/mutations/<mutationName>`. Then return the mutation result.

    TIP: Most plugin mutation functions return a Promise, but Meteor will automatically await a Promise if you return one from a method.

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
4. `Hooks` and `Logger` must be imported from the NPM packages instead of from Meteor code.
5. It's OK to `import { Meteor } from "meteor/meteor";` but you can only throw `Meteor.Error`. Don't try to use anything else on the `Meteor` object.
6. Change `Reaction.hasPermission` to `context.userHasPermission`. The API is a bit different. No need to pass in the user, but you must pass in the shop ID and the first argument must be an array. (Wrap string in array brackets if a string is being passed in.)
7. Change `this.userId` or `Meteor.userId()` to `context.userId` or `context.accountId` depending on which you need.
8. Change all `Meteor.user()` to `context.user` or `context.account` depending on which you need.
