---
id: version-v1.5.0-textfield
title: Textfield
original_id: textfield
---
    
## Import

```javascript
import { Textfield } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { Textfield } from "/imports/plugins/core/ui/client/components";

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
      <Textfield
        i18nKeyLabel={"translation.i18n.key"}
        label="Name"
        onChange={this.handleChange}
        value={this.state.value}
      />
    )
  }
};

export default MyReactComponent;
```

## Props

| Property           | Type           | Description                                                             |
| ------------------ | -------------- | ----------------------------------------------------------------------- |
| align              | String         | One of `left`, `center`, `right` or `justify`                           |
| className          | String, Object | Extra classnames to attach to the input                                 |
| i18nKeyLabel       | String         | Label i18n key                                                          |
| i18nKeyPlaceholder | String         | Input placeholder i18n key                                              |
| label              | String         | Label attached to input                                                 |
| multiline          | Boolean        | True: multiline, autosize textfield. False (default) single line input. |
| name               | String         | Input name                                                              |
| onBlur             | Function       | Input blur callback: `(event, value, fieldName) => {}`                  |
| onChange           | Function       | Input change. `(event, value, fieldName) => {}`                         |
| placeholder        | String         | Input placeholder.                                                      |
