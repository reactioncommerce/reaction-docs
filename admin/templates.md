# Templates

## Email Templates
Reaction comes preloaded with email templates that are sent out with various user actions, such as Password Resets, Order Completion, and Shipping Notifications. These Templates are loaded into the `Templates` collection on startup. Details about this process are found in the [Developer Docs](/developer/themes/register-email.md).

The Templates are then available to be customized inside your Dashboard.

![](/assets/admin-email-templates-list.png "Email Templates List")

**Editable fields:**  
`Title`: A user friendly name so you know what email you are editing  
`Subject`: The email subject line. Blaze variables are allowed, granted they are passed to the SSR function ([see Developer Docs](/developer/themes/register-email.md)).  
`HTML`: The main content of the email. Blaze variables are allowed, granted they are passed to the SSR function ([see Developer Docs](/developer/themes/register-email.md)).

**Non-editable fields:**  
`Name`: Function name that is used to trigger an email sent  
`Language`: Language of the email. Currently, only the shop default is available.

![](/assets/admin-email-templates-editing.png "Edit Email Templates")
