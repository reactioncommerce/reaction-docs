---
id: version-v1.12.0-creating-test-data
title: Creating Test Data
original_id: creating-test-data
---
    
For Meteor integration tests, see [Creating Test Data for Meteor Tests](creating-test-data-for-meteor-tests.md).

For non-Meteor Jest tests, we do not yet have a factory solution that works outside of Meteor, but you may import and use `faker` as necessary. Coming soon!

## Faker

To easily get fake data of various types, you can import and use the [faker](https://www.npmjs.com/package/faker) package.

```js
import faker from "faker";

const productTitle = faker.commerce.productName();
```
