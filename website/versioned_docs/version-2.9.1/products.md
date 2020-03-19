---
id: version-2.9.1-products
title: Products
original_id: products
---

Create, edit, and publish products to the catalog from the **Products** section of the Operator UI.

## Creating a product

![](/assets/operator-ui-product-list.png "Product list")

To create a product, login to your dashboard and follow these steps:

1. Click on the **Products** navigation item in the left hand navigation bar.

2. Click on **Create Product** to create a product.

3. You can change the product title permalink, subtitle, vendor, description and origin country and more from the **Details** card.
  ![](/assets/operator-ui-product-detail.png "Reaction's Product Details")

3. To add images, click the **Drag image or click to upload** button. Once uploaded you'll be able to set the order of the media with the **Order** fields.
  ![](/assets/operator-ui-product-media.png "Product media")

4. You can customize your product's social sharing messaging under the **Social** card.

5. Add product tags by filling in the **Add tag** field and pressing the **enter/return** key or by clicking on the plus <i class="font-icon mdi mdi-plus"></i> button.
  ![](/assets/operator-ui-product-tags.png "Product tags")

6. Click the **Publish** button on the top right to save unpublished changes.


## Publishing your changes

![](/assets/operator-ui-product-publish.png "Reaction product publish")

Your changes are auto-saved, but are not immediately visible to customers. Publishing your changes with the **Publish** button, will take all changes since the last publish and make them visible to customers. Products may be to be made **Not Visible** which will hide the product from customers, even if it's published.

1. After making some changes to a product

2. Click the **Publish** button on the top right to publish changes to your catalog.

## Unpublishing your changes

Products published to the Catalog cannot be unpublished. They may be hidden from the storefront using the visibility controls outlined in the [Hiding and showing products from your storefront](#hiding-and-showing-products-from-your-storefront) section.

## Configuring your first Variant

Product Variants allow you to create different versions of the same base product. Perfect for products that come, in multiple colors, sizes, shapes, etc.

Every product comes filled with one default, required variant. To create more:
1. Click the <i class="font-icon mdi mdi-plus"></i> icon located at the top of the **Variants** card.
  ![](/assets/operator-ui-product-variant-add.png "Adding a product variant")

2. Fill out the following fields in the edit **Variant** panel:

- **Attribute label** - Required. The attribute label describes the category of variant, for example, "Color" or "Size". In most cases this will be the same for all variants at the same level.
- **Short title** - Required. The short title is the value for the attribute label. For example, a variant with attribute label "Color" might have short title "Red". This is usually shown in a select list or button set on a product detail page in your storefront.
- **Title** - Required. The full title is usually shown on cart, checkout, and order summaries and on invoices. It should fully describe the configured variant. For example, if this is an option with short title "Large", its parent variant has short title "Red", and the product title is "Fancy T-Shirt", then a good title might be "Fancy T-Shirt - Red - Large".
- **Origin country** - Optional. A drop-down menu of countries.
- **Price** - Required. The price that you are actually selling your product.
- **Compare at price** - Optional. The suggested retail price of your product.
- **Width, Length, Height, Weight** - Optional. The size and weight of your product
- **Taxable** - Optional. Check this box to automatically add tax to this item when purchased. Add Tax Code and Tax Description for more options.
- **Inventory tracking** - Optional. Check this box if you'd like to track this item in your inventory.
- **Warn at** - Optional. Allows for `Limited Supply` notifications to be displayed on when quantity is lower than this number.
- **Allow Backorder** - Optional. Allows customers to backorder the product.

3. Click the **Publish** button on the top right to publish changes to your catalog.


## Adding more product Variant Options

Variant Options provide a second layer of customization on top of each variant. For instance, in addition to carrying shirts in multiple colors, you may also want to carry multiple size options for each color. Use this flexible structure to customize your products however you like.

1. Click on the <i class="font-icon mdi mdi-plus"></i> button to the right of the **Options** section at the of a **Variant**.
  ![](/assets/operator-ui-product-option-add.png "Adding a variant option")

2. Add the Variant Option's **Attribute Lanel**, **Label**, **Short Label**, **Quantity** and **Price**. **Label** is displayed in cart, checkout and orders. **Short Label** is displayed on the Product Detail Page. All fields are required.

3. Keep adding more options by clicking the <i class="font-icon mdi mdi-plus"></i> button.

4. Click the **Publish** button on the top right to save Unpublished changes.

## Adding product images

To add an image gallery to your product, drag and drop files from your computer the main Product page. You may also upload images using the **Drag image or click to upload** button under each Variant and Option.

Once you have images added to your gallery, use the **Order** field to set their position.

![](/assets/operator-ui-product-media.png "Product media")

## Discounting products

Reaction supports discount codes and rates. Read more about discounting products in the [Dashboard's Payment section](payments-discounts.md).

## Hiding and showing products from your storefront

Making products **Visible** or **Not Visible** will affect how they're seen on your storefront to customers. Visible products are visible to all customers, while products marked as **Not Visible** products will be hidden from customers. In some cases, and administrator signed into the storefront may still be able to see products marked as **Not Visible**.

These options are available for the top-level **Product**, each **Variant** and each **Option**. Hiding the product will remove the entire product from the storefront. Hiding a variant will hide that **Variant** and all **Options**, while hiding an individual **Option** will see that **Option** hidden.

To change change the visibility of a product, variant, or option:

1. Click on the <i class="font-icon mdi mdi-dots-horizontal-circle"></i> button below the product title in the header.
  ![](/assets/operator-ui-product-archive.png "Reaction product visibility")

2. Select **Make Hidden** or **Make Visible** and confirm.
  ![](/assets/operator-ui-product-make-hidden.png "Reaction make product hidden")

3. Click the **Publish** button on the top right to save Unpublished changes.

## Duplicating products, variant and options

Duplicating a product, variant or option will create a new copy of that item with it's children. It can be a useful tool speed up creation of similar products, variants, or options.

To duplicate a product, variant, or option:

1. Click on the <i class="font-icon mdi mdi-dots-horizontal-circle"></i> button below the title in the header.
  ![](/assets/operator-ui-product-archive.png "Reaction duplicate product")

2. Select **Duplicate** and confirm.
  ![](/assets/operator-ui-product-duplicate.png "Reaction duplicate product")

3. Click the **Publish** button on the top right to save Unpublished changes.

## Archiving and restoring a product

Archiving **Products** is immediate upon confirmation, and is not reversible from the Operator UI. It may be a better to make the **Product** hidden with the **Make Hidden** option instead. Archiving may also applied to **Variants** and **Options**.

To remove an entire **Product**, **Variant**, or **Option** from your inventory:

1. Click on the <i class="font-icon mdi mdi-dots-horizontal-circle"></i> button below the product title in the header.
  ![](/assets/operator-ui-product-archive.png "Reaction archive product")

2. Select **Archive** and confirm.
  ![](/assets/operator-ui-product-archive-select.png "Reaction archive product selection")

3. Click the **Publish** button on the top right to save Unpublished changes.

To restore an archived **Product**, **Variant**, or **Option**:

1. Products cannot be restored through the Operator UI.