---
original_id: translation
id: version-v1.1.0-translation
title: Translation
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

Property     | Type   | Description
------------ | ------ | ---------------------------------------------
defaultValue | String | Default value if no translation can be loaded
i18nKey      | String | Key for i18n translation
