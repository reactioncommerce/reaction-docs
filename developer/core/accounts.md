# Accounts
The [reaction-accounts](https://github.com/reactioncommerce/reaction/tree/development/packages/reaction-accounts) package extends Meteor [accounts](http://guide.meteor.com/accounts.html) with Reaction specific UI and behavior.
- _Accounts_ collection
- dropdown accounts ui
- inline accounts ui
- user profile
- user management
- address book CRUD

## Account methods
### accounts/addressBookAdd
Add new addresses to an account

```js
Meteor.call("accounts/addressBookAdd", address, accountUserId);
```

### accounts/addressBookUpdate
Update existing address in user's profile

```js
/**
 * accounts/addressBookUpdate
 * @description update existing address in user's profile
 * @param {Object} address - address
 * @param {String|null} [accountUserId] - `account.userId` used by admin to
 * edit users
 * @param {shipping|billing} [type] - name of selected address type
 * @return {Number} The number of affected documents
 */
Meteor.call("accounts/addressBookUpdate", address, accountUserId, type);
```

### accounts/addressBookRemove
Remove existing address in user's profile

```js
Meteor.call("accounts/addressBookRemove", addressId, accountUserId);
```

### accounts/inviteShopMember
Invite new administrative users

```js
Meteor.call("accounts/inviteShopMember", shopId, email, name);
```

### accounts/sendWelcomeEmail
Send a welcome email to consumers

```js
Meteor.call("accounts/sendWelcomeEmail", shopId, userId);
```

### accounts/addUserPermissions
Add user permissions.

```js
/**
 * accounts/addUserPermissions
 * @param {String} userId - userId
 * @param {Array|String} permissions -
 *               Name of role/permission.  If array, users
 *               returned will have at least one of the roles
 *               specified but need not have _all_ roles.
 * @param {String} [group] Optional name of group to restrict roles to.
 *                         User"s Roles.GLOBAL_GROUP will also be checked.
 * @returns {Boolean} success/failure
 */
Meteor.call("accounts/addUserPermissions", userId, permissions, group);
```

### accounts/removeUserPermissions
Remove user permissions.

```js
Meteor.call("accounts/removeUserPermissions", userId, permissions, group);
```

### accounts/setUserPermissions
Set user permissions.

```js
Meteor.call("accounts/setUserPermissions", userId, permissions, group);
```
