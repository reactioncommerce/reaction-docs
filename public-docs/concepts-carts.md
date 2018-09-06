---
title: Carts
---

A **cart** is an entity that holds items a user has added along with entered checkout info until checkout is complete or the items are removed. A cart eventually becomes an **order** (after checkout) or may be expired and deleted by the system after some amount of time. A cart is destroyed when it is converted to an order.

There are two types of carts, **anonymous carts** and **account carts**.

## Anonymous Carts

You do not need to be logged in to an account to add items to a cart. As soon as you add a first item to your cart while not logged in, an anonymous cart is created. Anonymous carts are accessed by ID and a special token (like a cart password) that are stored by the client that created them. Anyone using the same device or browser has access to all of the anonymous carts created by that device or browser.

There is only ever one anonymous cart per shop per device, but if a client provides access to carts for more than one shop, then the client will be keeping track of multiple anonymous carts at the same time. Based on which shop you are currently visiting, the client will look up a single locally stored anonymous cart and use that rather than creating a new one each time you visit.

Shop operators can choose to periodically and automatically expire anonymous carts after a certain amount of time. If a client tries accessing an anonymous cart and the server says it no longer exists, then it will forget that cart and create a new anonymous cart for that shop.

During anonymous (i.e., “guest”) checkout, a client will typically collect an email address and associate it with the anonymous cart, and thus with the anonymous order. After this point, an anonymous cart or order is not truly anonymous, despite the name. “Anonymous” simply means that there is no user account associated with it.

## Account Carts

Each user account has up to one cart per shop. As soon as you add a first item to your cart while logged in, an account cart is created for that shop (the default shop for the client, which may or may not be the shop the item belongs to).

Since account carts are linked with your account, when you log out, you will no longer see or have access to the cart. Account carts are generally set to expire less quickly than anonymous carts, if at all.

## Cart Reconciliation

When you log in on a particular device or browser, the client may find that it now has both an anonymous cart and an account cart for the current shop. When this happens, a client is expected to reconcile the carts. The client chooses one of the available reconciliation modes, which is to say it chooses to keep only the account cart items, to keep only the anonymous cart items, or to merge the item lists.

After the server has reconciled the carts as instructed, it will have deleted the anonymous cart. The client then deletes its local reference to that cart, thus “forgetting” it. If you then log out, you will have no cart for that shop until you add another item.
