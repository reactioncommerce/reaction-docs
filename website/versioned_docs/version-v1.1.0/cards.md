---
original_id: cards
id: version-v1.1.0-cards
title: Cards
---
    
## Import

```javascript
import { Card, CardHeader, CardBody, CardTitle } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React from "react";
import { Card,  CardHeader, CardBody } from "/imports/plugins/core/ui/client/components";

const MyReactComponent = () => {
  return (
    <Card>
      <CardHeader
        i18nKeyTitle=""
        title=""
      />
      <CardBody>

      </CardBody>
    </Card>
  )
};

export default MyReactComponent;
```

## Props

## Card

No Props, used as a wrapper for `CardHeader`, `CardTitle`, and `CardBody`

### CardHeader

Provides a header for the card, also contains the CardTitle component for convenience.

Property     | Type   | Description
------------ | ------ | ------------------------
i18nKeyTitle | String | Key for i18n translation
title        | String | Title for card header

### CardTitle

Provides a title for the card. In most cased CardHeader will be a better choice.

Property     | Type   | Description
------------ | ------ | ------------------------
i18nKeyTitle | String | Key for i18n translation
title        | String | Title for card header

### CardBody

No Props, use as wrapper for card content
