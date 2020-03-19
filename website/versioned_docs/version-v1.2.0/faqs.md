---
id: version-v1.2.0-faqs
title: FAQs
original_id: faqs
---

## How do I sign up for an account, login to my dashboard, and set up my domain?

Currently, Reaction is only available locally via GitHub. In early 2017, we'll be launching the Beta release of our hosted platform, which will allow anyone to set up shop via our intuitive dashboard. Our custom hosting solution, which runs on Docker, will support domains, SSL, and more. Our vision is to allow anyone to customize, extend, and deploy his or her Reaction shop directly from on our platform.

## I already have a hosting solution. Can I host a Reaction shop anywhere I want?

Yep! You can host a Reaction shop on any host or virtual machine container that supports Node.js, Meteor, and MongoDB. Our code is fully open source and available via [GitHub](https://github.com/reactioncommerce/reaction).

## Do you support multiple languages?

We do! We have [internationalization support](i18n.md) for dozens of languages, including right-to-left formats! We also support currency conversion and localized currency formats.

## What's your pricing model?

Reaction is free. Our code, which is licensed under the GPL v3 license, will always be free and available to the open source community.

## Is MongoDB/NoSQL best suited for ecommerce?

We think so! We believe that the common SQL schema for legacy ecommerce platforms isn't just unnecessary— it's overkill! There are numerous benefits to Mongo/NoSQL, from speed to simplified code to the customizable schema.

Legacy platforms use the entity-attribute-value lookup that is so complex and slow, and they also try to architect their way around their SQL limitations. By using NoSQL, we remove the very complex layer of looking up and joining attributes, and also the complexity of adding new field/values. We also don't have to deal with the continuous translation of database structure to a code object.

The DB acts as the persistent storage of JavaScript objects. For example, a t-shirt product might be a collection of variants, like blue, green, or red, and are each their own object contained within an object. This also applies to different pricing and taxes for different regions, so pricing is at the variant level, not at the product level. This is even true with just one language when you have "Blue XXL" being more expensive than "Green XL."

## Have you tested Reaction on large shops with thousands of products?

We're always testing! During our Alpha release, we performed extensive tests, deploying shops at scale, and reviewing several database scaling options. We've done performance testing that mimics high-volume shops, and as a part of our Beta release, we will continue to test, test, test.

## Reaction is an open source project. How can I get involved?

We're always open to contributions from our community. To learn more about becoming a contributor, [click here](http://blog.reactioncommerce.com/how-to-get-involved-with-reaction-commerce/). And don't forget to read our [Community Guidelines](https://docs.reactioncommerce.com/reaction-docs/trunk/guidelines)!

## Reaction is all JavaScript. Does this have a negative impact on SEO?

Nope! [Google indexes JavaScript when crawling websites](https://googlewebmastercentral.blogspot.com.es/2014/05/understanding-web-pages-better.html).

Additionally, Reaction can use a [modified version](https://github.com/ongoworks/spiderable) of the Meteor spiderable package, which renders a search engine-friendly static page version of your shop using PhantomJS.

It's worth noting that the spiderable package is slotted for deprecation. The reasons for this include:

-   Google has deprecated the AJAX crawling specification that the spiderable package is based on
-   Search engine crawlers (like Google's) have gotten much better at dealing with JavaScript/AJAX based applications, without the need for any special handling
-   There are now several better options for SEO goodness, like pre-rendering services (e.g. Prerender.io - which is included in Reaction and can easily be setup), server-side rendering techniques, etc.
