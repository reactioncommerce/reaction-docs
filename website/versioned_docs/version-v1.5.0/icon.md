---
id: version-v1.5.0-icon
title: Icon
original_id: icon
---
    
The icon components give you a simple way to use the available icon sets in Reaction with one component.

## Import

```javascript
import { Icon } from "/imports/plugins/core/ui/client/components";
```

## Example

```javascript
import React, { Component } from "react";
import { Icon } from "/imports/plugins/core/ui/client/components";

class MyComponent extends Component {
  render() {
    return (
      <div>
        {"Things in my component"}
        <Icon icon="clock" />
      <div>
    );
  }
}
```

## Props

| Property | Type   | Description                                                              |
| -------- | ------ | ------------------------------------------------------------------------ |
| icon     | String | name of [font awesome](https://fortawesome.github.io/Font-Awesome/) icon |
