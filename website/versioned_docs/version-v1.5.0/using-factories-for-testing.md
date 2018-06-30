---
id: version-v1.5.0-using-factories-for-testing
title: Factories
original_id: using-factories-for-testing
---
    
Reaction comes with a set of prebuilt Factories and functions for creating data to write your tests.

Whenever you want to use one of the Factories you need to import them like this:

```js
import Fixtures from "/server/imports/fixtures";
```

And then at the top of your test file, ready them by executing:

```js
Fixtures();
```

There are also the following functions/builders that can be imported directly.

`addProduct` which will create a new product and return that product to you: `import { addProduct } from "/server/imports/fixtures/products";`
`getShop` which will either get the existing shop of create a new one and return it to you: `import { getShop } from "/server/imports/fixtures/shops";`
`getUser` which either return an existing user or create one if it doesn't exist: `import { getUser } from "/server/imports/fixtures/users;`

## Factory

The following factories are predefined. The appropriate object is created by executing `Factory.create("nameOfFactory");`

-   `cart` creates cart with 2 items

-   `cartToOrder` creates cart with `workflow.status: checkoutPayment`. It is ready for order testing

-   `anonymousCart` creates cart attached to anonymous user

-   `order`

-   `authorizedApprovedPaypalOrder` defines order factory which generates an authorized, apporved, paypal order

-   `shop` creates shop.

-   `user` creates user without `roles`

-   `registeredUser` creates normal user with an additional `account/profile` role to the default `roles` list.

-   `anonymous` creates anonymous user with an additional `anonymous` role to the default `roles` list.

-   following 2 factories are used internally and not used directly for creation of full product. We don't recommend use them for tests (check `faker` instead):

    -   `variant` creates item with `type = variant`
    -   `product` creates empty product without variants
