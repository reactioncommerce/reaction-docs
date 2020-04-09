---
id: version-3.0.0-email-admin
title: Configuring Email Sending
original_id: email-admin
---

Reaction sends emails for a variety of reasons (user signup, password reset, order receipts, etc.), so you will need to configure an email provider to send emails. You can use any SMTP server to send e-mails.

This guide will cover how to set up your transactional emails your own custom SMTP settings.

## Configuring your email provider

You can configure your own custom SMTP settings by setting the `MAIL_URL` environment variable to an SMTP URL (in `<PROJECT_ROOT>/reaction/.env` on a local development setup). Any SMTP server is supported, including self-hosted.

```sh
MAIL_URL="smtp://username:password@example-mail-host.com:465"
```

Reaction is now ready to send emails!

## Checking email logs

All e-mails sent by Reaction Commerce are logged. The e-mail send logs are available in `reaction-admin` (on [localhost:4080](http://localhost:4080) if you're running it locally), in Settings > Email.

### Confirming email status

Once your shop is sending emails, a log will appear for each transactional email.

### Resending a failed email

If an email fails to send, you will see a button that will allow you to attempt to resend the failed email. Emails are scheduled with a job queue, so failed emails will automatically attempt to resend up to 5 times, with 3 minutes between each retry.
