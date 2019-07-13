---
id: swag-shop-7
title: Creating a Server-side GraphQL plugin
---

For our Homepage we want to have some dynamic content that can be changed by non-developers. Specifically we want to feature a subset of products on the home page, which we will call "Featured Products". These products will be designated by just adding a particular tag with the name "featured-products". What we want to create is a new GraphQL query that will return a cursor of products that are tagged with this tag.

To do this we need to create a new plugin in the `Reaction` project. We are going to call this plugin `featured-products` and you can find the finished code in the `server` folder in the tutorial repository. You need to place this new directory in `imports/plugins/custom` from the root of your Reaction project

What we want to accomplish is to create a new Query (`featuredProductsByShop`). Let's start by creating a file named `register.js` at the root our new plugin. This registers all the schemas/queries/resolvers/mutations, etc and makes our plugin visible to the rest of the system.

For now, while we are moving server code off Meteor, you'll actually need two `register.js` files. The first is recognized by Meteor loading and should look like this:

```javascript
import Reaction from "/imports/plugins/core/core/server/Reaction";
import register from "./server/no-meteor/register";

Reaction.whenAppInstanceReady(register);
```

The second `register.js` file goes in the `server/no-meteor` folder. Let's just add the skeleton of it for now and we will add more to it as we complete them:

```javascript
export default async function register(app) {
  await app.registerPlugin({
    label: "Featured Products",
    name: "featured-products"
  });
}
```

Now the first thing we are going to create is our GraphQL schema files. You need to create a certain directory hierarchy, in this case it's `server/no-meteor`. All of the files we create in this tutorial will be in the `server/no-meteor` directory.

In this directory now create a `schemas` directory, and in that directory create a `schema.graphql` file. I find it easier to think of this file as creating the external API and defining the "shape" of it (as the word schema would imply). So the first thing we do is add our Query. This query will take a `shopId` and return a cursor of featured products. So it looks like this:

```graphql
extend type Query {
  featuredProductsByShop(shopId: ID!): CatalogItemConnection
}
```

We defined the name of the query (featuredProductsByShop), the argument it takes (the shopId, of the type ID) and what it returns which is a `CatalogItemConnection` (more on this later). We don't need to define `CatalogItemConnection` here because it is defined elsewhere and registering the schema makes all parts of the schema available globally (since they are all published to the client-side). To make the system aware of our new schema we need to go back and edit our `register.js`. But first let's add in `index.js` file there that imports our schema as exports it as the only entry to an array:

```javascript
import schema from "./schema.graphql"

export default [schema]
```

Now let's edit our `register.js`

We will add a new `graphQL` key which will contain a `schemas` entry. We'll import our schema file and add it there.

```javascript
import schemas from "./schemas";

export default async function register(app) {
  await app.registerPlugin({
    label: "Featured Products",
    name: "featured-products",
    graphQL: {
      schemas
    }
  });
}
```

That's fine but our query doesn't actually "do" anything (often a requirement!). To make it do something we will need to add a resolver and a query. Let's start with the resolver. At the same level as we created `schemas` let's create a `resolvers` directory, add a `Query` directory (the capital letter there is intentional) and in that `Query` directory add a file called `featuredProductsByShop`. The name of the file **needs** to be the same as our query in order for the GraphQL server to find it. While we're creating files let's also create an `index.js` file there that imports the default and exports it back out as a key in an object

```javascript
import featuredProductsByShop from "./featuredProductsByShop"

export default {
  featuredProductsByShop
}
```

*What's happening here?*

There is a global object where the server will look to resolve any particular query that comes in. It checks in the `resolvers` names space and if it is a Query, it looks in the `Query` namespace for something with the same name. This keeps the namespace from becoming too large and minimizes conflicts. So this pathing and naming is critical to making sure your code gets called properly.

Ok, now that that's all set up let's get to the meat of our resolver.

```javascript
import { getPaginatedResponse } from "@reactioncommerce/reaction-graphql-utils";
import { decodeShopOpaqueId } from "@reactioncommerce/reaction-graphql-xforms/shop";

export default async function featuredProductsByShop(_, args, context) {
  const { shopId: opaqueShopId, ...connectionArgs } = args;

  const shopId = decodeShopOpaqueId(opaqueShopId);

  const results = await context.queries.featuredProductsByShop(context, { shopId });
  return getPaginatedResponse(results, connectionArgs);
}
```

Here we are basically taking the data that comes in (here it's `args`, and `context`), doing any transforms that we need to and then returning the results of running our actual query.

One additional step is that we need to decode our shopId as it is coming in as encoded from the GraphQL side. We import the utility to do that, decode the ID and then passing that on to our query. When we return the query we are using `getPaginatedResponse` to do most of the heavy lifting of passing on a cursor so that the client-side can do pagination, etc. Instead of importing and executing it directly we are calling our query from within the context (again namespaced). This is a mongo query so it returns a promise so we need to make this an `async` function and `await` the actual results.

Now at the same level as `resolvers` and `schemas` let's create a directory called `queries` where we will place the file that does the actual db query. *(Note that while we do a Mongo query here, this file could do just about anything, and your resolver could be combining the results of multiple data-sources or even making a call to an external API. But for now writing Mongo queries will probably be the simplest and most common thing you will do)*

So inside our `queries` directory we create another file called `featuredProductsByShop` (this could theoretically could be called something else since we are calling it directly from our resolver, but we will call it the same for simplicity sake for now). Let's also create an `index.js` and import our default and export it as an object.

```javascript
import featuredProductsByShop from "./featuredProductsByShop";

export default {
  featuredProductsByShop
};
```

Now let's create our query file:

```javascript
import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @name featuredProductsByShop
 * @method
 * @summary Query the Catalog collection for products that have the `featured-product` tag
 * @param {Object} context - an object containing the per-request state
 * @param {String} params.shopId - Shop ID for the shop
 * @return {Promise<Object>|undefined} - An array of Catalog objects
 */
export default async function featuredProductsByShop(context, { shopId } = {}) {
  const { collections } = context;
  const { Catalog, Tags } = collections;

  if (!shopId) {
    throw new ReactionError("invalid-param", "You must provide shopId arguments");
  }

  const featuredTag = await Tags.findOne({ name: "featured-product"});

  // If a feature-product doesn't exist, let's create one
  let newTag;
  if (!featuredTag) {
    newTag = await Tags.insertOne({
      name: "featured-product"
    });
  }

  const featuredItems = Catalog.find({ "product.tagIds": { $in: [featuredTag._id] }, shopId: shopId });
  return featuredItems;
}
```

Nothing really special or fancy here except that if you are used to Meteor development you will notice that we are not importing our `Catalog` collection but getting it from the context, but other than that this is just a standard Mongo query with the addition that we add our `featured-product` tag if it doesn't exist. (The Meteor Mongo API and the one provided by the raw node driver are so similar that they are often identical as they are here)

The only things extra to point out are that we need to `await` on every database action, the query to `Tags` and inserting the `Tag`.

We now have all our pieces in place, we just need to let the system know about them through entries to our `register.js`. So we just need to add new entries for `resolvers` and `queries`. So our updated `register.js` should look something like this:

```javascript
import queries from "./queries";
import resolvers from "./resolvers";
import schemas from "./schemas";

export default async function register(app) {
  await app.registerPlugin({
    label: "Featured Products",
    name: "featured-products",
    graphQL: {
      resolvers,
      schemas
    },
    queries
  });
}
```

If you visit GraphQL Playground and hit the "schema" tab you should now see your query available to the client. If you want to execute the schema you will need to get your encoded shopId. Your shopId should be available in the `Shops` collection and to get the encoded version of it you can execute this command from the command line:

```bash
echo -n reaction/shop:<your_shop_id> | base64
```
Then just do:

```graphql
{
  featuredProductsByShop(shopId: "cmVhY3Rpb24vc2hvcDpKOEJocTN1VHRkZ3daeDNyeg==") {
    nodes {
      _id
      ...on CatalogItemProduct {
        product {
          title
          description
          slug
        }
      }
    }
  }
}
```
And substitute your own encoded shopID for the long string above.

Your server plugin should be complete. Now let's create our client components.
