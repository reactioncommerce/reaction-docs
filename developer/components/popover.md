# Popover

## Import

```javascript
import { Popover } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { Popover } from "/imports/plugins/core/ui/client/components";

class MyComponent extends Component {
  onChange = (values) => {
    console.log("Values are ", values);
  }

  render() {
    return (
      <Popover>
        <div>
          {"my popover contents"}
        </div>
      </Popover>
    );
  }
}
```

## Props

Property      | Type       | Description
------------- | ---------- | ------------------------------------------------------------------------------------------------------
buttonElement | React Node | A React component to use for the button (optional). A button will be provided if one is not specified.
children      | React Node | Child components to be placed inside the popover
