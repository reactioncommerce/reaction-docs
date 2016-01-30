# Faker
The [reaction-factories](https://github.com/reactioncommerce/reaction-factories) package supplies `Factory` and `faker` with additional methods for testing Reaction packages.

**The recommended way to create shop:**
```javascript
const shopId = faker.reaction.shops.getShop()._id;
```
It checks whether already there is a shop and use it if so, in other case it
creates the new one

**The recommended way to create product:**
```javascript
const product = faker.reaction.products.add();
```
It creates product with top-level variant and 2 options.

**Additional custom faker methods added:**
- `faker.reaction.address`
- `faker.reaction.metaField`
- `faker.reaction.productVariant`
- `faker.reaction.cartItem`
- `faker.reaction.order`
- `faker.reaction.shops`
- `faker.reaction.users`
- `faker.reaction.products`
