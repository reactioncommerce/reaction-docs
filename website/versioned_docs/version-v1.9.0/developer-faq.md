---
id: version-v1.9.0-developer-faq
title: FAQs
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

### What sites are built on Reaction Commerce?

Ecommerce and marketplace sites from around the world are using Reaction in production now. Check out our [Community Showcase](https://docs.reactioncommerce.com/reaction-docs/trunk/community-showcase).

### Why is Reaction so slow?

#### For development

We are aware that Reaction Commerce can take a long time to reload when using the development server. This has to do with that
large amount of files that are in the project. Hopefully this has been mitigated to some degree with the update to Meteor 1.6, however
we know that faster is better when it comes to development so we will be focusing all of our efforts on improving performance. You
can see our plan, weigh in with suggestions, contribute, and track progress [here](https://github.com/reactioncommerce/reaction/issues/3233)

#### To "first paint"

As mentioned above we are aware that because of the nature of Meteor apps and the size of this app that on some connections
it can take several seconds before the site is rendered to clients. We are working to reduce the bundle size by eliminating some
package and moving to a more dynamic loading so that parts of the app that may not be needed till later are not sent to the client on first
load. Performance will be our main focus until the problem is resolved.
You can see our plan, weigh in with suggestions, contribute, and track progress [here](https://github.com/reactioncommerce/reaction/issues/3233)

### Can I compile a mobile app from Reaction? Are you going to develop a mobile app?

While Meteor allows all apps to be compiled into Android and iOS apps with Cordova, we do not support it. Setting up a Reaction app with Cordova may be difficult. Learn more about building [mobile apps with Meteor's Cordova integration](https://guide.meteor.com/mobile.html).

While we do have plans to work on a mobile app on the [Roadmap](https://reactioncommerce.com/roadmap), we expect to use a non-Cordova approach, like React Native. We do not have a release date.

What's important to know, however, is that Reaction Commerce takes a "mobile first" design approach to ensure that both the consumer-facing and admin-facing sites are functional on most modern mobile devices.

### Is MongoDB/NoSQL best suited for ecommerce?

We think so! We believe that the common SQL schema for legacy ecommerce platforms isn't just unnecessary — it's overkill! There are numerous benefits to Mongo/NoSQL, from speed to simplified code to the customizable schema.

Legacy platforms use the entity-attribute-value lookup that is so complex and slow, and they also try to architect their way around their SQL limitations. By using NoSQL, we remove the very complex layer of looking up and joining attributes, and also the complexity of adding new field/values. We also don't have to deal with the continuous translation of database structure to a code object.

The database acts as the persistent storage of JavaScript objects. For example, a t-shirt product might be a collection of variants, like blue, green, or red, and are each their own object contained within an object. This also applies to different pricing and taxes for different regions, so pricing is at the variant level, not at the product level. This is even true with just one language when you have "Blue XXL" being more expensive than "Green XL."

### Reaction is an open source project. How can I get involved?

We're always open to contributions from our community. To learn more about becoming a contributor, [click here](https://blog.reactioncommerce.com/how-to-write-a-pr-for-reaction/). And don't forget to read our [Community Guidelines](https://docs.reactioncommerce.com/reaction-docs/trunk/guidelines)!

## Installation

### I cloned the Reaction repo but when I run `meteor` it doesn't work

You need to install and use the Reaction command line tool in order to run Reaction. It does some work building the application
before the app starts that is not optional. You can install the CLI by doing `npm install -g reaction-cli`. Then you should be able to run `meteor npm install` and then start the app by running `reaction run` or just `reaction`.

### Do you have a list of community provided plugins, themes or other resources?

We compiled a curated list of community projects that can be found in the wild. Over time, this list will continue to grow and some of the projects may become deprecated. Please drop us a note if you spot new awesome contributions out there! [Community Resources](community-resources.md).

## Deployment

### Where should I deploy/host my Reaction Commerce shop or marketplace?

You can deploy Reaction Commerce to anywhere you could deploy a Docker container or a Node app. Because of the complexities involved, we currently can’t offer any support for getting these deployed.

What the best options is depends on your budget and your expected level of traffic. Below are some options for deployment:

- Galaxy: The Meteor Development Group offers a hosting service, Galaxy, that is focused on hosting Meteor apps with monitoring, etc. You can find more information [here](https://www.meteor.com/hosting).
- Heroku
- Amazon Web Services (AWS)
- Azure
- Digital Ocean

### I'm getting "FATAL ERROR: CALL_AND_RETRY_LAST" when building a custom docker image

Be sure to use this command to build your custom docker image:

```sh
docker build --build-arg TOOL_NODE_FLAGS="--max-old-space-size=2048" -t mycustom .
```
This seems to force Meteor to use less memory when building and work around this issue.

## Admin

### Where is the admin panel?

The login panel is visible on the right side, once you login as a user with admin credentials. For more on navigating admin, read our [Reaction Commerce Store Operator Guide](dashboard.md).

### What's the admin login?

By default the admin login will be username: `admin@localhost` and password `r3@cti0n`

## Search engine optimization

### What about SEO?

Since 2014 [Google has indexed JavaScript when crawling websites](https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html). Reaction, however, offers page pre-rendering and product detail page metatag generation out of the box to ensure products are indexed well for web crawlers and search engines:

1. [Prerender.io](https://prerender.io/): Reaction includes integration with Prerender.io out of the box. Prerender.io is a commercial service that will generate static renderings of the application for search engines. All you have to do is provide a key to your site and Prerender will handle the pre-rendering.
2. [Meteor Chrome Headless Spiderable](https://github.com/artlimes/meteor-chrome-headless-spiderable) with the [Reaction Commerce Caching Plugin](https://github.com/artlimes/reaction-commerce-caching-plugin): This updated Meteor package uses Google's Headless Chrome to crawl pages. Combined with the Reaction-specific caching plugin, the Spiderable package will allow Reaction pages to be crawled by search engines.
3. [dom](https://github.com/reactioncommerce/reaction/blob/v1.9.0/imports/plugins/core/dom/client/dom.js): Automatically adds `<meta>` tags are for products using the [dom](https://github.com/reactioncommerce/reaction/blob/release-1.8.0/imports/plugins/core/dom/client/dom.js) core package since 1.8, which uses the title, description and `details` fields of the product to render SEO-friendly data. You may need to use a tool like [SEO Inspector](https://chrome.google.com/webstore/detail/seo-inspector/iejckekdjogeeilmllnabmgkbbmedeal?hl=en) to see this data. Read more on [SEO and Metadata](seo-metadata.md).

Read more about [SEO and Reaction Commerce](https://blog.reactioncommerce.com/how-our-javascript-platform-handles-seo/) in our latest blog post.

## Extending Reaction

### How to do I create a custom home page?
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

If you're absolutely keen it, you could overwrite the React component responsible for rendering [product properties](https://github.com/reactioncommerce/reaction/blob/v1.9.0/imports/plugins/included/product-detail-simple/client/components/productField.js). You'll find an example on how to overwrite ReactionCommerce's built-in components [here](extending-product-schema-location-map.md).

### I want to make a change to the schema and use it in the product detail page (PDP)

There's an extension to our [example plugin tutorial](plugin-intro-1.md), that describes how to extend the product schema for [displaying a Google Map in the PDP](extending-product-schema-location-map.md).

### I want to use XYZ payment/shipping provider. How can I do this?

Reaction features a couple of built-in payment providers: PayPal Flow, PayPal Express, Stripe, Braintree, Authorize.net and others. As far as shipping is concerned, we've these out-of-the-box plugins: ShippingRates and [Shippo](https://goshippo.com/).

When implementing your own shop you may encounter situations where you need to bring your own solutions into the game. Because this is such a common use case, Reaction's answer to this question is built upon two pillars: The _plugin concept_ and the _internal development payment/shipping APIs_. If you're interested in learning more, head over to our [tutorial](creating-a-payment-provider.md) that teaches how to implement an exemplary payment provider plugin.

## More

### I have another question. Where's the best place to ask it?

You can post questions in Gitter chat about [Installation](https://gitter.im/reactioncommerce/installation), [Deployment](https://gitter.im/reactioncommerce/deployment), [general Reaction](https://gitter.im/reactioncommerce/deployment) topics and [Architecture](https://gitter.im/reactioncommerce/architecture). You can also post questions in the [Forums](https://forums.reactioncommerce.com/).

Want more help? You can also ask a question live during our Community Calls. Here's the past [agendas](https://docs.google.com/document/d/1PwenrammgQJpQfFoUUJZ96i_JJYCM_4glAjB1_ZzgwA/edit) and a form to [submit questions](https://docs.google.com/forms/d/e/1FAIpQLSfsNNH1W4bP7k4Gkl1JYF4vCEwQcHE9X3OIFfTH2TNwD7dN4Q/viewform).
