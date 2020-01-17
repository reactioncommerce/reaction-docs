---
id: version-2.9.1-register-operator-route
title: Register Operator Routes
original_id: register-operator-route
---

The function `registerOperatorRoute` registers a new route for administrator users that renders a React Component when navigated to. It may also add a link the the main navigation if desired. This will be the primary method of registering new pages in the operator experience. **This method is not for registering public routes.**

## Registering operator routes

The best place to register routes from is in the `client` directory of a plugin. The usual place we register our operator routs is in the `client/index.js` file. This provides a consistent place across all plugins to look for route definitions.

In that file, import the `registerOperatorRoute` function, and call it with its options. Below is an example of how the `navigation` plugin registers its operator route.

```js
import React from "react";
import LinkIcon from "mdi-material-ui/LinkVariant";
import { registerOperatorRoute } from "/imports/client/ui";
import NavigationDashboard from "./containers/navigationDashboardContainer";

registerOperatorRoute({
  // Should a link be shown in the sidebar
  isNavigationLink: true,

  // Should this link be grouped under "Settings" in the menu. `isNavigationLink:true` is required.
  isSetting: false,

  // Relative position of this item in the menu. `isNavigationLink:true` is required.
  priority: 50,

  // Layout component to use.
  // If `null` is provided then a layout component that stretches from edge to will be provided.
  // If omitted, or `undefined`, a layout component that centers it's content will be used.
  // If a React component is provided, that will be used instead. That component will be responsible for
  // handling Drawer, and other UI state changes itself.
  layoutComponent: null,

  // Main component for the page
  mainComponent: NavigationDashboard,

  // URL path.
  // Always starts with a `/` and it auto prefixes with `/operator`.
  // This link will end up being `/operator/navigation` once registration is complete.
  path: "/navigation",

  // Component that will be used to render an icon to the left of the navigation link text
  // Required is this route is not a setting, and is displayed in navigation.
  // Do not provide an icon if it's a setting. It will be ignored.
  // Icons come from the Material community icons: https://materialdesignicons.com/
  SidebarIconComponent: (props) => <LinkIcon {...props} />,

  // i18n translaton key for the navigation link text. Required.
  sidebarI18nLabel: "admin.navigation.navigation"
});

```
