---
id: shipping-admin
title: Shipping
---

Reaction comes with a simple flat rate shipping plugin. To manage your shipping rates, head to `reaction-admin` (on [localhost:4080](http://localhost:4080) if you're running it locally) click on **Shipping** under the <i class="rui font-icon fa fa-cog"></i> **Settings** section in the sidebar.

Your store comes with three default shipping methods: `Free`, `Standard`, and `Priority`. To edit any of these rates, click on the row. To delete a rate, click on **Delete**.

Confused? See [Concepts: Fulfillment](concepts-fulfillment.md)

## Adding a new shipping method

![](/assets/reaction-admin-shipping.png "Reaction Commerce Shipping")

1. Click the plus <i class="font-icon fa fa-plus"></i>.
2. Fill out the following:

    - Method Name: A unique (per shop) identifier
    - Cost: The cost, as a shop owner, to ship this item.
    - Public Label: How your rate name appears to your customers.
    - Handling: The handling price to charge for this shipping method at checkout.
    - Group: Choose `Ground`, `Priority`, `One Day` or `Free`.
    - Rate: The shipping price to charge for this shipping method at checkout.
    - Enabled: Check this to enable this option.

3. Click **Save Changes**.
