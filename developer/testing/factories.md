## Factories

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
- faker.reaction.address
- faker.reaction.metaField
- faker.reaction.productVariant
- faker.reaction.cartItem
- faker.reaction.order
- faker.reaction.shops
- faker.reaction.users
- faker.reaction.products

```
shopId = faker.reaction.shops.getShop()._id;
```
