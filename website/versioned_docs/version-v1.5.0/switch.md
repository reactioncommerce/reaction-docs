---
id: version-v1.5.0-switch
title: Switch
original_id: switch
---
    
## Import

```javascript
import { Switch } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { Switch } from "/imports/plugins/core/ui/client/components";

class MyReactComponent extends Component {
  state = {
    isChecked: false
  }

  handleChange = (event, isChecked, name) => {
    // Is checked will automatically be toggled to true / false by the switch
    // Use name for convenience
    console.log(isChecked, name)

    this.setState({
      isChecked
    })
  }

  render() {
    return (
      <Switch
        i18nKeyLabel="app.editMode"
        i18nKeyOnLabel="app.editMode"
        label={"Edit Mode"}
        name="mySwitch"
        onLabel={"Edit Mode"}
        checked={!this.state.isChecked}
        onChange={this.onViewContextChange}
      />
    )
  }
};

export default MyReactComponent;
```

## Props

| Property       | Type     | Description                                                                       |
| -------------- | -------- | --------------------------------------------------------------------------------- |
| checked        | Boolean  | Switch is toggled on true / false                                                 |
| i18nKeyLabel   | String   | i18n key for switch label                                                         |
| i18nKeyOnLabel | String   | i18n key for switch label when switch is `checked` or `on`                        |
| name           | String   | name of card for callback convenience                                             |
| onChange       | Function | Callback when switch changes<br>(event, isChecked, name, componentInstance) => {} |
| onLabel        | String   | Toggle on label                                                                   |
