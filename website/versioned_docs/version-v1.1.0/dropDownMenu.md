---
original_id: dropDownMenu
id: version-v1.1.0-dropDownMenu
title: DropDown Menu
---
    
A selectable dropdown menu component with supplied menu items.

## Import

```javascript
import { DropDownMenu } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { DropDownMenu, MenuItem } from "/imports/plugins/core/ui/client/components";

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
      <DropDownMenu
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

## Props

Property      | Type                    | Description
------------- | ----------------------- | ----------------------------------------------------------------------
buttonElement | React Node              | Custom button element (optional) Default is a button with a down arrow
attachment    | String                  | default value: `"top"`
children      | Node                    | Menu items, preferably `MenuItem`
onChange      | Function                | Dropdown menu change. `(event, value, menuItem) => {}`
value         | String, Boolean, Number | A String, Boolean, or Number value
