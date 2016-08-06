# Creating a Reaction Commerce PlugIn

### Background

#### Pros and Cons of creating a custom plugin

When you start to work with Reaction Commerce (and with many other open-source eCommerce packages) you have two paths to go down. The first is to simple fork the package and make the changes you want. The advantages of this are:

1. Changes are often simpler to make and understand. If you want to change the look of a template, you just change it.
1. You can make changes that the core package may not allow you to make

However the disadvantage of this approach is that upgrading to newer releases of the software become more and more difficult. Depending on how complex your changes are, at some point it may become literally impossible to integrate your changes with updated software and you may end up rewriting your modifications again to be able to update.

It's possible that you believe that you never will need to upgrade. RC gives you what you need right now and you will build the rest. Or the project you are working on may not have the lifespan to make upgrading a concern (maybe it's just a proof of concept or an MVP). Or it's possible that the changes you need to make are so small that it's not worth creating a plugin just to modify a couple of templates. Those are legitimate reasons to not bother with the extra overhead of creating a plugin. If that's the approach you take however this tutorial is not for you, as we will focus on creating a custom plugin.

The advantages of creating a plugin are:

1. All of your changes are in one place and it's easy to see what's been modified and what is "stock". This also allows you to easily segment out what is "private" from what can be public or open-source.
1. Upgrading is as simple as just pulling in the latest changes from the repo, or installing a new version and dropping your plugin in.
1. Allows you to break your modifications into modules for better organization.


## Creating Our Plugin

### What is a Reaction Commerce Plugin?

Essentially a Reaction Commerce plugin is just a "module". Going forward Meteor is moving away from their own proprietary
package format and towards [ES6 modules](http://exploringjs.com/es6/ch_modules.html). In order to future-proof RC we have 
adapted this approach as well. It also removes some of the "magic" where a ton of globals were inserted.
It adds a little more boilerplate but makes up for it in clarity. Before moving forward you should have a 
good understanding of how [imports](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import) and 
[exports](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/export) work, 
and how to deal with importing [CSS](https://guide.meteor.com/build-tool.html#css-importing) and HTML files.

### Adding our files

For the purposes of our tutorial I am going to assume you are working from a fresh checkout of Reaction.

The reference files for this tutorial are available [here](https://github.com/reactioncommerce/reaction-example-plugin)

Start off by creating a directory within the `imports/plugins/custom` directory of RC. We will be calling our plugin `beesknees`. Within that directory you will want to create `client` and `server` directories.

You may, at this point want to also `git init` so you can start tracking your new package with source control.

## Using Custom Layouts

_Some of the concepts in this section will be easier to understand if you have read [Blaze](http://guide.meteor.com/blaze.html) section of the Meteor Guide._

### Purpose

In general layouts are a way of applying a structure to a site beyond what you would want to have in one particular template, allowing you to share components and reduce repetition. This is something you might do in server-side includes in other languages/frameworks.

### How Reaction uses layouts

Reaction Commerce uses one primary layout as the master or default called `coreLayout`. This layout is just another Blaze template. The code in this template is pretty minimal and you can see contains very little HTML. So before jumping in to replace this you may want to ask yourself if this is what you actually need to do. But because we are changing the global structure of our site to accomodate our "one-page-checkout" we need to.

``` html
<template name="coreLayout">
  {{#if hasDashboardAccess}}
    {{> coreAdminLayout}}
  {{else}}
    <nav class="reaction-navigation-header">
      <!-- begin layoutHeader -->
      {{> Template.dynamic template=layoutHeader}}
      <!-- end layoutHeader -->
    </nav>

    <nav class="reaction-cart-drawer">
      {{>cartDrawer}}
    </nav>

    <main role="main" id="main">
      <span id="layout-alerts">{{> inlineAlerts}}</span>
      {{#if hasPermission 'guest'}}
        <!-- begin template region -->
        {{> Template.dynamic template=template}}
        <!-- end template region -->
      {{/if}}

      <footer class="reaction-navigation-footer footer-default">{{> Template.dynamic template=layoutFooter}}</footer>
    </main>

  {{/if}}
</template>
```

In order to change our default layout, we need add a record to the **registry** for our package. We also need to add a special `defaults.js` that will add some global options.

__Note__: If you just want to override the homepage and leave everything else alone, you can do that by adding special INDEX_OPTIONS parameters to this `defaults.js` file. See the ["Changing the index page layout"](https://docs.reactioncommerce.com/reaction-docs/development/layout) documentation for more info.

First let's create our `defaults.js` with our custom layout. You will place this file in the `client` folder in your plugin. The `defaults.js` just looks like this:

``` javascript
import { Session } from "meteor/session";

Session.set("DEFAULT_LAYOUT", "coreLayoutBeesknees");
Session.set("DEFAULT_WORKFLOW", "coreWorkflow");
```

In order for this file to take affect, we need to also import it. So we add it to our `index.js` in your `client` directory.

``` javascript
import "./defaults";
```

We also need to add our layout to the registry. The registry is an area in the database where packages can store pieces of data that need to be read by the application. We will making several changes to the registry as we go along, but for now we just want to make one change and that's to add a layout.

To do that we need to create a new file called `register.js` and add it to the root of our plugin. Here is our starting point:

``` javascript
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Bees Knees",
  name: "bees",
  icon: "fa fa-vine",
  autoEnable: true,
});
```

(unlike most of the files we have been working with, this is not a Meteor standard, but a Reaction-specific file)

To the `registry` key we are going to add a `layout` entry that looks like this:

``` html
    layout: [{
      layout: "coreLayoutBeesknees",
      workflow: "coreProductWorkflow",
      collection: "Products",
      theme: "default",
      enabled: true,
      structure: {
        template: "products",
        layoutHeader: "layoutHeader",
        layoutFooter: "layoutFooter",
        notFound: "productNotFound",
        dashboardHeader: "",
        dashboardControls: "dashboardControls",
        dashboardHeaderControls: "",
        adminControlsFooter: "adminControlsFooter"
      }
    }]
```

You can see we specified several things there. The most important thing was the "layout" record, which refers to the new layout template we will create in the next chapter. We also specify which templates do we want for the header and footer (we are just keeping the default for now), and what's the main template that we render and that's `products`. We also
specified which template we would use for a "notFound". When we get to the routing and template more of this will make sense.

One important thing to understand is that at any point in time when RC goes to render a route/page it's going to
determine how to pull the layout record from a key of `layout + workflow`. The `coreWorkflow` is a special case in that it is a workflow with just one step. It is essentially the "default" workflow when you hit the home page.

Also note that we have other parts that we could substitute without
changing our layout. For example we change point our header or footer to
a custom template by changing the values for "layoutHeader" or "layoutFooter".

## Customizing Templates

If you have been following along exactly with this tutorial you may have noticed what we have accomplished so far, we have broken the site. Why? Because the layout we specified cannot be found. So let's add it now.

Create a directory under `client` called `templates` and then under that a directory called `layouts`. (_Note that none of this structure except for client is required by Meteor, it's just how I like to structure things, YMMV_)

Now let's create a file called `core.html` and add our template tags like this:

``` html
<template name="coreLayoutBeesknees">
</template>
```

To make this template part of the project we need to import it, so we add it to the `index.js` at the root of the `client` directory (where we imported the LESS files). We add this line

``` javscript
import "./templates";
```

Then we need to create another `index.js` at the root of the `templates` directory and import all of our templates there. *Every time we add a template we need to import here in this file. I won't be mentioning that every time from here on out*. So in `client/templates/index.js` we add

``` javascript
import "./layouts/core.html";
```

(Could you just import this file directly into `client/index.js`? Yes. This is just my style.)

Ok, still a blank site because we have nothing in our layout. Let's add back in our main section for now (between the beginning and ending `<template>` tags:

``` html
  <main role="main" id="main">
    <span id="layout-alerts">{{> inlineAlerts}}</span>
    {{#if hasPermission 'guest'}}
      <!-- begin template region -->
      {{> Template.dynamic template=template}}
      <!-- end template region -->
    {{/if}}

    <footer class="reaction-navigation-footer footer-default">{{> Template.dynamic template=layoutFooter}}</footer>
  </main>
```

_If you want to restore the entire original layout including the header then add this section above the main section_

``` html
<nav class="reaction-navigation-header">
  <!-- begin layoutHeader -->
  {{> Template.dynamic template=layoutHeader}}
  <!-- end layoutHeader -->
</nav>

<nav class="reaction-cart-drawer">
  {{>cartDrawer}}
</nav>
```

See that line that says:

``` html
{{> Template.dynamic template=template}}
```

You may remember that when we created our layout entry there was a variable called `template` that was set to `products`. So when we add back in that main section it's rendering the template called "products" in that main section. That's why once you put that section back in you will suddenly get the list of products appearing again.

Now what if you don't want to show the `products` template there but
show your own template with your own unique way of displaying products?
You just need to change the entry in the layout record to point to your
template. This completely decouples your template from the original
template. 

So let's go and create our template first and then we will point our new
layout at it.

Create a directory under `client/templates` called `products` and there create a file called `productsLanding.html` and a file called `productsLanding.js`

_For the purposes of this tutorial we are just copying over the original template files from the `product-variant` plugin. You, of course, are creating a brand new, innovative way of displaying products._

If you look at these templates you will see templates and sub-templates. Basically if you want use the default you can just references back to the orignal template by name, or you can change the name and create your own template. All templates go into a single global namespace and must be unique.

Oh, and let's not forget to import these files in our `index.js`.

(Note, this list might change as we try to make this example store more custom)

``` javascript
// products
import "./products/productsLanding.html";
import "./products/productsLanding";

```

Now we need to change the entry in our layout record in our `register.js` file. Just change the entry that says
"template" to be "productsLanding" (no need for the .html) Again this will require a `./reaction reset` to take effect.

## Adding Fixtures

As we have been going through this tutorial you may have noticed that we keep having to `./reaction reset` which clears
out all your data in the database.

If you are just learning and playing with the sample data this is fine. But if you want to start customizing your store
by changing things like the name then you may find this a little frustrating. Even more so, if you have started
creating products you probably don't want to reset your data and lose your work. So we are going to fix that by
creating "fixtures".

When we create fixtures we are going to create JSON files that contain the "static" data that makes up your site
(as opposed to things like orders). This is usually really helpful when developing as you may want to dramtically
change the way some things are stored in the database but don't want to start over with the stock data.

The sample data files are located at `private/data` in the repo. To use them you need to copy them to the `private/data` directory at the root of your project.

Startup hook are already built into the project to load these four files on startup. But what if you wanted to load additional files (Discounts or Taxes for example)? You can hook into the Reaction Commerce start-up process by using the `Hooks` object in the API. We don't have any additional data to load right now but let's create a `load.js` file in our `server` directory and add this code. You can see that we just add a callback to be executed after the "onCoreInit" event is fired. This can be pretty much any arbitrary code you want.

``` javascript
import { Packages, Shops, Products, Tags } from "/lib/collections";
import { Hooks, Reaction, Logger } from "/server/api";

/**
 * Hook to setup core additional imports during Reaction init (shops process first)
 */
Hooks.Events.add("onCoreInit", () => {
Logger.info("======> Initialize using Bees Knees Data");
    // Reaction.Import.fixture().process(Assets.getText("private/data/Discounts.json"), ["name"], Reaction.Import.shop);
Reaction.Import.flush();
});

```

Now we want to add an `index.js` to our server directory and import our `init.js`. That file should just look like

``` javascript
import "./init";
```

Now let's look at the data we moved over. There are four files there `Shops.json`, `Products.json`, `Shipping.json` and `Tags.json`. Primarily we are going to be concerned with Shops and Products but these are not the only types of data you can import. If you want to import other data types please consult the main documentation under "Import".

Let's look at the Shops file. There is a lot of stuff there and a lot of it you won't want to change (unless you have revolutionary opinions about how many provinces Canada has, etc.). But there are some critical pieces to change.

The first thing we are going to do is remove the `<blank store>` record. This second entry is to highlight how you
can have multiple stores within Reaction Commerce. However for the purposes of this tutorial we are just creating the one store so the second one just adds confusion so let's remove the whole record. (Shops is an array of Shop records, so you can just delete the second entry in the array).

Now if you look at the top level records in the first shop you will see a lot of things that you want to change.
Critical things like Name and Description. You will also want to look at the `addressBook` entry.

After you change those entries and reset, you will now see your new entries take effect. Remember, if you make
changes within the site those settings **will not** be saved when you reset unless they are stored in this file.

### Sidebar: How do I look at my data? Where is it?

When in development mode Meteor uses its own copy of Mongo and will use the port that your dev server is running on +1. You can use [RoboMongo](https://robomongo.org/) or similar GUI's to see your data. Or alternately you run run `meteor mongo` while your application is running and query your data via the command line.

If you look at the `Shops` collection in the database you can see that it pretty much looks exactly like the JSON files you have. This makes it relatively easy to make a change in the admin, look at the changed record in the db, and then replicate that change in the JSON, saving your change for all eternity. (or you can use the export method that we talk about next, but knowing where things are in the Shops collection can be fairly valuable when developing)

### Creating the Products files

Our Bee's Knees example store is relatively simple with just a few products. However your store may be much more complex with possibly hundreds of products. And even with a few products, the process of looking at the database and changing records is tedious and unreliable. The better way is to create your products in Reaction and then export them to a file.

To do this we are going to use the `mongoexport` utility which is only installed with a "full" installation of MongoDb (i.e. not included with the version installed with Meteor. Please see the Mongo documentation on how to install Mongo on your platform).

You will need to run the export utility against the running Mongo version for your local shop. The Meteor Mongo always defaults to the port you are running Mongo on +1. If you used the default port of 3000, then your Mongo is running on port 3001 so your command to export the `Products` collection would be:

```
mongoexport --db meteor --collection Products --port 3001 --jsonArray --pretty > Products.json
```

Note that while MongoDB is not a relational database, things like Products and Shops are tied to each via their unique ID's. So it's good to be conscious of that when exporting things. For example, all products are tied to a Shop and if you don't have a Shop with that ID the import will not work.

Now you should have your fixtures ready to go. Remember that they need to be placed in the `private/data` directory at the root of the project to be imported automatically.


## Adding Custom Pages/Routes

In any web framework, "routes" are one of the core elements of what happens on a website. Certainly rendering content when a user hits a particular URL is a majority of what happens in web development.

Reaction Commerce uses the [FlowRouter package](https://github.com/kadirahq/flow-router) for it's routing and discussing all the specifics of how this works is beyond the scope of this document. However, to add simple routes it's not necessary to understand that much about FlowRouter. One important element to understand is that Reaction Commerce stores all it's Routes in the "Registry" in the database, which allows packages to dynamically add routes along with their functionality, and even override or remove existing routers. For more in-depth coverage of Routing you will want to consult the main Reaction Commerce docs, but one thing to understand is that a customized version of FlowRouter is available globally as `Reaction.Router`.

But we are going to keep it at its most simple and just add a single new route which will be available to anybody. Bee's Knees wants to add the ubiquitous "About" page to their site and wants to show essentially a static page there. (Managment of static pages is coming in upcoming version of RC but this still makes an excellent simple example).

So the first thing we want to do is add the route in the Registry which we do by adding an entry in the `registry` key in our `register.js` file.

This entry will look like this (placed after the `autoEnable: true` entry):

``` javascript
  registry: [
    {
      route: "/about",
      name: "about",
      template: "aboutUs",
      workflow: "coreWorkflow"
    }
  ],
```

The `route` entry is the URL that will match the users URL. (for how to include parameters in the route, please see the RC documentation or the FlowRouter documentation) The `name` is the string by which you will refer to this route in other parts of the application. The `template` is the template that will be rendered when the route is visited, and the `workflow` defines which workflow this will be attached to. In our case, there is no real workflow around an about page so we use the default "coreWorkflow".

To allow users to our new Route we need to give them permissions. Since we are good with everyone viewing our About page  we will add this permission to our "defaultRoles" and "defaultVisitorRoles" (the roles available when a new user is created).
To do this we are going to add some code to our `init.js` file to add the new routes to the roles. That function looks like this:

``` javascript
function addRolesToVisitors() {
  // Add the about permission to all default roles since it's available to all
  Logger.info("::: Adding about route permissions to default roles")
  const shop = Shops.findOne(Reaction.getShopId());
  Shops.update(shop._id, {
      $addToSet: { "defaultVisitorRole": "about"}
    }
  );
  Shops.update(shop._id, {
    $addToSet: { "defaultRole": "about"}
  });
}
```

Then let's add another Hook Event to call that code.

``` javascript
/**
 * Hook to make additional configuration changes
 */
Hooks.Events.add("afterCoreInit", () => {
  addRolesToVisitors();
});
```

Now, as usual you will need to reset for this change to take affect. In addition, changes to defaultRoles/defaultVisitorRoles do **not** change existing users, so you will need to clear your cache or use Private/Incognito mode so that a new user is created.

## Customizing The Checkout Workflow

_Note: If you are looking to actually change the fields in the checkout flow, you will actually want to look at the "Customizing Schemas" chapter. That chapter will explain why_

Reaction Commerce currently has a relatively simple workflow system. Workflows are simply an array of ordered records that point to a template. Here is what the checkout workflow looks like in the database. Each a record in the `core/checkout` plugin (in the Packages collection):

Login:

``` javascript
{
    "template" : "checkoutLogin",
    "label" : "Login",
    "workflow" : "coreCartWorkflow",
    "container" : "checkout-steps-main",
    "audience" : [
        "guest",
        "anonymous"
    ],
    "priority" : 1,
    "position" : 1,
    "enabled" : true
}
```

Address Book:

``` javascript
{
    "template" : "checkoutAddressBook",
    "label" : "Shipping Billing",
    "workflow" : "coreCartWorkflow",
    "container" : "checkout-steps-main",
    "audience" : [
        "guest",
        "anonymous"
    ],
    "priority" : 2,
    "position" : 2,
    "enabled" : true
}
```

Shipping Options:

``` javscript
{
    "template" : "coreCheckoutShipping",
    "label" : "Shipping Options",
    "workflow" : "coreCartWorkflow",
    "container" : "checkout-steps-main",
    "audience" : [
        "guest",
        "anonymous"
    ],
    "priority" : 3,
    "position" : 3,
    "enabled" : true
}
```

Review:

``` javscript
{
    "template" : "checkoutReview",
    "label" : "Review Payment",
    "workflow" : "coreCartWorkflow",
    "container" : "checkout-steps-side",
    "audience" : [
        "guest",
        "anonymous"
    ],
    "priority" : 4,
    "position" : 4,
    "enabled" : true
}
```

and Completion:

``` javascript
{
    "template" : "checkoutPayment",
    "label" : "Complete",
    "workflow" : "coreCartWorkflow",
    "container" : "checkout-steps-side",
    "audience" : [
        "guest",
        "anonymous"
    ],
    "priority" : 5,
    "position" : 5,
    "enabled" : true
}
```

To change this workflow you simple need to modify these records. In our example we are going to change the template for the Review step to a custom one (which will actually look just mostly like the original, but you can imagine that you could do a lot more.)

So to solidy our change we are going to have our changes to the database done in our `load.js` script so that these changes are made when the store is bootstrapped.

We want to make this change after everything else has been set up (we want to make sure those records are there before we try to modify them) so we are going to add our function on to the `afterCoreInit` event.
So we just call out function from the Hook Event we created earlier

``` javascript
Hooks.Events.add("afterCoreInit", () => {
    addRolesToVisitors();
    modifyCheckoutWorkflow();
});
```

Our function call is just a call out to modify the record in the collection using standard Mongo syntax:

``` javascript
function modifyCheckoutWorkflow() {
  // Replace checkoutReview with our custom Template
  Packages.update({
    "name": "reaction-checkout",
    "layout": {
      "$elemMatch": {
        "template": "checkoutReview"
      }
    }
  }, {
    "$set": {
      "layout.$.template": "checkoutReviewBeesknees",
      "layout.$.label": "Review Order"
    }
  });
}
```

Now of course we will need to create our template and add that file to our imports but I am leaving that up to you since we have covered it a few times now. The template is available in the BeesKnees repo if you want to take a look at it. You will notice that there is nothing special about this command, we are just directly modifying the MongoDb.

Once we `./reaction reset` and begin again we can look in the db and see that our changes have taken effect. And if we put something in our cart and checkout, we should see the change to the checkout flow.


## Customizing Schemas

_If will be easier to understand this section of the tutorial if you have read and understood the [Schemas](http://guide.meteor.com/collections.html#schemas_) section of the Meteor Guide_

While Mongo is a "schemaless" database that does not mean schemas are a bad idea. In fact they are a great idea and so Reaction Commerce uses a package called [Simple Schema](https://atmospherejs.com/aldeed/simple-schema) to build and enforce schemas. This package is recommended in the Meteor Guide and we recommend it's use as well.

In addition to Simple Schema we use a package called [Autoform](https://github.com/aldeed/meteor-autoform) which allows you to define a form as derived from a particular schema, saving a lot of time and repetitive code. One of the most obvious uses is in the cart where the various forms for things like Address are derived from their corresponding Schema. You can import Schemas from `/lib/collections/schemas` on both client and server.

### Removing Fields from a Schema

In eCommerce it's very important to ensure that your checkout flow is as simple as possible (but no simpler) so that customers experience is as easy as possible. And different types of stores may have different types of data that they collect and store. For example, a store that sells downloads has no need to collect a shipping address.

Removing fields from a Schema is relatively straight-ahead in that we just need to replace an entire Schema with a copy of that schema with the unnecsssary fields removed and specifying a replace parameter.

For example if you wanted to remove the `note` field from the `Account` schema you would create a `lib` directory (because schemas are used on both client and serve) in the beesknees package and create a file called `schemas.js`. In that you would make a copy of the Account schema, remove the `note` field and then add this line

``` javascript
import { Accounts } from "lib/collections";
import { Accounts as AccountsSchema } from "lib/collections/schemas";
Accounts.attachSchema(AccountsSchema, {replace: true});
```

Because our package is loaded last (because we imported it last), even though there is already an Accounts schema, our definition will override the built-in one and both forms and database inserts will use our custom one. In order for this schema to be loaded however, you will need to add imports in the `main.js` files for both `client` and `server`.
