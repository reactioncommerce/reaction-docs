---
id: version-v1.5.0-converting
title: Converting Packages to Plugins
original_id: converting
---
    
Converting a package is largely about moving files into different places and creating some `index.js` files. Here are step-by-step instructions.

1.  You don't need your `package.js` any longer. Most of what was done here is done in imports.
2.  Move your `register.js` up from the server folder into the root of your plugin.
3.  _(optional)_ Move everything possible out of `common` folder into either `client` or `server`. This is going to make managing your imports either. Schemas still need to stay here but we are trying to standardize on using `lib`. Generally the only thing that truly needs to be available on both client and server are collections and schemas.
4.  Add relevant imports to all your files. (there is a note with a few common ones at the bottom of this doc). This includes simple things like `import { Meteor } from "meteor/meteor"` and `import { Template } from "meteor/templating"`.
5.  Change most references to `ReactionCore` to `Reaction` with the exception of logger calls which should be changed to just `Logger` (and imported).
6.  Collections can either be referenced as `Reaction.Collections.{CollectionName}` or imported from "/lib/collections" depending on what style you prefer. We've tried to make most things available from the `Reaction` namespace but referencing it that way can get tiresome.
7.  Add `index.js` files in the root of your `client` and `server` directories and import all the relevant files (including HTML and CSS files). See [this section](https://guide.meteor.com/build-tool.html#css-importing) of the Meteor Guide on how to import CSS files.
8.  If you depend on NPM packages you no longer need the `NPM.depends` syntax, you can just install them using `meteor npm install --save` and add them to your `package.json` file. Then you can just import them directly where you need them.  See [The Meteor Guide section on using NPM Package](https://guide.meteor.com/using-npm-packages.html) if you run into anything you don't understand.
9.  If you get confused or lost you can look at the `included` and `core` plugins. You can also look at the `development` branch of my [repo for the Customization Guide](https://github.com/zenweasel/beesknees)

## Lessons Learned

The easiest thing to miss is an import. If something is not working go and double-check that you have imported that file.

Here is a list of common things you will want to import so that you don't need to look them up. I will keep adding to these as I come across them.

## Meteor Imports

```js
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Template } from "meteor/templating";
import { check, Match } from "meteor/check";
import { Tracker } from "meteor/tracker";
import { Mongo } from "meteor/mongo";
```

## Third Party Packages

```js
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { AutoForm } from "meteor/aldeed:autoform";
```

## Reaction Imports

```js
import { Reaction, Logger } from "/client/api"; // on client
import { Reaction, Logger } from "/server/api"; // on server
import { CollectionName, AnotherCollection } from "/lib/collections";
```
