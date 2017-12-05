# Frequently Asked Questions

## What is Reaction Commerce?

Reaction Commerce is an open source commerce platform that allows anyone to customize, extend, and deploy an online store or marketplace. Our codebase is available for free via [GitHub](https://github.com/reactioncommerce/reaction).

We also offer [Reaction Platform](https://reactioncommerce.com/hosting), our paid platform-as-a-service. Beyond just hosting, our end-to-end system provides deployment, scaling, and support for retailers and brands.

## How do I sign up for an account, login to my dashboard, and set up my domain?

You'll need to install and run Reaction locally on your computer. For more info, check out our [Installation docs](https://docs.reactioncommerce.com/reaction-docs/master/installation).    

## I already have a hosting solution. Can I host a Reaction shop anywhere I want?

Yep! You can host a Reaction shop on any host or virtual machine container that supports Node.js, Meteor, and MongoDB.

## Do you support multiple languages?

We do! We have [internationalization support](/developer/architecture/i18n.md) for dozens of languages, including right-to-left formats! We also support currency conversion and localized currency formats.

## What's your pricing model?

Reaction is free. Our code, which is licensed under the GPL v3 license, will always be free and available to the open source community. In early 2017, we'll be launching our hosted platform, which will come at a tiered premium price. If you'd like to learn more, check out our hosted service's [Terms & Conditions](https://reactioncommerce.com/legal/terms).

## Is MongoDB/NoSQL best suited for ecommerce?

We think so! We believe that the common SQL schema for legacy ecommerce platforms isn't just unnecessary— it's overkill! There are numerous benefits to Mongo/NoSQL, from speed to simplified code to the customizable schema.

Legacy platforms use the entity-attribute-value lookup that is so complex and slow, and they also try to architect their way around their SQL limitations. By using NoSQL, we remove the very complex layer of looking up and joining attributes, and also the complexity of adding new field/values. We also don't have to deal with the continuous translation of database structure to a code object.

The DB acts as the persistent storage of JavaScript objects. For example, a t-shirt product might be a collection of variants, like blue, green, or red, and are each their own object contained within an object. This also applies to different pricing and taxes for different regions, so pricing is at the variant level, not at the product level. This is even true with just one language when you have "Blue XXL" being more expensive than "Green XL."

## Have you tested Reaction on large shops with thousands of products?

We're always testing! During our Alpha release, we performed extensive tests, deploying shops at scale, and reviewing several database scaling options. We've done performance testing that mimics high-volume shops, and as a part of our Beta release, we will continue to test, test, test.

## Reaction is an open source project. How can I get involved?

We're always open to contributions from our community. To learn more about becoming a contributor, [click here](https://blog.reactioncommerce.com/how-to-write-a-pr-for-reaction/). And don't forget to read our [Community Guidelines](https://docs.reactioncommerce.com/reaction-docs/master/guidelines)!

## Reaction is all JavaScript. Does this have a negative impact on SEO?

Nope! [Google indexes JavaScript when crawling websites](https://googlewebmastercentral.blogspot.com.es/2014/05/understanding-web-pages-better.html).

Additionally, Reaction uses server-side rendering, as well as [Prerender.io](https://prerender.io/), which renders your JavaScript in a browser, saves the static HTML, and returns that to the crawlers.

## How do I upload product images as part of my data fixtures?

Often it's convenient to have product data along with its assets stored in a local directory that gets uploaded into MongoDB on application start as part of a data fixture. This is especially relevant, if you need an initial bulk import or if you're not intending to maintain your product images through the admin backend. You'll find a detailed introduction [here](/developer/data-fixtures-insert-product-images.md).

## How do I add HTML/markup to my product descriptions?

Short answer: You shouldn't.

Longer answer: By design you can't, because presentation and data should be separated. There are several reasons for that:
- If you allow markup in product descriptions, the style can (and will sooner or later) differ from product to another
- It means that if you attempt to display that data anywhere else, it comes with all the markup baggage that you added specifically for the product detail page
- Allowing markup brings its own security related issues upon the table. [Cross-Site-Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) is one of them.
- Sometimes, the thing you're after is something else already provided in a different way. For example, if you find yourself looking for missing things like bullet points in product descriptions, chances are that you should use something better like product metadata.

"Right, I got all your points, but I really need to have more control over how the content is rendered."

If you're absolutely keen it, you could overwrite the React component responsible for rendering [product properties](https://github.com/reactioncommerce/reaction/blob/master/imports/plugins/included/product-detail-simple/client/components/productField.js). You'll find an example on how to overwrite ReactionCommerce's built-in components [here](/developer/tutorial/extending-product-schema-location-map.md).

## I want to make a change to the schema and use it in the product detail page (PDP)

There's an extension to our [example plugin tutorial](/developer/tutorial/plugin-intro-1.md), that describes how to extend the product schema for [displaying a Google Map in the PDP](/developer/tutorial/extending-product-schema-location-map.md).

## How can I put products into categories / sub-categories?

Categorizing products is a very common scenario, although the way categories are supposed to behave may vary greatly from shop to shop. This is the reason why Reaction Commerce comes up with a very broad and generic concept of clustering products: **Tags**.
Click [here](/admin/tagging.md) for a detailed introduction into the tagging concept from the viewpoint of a shop admin.

## I want to use XYZ payment/shipping provider. How can I do this?
Reaction features a couple of built-in payment providers: PayPal Flow, PayPal Express, Stripe, Braintree, Authorize.net and others. As far as shipping is concerned, we've these out-of-the-box plugins: ShippingRates and [Shippo](https://goshippo.com/).
When implementing your own shop you may encounter situations where you need to bring your own solutions into the game. Because this is such a common use case, Reaction's answer to this question is built upon two pillars: The _plugin concept_ and the _internal development payment/shipping APIs_. If you're interested in learning more, head over to our [tutorial](/developer/tutorial/creating-a-payment-provider-plugin.md) that teaches how to implement an exemplary payment provider plugin.
