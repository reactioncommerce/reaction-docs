---
title: Products, Variants, and Options
id: version-1.15.0-concepts-products
original_id: concepts-products
---

When we use the term **“product”** in Reaction Commerce, we are referring to a single type of thing that is available in a shop catalog, for example, a pair of Best Brand shoes, model B. A product cannot be directly ordered, though. Each product must have at least one **“variant”** added to it.

A variant defines a certain product configuration, a set of configurable attributes that makes up a discrete, orderable item. For example, the “Pair of Best Brand Shoes, Model B” product might have three variants, “Size 9”, “Size 10”, and “Size 11”.

If necessary, a variant can have further variants, which we call **“options”** or **“second level variants”**. For example, the “Size 9” variant for “Pair of Best Brand Shoes, Model B”, may come in two different colors, black and red. So the “Size 9” variant would have two variants of its own, “Black” and “Red”.

It’s important to note that only a terminal variant may be ordered. So if a variant has options, a shopper will need to order one of the options, but if a variant has no options, that variant itself may be ordered (added to a cart).
