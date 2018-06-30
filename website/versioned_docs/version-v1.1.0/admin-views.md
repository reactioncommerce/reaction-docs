---
original_id: admin-views
id: version-v1.1.0-admin-views
title: Admin Views
---
    
The administration views includes the `Publish Bar` at top of your screen and the `Action View`.

## Publish Bar

The publish bar contains controls relevant to the current inline view.

## Action View

The action view contains all of your administration actions, whether that be shop configuration or fulfilling orders.

### Usage

```js
import { Reaction } from "/client/api"

// Basic view data required.
// Same format is used for master and detail views
const viewData = {
  i18nKeyLabel: "path.to.translation",
  label: "My Label",
  template: "myTemplate" // Path to blaze template. React not yet supported.
  data: {} // Data for ActionView

  // Optional

  // Main options
  // - "dashboard" - relegates li to "Actions" portion of Dashboard, and by default provides larger view if there is space
  // - "settings" - relegates li to "Settings" portion of Dashboard, and by default provides smaller view
  provides: "dashboard" | "settings"

  // Additional Options
  // - "meta.actionView.dashboardSize - provides the ability to change dashboardSize by default
  // - "sm" - dashboard width of 400px
  // - "md" - dashboard width of 50vh
  // - "lg" - dashboard width of 90vh
  meta: {
    "actionView" : {
      "dashboardSize" : "sm" | "md" | "lg"
    }
  }
}
```

### Show ActionView - (MasterView)

```js
/**
 * Opens action view and sets master view
 * @param {Object} viewData View data, usually from a registry entry
 * @return {undefined} no return value
 */
Reaction.showActionView(viewData);
```

### Set ActionView - (MasterView)

```js
/**
 * Set the master view of the ActionView. This action will reset the navigation stack
 * @param {Object} viewData View data, usually from a registry entry
 * @return {undefined} no return value
 */
Reaction.setActionView(viewData);
```

### Push Action View - (MasterView)

```js
/**
 * Push a new master view into the ActionView navigation stack.
 * Also opens ActionView if closed.
 * @param {Object} viewData View data, usually from a registry entry
 * @return {undefined} no return value
 */
Reaction.pushActionView(viewData);
```

### Pop Action View - (MasterView)

```js
/**
 * Navigate back one master view in the ActionView navigation stack
 * @return {undefined} no return value
 */
Reaction.popActionView();
```

### Get ActionView - (MasterView)

```js
/**
 * Get the current master view from the ActionView navigation stack
 * @returns {Object} viewData
 */
Reaction.getActionView();
```

### Set ActionView - (DetailView)

```js
/**
 * Set the ActionView - detail view. This action will reset the navigation stack
 * for the detail view
 * @return {undefined} no return value
 */
Reaction.setActionViewDetail(viewData);
```

### Push ActionView - (DetailView)

```js
/**
 * Push a detail view into ActionView - detail view navigation stack
 * @return {undefined} no return value
 */
Reaction.pushActionViewDetail();
```

### Pop ActionView - (DetailView)

```js
/**
 * Navigate back one detail view for the ActionView - detail view navigation stack
 * @return {undefined} no return value
 */
Reaction.popActionViewDetail();
```

### Get ActionView - (DetailView)

```js
/**
 * Get the current detail view from the ActionView - detail view navigation stack
 * @returns {Object} viewData
 */
Reaction.getActionViewDetail();
```

### Clear ActionView - (MasterView / DetailView)

```js
/**
 * Clear the current contents of the action view
 * @return {undefined} no return value
 */
Reaction.clearActionView();
```

### Hide ActionView

```js
/**
 * Hide the action view panel
 * @return {undefined} no return value
 */
Reaction.hideActionView();
```

### ActionView open state

```js
/**
 * Determine if ActionView is open
 * @returns {Boolean} true (if open) / false (closed)
 */
Reaction.isActionViewOpen();
```
