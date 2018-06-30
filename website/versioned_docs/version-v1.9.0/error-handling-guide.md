---
id: version-v1.9.0-error-handling-guide
title: Error Handling Guide
original_id: error-handling-guide
---
    
## Error messaging

Reaction uses Meteor's [`Meteor.Error()`](https://docs.meteor.com/api/methods.html#Meteor-Error) to throw general runtime errors to the client and server. Read the Meteor Guide's [Error handling](https://guide.meteor.com/methods.html#throwing-errors) section for more on how to use the method.

### Types of Reaction Meteor error messages

[`Meteor.Error()`](https://docs.meteor.com/api/methods.html#Meteor-Error) takes three arguments, one that is required: `error`, a short machine-readable error code, and two that are optional: `reason`, a human-readable message and `details` for any additional stack trace
information.

#### Always include both error and reason messages

Reaction requires using both `error` and `reason` arguments:

```js
Meteor.Error("short-message", "Long message with more detail for users.");
```

#### Common `errors` and `reasons`

Here is a list of standardized arguments for various error situations:

| error               | reason examples                                                     |
| ---                 |     ---                                                             |
| `access-denied`     | "Access denied"                                                     |
| `invalid-parameter` | "X is invalid", "Bad X ID" "X is required"                          |
| `not-configured`    | "Open Exchange Rates not configured. Configure for current rates."  |
| `not-found`         | "User not found"                                                    |
| `not-implemented`   | "Multiple shipping providers is currently not implemented"          |
| `server-error`      | "Error adding to cart"                                              |

#### Error message guidelines

The above list is not exhaustive throughout the whole app. For other error scenarios, use the guidelines below:

- Do not use HTTP status codes, like `404` or `500`. Use the error messages `invalid-parameter` and `server-error` instead respectively.
- Always start the reason with a capital letter.
- Do not use exclamation marks in the reason.
