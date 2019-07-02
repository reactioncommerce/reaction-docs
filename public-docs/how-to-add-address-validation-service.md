---
title: How To: Add an Address Validation Service
---

## Prerequisite Reading
- [Understanding Plugins](./core-plugins-intro.md)
- [Address Validation Operator Guide](./operator-address-validation.md)

## Overview
In general, to add an address validation service you must do the following:
- Create a plugin or modify an existing one
- Create and register an address validation function

> There is one included plugin that provides a "Test" address validation service (`address-validation-test` in `/imports/plugins/included`). Examine the files in this plugin if you are confused by any of the steps in this article.

### Register an address validation service

Address validation services are registered by passing an array of them to the `addressValidationServices` property of the `registerPlugin` options.

```js
import addressValidation from "./addressValidation.js";

export default async function register(app) {
  await app.registerPlugin({
    label: "Great Validation Service",
    name: "great-validation-service",
    addressValidationServices: [
      {
        displayName: "Great Validation",
        functions: {
          addressValidation
        },
        name: "great",
        supportedCountryCodes: ["US", "CA", "DE", "IN"]
      }
    ]
    // other props
  });
}
```

The `addressValidationServices` property is the key to making your plugin
available to Reaction's address service.

**`addressValidationServices` object syntax**
  * **displayName**: The validation service name shown in the operator UI.
  * **functions**: An object with `addressValidation` property set to a function that validates an address. See below for how to create the `addressValidation` function.
  * **name**: A unique key for identifying this service.
  * **supportedCountryCodes**: Optional. An array of all countries the `addressValidation` function supports. This list filters the list of countries that an operator can potentially enable this service for.

After this step is completed, you can restart Reaction, enable your validation service from the Shop operator panel, and start testing your service via the `addressValidation` GraphQL query.

### Create an address validation function

Every address validation service is expected to register a function that validates an address. The core `address` plugin calls it like this:

```js
const result = await validationService.functions.addressValidation({ address, context });
```

The result is expected to be an object with `suggestedAddresses` and `validationErrors` properties, both of which are required to be arrays but may be empty. Examine the `Address` type in the GraphQL schema for a full description of what the objects in these arrays should look like.

One or more plugins can provide one or more address validation services, so each shop must choose which services to enable for which countries. This is done by an operator in the Shop Settings panel.

For address validation, we suggest using a 3rd party validation service that specializes in taxes, payments, or shipping (e.g., [Shippo](https://goshippo.com/), [Radial](https://www.radial.com/), [Avalara](https://www.avalara.com/us/en/index.html), or [TaxJar](https://www.taxjar.com/)). Your custom plugin will create an interface between Reaction and the third party service API.

A simple validation function might look like this:

```js
import { resolveAddress } from "some-validation-sdk";

export default async function addressValidation({ address }) {
  const validationResults = await resolveAddress(address);

  // if the address is valid, return empty results.
  if (validationResults.isValid) {
    return {
      suggestedAddresses: [],
      validationErrors: []
    };
  }

  return {
    suggestedAddresses: validationResults.validatedAddresses,
    validationErrors: validationResults.messages
  };
}
```

#### Formating validation results
More than likely your validation solution returns similar data but in a different schema. In this case you'll need to create a transform function to normalize the data structure for the query. See the `Address` type in the GraphQL schema.

Here's an example function with a results transform:

```js
import { resolveAddress } from "some-validation-sdk";

function validationErrorsTransform(errors) {
  return errors.map((err) => ({
    type: err.severity,
    source: err.code,
    summary: err.title,
    details: err.message
  });
}

export default async function addressValidation({ address }) {
  const validationResults = await resolveAddress(address);

  // if the address is valid, return empty results.
  if (validationResults.isValid) {
    return {
      suggestedAddresses: [],
      validationErrors: []
    };
  }

  return {
    suggestedAddresses: validationResults.validatedAddresses,
    validationErrors: validationErrorsTransform(validationResults.messages)
  };
}
```
