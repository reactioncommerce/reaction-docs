---
id: version-v1.8.0-seo-metadata
title: Metadata
original_id: seo-metadata
---
    
Basic meta tag data is inserted by the `MetaData.init` method which uses the `dom` core package to manipulate `document.head`.

Add additional meta objects using `Reaction.DOM.setMetaTag` as detailed below.

```js
Reaction.DOM.setMetaTag({
  name: "keywords",
  content: shop.keywords.toString()
});
```

Default descriptions and keywords for a Shop can be set in Dashboard Core Settings.

> _A note on testing:_ Use `$("meta")` in the client console to view and test changes to the head meta elements. This is the head data that will be rendered in conjunction with the Meteor package `spiderable`.
