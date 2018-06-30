---
id: version-v1.7.0-menu
title: Menu
original_id: menu
---
    
A selectable menu component with supplied menu items.

## Import

```javascript
import { Menu } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { Menu, MenuItem } from "/imports/plugins/core/ui/client/components";

class MyReactComponent extends Component {
  state = {
    value: ""
  }

  handleChange = (event, value) => {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <Menu
        onChange={this.handleChange}
        value={this.state.value}
      >
        <MenuItem
          i18nKeyLabel="app.public"
          icon="fa fa-unlock"
          label="Public"
          selectLabel="Public"
          value="public"
        />
        <MenuItem
          i18nKeyLabel="app.private"
          label="Private"
          icon="fa fa-lock"
          selectLabel="Public"
          value="private"
        />
      </Menu>
    )
  }
};

export default MyReactComponent;
```

## Menu Props

| Property   | Type                    | Description                                                          |
| ---------- | ----------------------- | -------------------------------------------------------------------- |
| attachment | String                  | default value: `"top"`                                               |
| children   | Node                    | Menu items, preferably `MenuItem`                                    |
| className  | String, Object          | Custom class names can be a string, or object `{"class-name": true}` |
| onChange   | Function                | Input change. `(event, value, menuItem) => {}`                       |
| style      | Object                  | Custom style for menu                                                |
| value      | String, Boolean, Number | A `String`, `Boolean`, or `Number` value                             |

## Menu Item Props

| Property             | Type           | Description                                                                                                                                |
| -------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| active               | Boolean        | Is active. Automatic if using as child of `Menu` component with `value`                                                                    |
| children             | Node           | Children of menu component                                                                                                                 |
| className            | String, Object | Custom class names, can be a string, or object `{"class-name": true}`                                                                      |
| disabled             | Boolean        | Disable menu item                                                                                                                          |
| eventAction          | String         | Adds `data-event-action="yourAction"` attribute to the item, where `yourAction` is the value you set.                                      |
| i18nKeyLabel         | String         | Key for i18n translation for label                                                                                                         |
| i18nKeySelectedLabel | String         | Key for i18n translation for selected label (implementation required)                                                                      |
| icon                 | String         | Name of [font awesome](https://fortawesome.github.io/Font-Awesome/) icon                                                                   |
| iconStyle            | Object         | Custom style for icons displayed                                                                                                           |
| label                | String         | Label for menu item                                                                                                                        |
| onClick              | Function       | On menu item click. `(event, value, menuItem) => {}`                                                                                       |
| selectionLabel       | String         | Selected label for menu button (implementation required)                                                                                   |
| value                | Any            | While the menu item accepts any value, when used as as child of a `<Menu>` component you are restricted to `String`, `Boolean` or `Number` |
