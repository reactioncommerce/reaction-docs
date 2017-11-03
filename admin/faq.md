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
