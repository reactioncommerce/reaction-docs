---
id: version-v1.5.0-multi-select
title: MultiSelect
original_id: multi-select
---
    
## Import

```javascript
import { MultiSelect } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { MultiSelect } from "/imports/plugins/core/ui/client/components";

class MyComponent extends Component {
  onChange = (values) => {
    console.log("Values are ", values);
  }

  render() {
    return (
      <MultiSelect
        options: [
          {value: "one", label: "One"},
          {value: "two", label: "Two"},
          {value: "three",label: "Three"}
        ],
        placeholder={"Please choose"}
        value={this.props.value}
        onChange={this.onChange}
      />
    );
  }
}
```

## Props

| Property | Type   | Description                                                              |
| -------- | ------ | ------------------------------------------------------------------------ |
| icon     | String | name of [font awesome](https://fortawesome.github.io/Font-Awesome/) icon |
