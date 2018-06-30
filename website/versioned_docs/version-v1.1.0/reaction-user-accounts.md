---
original_id: reaction-user-accounts
id: version-v1.1.0-reaction-user-accounts
title: Accounts
---
    
Reaction extends [Meteor Account](http://docs.meteor.com/api/accounts.html) functionality in `client/modules/accounts` with Reaction specific UI and behavior.

- _Accounts_ collection
- dropdown accounts ui
- inline accounts ui
- user profile
- user management
- address book CRUD

## Methods

### accounts/addressBookAdd

Add new addresses to an account

##### Example

```js
import { Meteor } from "meteor/meteor";

Meteor.call("accounts/addressBookAdd", address, accountUserId);
```

### accounts/addressBookUpdate

Update existing address in user's profile

#### Parameters

| Parameter     | Type                             | Description                          |
| ------------- | -------------------------------- | ------------------------------------ |
| address       | Object                           | An object containing the address     |
| accountUserId | String / null                    | `account.userId` used by admin to    |
| type          | String                           | "shipping" or "billing" address type |
| **Returns**   | **Type**                         | **Description**                      |
| Number        | The number of affected documents |                                      |

##### Example - (Server)

```js
import { Meteor } from "meteor/meteor";

Meteor.call("accounts/addressBookUpdate", address, accountUserId, type);
```

##### Example - (Client) (Blaze)

```html
<template name="updateAddressBook">
  <form>
    <!-- More inputs would be needed for a full address -->
    <input type=text name="address1">

    {{> button
      type="submit"
      label="Update Address"
      data-event-action="updateAddress"
    }}
  <form>
</template>
```

```js
import { Meteor } from "meteor/meteor";

Template.updateAddressBook.events({
  "submit form"(event, instance) {
    const address = {
      // More fields needed for a full address
      address1: event.target.address1.value
    };
    const accountUserId = Meteor.userId();
    const type = "shipping";

    Meteor.call("accounts/addressBookUpdate", address, accountUserId, type, (error, result) => {
      if (error) {
        Alerts.toast("Couldn't update address", "error");
      }
    });
  }
});
```

### accounts/addressBookRemove

Remove existing address in user's profile

##### Example

```js
import { Meteor } from "meteor/meteor";

Meteor.call("accounts/addressBookRemove", addressId, accountUserId);
```

### accounts/inviteShopMember

Invite new administrative users

##### Example

```js
import { Meteor } from "meteor/meteor";

Meteor.call("accounts/inviteShopMember", shopId, email, name);
```

### accounts/sendWelcomeEmail

Send a welcome email to consumers

##### Example

```js
import { Meteor } from "meteor/meteor";

Meteor.call("accounts/sendWelcomeEmail", shopId, userId);
```

### accounts/addUserPermissions

Add user permissions.

##### Example

```js
import { Meteor } from "meteor/meteor";

Meteor.call("accounts/addUserPermissions", userId, permissions, group);
```

##### Parameters

| Parameter   | Type              | Description                                                                                                                     |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| userId      | String            | userId                                                                                                                          |
| permissions | Array, String     | Name of role/permission.  If array, users returned will have at least one of the roles specified but need not have _all_ roles. |
| group       | String            | Optional name of group to restrict roles to. User's Roles.GLOBAL_GROUP will also be checked.                                    |
| **Returns** | **Type**          | **Description**                                                                                                                 |
| Boolean     | success / failure |                                                                                                                                 |

### accounts/removeUserPermissions

Remove user permissions.

##### Example

```js
import { Meteor } from "meteor/meteor";

Meteor.call("accounts/removeUserPermissions", userId, permissions, group);
```

### accounts/setUserPermissions

Set user permissions.

##### Example

```js
import { Meteor } from "meteor/meteor";

Meteor.call("accounts/setUserPermissions", userId, permissions, group);
```
