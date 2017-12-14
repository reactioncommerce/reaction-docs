# Frequently Asked Questions
## General
### What do I need to know to work with Reaction?

To start customizing Reaction, you should probably have a basic understanding of the following technologies:
- JavaScript, specifically ES6
- HTML/CSS
- Some knowledge of Meteor, especially an understanding of [Publications and Subscriptions](https://guide.meteor.com/data-loading.html)
- A front-end framework/library like React

Reaction tries to be as modular as possible. All user customizations are intended to live in plugins, as they provide a secure upgrade path when new versions are rolled out. See [here](/developer/tutorial/plugin-intro-1.md) for a more detailed explanation into the plugin topic.

### What sites are built on Reaction Commerce?

Ecommerce and marketplace sites from around the world are using Reaction in production now. Check out our [Community Showcase](https://reactioncommerce.com/community-showcase).


## Installation

### I cloned the Reaction repo but when I run `meteor` it doesn't work

You need to install and use the Reaction command line tool in order to run Reaction. It does some work building the application
before the app starts that is not optional. You can install the CLI by doing `npm install -g reaction-cli`. Then you should be able to run `meteor npm install` and then start the app by running `reaction run` or just `reaction`.

### Do you have a list of community provided plugins, themes or other resources?

We compiled a curated list of community projects that can be found in the wild. Over time this list will continue to grow and some of the project's may become deprecated. Please drop us a note if you spot new awesome contributions out there!
[Community Resources](/developer/community-resources.md).


## Admin

### Where is the admin panel?

The login panel is visible on the right side, once you login as a user with admin credentials. For more on navigating admin, read our [Reaction Commerce Store Operator Guide](/admin/dashboard.md).

### What's the admin login?

By default the admin login will be username: `admin@localhost` and password `r3@cti0n`

### What about SEO?

Since 2014 [Google has indexed JavaScript when crawling websites](https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html). Reaction, however, offers page pre-rendering and product detail page metatag generation out of the box to ensure products are indexed well for web crawlers and search engines:

1. [Prerender.io](https://prerender.io/): Reaction includes integration with Prerender.io out of the box. Prerender.io is a commercial service that will generate static renderings of the application for search engines. ALl you have to do is provide a key to your site and Prerender will handle the pre-rendering.

2. [Spiderable](https://github.com/ongoworks/spiderable): A now-deprecated solution is our Atmosphere package called (Spiderable)[https://atmospherejs.com/ongoworks/spiderable] that pre-renders Meteor applications for search engines.

3. [meteor-dochead](https://github.com/kadirahq/meteor-dochead): Automatically add `<meta>` tags are for products using the [meteor-dochead](https://github.com/kadirahq/meteor-dochead) package which uses the title, description and `details` fields of the product to render SEO-friendly data. You may need to use a tool like [SEO Inspector](https://chrome.google.com/webstore/detail/seo-inspector/iejckekdjogeeilmllnabmgkbbmedeal?hl=en) to see this data.

## Extending Reaction

### How can I add add a static page?

Add a single page, and more child pages, by adding a route and a template. This will require knowledge of HTML, JavaScript and Git or web development. This is covered in depth in this section of the [Customization Guide](https://docs.reactioncommerce.com/reaction-docs/master/plugin-routes-6).

This would work great for static pages like an About or Contact us page. If you want to add tools for administrators to manage text and image content without having to code, you probably want to a content management system (CMS).

### How do I integrate with a content management system (CMS)?

If you have a lot of content (like images and text) that needs to be managed you probably want to use a content management system (CMS). We currently do not have one integrated with Reaction.

On our [roadmap](https://reactioncommerce.com/roadmap)
we have a planned integration with a CMS like Drupal, which can hopefully serve as a model for other similar integrations.

## More

### I have another question. Where's the best place to ask it?

You can post questions in Gitter chat about [Installation](https://gitter.im/reactioncommerce/installation), [Deployment](https://gitter.im/reactioncommerce/deployment), [general Reaction](https://gitter.im/reactioncommerce/deployment) topics and [Architecture](https://gitter.im/reactioncommerce/architecture). You can also post questions in the [Forums](https://forums.reactioncommerce.com/).

Want more help? You can also ask a question live during our Community Calls. Here's the past [agendas](https://docs.google.com/document/d/1PwenrammgQJpQfFoUUJZ96i_JJYCM_4glAjB1_ZzgwA/edit) and a form to [submit questions] (https://docs.google.com/forms/d/e/1FAIpQLSfsNNH1W4bP7k4Gkl1JYF4vCEwQcHE9X3OIFfTH2TNwD7dN4Q/viewform).
