---
id: version-v1.4.0-plugin-creating-2
title: Creating your plugin
original_id: plugin-creating-2
---
    
## What is a Reaction plugin?

Essentially a Reaction plugin is just a "module". Going forward Meteor is moving away from their own proprietary
package format and towards [ES6 modules](http://exploringjs.com/es6/ch_modules.html). In order to future-proof RC we have
adapted this approach as well. It also removes some of the "magic" that created global Meteor elements.
It adds a little more boilerplate but makes up for it in clarity. Before moving forward you should have a
good understanding of how [imports](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import) and
[exports](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/export) work,
and how to deal with importing [CSS](https://guide.meteor.com/build-tool.html#css-importing) and HTML files.

### Adding our files

For the purposes of our tutorial I am going to assume you are working from a fresh checkout of Reaction.

The reference files for this tutorial are available [here](https://github.com/reactioncommerce/reaction-example-plugin)

Start off by creating a directory within the `imports/plugins/custom` directory of RC. We will be calling our plugin `beesknees`.
Within that directory you will want to create `client` and `server` directories.

You may, at this point want to also `git init` so you can start tracking your new package with source control.

Then the first file we create is going to be our `register.js`. This is absolutely the bare minimum you need to create
a plugin. This code adds your plugin to the "registry" (the Packages collection in the db). A bare minimum file would
look something like this:

```js
import { Reaction } from "/server/api";


Reaction.registerPackage({
  label: "Bees Knees",
  name: "beesknees",
  icon: "fa fa-vine",
  autoEnable: true
});
```

It's important to understand that Registry entries are added upon first start, but they don't get reloaded if they already
exist, so to have registry changes take effect you must either `reaction reset -n` or remove that entry directly from
the `Packages` collection.

Next: [Using Layouts](plugin-layouts-3.md)

## Read More:

[Registry](registry.md)
