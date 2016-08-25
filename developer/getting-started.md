# Getting Started with Reaction

Reaction is developed with the Meteor framework. Reaction also liberally uses NPM packages, and tooling.

Before getting started, here's some resources worth reviewing:

- [Meteor Guide](http://guide.meteor.com/)
- [Meteor Docs](http://docs.meteor.com/#/basic/)
- [ES2015+ features](https://github.com/meteor/meteor/tree/master/packages/ecmascript#supported-es2015-features)
- [Using NPM + Browserify](http://guide.meteor.com/build-tool.html#client-npm)
- [Less](http://guide.meteor.com/build-tool.html#less)

## Customization Guide

If you are creating a custom store with Reaction you probably want to start with the
[customization guide](/developer/tutorial/customization.md) which walks you through many of the common customizations that
you may require and how to create your own custom package to store them.

## Local Plugins

A number of plugin modules are imported in the `reaction` local `/imports/plugins` folder. In this documentation, these local packages are commonly referred to as "Core" packages or as local plugin modules.

Some of the Reaction plugin modules that are included.

- reaction-accounts
- reaction-analytics
- reaction-analytics-libs
- reaction-collections
- reaction-core
- reaction-core-theme
- reaction-default-theme
- reaction-email-templates
- reaction-sample-data
- reaction-schemas
- reaction-social
- reaction-shipping
- reaction-ui

### Packages

We recommend importing local plugins or [**npm**](https://www.npmjs.com/) packages as the preferred way of extending Reaction functionality. 

[Atmosphere](https://atmospherejs.com/) is the legacy Meteor package registry, and Reaction can install Meteor packages from Atmosphere.

You can create or [use community packages](https://guide.meteor.com/atmosphere-vs-npm.html) to add customized functionality to Reaction.

## Roadmap

For a high level review our roadmap, take a look at our features page [Reaction Vision](https://reactioncommerce.com/features)

For grouping of development channels by feature see [GitHub project milestones](https://github.com/reactioncommerce/reaction/milestones)

Perhaps the best overall view, is our [Waffle board](https://waffle.io/reactioncommerce/reaction). This project board includes additional project progress for Reaction Commerce beyond just the Core.

## Issues

For development tasks/issues please use the [Reaction project issues of GItHub](https://github.com/reactioncommerce/reaction/issues?state=open). We're keeping this as the central issue tracking for all [reactioncommerce:*](https://github.com/reactioncommerce/) packages.

### Other Resources

[![Gitter](https://badges.gitter.im/JoinChat.svg)](https://gitter.im/reactioncommerce/reaction?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
