---
id: version-v1.5.0-revision-api
title: Revisions
original_id: revision-api
---
    
## How revision control works

When changes are made to a product, a collection hook in `/imports/plugins/core/revisions/server/hooks.js` is fired and diverts most changes bound for the `Products` collection to a document in the `Revisions` collection.

## Schema

See `lib/collections/schemas/revisions.js` for more details.

```js
    _id: Revision Document Id
    workflow: Workflow status
    documentId: Reference Document Id
    documentData: Reference Document Data
    diff: Object Diff

    {
        "_id" : "xmzCfeXj4NfGSj2pZ",
        "documentId" : "BCTMZ6HTxFSppJESk",
        "documentData" : {
            "_id" : "BCTMZ6HTxFSppJESk",
            "title" : "Reaction Product",
            "shopId" : "J8Bhq3uTtdgwZx3rz",
            "ancestors" : [],
            "createdAt" : ISODate("2014-04-03T20:46:52.411Z"),
            "description" : "Sign in as administrator to edit.\nYou can clone this product from the product grid.\nYou can upload images click or drag in image box on the left here.\nTag this product below, and then add tag in navigation.\nClick the bookmark in the tag to set product url.\nOption variants, price, quantity, and child variants are created by clicking on the variant below, clone the variant to add more options.\nDetails can be added below the image for more specific product information.\n Login next to the cart, and then click the dashboard icon for more tools.",
            "handle" : "example-product",
            "hashtags" : [
                "rpjCvTBGjhBi2xdro",
                "cseCBSSrJ3t8HQSNP"
            ],
            "price" : {
                "range" : "12.99 - 19.99",
                "min" : 12.99,
                "max" : 19.99
            },
            "isVisible" : true,
            "isLowQuantity" : false,
            "isSoldOut" : false,
            "isBackorder" : false,
            "metafields" : [
                {
                    "key" : "Material",
                    "value" : "Cotton"
                },
                {
                    "key" : "Quality",
                    "value" : "Excellent"
                }
            ],
            "pageTitle" : "This is a basic product. You can do a lot with it.",
            "type" : "simple",
            "updatedAt" : ISODate("2016-11-30T16:27:56.853Z"),
            "vendor" : "Example Manufacturer",
            "requiresShipping" : true,
            "isDeleted" : false,
            "workflow" : {
                "status" : "new"
            }
        },
        "createdAt" : ISODate("2016-11-30T16:27:56.857Z"),
        "updatedAt" : ISODate("2016-11-30T16:32:17.469Z"),
        "workflow" : {
            "status" : "revision/published"
        },
        "diff" : [
            {
                "kind" : "E",
                "path" : [
                    "title"
                ],
                "lhs" : "Basic Reaction Product",
                "rhs" : "Reaction Product"
            },
            {
                "kind" : "E",
                "path" : [
                    "updatedAt"
                ],
                "lhs" : ISODate("2014-06-01T19:17:13.949Z"),
                "rhs" : ISODate("2016-11-30T16:27:56.853Z")
            }
        ]
    }
```

## Helpers

### Check if revision control is enabled

```js
    import { isRevisionControlEnabled } from "/imports/plugins/core/revisions/lib/api";

    if (isRevisionControlEnabled()) {
      // Do something if revision control is enabled
    }
```
