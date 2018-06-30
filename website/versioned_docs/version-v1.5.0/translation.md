---
id: version-v1.5.0-translation
title: Translation
original_id: translation
---
    
## Import

```javascript
import { Translation } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React from "react";
import { Translation } from "/imports/plugins/core/ui/client/components";

const MyReactComponent = () => {
  return (
    <Translation defaultValue="Dashboard" i18nKey={"admin.shortcut.dashboardLabel"} />
  )
};

export default MyReactComponent;
```

## Props

| Property     | Type   | Description                                   |
| ------------ | ------ | --------------------------------------------- |
| defaultValue | String | Default value if no translation can be loaded |
| i18nKey      | String | Key for i18n translation                      |
