# SEO and Metadata
Basic meta tag data is inserted by the `ReactionCore.MetaData.update` method.

You can add code to add additional meta objects to the `ReactionCore.MetaData.meta` array, and they will be added to the `<head>`.

Example: `ReactionCore.MetaData.meta.push 'name': 'og:title', 'content': product.title`

Site wide descriptions and keywords can be set in Dashboard->Settings.

You can customize templates using the `Template.replaces` method if you need a more advanced meta data implementation.

_A note on testing:_ Use `$("meta")` in the client console to view and test changes to the head meta elements. This is the head data that will be rendered in conjunction with the Meteor package `spiderable`.
