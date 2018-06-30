---
original_id: checkbox
id: version-v1.1.0-checkbox
title: Checkbox
---
    
## Import

```javascript
import { Checkbox } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { Checkbox } from "/imports/plugins/core/ui/client/components";

class MyReactComponent extends Component {
  state = {
    checked: false
  }

  handleCheck = (event, isInputChecked) => {
    this.setState({
      checked: isInputChecked
    });
  }

  render() {
    return (
      <Checkbox
        i18nKeyLabel={"translation.i18n.key"}
        checked={this.state.checked}
        onChange={this.handleCheck}
        label={"Check me"}
      />
    )
  }
};

export default MyReactComponent;
```

## Props

Property     | Type     | Description
------------ | -------- | ------------------------
i18nKeyLabel | String   | Key for i18n translation
checked      | Boolean  | true / false
onChange     | Function | Change callback params (event, isInputChecked)
label        | String   | Text label for checkbox
