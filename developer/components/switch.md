# Switch

## Import

```js
import { Switch } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```js
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
