---
id: version-v1.7.0-plugin-creating-2
title: Part 1: Creating your plugin
original_id: plugin-creating-2
---
    
## What is a Reaction plugin?

A Reaction plugin is a plain old JavaScript module.

Going forward, Meteor is moving away from their proprietary package format and towards the [ES6 modules](http://exploringjs.com/es6/ch_modules.html) standard. Reaction is adopting the module approach as well. While adding some boilerplate structure, using JavaScript's native built-in modules adds clarity and removes some of the _magic_ that created global Meteor elements. 

Before moving forward you should have a good understanding of how [imports](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import) and
[exports](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/export) work
and importing [CSS](https://guide.meteor.com/build-tool.html#css-importing) and HTML files.

## Getting started

### Add `client` and `server` directory structure

Start with a fresh checkout of the latest version of Reaction.

1. Create a directory with the name of the plugin, `beesknees`, within the `imports/plugins/custom` directory of Reaction.
2. Within `beesknees`, create `client` and `server` directories.

You may, at this point want to also `git init` so you can start tracking your new package with source control. 

The reference files for this tutorial are available [here](https://github.com/reactioncommerce/reaction-example-plugin).

### Create a [`register.js`](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/register.js)

The first file we create is going to be our `register.js`. This is absolutely the bare minimum you need to create
a plugin. The `register.js` adds your plugin to the Registry, the Packages collection in the database. 

3. Create a `register.js` file would look something like this:

```js
// register.js
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Bees Knees",
  name: "beesknees",
  icon: "fa fa-vine",
  autoEnable: true
});
```

At this point, your local directory should look like:

```sh
  └── imports
     └── plugins
         └── custom
             └── beesknees
                 └── client
                 └── server
                 ├── register.js
```

### Load the plugin

Now, to see load the plugin, run:

```sh
reaction reset -n
```

Registry entries are added when the app first starts, but they don't get reloaded if they already exist. Running `reset` will reset the database and restart the app, allowing the app to read the `register.js` file you just created.

An alternative option to load a plugin would be to remove that entry directly from the `Packages` collection.

> ProTip: Pass the `-n` flag to `reaction reset` to skip deleting the node_modules folder.

Next: [Using Layouts](plugin-layouts-3.md)

## Read more

- [Docs: Registry](registry.md)
- [Blog: An Intro to Architecture: The Registry](https://blog.reactioncommerce.com/an-intro-to-architecture-the-registry/)
