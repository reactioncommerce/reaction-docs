# Frequently Asked Questions

## Installation

## General

## Architecture

Q: What about SEO?

A: Since 2014 [Google has indexed Javascript when crawling websites](https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html).
Additionally Reaction offers a couple of options for pre-rendering (rendering plain HTML for crawlers, while leaving dynamic sites for users).
One is a [package we maintain](https://github.com/ongoworks/spiderable) called Spiderable. Also included in the base
Reaction is support for a service called [Prerender.io](https://prerender.io/) which is a commercial service which will do 
the same thing, just provide a key to your site and Prerender will handle the pre-rendering.

In addition `Meta` tags are added automatically for products using the `dochead` package which uses the title, description and
`details` fields of the product to render SEO-friendly data. You may need to use a tool like "SEO Inspector" to see these values. This
should meet the needs of most crawlers.

## Creating Plugins

## Extending Reaction

### I have another question. Where's the best place to ask it?

You can post questions in Gitter chat about [Installation](https://gitter.im/reactioncommerce/installation), [Deployment](https://gitter.im/reactioncommerce/deployment), [general Reaction](https://gitter.im/reactioncommerce/deployment) topics and [Architecture](https://gitter.im/reactioncommerce/architecture). You can also post questions in the [Forums](https://forums.reactioncommerce.com/).

Want more help? You can also ask a question live during our Community Calls. Here's the past [agendas](https://docs.google.com/document/d/1PwenrammgQJpQfFoUUJZ96i_JJYCM_4glAjB1_ZzgwA/edit) and a form to [submit questions] (https://docs.google.com/forms/d/e/1FAIpQLSfsNNH1W4bP7k4Gkl1JYF4vCEwQcHE9X3OIFfTH2TNwD7dN4Q/viewform).

