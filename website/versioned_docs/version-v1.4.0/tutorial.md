---
id: version-v1.4.0-tutorial
title: Customization Guide
original_id: tutorial
---
    
## Purpose

This tutorial is in two parts, the first parts focuses on creating a custom "theme" which is how you can modify
the appearance of Reaction without changing any of the original files. The second part deals with creating a custom
"plugin" which allows you extend the functionality or create completely new functionality.

### What's the difference between a theme and plugin?

In terms of layout structure how Meteor sees them, nothing. Themes are just a subset of plugins that only focus on
modifying the appearance and UX of Reaction.

### Can I combine appearance and backend changes?

Yes, plugins can do everything a theme can do.

### Where do I start?

This depends on what you want to do. If you want to largely change the look and feel of the application and not the way
it functions you can read just the theming tutorial but generally we would recommend that anybody doing development
with Reaction should read the entire plugin tutorial since most development with Reaction will take place within plugins.

### What are some of the best tools when developing for Reaction?

Most of the Reaction teams uses [Atom](https://atom.io/) and we have a section in the [style guide](styleguide)
on how to customize it for working with Reaction. Also [RoboMongo](https://robomongo.org/) is a great tool for looking at
your local database. Using and understanding the Meteor commands like `meteor shell` are also very handy. There are also
a couple of Chrome extensions that allow you to inspect MiniMongo and Blaze templates. A search for MiniMongo or Meteor
should help you find them.

### How do I create a custom theme?

[Theming Tutorial](creating-a-theme.md)

### How do I add routes?

[Adding Custom Routes](plugin-routes-6.md)

### How do I change the layout?

[Layouts](plugin-layouts-3.md)

### How do I change what templates are used or add my own custom templates?

[Customizing Templates](plugin-customizing-templates-4.md)

### How do I customize schemas?

[Schemas](plugin-schemas-8.md)

### How do I load custom data for products, etc?

[Fixtures](plugin-fixtures-5.md)

### How do I change the checkout workflow?

[Workflow](plugin-workflow-7.md)

Or, the plugin tutorial is intended to be read from beginning to end. You can start here

[Plugin Tutorial](plugin-intro-1.md)

### How do I create a custom payment-provider package?

[Creating a Payment Provider Plugin](creating-a-payment-provider.md)
