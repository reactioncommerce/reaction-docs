---
original_id: using-faker-for-testing
id: version-v1.1.0-using-faker-for-testing
title: Faker
---
    
The [reaction-factories](https://github.com/reactioncommerce/reaction-factories) package supplies `Factory` and `faker` with additional methods for testing Reaction packages.

**The recommended way to create shop:**

```js
const shopId = ReactionFaker.shops.getShop()._id;
```

It checks whether already there is a shop and use it if so, in other case it
creates the new one

**The recommended way to create product:**

```js
const product = ReactionFaker.products.add();
```

It creates product with top-level variant and 2 options.

**Additional custom faker methods added:**

- ReactionFaker.address
- ReactionFaker.metaField
- ReactionFaker.productVariant
- ReactionFaker.cartItem
- ReactionFaker.order
- ReactionFaker.shops
- ReactionFaker.users
- ReactionFaker.products
