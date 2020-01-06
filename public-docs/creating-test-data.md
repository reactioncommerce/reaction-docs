---
id: creating-test-data
title: Creating Test Data
---

For Jest tests, Reaction Commerce provides a simple data `Factory` test utility that can create mock data for unit and integration tests. The test util uses [@reactioncommerce/data-factory](https://github.com/reactioncommerce/data-factory) to attach all core schemas to the `Factory` object.

## Creating mock data

### Mock one object

Use the `makeOne()` method with the name of the collection to mock one object:

``` js
import { Factory } from "/imports/test-utils/helpers/factory";
const mockTag = Factory.Tag.makeOne();
```

The `mockTag` output returns an object with fake data like this:

```js
{
  _id: "e02993ea96d7",
  name: "mockName",
  slug: "mockSlug",
  type: "mockType",
  metafields: ["item"],
  position: 3ff4e0634ecc,
  relatedTagIds: ["mockRelatedTagIds.$"],
  isDeleted: false,
  isTopLevel: true,
  isVisible: true,
  groups: ["mockGroups.$"],
  shopId: "a05276973251",
  createdAt: "1970-01-02T02:28:37.000Z",
  updatedAt: "2018-06-04T19:16:58.117Z",
  heroMediaUrl: "mockHeroMediaUrl"
}
```

### Mock multiple objects

Use the `makeMany` method and pass an integer to make multiple instances of one object:

```js
const mockTags = Factory.Tag.makeMany(2);
```

The `mockTags` output returns an object with fake data like this:
```js
[
 {
   _id: "e02993ea96d7",
   name: "mockName",
   slug: "mockSlug",
   type: "mockType",
   metafields: ["item"],
   position: "3ff4e0634ecc",
   relatedTagIds: ["mockRelatedTagIds.$"],
   isDeleted: false,
   isTopLevel: true,
   isVisible: true,
   groups: ["mockGroups.$"],
   shopId: "a05276973251",
   createdAt: "1970-01-02T02:28:37.000Z",
   updatedAt: "2018-06-04T19:16:58.117Z",
   heroMediaUrl: "mockHeroMediaUrl"
 },
 {
   _id: "bdc84075a8eb",
   name: "mockName",
   slug: "mockSlug",
   type: "mockType",
   metafields: ["item"],
   position: "5034c879b7c2",
   relatedTagIds: ["mockRelatedTagIds.$"],
   isDeleted: false,
   isTopLevel: true,
   isVisible: true,
   groups: ["mockGroups.$"],
   shopId: "28d65013adc8",
   createdAt: "1970-01-02T02:28:37.000Z",
   updatedAt: "2018-06-04T19:16:58.117Z",
   heroMediaUrl: "mockHeroMediaUrl"
 }
]
```

### Mock one object with custom values

Creating mock data with custom property values. Sometimes you may need mock data to have a custom or consistent property, a `shopId` on a list of Tags is an example of a property that you might want the same for each `mockTag` created. To do this you can provide a properties object as an argument to ether the `makeOne` or `makeMany` factory methods to overwrite the mock data's mock value.

``` js
const mockTag = Factory.Tag.makeOne({ shopId: "1234" });
```


The `mockTag` output returns an object with custom data like this:
```js
{
  _id: "e02993ea96d7",
  name: "mockName",
  slug: "mockSlug",
  type: "mockType",
  metafields: ["item"],
  position: 3ff4e0634ecc,
  relatedTagIds: ["mockRelatedTagIds.$"],
  isDeleted: false,
  isTopLevel: true,
  isVisible: true,
  groups: ["mockGroups.$"],
  shopId: "1234",
  createdAt: "1970-01-02T02:28:37.000Z",
  updatedAt: "2018-06-04T19:16:58.117Z",
  heroMediaUrl: "mockHeroMediaUrl"
}
```

### Mock multiple object with custom values

Creating mock data with custom property function. When creating many mock object, you may need more control over the some of mock values, for example having sequential `_id` properties for each `mockTag` for more predictable test cases. To do this, you can define an arrow function as a value in the property's arguments object and the return value will be the new mockValue.

Pass an arrow function with an index:

``` js
const mockTags = Factory.Tag.makeMany(2, { shopId: "1234", _id: (index) => (index + 100).toString() });
```

The `mockTags` output returns an object with custom data like this:

```js
[
 {
   _id: "100",
   name: "mockName",
   slug: "mockSlug",
   type: "mockType",
   metafields: ["item"],
   position: "3ff4e0634ecc",
   relatedTagIds: ["mockRelatedTagIds.$"],
   isDeleted: false,
   isTopLevel: true,
   isVisible: true,
   groups: ["mockGroups.$"],
   shopId: "1234",
   createdAt: "1970-01-02T02:28:37.000Z",
   updatedAt: "2018-06-04T19:16:58.117Z",
   heroMediaUrl: "mockHeroMediaUrl"
 },
 {
   _id: "101",
   name: "mockName",
   slug: "mockSlug",
   type: "mockType",
   metafields: ["item"],
   position: "5034c879b7c2",
   relatedTagIds: ["mockRelatedTagIds.$"],
   isDeleted: false,
   isTopLevel: true,
   isVisible: true,
   groups: ["mockGroups.$"],
   shopId: "1234",
   createdAt: "1970-01-02T02:28:37.000Z",
   updatedAt: "2018-06-04T19:16:58.117Z",
   heroMediaUrl: "mockHeroMediaUrl"
 }
]
```

Indexes can be passed from one `makeMany` method into another `makeMany` method. In this example, passing `30` into `makeMany` will then pass `30` into `makeMockProductWithSpecificId`. This way, you can create many CatalogItems with CatalogProducts with a specified `product._id` value:

```js
function makeMockProductWithSpecificId(index) {
  const productId = (index + 100).toString();

  return Factory.CatalogProduct.makeOne({
    _id: productId,
    isDeleted: false,
    isVisible: true,
    tagIds: [mockTagWithFeatured._id],
    shopId: internalShopId
  });
}

const mockCatalogItemsWithFeaturedProducts = Factory.Catalog.makeMany(30, {
  product: makeMockProductWithSpecificId,
  shopId: internalShopId
});
```
