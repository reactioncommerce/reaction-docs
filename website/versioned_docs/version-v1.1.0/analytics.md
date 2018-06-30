---
original_id: analytics
id: version-v1.1.0-analytics
title: Analytics
---
    
Analytics in Reaction is provided by an optional plugin module `imports/plugins/included/analytics`.

This plugin implements an [analytics framework](https://segment.com/docs/libraries/analytics.js/) for integrating third-party analytics services such as segment.io, Google Analytics, and Mixpanel.

This plugin will only send analytics to libraries in the client that you have enabled, and it is easily extensible to add additional analytics libraries as you need.

## Tracking

Example use:

```html
<a href="{{pathFor 'product' handle=handle}}" data-event-category="grid" data-event-action="product-click" data-event-label="Grid product click" data-event-value="{{_id}}">
```

Send event tracking to Google Analytics by adding the following data attribute to any anchor in Reaction:

- data-event-category
- data-event-action
- data-event-label
- data-event-value

## Events Tracked

### Product Clicked from Grid View

A user clicks an individual product from the product grid view.

**Example of data captured:**

```json
{
  "category" : "grid",
  "action" : "product-click",
  "label" : "grid product click",
  "value" : "BCTMZ6HTxFSppJESk",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "NgM5n3yjeHTMv2rnK"
}
```

### Generic Product Grid Click

A user clicks on the product grid view anywhere other than an individual product.

**Example of data captured:**

```json
{
  "category" : "grid",
  "action" : "generic-click",
  "label" : "product grid click",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "pvfpCqpQQqyd7JAMN"
}
```

### Cart Toggle Click

A user clicks on the cart icon which toggles the drawer open/closed.

**Example of data captured:**

```json
{
  "category" : "cart",
  "action" : "cart-click",
  "label" : "cart toggle click",
  "value" : "BCTMZ6HTxFSppJESk",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "W33j7f6KDyzLpMCac"
}
```

### Cart Item Click

A user clicks on an item in their cart.

**Example of data captured:**

```json
{
  "category" : "cart",
  "action" : "product-click",
  "label" : "cart product click",
  "value" : "BCTMZ6HTxFSppJESk",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "wzWuz2YrvwamLF6Nh"
}
```

### Checkout Click

A user clicks on the checkout button in their cart.

**Example of data captured:**

```json
{
  "category" : "cart",
  "action" : "checkout-click",
  "label" : "checkout button click",
  "value" : "BCTMZ6HTxFSppJESk",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "TLd5xQE9dDinzModW"
}
```

### Navigation Tag Click

A user clicks on a tag in the navigation bar.

**Example of data captured:**

```json
{
  "category" : "tag",
  "action" : "tag-click",
  "label" : "navigation tag click",
  "value" : "Products",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "CTpcCM3d3hJtaP3An"
}
```

### Product Tag Click

A user clicks on a tag from the product detail view.

**Example of data captured:**

```json
{
  "category" : "tag",
  "action" : "tag-click",
  "label" : "product detail tag click",
  "value" : "Products",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "zhPxLcBehiJEFd2JA"
}
```

### About Page Link Click

A user clicks on the footer link to the About page.

**Example of data captured:**

```json
{
  "category" : "link",
  "action" : "link-click",
  "label" : "page link click",
  "value" : "/about",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "zhPxLcBehiJEFd2JA"
}
```

### Team Page Link Click

A user clicks on the footer link to the Team page.

**Example of data captured:**

```json
{
  "category" : "link",
  "action" : "link-click",
  "label" : "page link click",
  "value" : "/team",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "zhPxLcBehiJEFd2JA"
}
```

### Terms Page Link Click

A user clicks on the footer link to the Terms page.

**Example of data captured:**

```json
{
  "category" : "link",
  "action" : "link-click",
  "label" : "page link click",
  "value" : "/terms",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "zhPxLcBehiJEFd2JA"
}
```

### Privacy Page Link Click

A user clicks on the footer link to the Privacy page.

**Example of data captured:**

```json
{
  "category" : "link",
  "action" : "link-click",
  "label" : "page link click",
  "value" : "/privacy",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "zhPxLcBehiJEFd2JA"
}
```

### FAQs Page Link Click

A user clicks on the footer link to the FAQs page.

**Example of data captured:**

```json
{
  "category" : "link",
  "action" : "link-click",
  "label" : "page link click",
  "value" : "/faqs",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "zhPxLcBehiJEFd2JA"
}
```

### Meteor External Link Click

A user clicks on the "Made with Meteor" footer link.

**Example of data captured:**

```json
{
  "category" : "link",
  "action" : "link-click",
  "label" : "external link click",
  "value" : "meteor.com",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "zhPxLcBehiJEFd2JA"
}
```

### Twitter External Link Click

A user clicks on the Twitter icon footer link.

**Example of data captured:**

```json
{
  "category" : "link",
  "action" : "link-click",
  "label" : "external link click",
  "value" : "twitter",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "zhPxLcBehiJEFd2JA"
}
```

### Facebook External Link Click

A user clicks on the Facebook icon footer link.

**Example of data captured:**

```json
{
  "category" : "link",
  "action" : "link-click",
  "label" : "external link click",
  "value" : "facebook",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "zhPxLcBehiJEFd2JA"
}
```

### Google+ External Link Click

A user clicks on the Google+ icon footer link.

**Example of data captured:**

```json
{
  "category" : "link",
  "action" : "link-click",
  "label" : "external link click",
  "value" : "googleplus",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "zhPxLcBehiJEFd2JA"
}
```

### Pinterest External Link Click

A user clicks on the Pinterest icon footer link.

**Example of data captured:**

```json
{
  "category" : "link",
  "action" : "link-click",
  "label" : "external link click",
  "value" : "pinterest",
  "shopId" : "WvrKDomkYth3THbDD",
  "_id" : "zhPxLcBehiJEFd2JA"
}
```
