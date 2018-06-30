---
id: version-v1.12.0-creating-test-data-for-meteor-tests
title: Creating Test Data for Meteor Tests
original_id: creating-test-data-for-meteor-tests
---
    
Reaction comes with a set of prebuilt factories and functions for creating data to write your Meteor integration tests.

Whenever you want to use one of the factories you need to import them like this:

```js
import Fixtures from "/server/imports/fixtures";
```

And then at the top of your test file, ready them by executing:

```js
Fixtures();
```

There are also many functions/builders that are available as named exports within `/server/imports/fixtures`. A few examples:

- `import { addProduct } from "/server/imports/fixtures/products";`
- `import { getShop } from "/server/imports/fixtures/shops";`
- `import { getUser } from "/server/imports/fixtures/users;`

Check out those files in the `/server/imports/fixtures` folder to see what is available.

## Factory

The following factories are predefined. The appropriate object is created by executing `Factory.create("nameOfFactory");`

- `cart` creates cart with 2 items

- `cartToOrder` creates cart with `workflow.status: checkoutPayment`. It is ready for order testing

- `anonymousCart` creates cart attached to anonymous user

- `order`

- `authorizedApprovedPaypalOrder` defines order factory which generates an authorized, apporved, paypal order

- `shop` creates shop.

- `user` creates user without `roles`

- `registeredUser` creates normal user with an additional `account/profile` role to the default `roles` list.

- `anonymous` creates anonymous user with an additional `anonymous` role to the default `roles` list.

- following 2 factories are used internally and not used directly for creation of full product. We don't recommend use them for tests (check `faker` instead):

  - `variant` creates item with `type = variant`
  - `product` creates empty product without variants

## Faker

To easily get fake data of various types, you can import and use the [faker](https://www.npmjs.com/package/faker) package.

```js
import faker from "faker";

const productTitle = faker.commerce.productName();
```
