---
id: version-v1.7.0-email-admin
title: Email
original_id: email-admin
---
    
Reaction sends emails for a variety of reasons (user signup, password reset, order receipts, etc.), so you will need to configure an email provider to send emails.

You can use any of the [providers supported by Nodemailer](https://github.com/nodemailer/nodemailer-wellknown#supported-services), including [Mailgun](https://www.mailgun.com/), [Mandrill](https://www.mandrill.com/), or [Sendgrid](https://sendgrid.com/), or you can define your own custom SMTP settings.

This guide will cover how to set up your transactional emails with a supported provider and how to define your own custom settings.

## Configuring your email provider

Once logged in as a shop admin, under **Actions**, click the <i class="font-icon fa fa-envelope"></i> **Email** icon.

### Using a provider preset

1. Create an email provider account and get your SMTP credentials. In this example, we will use [Mailgun](https://www.mailgun.com/). See the [Mailgun documentation](https://documentation.mailgun.com/quickstart.html).
2. Go to the Reaction dashboard and click the **envelope icon** to open your email settings.
3. Under **Mail Provider**, click the **gear icon** to open the **Edit Settings** menu.
4. Click the **Provider Name** dropdown menu and search for your email provider. In this example, choose Mailgun.
5. Fill out your **User** and **Password** from your provider. Click **Save**.

### Using custom settings

If your preferred mail provider is not in the list, you can configure your own custom SMTP settings. Any SMTP server is supported, including self-hosted.

1. Select **Custom** from the services dropdown menu.
2. Fill out the **Host** and **Port** fields, along with the **User** and **Password** fields. Click **Save**.

## Verifying your email settings

Once you save your Mail Provider credentials, Reaction will immediately test your settings.

If the verification succeeds, the settings will save and the **Status** indicator change under **Mail Provider** will change from red to green.

Reaction is now ready to send emails!

## Checking email logs

### Confirming email status

Once your shop is sending emails, a log will appear for each transactional email.

### Resending a failed email

If an email fails to send, you will see a button that will allow you to attempt to resend the failed email. Emails are scheduled with a job queue, so failed emails will automatically attempt to resend up to 5 times, with 3 minutes between each retry.

## Advanced: Overriding settings in the code

Reaction also allows you to override the settings outlined above with two other possible methods: [Meteor settings](http://docs.meteor.com/api/core.html#Meteor-settings) or [environment variables](https://en.wikipedia.org/wiki/Environment_variable). If these sound unfamiliar to you, we recommend using the dashboard configuration discussed above.

### Meteor settings

You can override the mail settings in the dashboard by adding an SMTP `MAIL_URL` to your Meteor settings file.

```js
// settings.json

{
  "MAIL_URL": "smtp://username:password@example-mail-host.com:465"
}
```

### Environment variable

Finally, you can override all of the above mail settings by setting the `MAIL_URL` environment variable to an SMTP URL.

```sh
# set the environment
export MAIL_URL="smtp://username:password@example-mail-host.com:465"

# or add it before the Reaction command
MAIL_URL="smtp://username:password@example-mail-host.com:465" reaction
```
