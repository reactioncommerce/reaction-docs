---
id: merchant-shop-setup
title: Merchant Shop Setup
---
    
This guide will dive into the steps needed by both the marketplace owner, and marketplace merchant's shop.

## Prerequisites

The marketplace owner must have completed the following before proceeding with this guide.

1. Enabled marketplace in "Shop Settings"
2. Enabled the Stripe payment method in "Payment Methods"
3. Make sure the [Stripe Connect](https://dashboard.stripe.com/applications/overview) account's redirect URI is set to:  `https://<yourdomain>/stripe/connect/authorize`

Tip: In case you want to test Stripe Connect with your locally running Reaction, you may be interested in setting up a tunnel to localhost using a tool like [ngrok](https://ngrok.com/):
```sh
npx ngrok http 3000
```

This should start you a ad-hoc tunnel for testing purposes. The output should look similar to this:
![](/assets/admin-marketplace-ngrok.png)

In that case the redirect URL would be: <https://9052dd64.ngrok.io/stripe/connect/authorize>

## Invite a seller

As the marketplace owner, these are the steps I must complete to invite a merchant shop owner.

### Invite merchant shop owner

With Marketplace enabled, invite a new shop owner using the Marketplace invite owner form.

![](/assets/admin-merchant-invite.png "Reaction's Invite Owner Form")

### Activate new shop

After submitting the invite owner form, go to the "Marketplace Shops" settings panel and set the shop to active.

![](/assets/admin-merchant-enable.png "Reaction's Merchant Shop Admin")

## Seller shop onboarding

As a user, whom was invited as a seller in a marketplace, these are the minimum steps I must complete to have a working shop.

### Invitation email

Accept the invitation in the email to get started.

![](/assets/admin-merchant-email.png "Email invitation to start selling in the marketplace")

### Set your password

You will be prompted to set your password for the first time.

![](/assets/admin-merchant-onboarding-1.png "Merchant onboarding step 1 - set email")

### Set up shop settings

Go to shop settings and update general shop info.

![](/assets/admin-merchant-onboarding-2.png "Merchant onboarding step 2 - udpate stop general settings")

### Set an address

Go to the address form and input an address. This is required to use the stripe merchant account.

![](/assets/admin-merchant-onboarding-3.png "Merchant onboarding step 3 - update shop address")

### Start accepting payments

Go to "My Shop Settings" and click on "Start Accepting Payments".

![](/assets/admin-merchant-onboarding-4.png "Merchant onboarding step 4 - setup stripe")
