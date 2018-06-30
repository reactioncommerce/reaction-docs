---
original_id: creating-a-theme
id: version-v1.1.0-creating-a-theme
title: Creating a Theme
---
    
## Starting point

We've provided an example theme that you can use as a starting point for your own themes.

Get the [Reaction Example Theme](https://github.com/reactioncommerce/reaction-example-theme).

## Theme contents

Every theme requires a specific structure to be properly registered as a Reaction theme.

register.js **(Required)** - Registers a Reaction plugin allowing it to be included automatically.

```js
import { Reaction } from "/server/api";

Reaction.registerPackage({
  // Name of the theme for presentation purposes
  label: "Example Theme",

  // Name of your theme to uniquely identify it from other themes
  name: "reaction-example-theme"
});
```

client/index.js **(Required)** - Entry point of all client side plugins, like themes and templates. From this file you can import your LESS or CSS files and they will be processed and included when the app is built.

```js
// Import CSS
import "./styles/main.less";
```

> You may store your CSS anywhere within your plugin. For the example theme we've placed CSS in the directory `client/styles`.

## Install theme

Themes are installed in `imports/plugins/custom/`. Themes are auto included and their load order is currently based on their order in the `custom` directory. Keep this in mind if you decide to have multiple themes in the `custom` directory as they may conflict with each other.

PLEASE NOTE: In order for your theme plugin to be loaded the first time, you will need to stop and restart your Reaction instance to trigger the plugin loader.

## Overriding variables and styles

You can override variables of the default theme simple by defining the variables after importing the base theme.

**client/styles/main.less**

```less
// Import the main.less file from the base reaction theme
// {} means start from the root of meteor instance
// you can also include CSS from node_modules by doing {}/node_modules/path_to_module_css
@import "{}/imports/plugins/included/default-theme/client/styles/main.less";

// Override any variables from the default theme
@navbar-default-bg: #ff0000;
```

> In LESS variables are considered constants, and are processed first, from top to bottom of all included LESS files. That means you can override variables after they've already been declared and the last instance takes effect.
