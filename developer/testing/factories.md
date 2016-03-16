# Factories
The [reaction-factories](https://github.com/reactioncommerce/reaction-factories) package supplies `Factory` and `faker` with additional methods for testing Reaction packages.

## Factory
The following factories are predefined:
- `cart` creates cart with 2 items
- `cartToOrder` creates cart with `workflow.status: checkoutPayment`. It is
ready for order testing
- `anonymousCart` creates cart attached to anonymous user
- `order`
- `authorizedApprovedPaypalOrder` defines order factory which generates an authorized, apporved, paypal order
- `shop` creates shop. But we recommend to use `faker` for shop creation
- `user` creates user without `roles`
- `registeredUser` creates normal user with an additional `account/profile` role to the default `roles` list.
- `anonymous` creates anonymous user with an additional `anonymous` role to the default `roles` list.
- following 2 factories are used internally and not used directly for creation of full product. We don't recommend use them for tests (check `faker` instead):
  - `variant` creates item with `type = variant`
  - `product` creates empty product without variants
