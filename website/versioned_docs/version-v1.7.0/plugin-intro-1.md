---
id: version-v1.7.0-plugin-intro-1
title: Plugin Tutorial
original_id: plugin-intro-1
---
    
## Background

### What do I need to know to create a plugin?

The concepts in this tutorial are mostly Reaction-specific and don't get into some of the more difficult-to-grasp (but cool)
elements of Meteor such as pub/sub or reactivity. But to understand what is happening you should probably have the following:

- A basic understanding of Javascript
- A basic understanding of HTML
- Either some experience using a template engine like Handlebars, Django Templates or ERB or have read the [Blaze](http://blazejs.org/guide/introduction.html) documentation.

### Pros and Cons of creating a custom plugin

When you start to work with Reaction Commerce (and with many other open-source ecommerce packages) you have two paths to go down. The first is to simply fork the package and make the changes you want. The advantages of this are:

1. Changes are often simpler to make and understand. If you want to change the look of a template, you just change it.
2. You can make changes that the core package may not allow you to make

However the disadvantage of this approach is that upgrading to newer releases of the software become more and more difficult. Depending on how complex your changes are, at some point it may become literally impossible to integrate your changes with updated software and you may end up rewriting your modifications again to be able to update.

It's possible that you believe that you never will need to upgrade. RC gives you what you need right now and you will build the rest. Or the project you are working on may not have the lifespan to make upgrading a concern (maybe it's just a proof of concept or an MVP). Or it's possible that the changes you need to make are so small that it's not worth creating a plugin just to modify a couple of templates. Those are legitimate reasons to not bother with the extra overhead of creating a plugin. If that's the approach you take however this tutorial is not for you, as we will focus on creating a custom plugin.

The advantages of creating a plugin are:

1. All of your changes are in one place and it's easy to see what's been modified and what is "stock". This also allows you to easily segment out what is "private" from what can be public or open-source.
2. Upgrading is as simple as just pulling in the latest changes from the repo, or installing a new version and dropping your plugin in.
3. Allows you to break your modifications into modules for better organization.

## Understanding the Plugin Loader

While we have tried in every case to leverage Meteor/Javascript standards, Meteor does not provide a way to add modular
functionality to an application, so we have created our own standard which is implemented through our command-line tool.

This tool scans the plugin directories for files and checks for three things:

- a `client` directory
- a `server` directory
- a `register.js` at the root of the plugin.

When it finds those elements it will dynamically add imports so that this code is loaded when the app is launched.
If you add or remove plugins you need to stop and restart the app for it to rescan, it's not done with every rebuild to
avoid thrashing. Custom plugins are always imported last so that they can override default settings.

## Notes on the Example Plugin

The goal of the example plugin is to show you all the things that you can do with a plugin, hopefully covering the things
people most often want to customize. However, if you look at the way that Reaction Commerce itself is structured every
attempt is made to make functionality as modular as possible so that things are easy to understand. So as you build
your plugin you may want to consider that you may want to build more than one plugin, possibly keeping things like
CSS and the like in one plugin and other, more backend-focused functionality in another. Whatever makes the most
sense to you, do.

Next: [Creating a plugin](plugin-creating-2.md)
