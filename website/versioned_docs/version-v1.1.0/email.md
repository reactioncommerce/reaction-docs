---
original_id: email
id: version-v1.1.0-email
title: Email
---

Reaction sends emails for a variety of reasons (user signup, password reset, order receipts, etc.), so you will need to configure an email provider to send emails. Because Reaction is built on top of [Node.js](https://nodejs.org), email sending is not natively supported directly from the server. Reaction needs to send email via a mail provider using the [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) protocol. You can [read more about why](https://nodemailer.com/2-0-0-beta/setup-smtp/smtp-say-what/) from the documentation of the underlying email package we use called [Nodemailer](https://github.com/nodemailer/nodemailer). Some examples of SMTP providers are [Mailgun](https://www.mailgun.com/), [Mandrill](https://www.mandrill.com/), or [Sendgrid](https://sendgrid.com/). You can use any of the [providers supported by Nodemailer](https://github.com/nodemailer/nodemailer-wellknown#supported-services) or you can define your own custom SMTP settings (more info below).

## Configuration

Once logged in as a shop admin, you can find the email settings under the Actions section of your shop's side panel.

![](/assets/admin-dashboard-panel-home.png "Email Configuration")

### Email Dashboard

![](/assets/admin-email-logs.png "Email Settings")

On the left is the real-time status of your current email settings. Once you have saved settings, they will be tested and their status will be reflected in the top of that panel by showing a green light if they work or a red light if they don't work (or if they are missing, like you see above).

On the right is the email logs table. Once your shop is sending emails, you will see logs appear there. If an email fails to send for some reason, you will see a button that will allow you to attempt to resend the failed email. Emails are scheduled with a job queue, so failed emails will automatically attempt to resend up to 5 times (with 3 minutes between each retry).

Let's get things configured...

### Using a provider preset

Click the gear icon to open the settings menu.

![](/assets/admin-email-config-2.png "Email Settings")

For this example, we will be setting up [Mailgun](https://www.mailgun.com/), but feel free to use any provider that you prefer. If you would like to follow along, see the [Mailgun documentation](https://documentation.mailgun.com/quickstart.html) for how to set up your account and get your SMTP credentials.

After you have done that, you can simply choose Mailgun from the services dropdown and then add your SMTP user and password. Once you have added your settings, click save. Reaction will immediately test your settings before saving them and will show an alert if your settings fail. If the verification succeeds, the settings will save and you should see the status indicator change to green and the configuration panel will show your new settings.

Reaction is now ready to send emails!

### Custom Settings

If your preferred mail provider is not in the list, you can opt to set custom SMTP settings. First, select "Custom" from the services dropdown menu. Once you have done that, you should see two new form fields appear for "host" and "port".

To demonstrate this option, we'll use the same settings from earlier, but this time without using the Mailgun preset. First, manually enter the host and port values into the form as shown below, then click save. The settings will be tested and save and the status indicator should confirm that the settings worked. Any SMTP server is supported (including self-hosted), so this is the most flexible option available if you have a unique use case.

### Advanced

Reaction also allows you to override the settings outlined above with two other possible methods: [Meteor settings](http://docs.meteor.com/api/core.html#Meteor-settings) or [environment variables](https://en.wikipedia.org/wiki/Environment_variable). If you're not sure what either of these is, you should probably just stick to the dashboard configuration discussed above.

#### Meteor Settings

You can override the mail settings in the dashboard by adding an SMTP mail URL to your Meteor settings file.

```js
// settings.json

{
  "MAIL_URL": "smtp://username:password@example-mail-host.com:465"
}
```

#### Environment Variable

Finally, you can override all of the above mail settings by setting the `MAIL_URL` environment variable to an SMTP URL.

```sh
# set the environment
export MAIL_URL="smtp://username:password@example-mail-host.com:465"

# or add it before the Reaction command
MAIL_URL="smtp://username:password@example-mail-host.com:465" reaction
```
