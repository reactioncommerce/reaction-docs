# Accounts

The Accounts section is the place to manage user groups and associated permissions. Here, you can add members to specific groups, thus giving them privileges to perform actions. By default the Accounts dashboard shows default admin groups (i.e Owner and Shop Managers) and users belonging to each.

![](/assets/admin-accounts-dashboard-groups.png "Accounts Dashboard showing default admin groups and an admin created group")

## Default Admin Groups

#### Owner Group

This is a special group for the "owner" of a shop. This group has all the permissions available in the app. There can only be one user per shop.

#### Shop Manager Group

This group possess almost all the permissions of an owner. A user in the shop manager group can act on behalf of the owner in most cases.

## Add an Account to a Group

![](/assets/admin-accounts-dashboard-add-user.png "Reaction Commerce Dashboard")

To add an account to a group:

1. Click on user the "Add Admin User" on the right section.
2. Enter the user's name and email address in the fields.
3. Select Group to invite to and send. If an account with the email already exist, it is given the permissions of the group. If no account exists for the email, a new account is created under the specified group.

An email is sent to the email in either of the two scenarios to notify the user of the change.


## Changing a User's Group

* As a shop owner, you can move a user from one group to the other, except for the owner group.
* As a shop owner, you can make another user the owner of a shop. This will remove you as the current owner to the user's group, because there is only one shop owner.
* As a shop admin, you can add a user to a group which you have the required permissions to act in. If your group has permissions that are a superset of another group's permission, then you can invite a user to that group.

## Manage Groups

Shop Owners and users with permission to the Accounts dashboard can create new groups under the "Edit Groups" section. After creating a group, it becomes available in the "Add Admin User" section, for adding users to the group. You can also add or remove permissions from a group. The added permissions then reflects on the users under the group.
