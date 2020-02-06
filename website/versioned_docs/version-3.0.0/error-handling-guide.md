---
id: version-3.0.0-error-handling-guide
title: Error Handling
original_id: error-handling-guide
---

When throwing errors designed to communicate information back to the client from within a client-called function such as a GraphQL resolver, use the `ReactionError` class rather than just `Error`. In other types of functions, throwing a `new Error()` is best.

Always include both a standard machine-readable error type and a human-readable error message, which must begin with a capital letter.

```js
import ReactionError from "@reactioncommerce/reaction-error";

throw new ReactionError("access-denied", "Access denied");
```

## Common `errors` and `reasons`

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
