---
id: version-2.9.1-developer-faq
title: Developer FAQ
original_id: developer-faq
---

## General

### What do I need to know to work with Reaction?

To start customizing Reaction, you should have a basic understanding of the following technologies:

- JavaScript, specifically ES6
- HTML/CSS
- Some knowledge of Meteor, especially an understanding of [Publications and Subscriptions](https://guide.meteor.com/data-loading.html)
- A front-end framework/library like React

Reaction tries to be as modular as possible. All user customizations are intended to live in plugins, as they provide a secure upgrade path when new versions are rolled out. See [here](plugin-intro-1.md) for a more detailed explanation into the plugin topic.

### Is MongoDB/NoSQL best suited for ecommerce?

We think so! We believe that the common SQL schema for legacy ecommerce platforms isn't just unnecessary — it's overkill! There are numerous benefits to Mongo/NoSQL, from speed to simplified code to the customizable schema.

Legacy platforms use the entity-attribute-value lookup that is so complex and slow, and they also try to architect their way around their SQL limitations. By using NoSQL, we remove the very complex layer of looking up and joining attributes, and also the complexity of adding new field/values. We also don't have to deal with the continuous translation of database structure to a code object.

The database acts as the persistent storage of JavaScript objects. For example, a t-shirt product might be a collection of variants, like blue, green, or red, and are each their own object contained within an object. This also applies to different pricing and taxes for different regions, so pricing is at the variant level, not at the product level. This is even true with just one language when you have "Blue XXL" being more expensive than "Green XL."

### Reaction is an open source project. How can I get involved?

We're always open to contributions from our community. To learn more about becoming a contributor, [click here](https://blog.reactioncommerce.com/how-to-write-a-pr-for-reaction/). And don't forget to read our [Community Guidelines](https://docs.reactioncommerce.com/reaction-docs/trunk/guidelines)!

## Admin

### Where is the admin panel?

The login panel is visible on the right side, once you login as a user with admin credentials. For more on navigating admin, read our [Reaction Commerce Store Operator Guide](dashboard.md).

### What's the admin login?

By default the admin login will be username: `admin@localhost` and password `r3@cti0n`

## Extending Reaction

### How do I create a custom home page?
The easiest way to render a customized landing page is to set the INDEX_OPTIONS session variable and point it to a customized template. There's a more in-depth explanation [here](how-to-create-a-custom-homepage.md).

### How can I add add a static page?

Add a single page, and more child pages, by adding a route and a template. This will require knowledge of HTML, JavaScript and Git or web development. This is covered in depth in this section of the [Customization Guide](https://docs.reactioncommerce.com/reaction-docs/trunk/plugin-routes-6).

This would work great for static pages like an About or Contact us page. If you want to add tools for administrators to manage text and image content without having to code, you probably want to a content management system (CMS).

### How do I integrate with a content management system (CMS)?

If you have a lot of content (like images and text) that needs to be managed you probably want to use a content management system (CMS). We currently do not have one integrated with Reaction.

On our [roadmap](https://reactioncommerce.com/roadmap)
we have a planned integration with a CMS like Drupal, which can hopefully serve as a model for other similar integrations.

### How do I upload product images as part of my data fixtures?

Often it's convenient to have product data along with its assets stored in a local directory that gets uploaded into MongoDB on application start as part of a data fixture. This is especially relevant, if you need an initial bulk import or if you're not intending to maintain your product images through the admin backend. You'll find a detailed introduction [here](fixtures-images.md).

### How do I add HTML/markup to my product descriptions?

Short answer: You shouldn't.

Longer answer: By design you can't, because presentation and data should be separated. There are several reasons for that:

- If you allow markup in product descriptions, the style can (and will sooner or later) differ from product to another
- It means that if you attempt to display that data anywhere else, it comes with all the markup baggage that you added specifically for the product detail page
- Allowing markup brings its own security related issues upon the table. [Cross-Site-Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) is one of them.
- Sometimes, the thing you're after is something else already provided in a different way. For example, if you find yourself looking for missing things like bullet points in product descriptions, chances are that you should use something better like product metadata.

"Right, I got all your points, but I really need to have more control over how the content is rendered."

If you're absolutely keen it, you could overwrite the React component responsible for rendering [product properties](https://github.com/reactioncommerce/reaction/blob/v2.9.1/imports/plugins/included/product-detail-simple/client/components/productField.js). You'll find an example on how to overwrite ReactionCommerce's built-in components [here](extending-product-schema-location-map.md).

### I want to make a change to the schema and use it in the product detail page (PDP)

There's an extension to our [example plugin tutorial](plugin-intro-1.md), that describes how to extend the product schema for [displaying a Google Map in the PDP](extending-product-schema-location-map.md).

## More

### I have another question. Where's the best place to ask it?

You can post questions in Gitter chat about [Installation](https://gitter.im/reactioncommerce/installation), [Deployment](https://gitter.im/reactioncommerce/deployment), [general Reaction](https://gitter.im/reactioncommerce/deployment) topics and [Architecture](https://gitter.im/reactioncommerce/architecture). You can also post questions in the [Forums](https://forums.reactioncommerce.com/).

Want more help? You can also ask a question live during our Community Calls. Here's the past [agendas](https://docs.google.com/document/d/1PwenrammgQJpQfFoUUJZ96i_JJYCM_4glAjB1_ZzgwA/edit) and a form to [submit questions](https://docs.google.com/forms/d/e/1FAIpQLSfsNNH1W4bP7k4Gkl1JYF4vCEwQcHE9X3OIFfTH2TNwD7dN4Q/viewform).
