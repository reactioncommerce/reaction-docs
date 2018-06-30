---
id: version-v1.5.0-clickToCopy
title: Click To Copy
original_id: clickToCopy
---
    
## Import

```javascript
import { ClickToCopy } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { ClickToCopy } from "/imports/plugins/core/ui/client/components";

class MyReactComponent extends Component
  return (
    <ClickToCopy
      copyToClipboard="string to copy to clipboard"
      displayText="text to display to user"
      i18nKeyTooltip="some.key"
      tooltip="placeholder tooltip text"
      tooltipPosition="bottom center"
    />
  )
};

export default MyReactComponent;
```

## Props

| Property        | Type                      | Description                                               |
| --------------- | ------------------------- | --------------------------------------------------------- |
| copyToClipboard | String                    | String to copy to clipboard on click (i.e. URL for Order) |
| displayText     | String                    | Text displayed to user (e.g. Order ID #)                  |
| i18nKeyTooltip  | String                    | i18n key for tooltip                                      |
| tooltip         | String, Object, Component | Tooltip                                                   |
| tooltipPosition | String                    | Tooltip position. Default `bottom center`                 |
