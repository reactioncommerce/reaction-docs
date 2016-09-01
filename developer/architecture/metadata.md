# SEO and Metadata

Basic meta tag data is inserted by the `ReactionRouter.DocHead.init` method which uses [kadira:dochead](https://github.com/kadirahq/meteor-dochead) package to manipulate `document.head`.

Add additional meta objects using `DocHead`, which is added by the Reaction Router.

```js
DocHead.addMeta({
  name: "keywords",
  content: shop.keywords.toString()
});
```

Default descriptions and keywords for a Shop can be set in Dashboard Core Settings.

> _A note on testing:_ Use `$("meta")` in the client console to view and test changes to the head meta elements. This is the head data that will be rendered in conjunction with the Meteor package `spiderable`.
