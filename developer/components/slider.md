# Slider

## Import

```js
import { Slider } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```js
import React, { Component, PropTypes } from "react";
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
