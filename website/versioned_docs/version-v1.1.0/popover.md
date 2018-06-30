---
original_id: popover
id: version-v1.1.0-popover
title: Popover
---
    

A component that included a button to displays a popover with provided children.

## Import

```javascript
import { Popover } from "/imports/plugins/core/ui/client/components";
```

## Usage Example


### Popover with default arrow button

```javascript
import React, { Component } from "react";
import { Popover } from "/imports/plugins/core/ui/client/components";


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

      <Popover
        buttonElement={
          <
        }
      >
        {"My Popover"}
      </Popover>
    )
  }
};

export default MyReactComponent;
```

### Popover with custom Button and arrow button

```javascript
import React, { Component } from "react";
import { Button, Popover } from "/imports/plugins/core/ui/client/components";

class MyReactComponent extends Component {
  state = {
    value: ""
  }

  handleButtonClick = (event) => {
    console.log("Button Clicked");
  }

  render() {
    return (
      <Popover
        buttonElement={
          /*
            This button does not open the popover, so you can use it to do
            other actions. The arrow button to open the popover is always included

            if your custom button sets status to, for example, <Button status="warning" />
            Then the arrow button will also use the same status.
          */
          <Button label="My Button" onClick={this.handleButtonClick}/>
        }
      >
        {"My Popover"}
      </Popover>
    )
  }
};

export default MyReactComponent;

```

## Props

Property           | Type     | Description
------------------ | -------- | ------------------------------------------------------------------------------------------------------------
attachment         | String   | Default value: `"bottom left"`
buttonElement      | Node     | Custom button element (optional). Default is a button with a down arrow. Best to use `<Button />` component.
children           | Node     | Popover contents
onChange           | Function | Show the arrow for the actual popover
showDropdownButton | Boolean  | Shows a dropdown button adjacent the `buttonElement` as a button group
targetAttachment   | String   | Default value `"top left""`

