---
title: Accounts
---

An account represents a single person who uses the system, either as a shop operator or as a shop customer.

An account is generally created by registering using one of the Reaction UI clients, but when you first start the main Reaction app with an empty database, it will automatically create an initial administrator account.

Users and accounts are different but related concepts. Every user has exactly one account and every account has exactly one user. The user is managed by an outside user accounts system while the linked account is part of the Reaction system. Everything that relates to generic user accounts management, such as a login email and password, is part of the user record. Everything else is part of the account record. All related records in the Reaction system, such as carts, orders, and profiles, are linked with the account and not with the user.

NOTE: In the main Reaction app, a user and an account are created for anonymous users, and the client automatically logs in as this account. However, this behavior is being removed soon.
