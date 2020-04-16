---
id: version-3.6.0-tagging
title: Introduction into tagging concept
original_id: tagging
---

Categorizing products is a very common scenario. Reaction Commerce offers a very flexible way of clustering products via tagging.

Reaction Commerce does offer out-of-the-box functionality to build product hierarchies with tags and navigation trees, although it's important to understand that tags are specific on a product level, i.e. they do not apply down to individual variants of a specific product (or even options of variants).

To start, let's build a tagging hierarchy that looks like this:

```sh
           |-- Women  (top-level category)
               |-- Shoes  (second-level category)
                   |-- Sneakers  (third-level category)
                   |   |-- Adides MaxRun 370 (product)
                   |   |-- Nuke Sports+ (product)
                   |
                   |-- Heels  (third-level category)
                   |   |-- Bior Classic 10cm  (product)
                   |   |-- Loubootain Eleganza 6cm (product)
```

## Step 1: Create the tags in reaction-admin

### Login to reaction-admin to create our top tag

![Screenshot](/assets/reaction-admin-tagging-step-1.png)

Then, fill in the form, make sure to tick the "Tag is enabled in storefront" checkbox, and save your new tag.

![Screenshot](/assets/reaction-admin-tagging-step-1-2.png)

### Creating the second-level and third-level tags

With Reaction Commerce, there is no hierarchy at the tag-level. You'll create your second-level and third-level tags all exactly like you created your top-level tag, and you'll organize them in hierarchy in the last step using a navigation tree.

When creating your second and third-level tags (or any deeper hierarchy for that matter), a good practice is to include the name of the "parent" tags in the "child" tag's name and slug. Because tag names and slugs need to be unique, you could run into conflicts if — for example — you also want to have a "Men" category with "Shoes" and "Sneakers" tags under it.

To prevent any confusion or conflict, you would give the "Shoes" tag under "Women" the name and slug "women-shoes". The display name, however, stays "Shoes" in order not to overwhelm customers. For your "Sneakers" tag under "Shoes", itself under "Women", give it the "women-shoes-sneakers" tag name and slug. Here's an example.

![Screenshot](/assets/reaction-admin-tagging-step-2.png)

Once you're done, your list of tags should look like this.

![Screenshot](/assets/reaction-admin-tagging-step-2-2.png)

## Step 2: Assign previously created tags to products

After creating the tags (read: product categories), you need to tell the products which category they belong to. If you like your product to be found regardless if one browses a category that is a direct parent or an indirect child, you need to ensure that the product gets assigned all tag names up to the root tag assigned. For example, our "Adides MaxRun 370" product needs to be assigned the "women-shoes-sneakers" tag, but also "women-shoes" and "women".

### Assigning tag names to products

Edit your product and add your tags.

![Screenshot](/assets/reaction-admin-tagging-step-3.png)

## Step 3: Create and organize your navigation items

For now, there is no real hierearchy between your tags. In order for your users to see a nice and well organized menu with all of your categories, you need to go to the Navigation panel and add new navigation items.

![Screenshot](/assets/reaction-admin-tagging-step-4.png)

For each of your tags, add a navigation item with the URL `/tag/<your-tag-slug>`. Also, don't forget to check the "This URL is relative" checkbox.

![Screenshot](/assets/reaction-admin-tagging-step-4-2.png)

When you're finished, drag and drop your navigation items from the left to the right and organize them according to the hierarchy you want. Your navigation tree should look like this.

![Screenshot](/assets/reaction-admin-tagging-step-4-3.png)

Notice how all of these items in the tree have this label saying they're hidden from the storefront. To prevent mistakes from being shown on the production website, Reaction Commerce hides new navigation items from the users by default. To show these navigation items on the storefront, you'll need to manually edit each of them in the navigation tree and tick the "Show in storefront" checkbox.

![Screenshot](/assets/reaction-admin-tagging-step-4-4.png)

Now that your navigation items are visible to the public, your navigation tree should look like this.

![Screenshot](/assets/reaction-admin-tagging-step-4-5.png)

### The result

![Screenshot](/assets/reaction-admin-tagging-step-5.png)
