---

⚠️  **DEPRECATION NOTICE:** This page's content is deprecated and no longer relevant.

As of mid-2017 Reaction releases, Reaction has started replacing Blaze templating with React components. Reaction will continue to do so until Blaze templates are completely eliminated.
To ensure easier version updates in the future, we recommend using React over Blaze as well.

---

# Templates

Reaction Templates are primarily Blaze Templates, but Meteor supports React and other templating libraries.

To learn more about Meteor, Spacebars, and Blaze templates: <http://blazejs.org/guide/introduction.html>

## Extending templates

Reaction includes the [meteor-template-extension](https://github.com/aldeed/meteor-template-extension) package which provides functionality for extending Meteor templates.

To extend and customize the HTML for any Reaction/Meteor template, add a template extension map to `client/templates.js`

```js
// extending core with template extensions
Template.my_custom_template.replaces("core_template_name");
```

then create a template (probably a copy of the one you are extending).

```handlebars
<template name="my_custom_template">
  <h1>This will be used instead of the core template!</h1>
</template>
```

While you can always organize your templates however you wish, [we suggest](/developer/styleguide.md) you mirror the existing structure. For example, if you are extending the template located in `reaction/imports/plugins/included/product-variant/client/templates/products/products.html` then you would mirror that by creating your new template at `reaction/client/templates/products/myTemplate.html`

_The template helpers, events, etc. from the original are still accessible and used in the new extended template._
