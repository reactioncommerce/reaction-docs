---
id: faqs
title: FAQs
---
    
## General

### What is Reaction Commerce?

Reaction Commerce is an open source commerce platform that allows anyone to customize, extend, and deploy an online store or marketplace. Our codebase is available for free via [GitHub](https://github.com/reactioncommerce/reaction).

### Is there a live demo shop?

You can check out a live shop and use the admin tool in our [Demo Swag](https://swag.getreaction.io/) shop. You can also run the demo locally by cloning the [Reaction Swag Shop](https://github.com/reactioncommerce/reaction-swag-shop) repository.

### I already have a hosting solution. Can I host a Reaction shop anywhere I want?

Yep! You can host a Reaction shop on any host or virtual machine container that supports Node.js, Meteor, and MongoDB.

### What's your pricing model?

Reaction is free. Our code, which is licensed under the GPL v3 license, will always be free and available to the open source community. In early 2017, we'll be launching our hosted platform, which will come at a tiered premium price. If you'd like to learn more, check out our hosted service's [Terms & Conditions](https://reactioncommerce.com/legal/terms).

### Reaction is all JavaScript. Does this have a negative impact on SEO?

Nope! [Google indexes JavaScript when crawling websites](https://googlewebmastercentral.blogspot.com.es/2014/05/understanding-web-pages-better.html).

Additionally, Reaction uses server-side rendering, as well as [Prerender.io](https://prerender.io/), which renders your JavaScript in a browser, saves the static HTML, and returns that to the crawlers.

## Operating a store

### How do I sign up for an account, login to my dashboard, and set up my domain?

You'll need to install and run Reaction locally on your computer. For more info, check out our [Installation docs](https://docs.reactioncommerce.com/reaction-docs/master/installation).    

### Where is the admin panel?

The login panel is visible on the right side, once you login as a user with admin credentials. For more on navigating admin, read our [Reaction Commerce Store Operator Guide](dashboard.md).

### What's the admin login?

By default the admin login will be username: `admin@localhost` and password `r3@cti0n`

### How can I put products into categories / sub-categories?

Categorizing products is a very common scenario, although the way categories are supposed to behave may vary greatly from shop to shop. This is the reason why Reaction Commerce comes up with a very broad and generic concept of clustering products: **Tags**.

Click [here](tagging.md) for a detailed introduction into the tagging concept from the viewpoint of a shop admin.

### Do you support multiple languages?

We do! We have [internationalization support](i18n.md) for dozens of languages, including right-to-left formats! We also support currency conversion and localized currency formats.

### Have you tested Reaction on large shops with thousands of products?

We're always testing! During our Alpha release, we performed extensive tests, deploying shops at scale, and reviewing several database scaling options. We've done performance testing that mimics high-volume shops, and as a part of our Beta release, we will continue to test, test, test.

## More

### I have another question. Where's the best place to ask it?

Have a more technical question? Make sure to check the [Developer FAQ](developer-faq.md) first. You can also search through our [Forum posts](http://forums.reactioncommerce.com) or ask your question there.
