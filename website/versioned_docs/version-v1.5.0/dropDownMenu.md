---
id: version-v1.5.0-dropDownMenu
title: DropDown Menu
original_id: dropDownMenu
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
      </DropDownMenu>
    )
  }
};

export default MyReactComponent;
```

## Props

| Property         | Type                    | Description                                                            |
| ---------------- | ----------------------- | ---------------------------------------------------------------------- |
| attachment       | String                  | default value: `"top"`                                                 |
| buttonElement    | React Node              | Custom button element (optional) Default is a button with a down arrow |
| children         | Node                    | Menu items, preferably `MenuItem`                                      |
| className        | String, Object          | Custom class names can be a string, or object `{"class-name": true}`   |
| menuStyle        | Object                  | Style object to custom style your menu                                 |
| onChange         | Function                | Dropdown menu change. `(event, value, menuItem) => {}`                 |
| value            | String, Boolean, Number | A String, Boolean, or Number value                                     |
| targetAttachment | String                  | default value: `"top left"`                                            |
