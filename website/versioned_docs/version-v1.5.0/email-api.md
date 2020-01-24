---
id: version-v1.5.0-email-api
title: Email
original_id: email-api
---

Email sending in Reaction is handled by [Nodemailer](https://github.com/nodemailer/nodemailer) and the use of any SMTP server is supported. See the [configuration documentation](email-admin.md) for details on how to set up mail in the admin dashboard.

All emails that are sent from Reaction are added to a job queue for both logging and failure handling (see [vsivsi:job-collection](https://github.com/vsivsi/meteor-job-collection) for full API docs). While you can add jobs directly to the queue, it is recommended that you use the API outlined below to send emails.

## API

All server side email methods (except Meteor methods) are available in the `Reaction.Email` namespace.

### Reaction.Email.getMailUrl()

If mail is configured, returns an SMTP URL string.

The following settings are checked in the order shown and the first one that is found with all required parts (host, port, user, password) will be used. See [email configuration](email-admin.md) for more information.

-   `MAIL_URL` environment variable
-   `Meteor.settings.MAIL_URL`
-   Mail settings saved in the `core` plugin settings

### Reaction.Email.getMailConfig()

If mail is configured, returns a [Nodemailer](https://github.com/nodemailer/nodemailer) configuration object.

The following settings are checked in the order shown and the first one that is found with all required parts (host, port, user, password) will be used. See [email configuration](email-admin.md) for more information.

-   `MAIL_URL` environment variable
-   `Meteor.settings.MAIL_URL`
-   Mail settings saved in the `core` plugin settings

**Example Nodemailer config**

```js
{
  host: "smtp.mailgun.org",
  port: 587,
  secure: true,
  auth: {
    user: "someUsername",
    pass: "somePassword",
  }
}
```

If no mail settings are found, a "direct" mail config will be returned and Nodemailer will attempt to connect directly to the destination SMTP server that the email is being sent to. This is purely a fallback option and is extremely unlikely to be a reliable way to send email. Many ISP's block the required ports and many mail servers filter incoming mail from unknown SMTP servers to the recipient's spam folder.

The "direct" config looks like this:

```js
{
  direct: true
}
```

### Reaction.Email.send(options)

Adds an email sending job to the queue. Jobs are processed immediately in the order they are added. Failures are retried 5 times, with a 3 minute wait between each try.

**options** `{Object}` (required)

(all fields required, email job will fatally fail if any are missing)

-   `to` - email address to send to
-   `from` - email address that will appear to have sent the email
-   `subject` - the email subject
-   `html` - the HTML or plain text content of the email

#### Reaction.Email.getTemplate(template)

Returns an email template as a `String` for server side rendering of an email body.

**template** `{String}` (required)

The `template` name passed in is used to find a template in either the `Templates` collection in the database or the provided email templates in the filesystem. The convention is to name templates based on the folder/file structure relative to [/private/email/templates](https://github.com/reactioncommerce/reaction/tree/v1.5.0/private/email/templates). For example, to get the template used for inviting a shop member, you would use:

```js
const tmpl = Reaction.Email.getTemplate("accounts/inviteShopMember");
```

That would first try to find a template in the `Templates` collection with that name and the current locale/language like this:

```js
Templates.findOne({
  template: "accounts/inviteShopMember",
  language: "en" // shop locale checked to get this value
});
```

If no template is found, it will fallback to the default template in the filesystem at [/private/email/templates/accounts/inviteShopMember.html](https://github.com/reactioncommerce/reaction/blob/v1.5.0/private/email/templates/accounts/inviteShopMember.html) using [Meteor's Assets API](http://docs.meteor.com/api/assets.html).
