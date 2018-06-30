---
id: version-v1.5.0-template
title: Template
original_id: template
---
    
Reaction comes preloaded with email templates that are sent out with various user actions, such as Password Resets, Order Completion, and Shipping Notifications.

These Templates are loaded into the `Templates` collection on startup. Details about this process are found in the [Developer Docs](register-email.md).

The Templates are then available to be customized inside your Dashboard.

![](/assets/admin-email-templates-list.png "Email Templates List")

## Reaction's transactional emails

-   Accounts: Invite Shop Member
-   Accounts: Reset Password
-   Accounts: Verify Password
-   Accounts: Welcome Email
-   Orders: New Order Placed
-   Orders: Order Refunded
-   Orders: Order Shipped

## Updating email templates

You can edit an email's subject line, title and basic content with HTML. Click on the **Templates** <i class="rui font-icon fa fa-columns"></i> to get started.

### Editable fields

-   `Title`: A user friendly name so you know what email you are editing
-   `Subject`: The email subject line. Blaze variables are allowed, granted they are passed to the server-side rendering function ([see Developer Docs](register-email.md)).
-   `HTML`: The main content of the email. Blaze variables are allowed, granted they are passed to the SSR function ([see Developer Docs](register-email.md)).

### Non-editable fields

-   `Name`: Function name that is used to trigger an email sent
-   `Language`: Language of the email. Currently, only the shop default is available.

![](/assets/admin-email-templates-editing.png "Edit Email Templates")
