---
id: version-v1.4.1-slider
title: Slider
original_id: slider
---
    
The Slider component is a wrapper around the [noUiSlider](https://refreshless.com/nouislider/)

## Import

```javascript
import { Slider } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Slider } from "/imports/plugins/core/ui/client/components";

class MyComponent extends Component {
  handleChange: (values, handle, unencoded, tap, positions) => {
      console.log("slider changed", values);
    };
  }

  handleSlide: (values, handle, unencoded, tap, positions) => {
      console.log("slider is being changed", values);
    };
  }

  render() {
    return (
      <Slider
        range={{ min: 0, max: 5000 }}
        start={[0, 2000]}
        margin={50}
        connect={true}
        step={50}
        onChange={this.handleChange}
        onSlide={this.handleSlide}
      />
    );
  }
}

export default MyComponent;
```

## Props

| Property | Type     | Description                                                                             |
| -------- | -------- | --------------------------------------------------------------------------------------- |
| range    | Object   | `{ min: Number, max: Number }`                                                          |
| start    | Array    | Start point for handles                                                                 |
| margin   | Number   | Margin between handles                                                                  |
| connect  | Boolean  | Display a colored bar between the handles                                               |
| step     | Number   | Amount to move handles when dragging                                                    |
| onChange | Function | Callback when slider changed<br>`(values, handle, unencoded, tap, positions) => {}`     |
| onSlide  | Function | Callback when slider is changing<br>`(values, handle, unencoded, tap, positions) => {}` |

More props at <https://refreshless.com/nouislider/>
