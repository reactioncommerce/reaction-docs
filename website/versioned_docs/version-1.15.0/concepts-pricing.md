---
title: Pricing
id: version-1.15.0-concepts-pricing
original_id: concepts-pricing
---

Reaction Commerce currently has a very simple pricing model. Every variant in the system must have a **price** specified on it, and that price is assumed to be in the default currency of the shop that owns the variant.

In order to publish a variant to the catalog, it must have a price set. When you change a variant price as a product admin, it does not immediately change for shoppers viewing the product until you publish the variant and the shoppers refresh their browser or navigate in a way that causes a data reload.

In the catalog, each variant has a price list, one per currency, rather than a single price. But currently we do not provide a way to set any prices other than the one for the shop’s default currency.
