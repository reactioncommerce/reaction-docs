---
id: version-v1.7.0-products
title: Products
original_id: products
---
    
What the store operator sees, the customer sees. Create, edit, preview and publish products inline, right on the Product Detail Page (PDP) itself. At any time in Reaction's Product Detail Page and Product Grid pages, click on **Edit Mode** at the top to toggle between the customer view and admin view.

## Creating a product

![](/assets/admin-product-details-page.png "Reaction's Product Detail Page (PDP)")

To create a product, login to your dashboard and follow these steps:

1. Click on the plus <i class="font-icon fa fa-plus"></i>, located on the top right. If you're not already in **Edit Mode**, clicking on the plus will put you in Edit Mode.

2. Now you will be in a Product Detail Page's **Edit Mode**, add product title, subtitle, vendor name, and description by clicking on each section and typing into the field. After typing and editing a field, a golden pencil <i class="font-icon fa fa-pencil"></i> status indicator appears to show that there are unpublished changes that need to be published.

3. To upload a product photo, click on the plus <i class="font-icon fa fa-plus"></i> on the photo placeholder. You can upload multiple photos at a time by selecting more than one. You can also drag and drop multiple photos into the box.

4. Editing social media sharing and tags from the sidebar: If your shop is connected to social media sharing, customize your product's social sharing messaging by clicking on the <i class="font-icon fa fa-pencil"></i> icon on the right of the product pricing.

5. Add product tags by clicking on the plus <i class="font-icon fa fa-plus"></i>, located under the **Tags** card.
    ![](/assets/admin-product-details-tag.png "Reaction's Product Page")

6. You can change the layout template, product title permalink, subtitle, vendor, description and origin country from the sidebar's top **Product Settings** option.

7. Click the **Publish** button on the top right to save Unpublished changes, indicated by the golden pencil i class="font-icon fa fa-pencil"> status indicators.

## Configuring your first Variant

Product Variants allow you to create different versions of the same base product. Perfect for products that come, for example, in multiple colors.

Every product comes filled with one default, required variant. To create more:
1. Click the <i class="font-icon fa fa-pencil"></i> icon, located under the **Options** card.
2. Fill out the following fields in the **Edit Variant** panel:

- **Label** - Required. A description of your variant, which appears in the under the **Options** label on the Product Detail Page.
- **Origin country** - Optional. A drop-down menu of countries.
- **Weight** - Optional. The weight of your item, which will help determine shipping costs.
- **MSRP (Manufacturer's suggested retail price)** - Optional. The suggested retail price of your product.
- **Price** - Required. The price that you are actually selling your product.
- **Width, Length, Height, Weight** - Optional. The size of your product
- **Taxable** - Optional. Check this box to automatically add tax to this item when purchased. Add Tax Code and Tax Description for more options.
- **Inventory tracking** - Optional. Check this box if you'd like to track this item in your inventory.
- **Warn at** - Optional. Adds the `Limited Supply` badge on the Product Grid when quantity is lower than this number.
- **Allow Backorder** - Optional. Allows customers to backorder the product.

3. Click the **Publish** button on the top right to save Unpublished changes.

## Adding more product Variant Options

Variant Options provide a second layer of customization on top of each variant. For instance, in addition to carrying shirts in multiple colors, you may also want to carry multiple size options for each color. Use this flexible structure to customize your products however you like.

1. Click on the <i class="font-icon fa fa-plus"></i> button to the right of the **Variant Options** section.
2. Add the Variant Option's **Label**, **Short Label**, **Quantity** and **Price**. **Label** is displayed in cart, checkout and orders. **Short Label** is displayed on the Product Detail Page. All fields are required.
3. Keep adding more options by clicking the <i class="font-icon fa fa-plus"></i> button.
4. Click the **Publish** button on the top right to save Unpublished changes.

## Adding product images

To add an image gallery to your product, drag and drop files from your computer the main Product page. You may also upload images using the "Drop file to upload” button under each Variant Option.

Currently, only image file types are supported, but support for video, Google Drive, Dropbox, and more are in the works. See [Issue #50](https://github.com/reactioncommerce/reaction/issues/50) and [Issue #69](https://github.com/reactioncommerce/reaction/issues/69).

Once you have images added to your gallery, drag and drop to change their position.

![](/assets/admin-product-variant-3.png "Reaction Commerce Product Media")

## Adding product Tags and Details

To get back to the product detail and tag editing panel:

1. Click on the <i class="font-icon fa fa-pencil"></i> next to the product price.
2. Click **Tags** to add, remove or rearrange product tags. Tags are links displayed below the images section. Clicking on a tag link leads the customer to a page listing all of the products with that tag. Tags can be linked to the top navigation bar.
3. Click **Details** to add or remove product details. Details are displayed under the Tags section as static text in a table.

## Discounting products

Reaction supports discount codes and rates. Read more about discounting products in the [Dashboard's Payment section](payments-discounts.md).

## Archiving and restoring a product

To remove an entire product from your inventory:

1. Click on the **Archive** button <i class="rui font-icon fa fa-archive"></i>.
2. Select Archive to confirm.

![](/assets/admin-product-delete.png "Reaction remove product")

3. Click the **Publish** button on the top right to save Unpublished changes.

To restore an archived product:

1. Archived products can be restored
