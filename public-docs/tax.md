---
id: tax
title: Tax
---

Reaction has a pluggable tax system. The core cart and order services know that some items may need sales tax collected when the order is placed, but they rely on separate tax services to determine whether the item is taxable, at what rate, and in which jurisdictions.

You may use the included tax rates plugin, install a community plugin, or create your own. Typically, a plugin that provides a tax service will simply delegate to a third-party service API such as [Avalara](https://www.avalara.com) or [TaxJar](https://www.taxjar.com/).

## Enable a tax service

1. In `reaction-admin` (on [localhost:4080](http://localhost:4080) if you're running it locally), got to Settings > Taxes.
2. Each tax service may have settings in the panel and/or may require that certain environment variables be set. Before enabling a service, verify that you've properly configured all of this. (For the included "Custom Rates" service, see below.)
3. Near the top of the tax panel, select a service as the active service for your shop, and click Save.

## Configure the Custom Rates tax service

The Custom Rates tax service allows you to manually enter tax rates and the country, region, and/or postal code for which they apply.
- It does not currently have multiple classifications for the products you sell.
- Products can be marked taxable or not taxable, but this applies equally to all jurisdictions in which tax is collected.
- Tax is collected based only on the order destination address matching a tax jurisdiction.
- If multiple tax jurisdictions match the order destination address, multiple taxes are calculated and collected.

### Add a tax jurisdiction

1. In the "Custom Tax Rates" section, notice there is a table of existing rates. Click the "New Tax Rate" button beneath it to add one.
2. Choose the country in which the tax jurisdiction resides.
3. If the tax jurisdiction is smaller than a country, choose the region and/or postal code of the jurisdiction. If tax needs to be collected in some but not all postal codes of a region, you will need to create one jurisdiction for each postal code.
4. Finally, enter the sales tax rate as percentage, to be applied to all taxable products that are shipped to this jurisdiction.
5. Click **Save**.

### Edit or delete a tax jurisdiction

1. In the "Custom Rates" section, notice there is a table of existing rates. Click any row to edit that jurisdiction.
2. To edit, modify the form as necessary and click **Save changes**.
3. To delete, click **Delete**.

> If you delete a tax jurisdiction, shopping carts that already have the tax included will still have it until their tax total is recalculated, which happens when the order is placed.
