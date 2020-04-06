---
id: version-3.4.0-faqs
title: FAQs
original_id: faqs
---

## General

### What is Reaction Commerce?

Reaction Commerce is an open source commerce platform that allows anyone to customize, extend, and deploy an online store or marketplace. Our codebase is available for free via [GitHub](https://github.com/reactioncommerce/reaction).

### I already have a hosting solution. Can I host a Reaction shop anywhere I want?

Yep! You can host a Reaction shop on any platform that supports Docker (for example AWS ECS, Docker Swarm or Kubernetes). You can also run Reaction Commerce without Docker, although there is no official support for that and we don't recommend it.

### What's your pricing model?

Reaction is free. Our code, which is licensed under the GPL v3 and Apache 2.0 licenses (depending on the project), will always be free and available to the open source community.

### Reaction is all JavaScript. Does this have a negative impact on SEO?

Nope! Reaction's Example Storefront is based on Next.js, which offers server-side rendering out of the box. To the eyes of the Google crawler bot, your site is just another standard, static website.

## Operating a store

### How do I sign up for an account, login to my dashboard, and set up my domain?

You'll need to install and run Reaction locally on your computer. For more info, check out our [Installation docs](https://docs.reactioncommerce.com/docs/getting-started-developing-with-reaction).

### Where is the admin panel?

The admin panel is served by `reaction-admin` on port 4080. On your local machine, you can access the admin panel at [localhost:4080](http://localhost:4080). For more on navigating admin, read our [Reaction Commerce Store Operator Guide](dashboard.md).

### What's the default admin login?

As of Reaction Commerce 3.0, there are no default admin credentials anymore. The first user you register on your instance through the sign up form will get the owner role.

### How can I put products into categories / sub-categories?

Categorizing products is a very common scenario, although the way categories are supposed to behave may vary greatly from shop to shop. This is the reason why Reaction Commerce comes up with a very broad and generic concept of clustering products: **Tags** and **Navigation Trees**.

Click [here](tagging.md) for a detailed introduction into the tagging concept from the viewpoint of a shop admin.

### Do you support multiple languages?

`reaction-admin` has out-of-the-box [internationalization support](i18n.md) for dozens of languages, including right-to-left formats. Our `example-storefront` doesn't, but it's meant to be boilerplate so we wanted to keep it as simple as possible. We also support localized currency formats.

### Have you tested Reaction on large shops with thousands of products?

Big, recognized brands like Fila and Sports Direct are using Reaction Commerce in production. Our community also has been running Reaction Commerce with very large catalogs, some of them containing millions of SKUs.

## More

### I have another question. Where's the best place to ask it?

Have a more technical question? Make sure to check the [Getting Started as a Developer](getting-started-developing-with-reaction.md) page first. You can also search through our [Forum posts](http://forums.reactioncommerce.com), ask your question there or on our [Gitter channel](https://gitter.im/reactioncommerce/reaction).
