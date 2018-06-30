---
id: version-v1.6.4-accounts
title: Accounts
original_id: accounts
---
    
The Accounts section is the place to manage user groups and associated permissions. Here, you can add members to specific groups, thus giving them privileges to perform actions. By default the Accounts dashboard shows default admin groups (i.e Owner and Store Managers) and users belonging to each.

Before getting started, make sure you are logged in as an operator and click the <i class="font-icon fa fa-users"></i> **Accounts** icon in the Dashboard sidebar.

![](/assets/admin-accounts-dashboard-groups.png "Accounts Dashboard showing default admin groups and an admin created group")

## Add a Store Member

To add a new member to your store, click on the "Add User" icon, located on the upper right-hand side of the Accounts card.

Enter the user's name and email address in the fields below, and an invitation will be sent via email.


## Add an User to a Permission Group

![](/assets/admin-accounts-dashboard-add-user.png "Reaction Commerce Dashboard")

To add an account to a group:

1. Click on user the "Add Admin User" on the right section.
2. Enter the user's name and email address in the fields.
3. Select Group to invite to and send. If an account with the email already exist, it is given the permissions of the group. If no account exists for the email, a new account is created under the specified group.

An email is sent to the email in either of the two scenarios to notify the user of the change.

### Default Admin groups

There are two default admin groups that come with Reaction Core:

#### 1. Owner group

This is a special group for the "owner" of a store. This group has all the permissions available in the app. There can only be one user per store.

Store owners can:

* Move a user from one group to the other, except for the owner group.
* Assign another user the owner of a store. This will move the current owner as to the user's group, because there is only one store owner.

#### 2. Shop Manager group

This group possess almost all the permissions of an owner. A user in the store manager group can act on behalf of the owner in most cases.


## Managing group permissions

Store Owners and users with permission to the Accounts dashboard have the ability to:

- Create new groups under the "Edit Groups" section
- Add users to new groups
- Add or remove permissions from groups
- If the group has permissions that are a superset of another group's permission, then the admin can invite a user to that group.
