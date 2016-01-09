# Architecture
## What is Reaction?
Reaction is a modern reactive, real-time event driven ecommerce application.

Reaction is built with JavaScript (ES6), Meteor, Node.js and works nicely with Docker.

Reaction's modular design splits functionality into Meteor packages such as [`reaction-core`, `reaction-default-theme`, `reaction-shipping`](https://github.com/reactioncommerce/reaction/tree/development/packages) and more.

The application can easily be customized and new functionality added with new packages.

## What is Meteor?
A question answered well by Josh Owen's article: [What is Meteor?](http://joshowens.me/what-is-meteor-js/)
- Tracker - The backbone of the reactive front-end. It is the reactive 'glue' for any tracker aware libraries you build.
- Spacebars - A derivation of Handlebars, built to be reactive.
- Blaze - A reactive library built to marry Tracker & Spacebars up to create live updating user interfaces. Similar to Angular, Backbone, Ember, React, Polymer, or Knockout - just easier.
- Minimongo - A client side mongo library that synchronizes data over DDP and allows the client to reactively consume mongo data.
- Session - A library to handle reactive UI state variables, nothing like a session in Rails, PHP or Node.js.
- DDP (Distributed Data Protocol) - A protocol for sending data over websockets. Dubbed 'REST for websockets'.
