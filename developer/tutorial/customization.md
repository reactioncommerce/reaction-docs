# Customizing Reaction Commerce

### Purpose

This tutorial is intended to walk through most aspects of building a custom store, starting from simple appearance tweaks, through changing the behavior of the checkout and finally adding custom schemas and inventory hooks.

**_Note_**: While this tutorial focuses on creating a custom package, for many appearance tweaks you don't need to go to this level of detail.

## Following this tutorial

All the files created/modifed in this tutorial are in the [Bee's Knees](https://github.com/zenweasel/beesknees) repo. You can use these files as a reference if you get stuck, however I recommend that you start from scratch with your own blank package. Most of the code you might want to copy and paste into your new package is included here in the body of the tutorial for just that purpose. Just basically substitute your own store name whereever you see Bee's Knees.

### Background

#### Pros and Cons of creating a custom package

When you start to work with Reaction Commerce (and with many other open-source eCommerce packages) you have two paths to go down. The first is to simple fork the package and make the changes you want. The advantages of this are:

1. Changes are often simpler to make and understand. If you want to change the look of a template, you just change it.
2. You can make changes that the core package may not allow you to make

However the disadvantage of this approach is that upgrading to newer releases of the software become more and more difficult. Depending on how complex your changes are, at some point it may become literally impossible to integrate your changes with updated software and you may end up rewriting your modifications again to be able to update.

It's possible that you believe that you never will need to upgrade. RC gives you what you need right now and you will build the rest. Or the project you are working on may not have the lifespan to make upgrading a concern (maybe it's just a proof of concept or MVP). Or it's possible that the changes you need to make are so small that it's not worth creating a package just to modify a couple of templates. Those are legitimate reason to not bother with the extra overhead of creating a package. If that's the approach you take however this tutorial is not for you, as we will focus on creating a custom package.

The advantages of creating a package are:

1. All of your changes are in one place and it's easy to see what's been modified and what is "stock". This also allows you to easily segment out what is "private" from what can be public or open-source.
2. Upgrading is as simple as just pulling in the latest changes from the repo, or installing a new version and dropping your package in.

### Our Store

We are building a store for a fictional children's clothes manufacturer: Bee's Knees. BK manufactures children's clothes with an emphasis on natural materials and original designs. Their brand emphasizes bright, bold colors and an "earthy" aestetic.

#### The changes

Besides changing obvious things like colors and fonts, BK has told us that they want the checkout process to be a simple as possible so they want a "one-page-checkout". Also they want the customers to be able to enter the names and ages of their children and store them in the database so that they can send out age-specific sales emails at a later point. They want to change the way the Product Grid and Product Details pages look as well.


## Creating Our Package

### Adding custom CSS

_Note: This portion of the tutorial covers much of the same matter as https://docs.reactioncommerce.com/reaction-docs/development/creating-a-theme-package. It just assumed you will start with CSS changes and expand from here._

For the purposes of our tutorial I am going to assume you are working from a fresh checkout of Reaction.

Start off by creating a directory within the `packages` directory of RC. We will be calling our package `beesknees`. The minimum a package needs is a `package.js` files that defines what the package is and what it contains.  Here is the bare minimum of a package.


```
Package.describe({
  name: "beesknees:beesknees",
  summary: "Bee's Knees Custom Store",
  version: "0.1.0"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.3");
});
```

You may, at this point want to also `git init` so you can start tracking your new package with source control.

Now this package effectively does nothing until we start adding some files so let's start off with some CSS files to start making our store look the way we want it to look.

First we are going to add our main less file, which we are going to brilliantly name `main.less`. For now let's copy that file, along with the files in `styles` from the `my-custom-theme-template` directory underneath `packages`.

Now to make Meteor process that file we need to add it to our package.js, so after the `  api.versionsFrom("METEOR@1.3");` entry add an entry that looks like:

```
api.addFiles("client/main.less", "client");
```

This tells Meteor to add this file to the files it will compile at build time, and that this file is needed only on the client.

Now since this is a LESS file, we need to tell Meteor to use the LESS pre-compiler so above the entry you just added, add another entry like:

```
api.use("less");
```

Now if you have copied over the main.less file you will see that it imports some other files which you should also copy for now. (We are going to start by just overriding the existing styles, eventually we may just throw this all away). So we add two more entries:

```
  api.addFiles("client/styles/variables.less", "client", {isImport: true});
  api.addFiles("client/styles/base.less", "client", {isImport: true});
  ```

  Now, to complete our package.js for now we also want to depend on the default styles defined in the Reaction default-theme, so we add this line:

```
api.use("reactioncommerce:core-theme@2.0.0");
```

So our completed `package.js` should look something like:

```
Package.describe({
  name: "beesknees:beesknees",
  summary: "Bee's Knees Custom Store",
  version: "0.1.0"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.3");

  api.use("less");
  api.use("reactioncommerce:core-theme@2.0.0");

  api.addFiles("client/styles/variables.less", "client", {isImport: true});
  api.addFiles("client/styles/base.less", "client", {isImport: true});
  api.addFiles("client/main.less", "client");
});

```

Now let's add our package to the `packages` file in the `.meteor` directory. That entry should be the last entry in that file under the "#Custom packages" comment and should look like:

```
beesknees:beesknees
```

If you haven't been running Reaction in the background, you may want to do this now as Meteor will read and compile your file and tell you about any errors you have.

Now we can get down to the business of customizing the look of our store. Just as an example let's change the colors of our navbar in our custom `base.less`

```
div.rui.navbar {
  background-color: #ffc835;
}

a.rui.tag.link {
  color: #4c3000;
}

.title {
  color: #4c3000;
}
```

Obviously you will want to do much, much more than change a couple of colors. But you can override or add new styles here to change the store to your liking.

## Using Custom Layouts

_Some of the concepts in this section will be easier to understand if you have read this section of the Meteor Guide_: http://guide.meteor.com/blaze.html

### Purpose:

In general layouts are a way of applying a structure to a site beyond what you would want to have in one particular template, allowing you to share components and reduce repetition. This is something you might do in server-side includes in other languages/frameworks.

### How Reaction uses layouts

Reaction Commerce uses one primary layout as the master or default called `coreLayout`. This layout is just another Blaze template. The code in this template is pretty minimal and you can see contains very little HTML. So before jumping in to replace this you may want to ask yourself if this is what you actually need to do. But because we are changing the global structure of our site to accomodate our "one-page-checkout" we need to.

```
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

In order to change our default layout, we need add a record to the **registry** for our package. We also need to add a
special `main.js` that will add some global options.

__Note__: If you just want to override the homepage and leave everything else alone, you can do that by adding special
INDEX_OPTIONS parameters to this `main.js` file. See "Changing the index page layout" on this page in the docs. https://docs.reactioncommerce.com/reaction-docs/development/layout


First let's create our `main.js` with our custom layout. You will not place this in your package but in the root of
the application so that it will be evaluated. The `main.js` just looks like this:

```
DEFAULT_LAYOUT = "coreLayoutBeesknees";
DEFAULT_WORKFLOW = "coreWorkflow";
```
(this file is in the root on the repo but not included in the `package.js` so if you want you could just symlink it to
the app root to store any changes in source control)

We also need to add our layout to the registry. The registry is an area in the database where packages can store
pieces of data that need to be read by the application. We will making several changes to the registry as we go along,
but for now we just want to make one change and that's to add a layout.

To do that we need to create a new file called `register.js` and add it to a new directory called `server` that
you will create. Here is our starting point:

```
ReactionCore.registerPackage({
  label: "Bees Knees",
  name: "bees",
  icon: "fa fa-vine",
  autoEnable: true,
});
```
(unlike most of the files we have been working with, this is not a Meteor standard, but a Reaction-specific file)

To the `registry` key we are going to add a `layout` entry that looks like this:

```
    layout: [{
      layout: "coreLayoutBeesknees",
      workflow: "coreWorkflow",
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

You can see we specified several things there. The most important thing was the "layout" record, which refers to the new
layout template we will create in the next chapter. We also specify which templates do we want for the header and footer
(we are just keeping the default for now), and what's the main template that we render and that's `products`. We also
specified which template we would use for a "notFound". When we get to the routing and template more of this will make
sense.

One important thing to understand is that at any point in time when RC goes to render a route/page it's going to
determine to pull the layout record from a key of `layout + workflow`. The `coreWorkflow` is a special case in that it
is a workflow with just one step. It is essentially the "default" workflow when you hit the home page.

Now before we're done there is one important step that we need to do as we complete each of these tasks which is to
add our files to our `package.js`. Basically Meteor will ignore files not specified here, so nothing you do will take
affect until you add your files to this.

Now since we have added more functionality to our package beyond just style files we also need to include a bunch
of Meteor packages. You can add these entries to your `package.js` before the `api.use("less")` entry.

```
  api.use("meteor-base");
  api.use("mongo");
  api.use("ecmascript");
  api.use("es5-shim");
  api.use("blaze-html-templates");
  api.use("session");
  api.use("jquery");
  api.use("tracker");


  // meteor add-on packages
  api.use("underscore");
  api.use("logging");
  api.use("reload");
  api.use("random");
  api.use("ejson");
  api.use("check");
  api.use("http");
  api.use("reactive-var");
  api.use("reactive-dict");
  ```
  We're not using all of these right now, but it's best to just get them out of the way.

  Now let's add the `register.js` file we just created, this time this file is used only on the server.

  ```
  api.addFiles("server/register.js", "server");
  ```
  Because we have made changes to the registry, you must now `./reaction reset` for your changes to take affect.

## Customizing Templates

If you have been following along exactly with this tutorial you may have noticed what we have accomplished so far,
we have broken the site. Why? Because the layout we specified cannot be found. So let's add it now.

Create a directory under `client` called `templates` and then under that a directory called `layouts`. (_Note that
none of this structure except for client is required by Meteor, it's just how I like to structure things, YMMV_)

Now let's create a file called `core.html` and add our template tags like this:

```
<template name="coreLayoutBeesknees">
</template>
```
Let's also add this file to our `package.js` so that it will be picked up by Meteor.

```
  //Templates
  api.addFiles("client/templates/layouts/core.html", "client");
```

Ok, still a blank site because we have nothing in our layout. Let's add back in our main section for now:

```
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

See that line that says:
```
{{> Template.dynamic template=template}}
```

You may remember that when we created our layout entry there was a variable called `template` that was set to `products`.
So when we add back in that main section it's rendering the template called "products" in that main section. That's why
once you put that section back in you will suddenly get the list of products back in again.

Now what if you don't want to show the `products` template there but show your own template with your own unique way
of displaying products? Well you have two choices:

1. **Create your template and use `Template.mytemplate.replace("products")`**

Do this if you are just changing the HTML of the template and not the behavior. This will save you from having to
recreate a lot of the default behavior just because you want to massage the HTML a little.

(see: https://github.com/aldeed/meteor-template-extension for more information)

1. **Change the entry in the layout record to point to your template.**

This is the preferred method and completely decouples your template from the original template. If you are essentially
creating a new way of displaying products you should defintely do this as the way `Template.replaces` intermingles
original and replacement templates and can get confusing.

So let's go and create our template first and then we will point our new layout at it.

Create a directory under `client/templates` called `products` and there create a file called `productsLanding.html`
and a file called `productsLanding.js`

_For the purposes of this tutorial we are just copying over the original template files from `reaction-product-variant`.
You, of course, are creating a brand new, innovative way of displaying products._

And let's not forget to add these new files to our `package.js`

(Note, this list might change as we try to make this example store more custom)

```
  api.addFiles("client/templates/layouts/core.html", "client");
  api.addFiles("client/templates/products/productsLanding.html", "client");
  api.addFiles("client/templates/products/productsLanding.js", "client");
  api.addFiles("client/templates/products/productGrid/productGrid.html", "client");
  api.addFiles("client/templates/products/productGrid/productGrid.js", "client");
  api.addFiles("client/templates/products/productGrid/content/content.html", "client");
  api.addFiles("client/templates/products/productGrid/content/content.js", "client");
  api.addFiles("client/templates/products/productGrid/controls/controls.html", "client");
  api.addFiles("client/templates/products/productGrid/controls/controls.js", "client");
  api.addFiles("client/templates/products/productGrid/item/item.html", "client");
  api.addFiles("client/templates/products/productGrid/item/item.js", "client");
  api.addFiles("client/templates/products/productGrid/notice/notice.html", "client");
  api.addFiles("client/templates/products/productGrid/notice/notice.js", "client");
  api.addFiles("client/templates/products/productList/productList.html", "client");
  api.addFiles("client/templates/products/productList/productList.js", "client");

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

To see what I mean you can look at the included package called "reaction-sample-data" that contains all the data that
loaded when you first tried out the site. What we are essentially going to do is move the code from that package into
our package and eliminate the sample-data package. We will also explore what is going on and best practices for
creating/loading fixtures.

First let's move the sample data files into our projects. You can just copy the entire `private` directory over into
our `beesknees` directory. You will also want to copy the `load.js` files from the `server` directory. Then of course
you will want to add those files into our `package.js` so they get picked up by our project.

```
  api.addFiles("server/load.js", "server");

  // Private fixture data
  api.addAssets("private/data/Products.json", "server");
  api.addAssets("private/data/Shops.json", "server");
  api.addAssets("private/data/Tags.json", "server");
  ```

  At this point you can remove the `reactioncommerce:reaction-sample-data` package from your packages files. If you
  like you can also remove the directory from the `packages` folder.

  Now let's look at the data we moved over. There are three files there `Shops.json`, `Products.json`, and `Tags.json`.
  Primarily we are going to be concerned with Shops and Products but these are not the only types of data you can
  import. If you want to import other data types please consult the main documentation under "Import".

Let's look at the Shops file. There is a lot of stuff there and a lot of it you won't want to change (unless you have
revolutionary opinions about how many provinces Canada has, etc.). But there are some critical pieces to change.

The first thing we are going to do is remove the `<blank store>` record. This second entry is to highlight how you
can have multiple stores within Reaction Commerce. However for the purposes of this tutorial we are just creating
the one store so the second one just adds confusion so let's remove the whole record. (Shops is an array of Shop
records, so you can just delete the second entry in the array).

Now if you look at the top level records in the first shop you will a lot of things that you want to change.
Critical things like Name and Description. You will also want to look at the `addressBook` entry.

After you change those entries and reset, you will now see your new entries take effect. Remember, if you make
changes within the site those settings **will not** be saved when you reset unless they are stored in this file.

If you look at the `Shops` collection in the database you can see that it pretty much looks exactly like the
JSON files you have. This makes it relatively easy to make a change in the admin, look at the changed record in the
db, and then replicate that change in the JSON, saving your change for all eternity. (or you can use the export method
that we talk about next, but knowing where things are in the Shops collection can be fairly valuable when developing)

### Creating the Products files

Our Bee's Knees example store is relatively simple with just a few products. However your store may be much more
complex with possibly hundreds of products. And even with a few products, the process of looking at the database and
changing records is tedious and unreliable. The better way is to create your products in Reaction and then export them
to a file.

To do this we are going to use the `mongoexport` utility which is only installed with a "full" installation of
MongoDb (i.e. not included with the version installed with Meteor. Please see the Mongo documentation on how to
install Mongo on your platform).

You will need to run the export utility against the running Mongo version for your local shop. The Meteor Mongo
always defaults to the port you are running Mongo on +1. If you used the default port of 3000, then your
Mongo is running on port 3001 so your command to export the `Products` collection would be:

```
mongoexport --db meteor --collection Products --port 3001 --jsonArray --pretty > Products.json
```
Note that while MongoDB is not a relational database, things like Products and Shops are tied to each via their
unique ID's. So it's good to be conscious of that when exporting things. For example, all products are tied to a Shop
and if you don't have a Shop with that ID the import will not work.

Now you should have your fixtures ready to go


## Adding Custom Page/Routes

In any web framework, "routes" are one of the core elements of what happens on a website. Certainly rendering content
when a user hits a particular URL is a majority of what happens in web development.

Reaction Commerce uses the FlowRouter package (https://github.com/kadirahq/flow-router) for it's routing and discussing
ll the specifics of how this works is beyond the scope of this document. However, to add simple routes it's not
necessary to understand that much about FlowRouter. One important element to understand is that Reaction Commerce
stores all it's Routes in the "Registry" in the database, which allows packages to dynamically add routes along
with their functionality, and even override or remove existing router. For more in-depth coverage of Routing you will
want to consult the main Reaction Commerce docs, but one thing to understand is that a customized version of
FlowRouter is available globally as `ReactionRouter`.

But we are going to keep it at its most simple and just add a single new route which will be available to anybody.
Bee's Knees wants to add the ubiquitous "About" page to their site and wants to show essentially a static page there.
(Managment of static pages is coming in upcoming version of RC but this still makes an excellent simple example).

So the first thing we want to do is add the route in the Registry which we do by adding an entry in the `registry`
key in our `register.js` file.

This entry will look like this (placed after the `autoEnable: true` entry):

```
  registry: [
    {
      route: "/about",
      name: "about",
      template: "aboutUs",
      workflow: "coreWorkflow"
    }
  ],
  ```
  The `route` entry is the URL that will match the users URL. (for how to include parameters in the route, please see
  the RC documentation or the FlowRouter documentation) The `name` is the string by which you will refer to this route
  in other parts of the application. The `template` is the template that will be rendered when the route is visited,
  and the `workflow` defines which workflow this will be attached to. In our case, there is no real workflow around an
  about page so we use the default "coreWorkflow".

Now, as usual you will need to reset for this change to take affect. In addition, changes to
defaultRoles/defaultVisitorRoles do **not** change existing users, so you will need to clear your cache or use
Private/Incognito mode so that a new user is created.

## Customizing The Checkout Workflow

_Note: If you are looking to actually change the fields in the checkout flow, you will actually want to look at the
"Customizing Schemas" chapter. That chapter will explain why_

Reaction Commerce has a relatively simple workflow system (this may change over time, but no more complexity than
necessary). Workflows are simply an array of ordered records that point to a template. Here is what the checkout
workflow looks like in the database. Each a record in the `reaction-checkout` package entry (in the Packages collection):

Login:
```
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
```
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
```
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
```
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

```
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
To change this workflow you simple need to modify these records. In our example we are going to change the template for
the Review step to a custom one (which will actually look just mostly like the original, but you can imagine that you
could do a lot more.)

So to solidy our change we are going to have our changes to the database done in our `load.js` script so that these
changes are made when the store is bootstrapped.

We want to make this change after everything else has been set up (we want to make sure those records are there before
we try to modify them) so we are going to add our function on to the `afterCoreInit` event. So our call (below the
function for importing fixture data) is:

```
  ReactionCore.Hooks.Events.add("afterCoreInit", () => {
    modifyCheckoutWorkflow();
  });
  ```

Our function call is just a call out to modify the record in the collection using standard Mongo syntax:

```
function modifyCheckoutWorkflow() {
  // Replace checkoutReview with our custom Template
  ReactionCore.Collections.Packages.update({
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

Now of course we will need to create our template and add that file to our `package.js` but I am leaving that up to
you since we have covered it a few times now.

Once we `./reaction reset` and begin again we can look in the db and see that our changes have taken effect. And if we
put something in our cart and checkout, we should see the change to the checkout flow.

## Customizing Other Workflows

## Customizing Schemas

_If will be easier to understand this section of the tutorial if you have read and understood the [Schemas](http://guide.meteor.com/collections.html#schemas_) section of the Meteor Guide_

While Mongo is a "schemaless" database that does not mean schemas are a bad idea. In fact they are a great idea and so
Reaction Commerce uses a package called [Simple Schema](https://atmospherejs.com/aldeed/simple-schema) to build an
enforce schemas. This package is recommended in the Meteor Guide and we recommend it's use as well.

In addition to Simple Schema we use a package called [Autoform](https://github.com/aldeed/meteor-autoform) which allows
you to define a form as derived from a particular schema, saving a lot of time and repetitive code. One of the most
obvious uses is in the cart where the various forms for things like Address are derived from their corresponding Schema.
All schemas are exported globally in the `ReactionCore` namespace as `ReactionCore.Schemas`.

### Removing Fields from a Schema

In eCommerce it's very important to ensure that your checkout flow is as simple as possible (but no simpler) so that
customers experience is as easy as possible. And different types of stores may have different types of data that they
collect and store. For example, a store that sells downloads has no need to collect a shipping address.

Removing fields from a Schema is relatively straight-ahead in that we just need to replace an entire Schema with a
copy of that schema with the unnecsssary fields removed and specifying a replace parameter.

For example if you wanted to remove the `note` field from the `Account` schema you would create a `common` directory
(because schemas are used on both client and serve) in the beesknees package and create a file called `schemas.js`. In
that you would make a copy of the Account schema, remove the `note` field and then add this line

```
ReactionCore.Collections.Accounts.attachSchema(ReactionCore.Schemas.Accounts, {replace: true});
```

Because our package is loaded last, even though there is already an Accounts schema, our definition will override
the built-in one and both forms and database inserts will use our custom one.

## Adding MetaData
(under construction)

## Adding Custom Hooks
(under construction)

## Creating a Custom Payment Provider
(under construction)

## Creating a Custom Shipping Provider
(under construction)




