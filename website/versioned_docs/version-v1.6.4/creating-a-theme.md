---
id: version-v1.6.4-creating-a-theme
title: Creating a Theme
original_id: creating-a-theme
---
    
## Starting point

We've provided an example theme that you can use as a starting point for your own themes. Additionally, there's also a [YouTube tutorial](https://www.youtube.com/watch?v=D8FNJE9204Y) on this topic that should get you started in no time.

Ok, let's dive into it: Get the [Reaction Example Theme](https://github.com/reactioncommerce/reaction-example-theme).

## Theme contents

Every theme requires a specific structure to be properly registered as a Reaction theme.

register.js **(Required)** - Registers a Reaction plugin allowing it to be included automatically.

```js
import { Reaction } from "/server/api";

Reaction.registerPackage({
  // Label that shows up in tooltips and places where the package is accessable for settings
  label: "My Theme",

  // Unique name, used for pulling package data out of the database
  name: "my-theme",

  // Icon for toolbars
  icon: "fa fa-bars",

  // Auto-enable plugin, sets enabled: true in database
  autoEnable: true,

  // Settings for plugin
  settings: {},

  // Routes and other registry items related to layout
  registry: []
});

```

client/index.less **(Required for LESS processing)** - Entry point of all client side LESS files. From this file you can import all your custom files and they will be processed and included when the app is built.

```less
// Entrypoint for LESS CSS

@import "styles/navbar.less";

```

> You may store your CSS anywhere within your plugin. For the example theme we've placed CSS in the directory `client/styles`.

## Install theme

Themes are installed in `imports/plugins/custom/`. Themes are auto included and their load order is currently based on their order in the `custom` directory. Keep this in mind if you decide to have multiple themes in the `custom` directory as they may conflict with each other.

PLEASE NOTE: In order for your theme plugin to be loaded the first time, you will need to stop and restart your Reaction instance to trigger the plugin loader.

## Overriding variables and styles

You can override classes and variables of the default theme simple by defining the classes and variables after importing the base theme.

**client/styles/navbar.less**

```less
.my-navbar {
  display: flex; // All LESS is auto-prefixed
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: @reaction-brand;
  align-content: center;
  justify-content: center;
}

.my-navbar a {
  padding: 0 6px;
  font-size: 24px;
  color: @white; // All variables and mixins from the default theme are available to use
}

```

> In LESS variables are considered constants, and are processed first, from top to bottom of all included LESS files. That means you can override variables after they've already been declared and the last instance takes effect.
