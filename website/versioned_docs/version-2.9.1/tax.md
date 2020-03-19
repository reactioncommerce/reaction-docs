---
id: version-2.9.1-tax
title: Tax
original_id: tax
---

Reaction has a pluggable tax system. The core cart and order services know that some items may need sales tax collected when the order is placed, but they rely on separate tax services to determine whether the item is taxable, at what rate, and in which jurisdictions.

You may use the included tax rates plugin, install a community plugin, or create your own. Typically, a plugin that provides a tax service will simply delegate to a third-party service API such as [Avalara](https://www.avalara.com) or [TaxJar](https://www.taxjar.com/).

## Enable a tax service

1. Open the <i class="rui font-icon fa fa-university"></i> **Tax** panel.
2. Each tax service may have settings in the panel and/or may require that certain environment variables be set. Before enabling a service, verify that you've properly configured all of this. (For the included "Custom Rates" service, see below.)
3. Near the top of the tax panel, in the `Shop Tax Settings` section, select a service as the primary service for your shop, and click Save. You can optionally select another service to act as a fallback service.

> A fallback service is used to calculate the tax when the primary service returns a `null` result. This could be due to errors from the plugin configuration or a network failure. The tax plugin is expected to handle such errors and returns a `null` result when appropriate to allow the fallback service to kick in.

## Configure the Custom Rates tax service

The Custom Rates tax service allows you to manually enter tax rates and the country, region, and/or postal code for which they apply.
- It does not currently have multiple classifications for the products you sell.
- Products can be marked taxable or not taxable, but this applies equally to all jurisdictions in which tax is collected.
- Tax is collected based only on the order destination address matching a tax jurisdiction.
- If multiple tax jurisdictions match the order destination address, multiple taxes are calculated and collected.

### Add a tax jurisdiction

1. Open the <i class="rui font-icon fa fa-university"></i> **Tax** panel.
2. In the "Custom Rates" section, notice there is a table of existing rates. Click the "+" button beneath it to add one.
3. Choose the country in which the tax jurisdiction resides.
4. If the tax jurisdiction is smaller than a country, choose the region and/or postal code of the jurisdiction. If tax needs to be collected in some but not all postal codes of a region, you will need to create one jurisdiction for each postal code.
5. Finally, enter the sales tax rate as percentage, to be applied to all taxable products that are shipped to this jurisdiction.
6. Click **Save changes**.

### Edit or delete a tax jurisdiction

1. Open the <i class="rui font-icon fa fa-university"></i> **Tax** panel.
2. In the "Custom Rates" section, notice there is a table of existing rates. Click any row to edit that jurisdiction.
3. To edit, modify the form as necessary and click **Save changes**.
4. To delete, click **Delete**.

> If you delete a tax jurisdiction, shopping carts that already have the tax included will still have it until their tax total is recalculated, which happens when the order is placed.
