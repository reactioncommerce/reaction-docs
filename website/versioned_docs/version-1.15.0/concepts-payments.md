---
title: Payments
id: version-1.15.0-concepts-payments
original_id: concepts-payments
---

A **"payment"** describes information attached to an order fulfillment group, which represents a way of paying for that part of the order after it has been fulfilled.

## Payment Plugins and Payment Methods

Reaction Commerce does not provide any payment methods in the core system. All payment methods are added by payment plugins, which are extra code you add to the payment service to fit your needs.

We provide and support two payment plugins: **Stripe** and **IOU**.

The IOU plugin provides a single payment method: “iou”. This method works without any configuration but is most likely not an acceptable solution in production since it requires only a name and billing address as “payment”. It is intended as a simple example for demos. Refer to the IOU plugin documentation for details.

The Stripe plugin currently provides a single payment method, “stripe_card”, but will eventually provide others. You must create a Stripe account to use it. Refer to the [Stripe plugin documentation](https://stripe.com/docs) for details.

## Payment Input

**Payment input** is needed to create an order. It represents all information necessary to create a charge. What exactly this means depends on the payment method. For example, for the “stripe_card” payment method, a billing address and a Stripe card token is needed.

During checkout, the shopper chooses a payment method (if there are more than one available) and enters any information required by that method. That payment input is then saved temporarily on the client and used to create the order at the end of the checkout flow.

## Payments

When a client creates an order, it passes collected payment input along with the order. The payment plugin will then create one payment (also referred to as a "charge") per fulfillment group on the order.

A single order can have multiple payments. This allows you to capture each payment as the related items are shipped, picked up, downloaded, or otherwise fulfilled. What **"capture"** means is dependent on the payment method that was used. For a credit card payment, it means actually charging the card. For an invoice payment method, it might mean sending the invoice.

After an order with one or more payments is created, the status of those payments will change as the order progresses. Usually, payments are initially **“authorized”** and eventually become **“refunded”**, **“canceled”**, **“captured”**, or **“voided”**.
