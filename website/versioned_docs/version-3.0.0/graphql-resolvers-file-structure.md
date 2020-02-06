---
id: version-3.0.0-graphql-resolvers-file-structure
title: Understanding the Resolvers File Structure
original_id: graphql-resolvers-file-structure
---

As you may have seen, all core plugins use a similar file and folder structure for resolvers, and we recommend that you do the same for custom plugins. The basic premise is to have the folders and files reflect the hierarchy of the `resolvers` object, making it easier to find the resolver code you're looking for.

Before explaining the file structure, there are two concepts you need to fully understand:
- [What is a resolver map?](https://www.apollographql.com/docs/apollo-server/essentials/data.html#resolver-map)
- Each Reaction plugin can register its own resolver map, and all registered `resolvers` objects are then deep merged together into a single object, which is what is provided to the GraphQL library as the full resolver map. If two plugins have conflicting terminal nodes in the resolver tree, the last one registered wins. Currently plugins are loaded in alphabetical order by plugin folder name, grouped by "core" first, then "included", and then "custom".

Now, let's take the core payments plugin as an example. Here is what a GraphQL resolver map for the payments plugin would look like in a single file:

```js
import { encodePaymentOpaqueId } from "@reactioncommerce/reaction-graphql-xforms/payment";

export default {
  Payment: {
    _id: (node) => encodePaymentOpaqueId(node._id)
  },
  Query: {
    async availablePaymentMethods(_, { shopId }, context) {
      // ...
    },
    async paymentMethods(_, { shopId }, context) {
      // ...
    }
  }
};
```

You could save that file as `resolvers.js` in the payments plugin, and then import it and register it:

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

While that would work and may even be fine for a simple custom plugin, there are some downsides. We want to be able to test each complex resolver function, which is easier if each function is in its own file. Also, plugins typically keep growing, so our single file might become too large to easily understand over time.

So instead we break into separate files and folders as necessary. Whether you use files or folders at each level is up to you and should be based on how complex the functions are and whether they need unit tests.

- All files either export a function or an object as their default exports
- All `index.js` files import all of the folders or files at the same level of the tree, exporting them in an object.
- We name the files and folders and default import variables to match the object keys, which allows the exports to use ES6 object literal shorthand, and makes it easy to visualize how the folder structure maps to the final `resolvers` object.

Here's how the payments plugin folder structure looks splitting that one file into multiple:

![](/assets/graphql-resolvers-file-structure.png "GraphQL resolvers file structure")

For a full understanding, look through these files in the codebase.
