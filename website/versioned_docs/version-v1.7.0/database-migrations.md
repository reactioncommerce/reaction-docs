---
id: version-v1.7.0-database-migrations
title: Migrations
original_id: database-migrations
---

## How we deal with database changes during project life cycle

Software that evolves will sooner or later have to change existing data in their database in order to be compatible with the latest code changes. Reaction uses the meteor package [percolate:migrations](https://atmospherejs.com/percolate/migrations) for internal database migrations.

### Migrating on startup

On application startup, Reaction will migrate to the latest database revision. It does so by sourcing the revision files in directory [`/imports/plugins/core/versions/server/migrations/*.js`](https://github.com/reactioncommerce/reaction/tree/v1.7.0/imports/plugins/core/versions/server/migrations) and apply their content's database instructions, if necessary.

[**/imports/plugins/core/versions/server/startup.js**](https://github.com/reactioncommerce/reaction/blob/v1.7.0/imports/plugins/core/versions/server/startup.js)

```js
Hooks.Events.add("afterCoreInit", () => {
  Migrations.migrateTo("latest");
});
```

The Migrations package keeps track of the applied changes in a dedicated collection aptly called _Migrations_ (configurable):
![Screenshot of Collection Migrations](https://raw.githubusercontent.com/reactioncommerce/reaction-docs/trunk/assets/screenshot-migrations-collection.png)

Hint: In case there's an error during a migration run, it is possible that the migration process didn't release the lock state. If that happens, check for any errors in the `up()` and `down()` methods. If they're fixed, you may set the `locked` flag in the database to `false` and try it again.

### Code changes that affect existing data in MongoDB

Whenever code changes require existing data in MongoDB to be changed, a new database revision is added in the plugin [reaction-migrations](https://github.com/reactioncommerce/reaction/blob/v1.7.0/imports/plugins/core/versions/server/migrations/12_add_shopId_on_billing.js).

**12_add_shopId_on_billing.js**

```js
Migrations.add({
  version: 12,
  up() {
    // Moving to multi-shop setup requires each billing objects to be marked by shopId
    // This adds shopId field to each billing object in orders and carts.
    const shopId = Reaction.getShopId();

    Orders.update({}, {
      $set: { "billing.0.shopId": shopId }
    }, {
      multi: true
    });

    Cart.update({}, {
      $set: { "billing.0.shopId": shopId }
    }, {
      multi: true
    });
  },
  down() {
    Orders.update({}, {
      $unset: { "billing.0.shopId": "" }
    }, {
      multi: true
    });

    Cart.update({}, {
      $set: { "billing.0.shopId": "" }
    }, {
      multi: true
    });
  }
});
```

Each revision consists of a `version` and the two methods: `up()` and `down()` which are inverse. Calling `up()` and then `down()` on a dataset should leave you with the original dataset again. Downgrading is not used often, but can be helpful in some situations. For example one could investigate if a specific error that depends on your existing data in mongo also occurs in an older version of Reaction.

### How to deal with your own migration needs

In case you're writing your own plugins and do change the structure of the database, you may want to deal with migrations as well to keep your plugin's source code in sync with the database structure.

Right now there's no officially supported or recommend way of doing this. We're aware of the situation, but haven't decided which route to go in order to address the topic.
