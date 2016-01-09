# Cart
## Cart Workflow
`sessionId` should be unique for each new client (moz vs firefox, mobile vs desktop etc), but not unique in the same browser instance (tabs).

When an **anonymous** user visits, they get a `sessionId`, this a generated server side, and stored in the browser localStorage, so that combined with their **anonymous** user account identifies them within the tab/browser/window session. The presence of a unique sessionId tells us not to create another user account for an **anonymous** user.  The same sessionId should never be used by the server for any two sessions, as it comes from the client.. it's only set on the server side in the initial _subscription to `Sessions`_.

It this same user visits on another device, browser or anonymous session they will get a new **anonymous** `userId` and `sessionId`.

When a visitor registers with a password or authentication service (FB,GH,etc),  they are **anonymous** before they register.  We then create a _new_ user and account.  If the user is `authenticated`, and has a `sessionId` that matches previous carts with the same sessionId, we then merge matching `sessionId` carts into the newly created cart.  (and we _<u>should_ </u>remove the existing **anonymous** cart, user, account).

We identify an `authenticated` user  in `Roles` as a `guest` without the `anonymous` role.

When this `authenticated` user logs out of the site, the `publication` is updated and they no longer have permissions to view their `authenticated` cart.  The publication sees this, and creates a new cart for them, with a new `anonymous` cartId, but still the same `sessionId`.

If the existing registered `guest` user adds items to an `anonymous` cart session, and then logs in,  the `anonymous` cart will be merged to their existing cart and new items added, existing items will additional quantity will get incremented. This is true from any browser/session.
