---
id: version-v1.7.0-workflow
title: Workflow
original_id: workflow
---
    
Reaction template display (layout) and workflow rules are created and stored in the Package registry.

A workflow is similar to `package.registry` entries,  but  `package.layout` entries are defined by the following properties:

- It does not control routes anywhere.
- each workflow in the package registry has a definition in Shops
- stores **status** in a **collection** specified in Shops
- collections should have attached _Workflow schema_
- **audience** is just another label for 'permissions', essentially just permissions for UIX.
- can be used to control page layout for the content manager
- audience can be used to control different check out, different product views,  for users with different roles..
- a **workflow** controls "the how and where" of layout components
- can be used to trigger events from analytics events
- to disable a workflow template remove audience roles
- routes could be dynamically generated from registry

_The default workflow configuration components are configured in the following manner:_

## Shops Collection

```js
"layout" : [
{
  "layout" : "coreLayout",
    "workflow" : "coreProductGridWorkflow",
    "collection" : "Products",
    "theme" : "default",
    "enabled" : true,
    "structure" : {
      "template" : "products",
      "layoutHeader" : "NavBar",
      "notFound" : "productNotFound",
      "dashboardHeader" : "gridPublishControls",
      "dashboardControls" : "productDetailDashboardControls",
      "adminControlsFooter" : "adminControlsFooter"
    },
    "priority" : 999,
    "position" : 1
  }, {
    "layout" : "coreLayout",
    "workflow" : "coreWorkflow",
    "theme" : "default",
    "enabled" : true,
    "structure" : {
      "template" : "products",
      "layoutHeader" : "NavBar",
      "layoutFooter" : "Footer",
      "notFound" : "productNotFound",
      "dashboardControls" : "dashboardControls",
      "adminControlsFooter" : "adminControlsFooter"
    },
    "priority" : 999,
    "position" : 1
  }, {
    "layout" : "coreLayout",
    "workflow" : "coreProductGridWorkflow",
    "collection" : "Products",
    "theme" : "default",
    "enabled" : true,
    "structure" : {
      "template" : "products",
      "layoutHeader" : "NavBar",
      "notFound" : "productNotFound",
      "dashboardHeader" : "gridPublishControls",
      "dashboardControls" : "productDetailDashboardControls",
      "adminControlsFooter" : "adminControlsFooter"
    },
    "priority" : 999,
    "position" : 1
  }, {
    "layout" : "coreLayout",
    "workflow" : "coreCartWorkflow",
    "collection" : "Cart",
    "theme" : "default",
    "enabled" : true,
    "structure" : {
      "template" : "cartCheckout",
      "notFound" : "notFound",
      "dashboardControls" : "dashboardControls",
      "adminControlsFooter" : "adminControlsFooter"
    },
    "priority" : 999,
    "position" : 1
  },
  ... more ...
]
```

## Collection Workflows

For each collection using a workflow, a workflow schema is attached.  The state/status of a workflow is stored as an object on each document in the collection.

```js
"workflow" : {
  "status" : "checkoutLogin"
  "workflow": ["new", "checkoutLogin"]
},
```

Where **status** is the current workflow, and **workflow** are the workflow steps that have begun, or finished processing.

If `workflow.workflow` contains the current `workflow.status`, that means the workflow is processing, and when status now longer contains the workflow, but it exists in `workflow.workflow` the workflow has been completed.

## Workflow Schema

For reference, the Workflow schema is:

```js
import { SimpleSchema } from "meteor/aldeed:simple-schema";

/**
 * workflow schema for attaching to collection where
 * PackageWorkflow is controlling view flow
 * Shop defaultWorkflow is defined in Shop
 */

export const Workflow = new SimpleSchema({
  status: {
    type: String,
    defaultValue: "new",
    index: 1
  },
  workflow: {
    type: [String],
    optional: true
  }
});
```
