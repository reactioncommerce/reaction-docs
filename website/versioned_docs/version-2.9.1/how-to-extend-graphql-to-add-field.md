---
id: version-2.9.1-how-to-extend-graphql-to-add-field
title: How To: Extend GraphQL to add a field
original_id: how-to-extend-graphql-to-add-field
---

Sometimes you only need to extend GraphQL to add a field to an existing type. Here's how to do it.

## Extend the schema

1. If it doesn't already exist, create `/server/no-meteor/schemas` folder in the plugin, and add an `index.js` file there.
1. If it doesn't already exist, create `schema.graphql` in `/server/no-meteor/schemas` in the plugin.
1. Import the GraphQL file into `index.js` and default export it in an array:

    ```js
    import schema from "./schema.graphql";

    export default [schema];
    ```

    > NOTE: For large plugins, you can split to multiple `.graphql` files and export a multi-item array.

1. In the `.graphql` file, use GraphQL language to extend the type with your custom field.

    ```graphql
    extend type SomeType {
      "Custom data for some purpose documented here"
      myCustomField: String
    }
    ```

1. Document all fields you add using string literals. See [Documenting a GraphQL Schema](./graphql-developing#documenting-a-graphql-schema).
1. If not already done, register your schemas in the plugin's `register.js` file:

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

## Create a field resolver if necessary

If your field is not stored in the database in the same schema, such as if it is derived from other properties or collections or is stored in another system, then you'll also need to create a field resolver.

### Create the resolver

1. If it doesn't already exist, create `/server/no-meteor/resolvers` folder in the plugin, and add an `index.js` file there.
3. In `/server/no-meteor/resolvers`, create a file for the field resolver with the same name as the type the field is for, e.g. `Tag.js` if you extended the `Tag` type. The file should look something like this initially:

```js
export default {
  myCustomField(tag, args, context) {
    return null;
  }
};
```

Replace `return null` with whatever logic you need to derive the custom field value and return it. You may make the resolver function `async` if necessary.

> You have some freedom here to structure the `resolvers` folder in whatever way works best for your plugin. For an explanation and recommendations, refer to [Understanding the Resolvers File Structure](./graphql-resolvers-file-structure.md)

## Register the resolver

In `/server/no-meteor/resolvers/index.js` in the plugin, import your new file and add it to the default export object. Example:

```js
import Tag from "./Tag"

export default {
  Tag
};
```

If this is the first resolver for the plugin, pass the full `resolvers` object to `registerPlugin` in the plugin's `register.js` file:

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

You should now be able to query for your custom field using GraphQL.
