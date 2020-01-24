---
title: Reaction at a Glance
id: version-2.9.1-intro-glance
original_id: intro-glance
---

Deciding whether Reaction is right for your company? Here's everything you need to know.

## What is Reaction Commerce?

Reaction Commerce is an open source commerce platform that allows anyone to customize, extend, and deploy an online store or marketplace. Our codebase is available for free via [GitHub](https://github.com/reactioncommerce/reaction).

## Pricing

Reaction is free. Our code, which is licensed under the GPL v3 license, will always be free and available to the open source community.

## Installation

Check out our [Installation docs](https://docs.reactioncommerce.com/docs/getting-started-developing-with-reaction).

## Mobile Device Support

The Reaction web apps use mobile-first design principles, which means they look great in a mobile web browser. You may create your own native mobile app using the Reaction GraphQL API.

## Localization and Internationalization

We have [internationalization support](i18n.md) for dozens of languages, including right-to-left formats! We also support currency conversion and localized currency formats.

## Search Engine Optimization

Since 2014 [Google has indexed JavaScript when crawling websites](https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html). Reaction, however, offers page pre-rendering and product detail page metatag generation out of the box to ensure products are indexed well for web crawlers and search engines:

1. [Prerender.io](https://prerender.io/): Reaction includes integration with Prerender.io out of the box. Prerender.io is a commercial service that will generate static renderings of the application for search engines. All you have to do is provide a key to your site and Prerender will handle the pre-rendering.
2. [Meteor Chrome Headless Spiderable](https://github.com/artlimes/meteor-chrome-headless-spiderable) with the [Reaction Commerce Caching Plugin](https://github.com/artlimes/reaction-commerce-caching-plugin): This updated Meteor package uses Google's Headless Chrome to crawl pages. Combined with the Reaction-specific caching plugin, the Spiderable package will allow Reaction pages to be crawled by search engines.
3. [dom](https://github.com/reactioncommerce/reaction/blob/v2.9.1/imports/plugins/core/dom/client/dom.js): Automatically adds `<meta>` tags are for products using the [dom](https://github.com/reactioncommerce/reaction/blob/release-1.8.0/imports/plugins/core/dom/client/dom.js) core package since 1.8, which uses the title, description and `details` fields of the product to render SEO-friendly data. You may need to use a tool like [SEO Inspector](https://chrome.google.com/webstore/detail/seo-inspector/iejckekdjogeeilmllnabmgkbbmedeal?hl=en) to see this data. Read more on [SEO and Metadata](seo-metadata.md).
4. The storefront UI starter kit app uses NextJS framework with server side rendering enabled.

Read more about [SEO and Reaction Commerce](https://blog.reactioncommerce.com/how-our-javascript-platform-handles-seo/) in our blog post, and check out our [Ecommerce SEO Migration Checklist](http://marketing.reactioncommerce.com/acton/media/37362/seo-checklist).

## Performance and Scaling

We've done performance testing that mimics high-volume shops, and we're constantly working to improve performance and scalability both in terms of a production deployment and providing a fast and pleasant experience for developers.

## Payments

Reaction currently ships with one production-ready payment plugin: Stripe. If you use Stripe for payments, you can get up and running quickly. If you need to use a different payment service, you'll have to build a custom payment plugin to interface with their API, but we promise it is a painless procedure.

## Interfaces / ETL

The pluggable and schemaless nature of Reaction means that interfacing with your legacy or external systems involves little more than writing the transformations.

## Customization

- The Classic Meteor UI can be customized using theme plugins that provide Bootstrap UI themes.
- The Example Storefront UI can be customized using a simple theme file, or you can easily swap entire React components for your own.
- The Reaction API can be customized by plugins, including stitching your own GraphQL additions into the core schema or listening for core events and using them to trigger other actions.

## Deployment

You can deploy Reaction Commerce to anywhere you could deploy a Docker container or a Node app. Because of the complexities involved, we currently can’t offer any support for deployment.

The best option depends on your budget and your expected level of traffic. Below are some options for deployment:

- Heroku
- Amazon Web Services (AWS)
- Azure
- Digital Ocean

## Who Uses Reaction?

Ecommerce and marketplace sites from around the world are using Reaction in production now. Check out our [Community Showcase](https://docs.reactioncommerce.com/reaction-docs/trunk/community-showcase).

## Community

Check out [Community Resources](community-resources.md) for a curated list of community projects that can be found in the wild. Over time, this list will continue to grow and some of the projects may become deprecated. Please drop us a note if you spot new awesome contributions out there!
