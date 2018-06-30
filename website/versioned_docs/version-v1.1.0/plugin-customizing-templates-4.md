---
original_id: plugin-customizing-templates-4
id: version-v1.1.0-plugin-customizing-templates-4
title: Customizing Templates
---
    
If you have been following along exactly with this tutorial you may have noticed what we have accomplished so far,
we have broken the site. Why? Because the layout we specified cannot be found. So let's add it now.

Create a directory under `client` called `templates` and then under that a directory called `layouts`.
(_Note that none of this structure except for client is required by Meteor, it's just how I like to structure things, [YMMV](http://www.urbandictionary.com/define.php?term=ymmv)_)

Now let's create a file called `core.html` and add our template tags like this:

```html
<template name="coreLayoutBeesknees">
</template>
```

To make this template part of the project we need to import it, so we add it to the `index.js` at the root of the `client` directory (where we imported the LESS files). We add this line

```js
import "./templates";
```

Then we need to create another `index.js` at the root of the `templates` directory and import all of our templates there. _Every time we add a template we need to import here in this file. I won't be mentioning that every time from here on out_. So in `client/templates/index.js` we add

```js
import "./layouts/core.html";
```

(Could you just import this file directly into `client/index.js`? Yes. This is just my style.)

Ok, still a blank site because we have nothing in our layout. Let's add back in our main section for now (between the beginning and ending `<template>` tags:

```html
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

```html
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

```html
{{> Template.dynamic template=template}}
```

You may remember that when we created our layout entry there was a variable called `template` that was set to `products`.
So when we add back in that main section it's rendering the template called "products" in that main section.
That's why once you put that section back in you will suddenly get the list of products appearing again.

Now what if you don't want to show the `products` template there but
show your own template with your own unique way of displaying products?
You just need to change the entry in the layout record to point to your
template. This completely decouples your template from the original
template.

So let's go and create our template first and then we will point our new layout at it.

Create a directory under `client/templates` called `products` and there create a file called `productsLanding.html` and a file called `productsLanding.js`

_For the purposes of this tutorial we are just copying over the original template files from the `product-variant` plugin. You, of course, are creating a brand new, innovative way of displaying products._

If you look at these templates you will see templates and sub-templates. Basically if you want use the default you can just references back to the orignal template by name, or you can change the name and create your own template. All templates go into a single global namespace and must be unique.

Oh, and let's not forget to import these files in our `index.js`.

(Note, this list might change as we try to make this example store more custom)

```js
// products
import "./products/productsLanding.html";
import "./products/productsLanding";
```

Now we need to change the entry in our layout record in our `register.js` file. Just change the entry that says
"template" to be "productsLanding" (no need for the .html) Again this will require a `reaction reset` to take effect.

When the site is rendered now, it should be rendering the home page with the `productsLanding` template, rather than the default `products`.

Next: [Fixtures](plugin-fixtures-5)

## Read More

[Blaze Templates](http://blazejs.org/api/blaze.html)

[Blaze Layout Manager](https://github.com/kadirahq/blaze-layout)
