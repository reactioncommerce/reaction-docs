---
id: version-2.9.1-how-to-write-tests-for-plugins
original_id: how-to-write-tests-for-plugins
title: How To: Write Jest tests for plugins
---

We use and recommend plugin authors to use Jest for writing tests for their plugins.

Consider the following `module.js` file:

```js
import Logger from "@reactioncommerce/logger";
import Reaction from "/imports/plugins/core/core/server/Reaction";
import sendRequest from "./API";

export async function doRequest() {
  Logger.log("doRequest is called");
  const shop = Reaction.getPrimaryShop();
  return await sendRequest(shop);
}
```

and the following `API.js` file:

```js
import tranformData from "/imports/tranformData";

export default async function sendRequest (shop) {
  const formatData = tranformData(shop);
  return formatData;
}
```

## To write the tests

### 1. Mock function that don't exist in the path

Since a plugin depends on functions that are present in the Reaction's codebase, we need to mock them in the tests. To mock the `Reaction`, `Logger` and `tranformData` for the above code we use:

```js
// disable the Logger
jest.mock(
  "@reactioncommerce/logger",
  () => ({
    warn: () => {},
    debug: () => {},
    error: () => {},
    log: () => {}
  }),
  { virtual: true }, // note virtual is used here because this path doesn't exist
);

jest.mock(
  "/imports/plugins/core/core/server/Reaction",
  () => ({
    getPrimaryShop: () => ({
      shopId: "123456",
      shopName: "reaction-test"
    })
  }),
  { virtual: true }, // note virtual is used here because this path doesn't exist
);

jest.mock(
  "/imports/tranformData",
  () => ({
    __esModule: true,
    default: jest.fn((shop) => shop.shopName)
  }),
  { virtual: true }, // note virtual is used here because this path doesn't exist
);

import tranformData from "/imports/tranformData";
```

> Note: Notice that the import will only work after the mock.

 ### 2. Write the test body
 
 Now we just import the functions that we need to test and write the tests for them:
 
 ```js
 import { doRequest } from "./module";

describe("example test suite", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  beforeAll(() => {
    // set new Date() to return the following date
    advanceTo(new Date(2018, 5, 27, 0, 0, 0));
  });

  test("request works", async () => {
    expect.assertions(1);
    const expectedResponse = "reaction-test";
    const response = await doRequest();
    expect(response).toEqual(expectedResponse);
  });
  
  afterAll(() => {
    clear();
  });
});
```

### 3. Change implementation

Mock the function/module again inside the test function and `require` the modules again which depend on it. For example to test the case when `sendRequest` throws Error we can write the following test:

```js
test("request throws exception", async () => {
    expect.assertions(1);
    jest.doMock(
      "./API",
      () => ({
        __esModule: true,
        default: jest.fn(() => {
          throw Error();
        })
      })
    );
    const { doRequest } = require("./module");
    try {
      await doRequest();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
```

### 4. Override implementation of a "virtual" ES6 module

To do this use the `mockImplementation` function of the Jest functions.

```js
test("format data change implementation", async () => {
    expect.assertions(1);
    tranformData.mockImplementation(jest.fn((shop) => shop.shopId));
    const expectedResponse = "123456";
    const response = await doRequest();
    expect(response).toEqual(expectedResponse);
  });
```
