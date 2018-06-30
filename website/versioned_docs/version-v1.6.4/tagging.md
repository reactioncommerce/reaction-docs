---
id: version-v1.6.4-tagging
title: Introduction into tagging concept
original_id: tagging
---
    
Categorizing products is a very common scenario. Reaction Commerce offers a very flexible way of clustering products via tagging.

Reaction Commerce does offer out-of-the-box functionality to build product hierarchies with categories and sub-categories, although it's important to understand that tags are specific on a product level, i.e. they do not apply down to individual variants of a specific product (or even options of variants).

To start, let's build a tagging hierarchy that looks like this:
```
       |-- Gear  (top-level category)
           |-- Helmets  (second-level category)
               |-- Full-face  (third-level category)
               |   |-- Btomic SL extreme  (product)
               |
               |-- Standard protection  (third-level category)
                   |-- Concordia XTRA light  (product)
```


### Step 1: Create the tag hierarchy in admin backend

**Login to backend to create the top & second-level hierarchy:**

![Screenshot](/assets/admin-tagging-step-1.jpg)

**Creating the third-level tags:**

![Screenshot](/assets/admin-tagging-step-2.jpg)


### Step 2: Assign previously created tags to products

After creating the tags (read: product categories), we need to tell the products which
category they belong to. If you like your product to be found regardless if one searches for a category that is a direct parent or an indirect ancestor, you need to ensure that the product gets assigned all tag names up to the root tag assigned.

**Assigning tag names to products:**

![Screenshot](/assets/admin-tagging-step-3.jpg)


### Step 3: Navigating product categories

After publishing the changes, shop visitors will be able browse product categories via navigation bar.

**The result:**

![Screenshot](/assets/admin-tagging-step-4.jpg)
