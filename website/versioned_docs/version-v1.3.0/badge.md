---
id: version-v1.3.0-badge
title: Badge
original_id: badge
---
    
## Import

```javascript
import { Badge } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { Badge } from "/imports/plugins/core/ui/client/components";

class MyReactComponent extends Component
  return (
    <Badge
      badgeSize="large"
      className="single class, or array of classes"
      i18nKeyLabel="some.key"
      label="My Button"
      status="success"    
    />
  )
};

export default MyReactComponent;
```

## Props

Property             | Type                      | Description
-------------------- | ------------------------- | ---------------------------
badgeSize            | String                    | Badge size. Defaults to small. `small | large`
className            | String, Object            | "class-name", or { "class-name": true }
i18nKeyLabel         | String                    | i18n key for badge label (shows in badge)
label                | String                    | Button label
status               | String                    | Sets badge state with a string. `primary | success | info | warning | danger | link | cta | default`
