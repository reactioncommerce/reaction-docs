---
id: version-1.14.0-creating-test-data
title: Creating Test Data
original_id: creating-test-data
---
    
For Meteor integration tests, see [Creating Test Data for Meteor Tests](creating-test-data-for-meteor-tests.md).

For non-Meteor Jest tests, Reaction Commerce provides a simple data `Factory` test utility that can create mock data for unit and integration test. The test util uses [@reactioncommerce/data-factory](https://github.com/reactioncommerce/data-factory) to attach all core schemas to the `Factory` object.

## Creating mock data

Creating mock data structures.
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

Creating mock data with custom property function. When creating many mock object you may need more control over the some of mock values, for example having sequential `_id` properties for each `mockTag` for more predictable test cases. To do this you can define an arrow function as a value in the properties arguments object the return value will be the new mockValue.
``` js
const mockTags = Factory.Tag.makeMany(2, { shopId: "1234", _id: (i) => (i + 100).toString() });
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
