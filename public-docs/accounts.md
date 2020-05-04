---
id: accounts
title: Accounts
---
    
The Accounts section is the place to manage user groups and invite shop owners or managers. Here, you can add members to specific groups, thus giving them privileges to perform actions. By default the Accounts dashboard shows default admin groups (i.e Owner and Store Managers) and users belonging to each.

Before getting started, make sure you are logged into `reaction-admin` (on [localhost:4080](http://localhost:4080) if you're running it locally), and click the <i class="font-icon mdi mdi-account-multiple"></i> **Accounts** link in the left sidebar.

![](/assets/reaction-admin-accounts.png "Accounts Dashboard showing default admin groups and an admin created group")

## Add a Store Manager or Owner

To add a new member to your store, click on the "Manage Groups" button, located on the upper right-hand side of the Accounts page.

Enter the user's name and email address, pick a role between "Owner" and "Shop Manager," and an invitation will be sent via email.

### Default Admin groups

There are two default admin groups that come with Reaction Core:

#### 1. Owner group

This is a special group for the "owner" of a store. This group has all the permissions available in the app. There can only be one user per store.

Store owners can:

- Move a user from one group to the other, except for the owner group.
- Assign another user the owner of a store. This will move the current owner as to the user's group, because there is only one store owner.

#### 2. Shop Manager group

This group possess almost all the permissions of an owner. A user in the store manager group can act on behalf of the owner in most cases.

## Managing group permissions

Store Owners and users with permission to the Accounts dashboard have the ability to:

- Create new groups under the "Edit Groups" section
- Add users to new groups
- Add or remove permissions from groups
- If the group has permissions that are a superset of another group's permission, then the admin can invite a user to that group.
