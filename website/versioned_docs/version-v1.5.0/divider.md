---
id: version-v1.5.0-divider
title: Divider
original_id: divider
---
    
Horizontal divider with the ability to display a text label.

## Import

```javascript
import { Divider } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React from "react";
import { Checkbox } from "/imports/plugins/core/ui/client/components";

const MyReactComponent = () => {
  return (
    <Divider /> {/* Single line */}
    <Divider
      i18nKeyLabel="i18n.key.path"
      label="Label between lines"
    />
  )
};

export default MyReactComponent;
```

## Props

| Property     | Type   | Description              |
| ------------ | ------ | ------------------------ |
| i18nKeyLabel | String | Key for i18n translation |
| label        | String | Text label for checkbox  |
