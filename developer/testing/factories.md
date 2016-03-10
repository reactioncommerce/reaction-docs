# Factories
The [reaction-factories](https://github.com/reactioncommerce/reaction-factories) package supplies `Factory` and `faker` with additional methods for testing Reaction packages.

## Factory
The following factories are predefined:
- `Cart`
- `Orders`
- `Products`
- `Shops`
- `Users`

```
Factory.create("Shops")
var shopId = Factory.get("Shops")
```

## faker
Additional custom faker methods added:
- ReactionFaker.address
- ReactionFaker.metaField
- ReactionFaker.productVariant
- ReactionFaker.cartItem
- ReactionFaker.order
- ReactionFaker.shops
- ReactionFaker.users
- ReactionFaker.products

```
shopId = ReactionFaker.shops.getShop()._id;
```
