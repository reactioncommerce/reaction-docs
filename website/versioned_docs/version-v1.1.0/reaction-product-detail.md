---
original_id: reaction-product-detail
id: version-v1.1.0-reaction-product-detail
title: Product Detail
---
    
The product detail page is made up of `React` components and a `json` layout stored in the database.

## Layout Configuration

Default layouts for the product detail page are registered in in the `product-detail-simple` package, located `imports/plugins/included/produce-detail-simple`.

**An Example of the simple layout configuration.**

`imports/plugins/included/produce-detail-simple/lib/layout/simple.js`

```javascript
// File is shortened for example
export default function blocks() {
  return [
    // Header block (Full Width)
    {
      type: "block",
      columns: 12,
      element: "header",
      className: "pdp header",
      permissions: ["admin"], // Permissions for staff
      audience: ["guest", "anonymous"], // Permissions for customers
      children: [
        // Title
        {
          component: "ProductField",
          // Example, you can set permissions components that are children of a block
          permissions: ["admin"],
          audience: ["guest", "anonymous"],
          props: {
            fieldName: "title",
            fieldTitle: "Title",
            element: "h1",
            textFieldProps: {
              i18nKeyPlaceholder: "productDetailEdit.title",
              placeholder: "Title"
            }
          }
        },
      }
    }
  ]
}
```

**An Example of the simple layout being registered as a template.**

`imports/plugins/included/produce-detail-simple/server/index.js`

```javascript
// File is shortened for example
import { Reaction } from "/server/api";
import SimpleLayout from "../lib/layout/simple";

Reaction.registerTemplate({
  name: "productDetailSimple",
  title: "Product Detail Simple Layout",
  type: "react",
  templateFor: ["pdp"],
  permissions: ["admin", "owner"],
  audience: ["anonymous", "guest"],
  template: SimpleLayout()
});
```

## Layout Components

### Blocks

Blocks are your major functional `blocks` for the page, such as header, columns, footer, etc.

Blocks may contain registered `React` components, and other nested `blocks`.

You register a block for your layout like so:

```js
{
  // Type of block. "block" is currently the only option
  type: "block",

  // HTML element to use: in this case <header>. Defaults to <div> if omitted
  element: "header",

  // Classes to add to the block element
  className: "pdp header",

  // Permissions for staff
  permissions: ["admin"],

  // Permissions for customers
  audience: ["guest", "anonymous"],

  // Registered react component / Block configuration
  children: [
    /* Array of registered react components | More blocks */
  ]
}
```

### Registered React Component

A registered React component, is a React component that has been registered with `registerComponent` for use with `ReactionLayout`.

```js
import React, { Component } from "react";
import { registerComponent } from "/imports/plugins/core/layout/lib/components";

// Create your component
class MyComponent exports Component {
  render() {
    return (
      <div>My Component</div>
    )
  }
}

// Register component for ReactionLayout
registerComponent({
  name: "MyComponent",
  component: MyComponent
});

// Export component if you also want to use it in other places in the App
export default MyComponent;
```

Your basic configuration for this component might look like this.

```js
{
  // Name of component registered
  component: "ProductField",
  // Example, you can set permissions components that are DIRECT children of a block
  // Permissions for admin users
  permissions: ["admin"],
  // Permissions for customers
  audience: ["guest", "anonymous"],

  // Extra props for the component
  props: {
    fieldName: "title",
    fieldTitle: "Title",
    element: "h1",
    textFieldProps: {
      i18nKeyPlaceholder: "productDetailEdit.title",
      placeholder: "Title"
    }
  }
}
```

### Register Layout Template

Registering a template will add your template configuration to the `Templates` collection in Reaction. This will also show a new template option in the `Templates` dropdown in the Product Admin.

```js
// Register the template for use with the product detail page
Reaction.registerTemplate({
  // Template name, must be unique
  name: "productDetailSimple",

  // Template title for display
  title: "Product Detail Simple Layout",

  // Template type, options include "react" | "email"
  type: "react",

  // Template for purpose. Provide an array of strings
  // options include:
  // - "pdp" For product detail page
  templateFor: ["pdp"], // Since 0.20.0

  // Overall permissions for the entire layout template
  // For staff
  permissions: ["admin", "owner"],

  // For customers
  audience: ["anonymous", "guest"],

  // Template to register where templateLayout is your template JS/JSON object
  template: templateLayout
});
```

### All together now!

With all of this together we can register our template for use on the PDP page.

**Client**

In a file on the client, create your React component, and register it.

```js
import React, { Component } from "react";
import { registerComponent } from "/imports/plugins/core/layout/lib/components";

// Create your component
class MyPriceComponent extends Component {
  render() {
    return (
      <h2>{this.props.myOwnCustomProp} - {this.props.priceRange}</h2>
    );
  }
}

// Register component for ReactionLayout via Reaction.registerTemplate()
registerComponent({
  name: "MyPriceComponent",
  component: MyPriceComponent
});

```

**Server**

In a file on the server, create your template layout, and register it.

```js
import { Reaction } from "/server/api";

const templateLayout = [
  // Header block (Full Width)
  {
    type: "block",
    columns: 12,
    element: "header",
    className: "pdp header",
    permissions: ["admin"], // Permissions for staff
    audience: ["guest", "anonymous"], // Permissions for customers
    children: [
      // Title (Built-in Component of reaction-product-detail-simple)
      {
        component: "ProductField",
        // Example, you can set permissions components that are children of a block
        permissions: ["admin"],
        audience: ["guest", "anonymous"],
        props: {
          fieldName: "title",
          fieldTitle: "Title",
          element: "h1",
          textFieldProps: {
            i18nKeyPlaceholder: "productDetailEdit.title",
            placeholder: "Title"
          }
        }
      },
      // My Price
      {
        component: "MyPriceComponent",
        // Example, you can set permissions components that are children of a block
        permissions: ["admin"],
        audience: ["guest", "anonymous"],
        props: {
          myOwnCustomProp: "Super!!"
        }
      }
    ]
  }
];

// Register the template for use with the product detail page
Reaction.registerTemplate({
  name: "productDetailSimpleTitleOnly",
  title: "PDP Title Only",
  type: "react",
  templateFor: ["pdp"],
  permissions: ["admin", "owner"],
  audience: ["anonymous", "guest"],
  template: templateLayout
});
```

## Data Fetching & Container Components

Every component receives a set of props automatically.

Property           | Type         | Description
------------------ | ------------ | ---------------------------------------------------
variants           | String       | Top level variants
layout             | String       | layout to use for the product detail page
product            | Object       | The product
priceRange         | String       | A normalize price range for display
tags               | Array[Tag]   | An array of tags for the PDP page
media              | Array[Media] | An array of media items for the PDP page
editable           | Boolean      | Boolean true / false if the page should be editable
viewAs             | String       | Viewing this page as "customer" / "administrator"
hasAdminPermission | Boolean      | If current user has admin permissions
