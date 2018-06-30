---
id: version-v1.5.0-alerts
title: Alerts
original_id: alerts
---
    
## Import

```javascript
import { Alerts, Alert } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React from "react";
import { Alerts } from "/imports/plugins/core/ui/client/components";

const alertArray = [
  {
    message: "Something went wrong",
    mode: "warning",
    options: {
      autoHide: 4000
    }
  }
];

const MyReactComponent = () => {
  return (
    <Alerts alerts={alertArray} />
  )
};

export default MyReactComponent;
```

| Property              | Type          | Description               |
| --------------------- | ------------- | ------------------------- |
| [alerts](#propalerts) | Array[Object] | An Array of alert objects |

## Prop: alerts

    const alertArray = [
      {
        message: "Something went wrong",
        mode: "warning",
        options: {
          autoHide: 4000
        }
      }
    ];

### Example

```javascript
import { Alerts } from "/imports/plugins/core/ui/client/components";

const alertArray = [
  {
    message: "Something went wrong",
    mode: "warning",
    options: {
      autoHide: 4000
    }
  }
];

const MyReactComponent = () => {
  return (
    <Alerts alerts={alertArray} />
  )
};

export default MyReactComponent;
```
