---
id: version-2.9.1-storefront-account-management
title: Build an account management page
original_id: storefront-account-management
---

This article is part of the [Storefront UI Development Guide](./storefront-intro.md).
- Previous Task: [Add ability to log in](./storefront-login.md)
- Next Task: [Show inventory status badges](./storefront-inventory-status-badges.md)

After you've added the ability to log in, most storefronts also need an account management page, or multiple pages. Here your shoppers with accounts can update their profile information, their stored addresses, and their stored payment details, as well as view, track, and cancel their orders.

We will expand this article over time, but for now, here is a list of GraphQL queries you'll likely need:
- `viewer`
- `ordersByAccountId`

And mutations:
- `addAccountAddressBookEntry`
- `updateAccountAddressBookEntry`
- `removeAccountAddressBookEntry`

Additional queries and mutations are not yet built but are coming soon.
