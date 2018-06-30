---
original_id: reaction-module-cheatsheet
id: version-v1.1.0-reaction-module-cheatsheet
title: Module Import Cheatsheet
---
    
## Client (Core)

### API

```javascript
import { Reaction } from "/client/api";
import { Logger } from "/client/api";
import { i18next } from "/client/api";
```

### Localization

```javascript
import { i18next } from "/client/api";

// Meteor depedency.
// Use to watch for changes to i18n. Triggers on language change
import { localeDep } from  "/client/modules/i18n";
```

### Modules - Router

```javascript
import { Router } from "/client/modules/router";
```

### Collections (Client Only)

```javascript
import { Countries } from "/client/collections";
```

## Server (Core)

```javascript
import { Reaction } from "/server/api";
import { Logger } from "/server/api";
import { GeoCoder } from "/server/api";
import { Hooks } from "/server/api";
```

## Lib (Client & Server) (Core)

```javascript
import { MetaData } from "/lib/api/router/metadata";
```

### Collections & Schemas (Core)

```javascript
// Import all collections
// Use like Collections.Products, Collections.Shops, etc
import * as Collections from "/lib/collections";

// Import named collection
import { Packages } from "/lib/collections";
import { Shops } from "/lib/collections";
import { Tags } from "/lib/collections";
import { Cart } from "/lib/collections";
import { Orders } from "/lib/collections";


import * as Schemas from "/lib/collections/schemas";
```

## UI Components (Package)

```javascript
// Alerts
import { Alerts, Alert } from "/imports/plugins/core/ui/client/components";

// Loading & Progress
import { CircularProgress } from "/imports/plugins/core/ui/client/components";
import { Loading } from "/imports/plugins/core/ui/client/components";

// Buttons
import { FlatButton } from "/imports/plugins/core/ui/client/components";
import { Button } from "/imports/plugins/core/ui/client/components";
import { IconButton } from "/imports/plugins/core/ui/client/components";
import { EditButton } from "/imports/plugins/core/ui/client/components";
import { VisibilityButton } from "/imports/plugins/core/ui/client/components";
import { Handle } from "/imports/plugins/core/ui/client/components";

// Icon
import { Icon } from "/imports/plugins/core/ui/client/components";

// Popovers
import { Tooltip } from "/imports/plugins/core/ui/client/components";

// Localization
import { Translation } from "/imports/plugins/core/ui/client/components";
import { Currency } from "/imports/plugins/core/ui/client/components";

// Metafields
import { Metadata } from "/imports/plugins/core/ui/client/components";
import { Metafield } from "/imports/plugins/core/ui/client/components";

// Tags
import { TagList } from "/imports/plugins/core/ui/client/components";
import { TagItem } from "/imports/plugins/core/ui/client/components";

// Cards
import { Card } from "/imports/plugins/core/ui/client/components";
import { CardHeader } from "/imports/plugins/core/ui/client/components";
import { CardBody } from "/imports/plugins/core/ui/client/components";
import { CardGroup } from "/imports/plugins/core/ui/client/components";
import { CardTitle } from "/imports/plugins/core/ui/client/components";

// Media
import { MediaGallery } from "/imports/plugins/core/ui/client/components";
import { MediaItem } from "/imports/plugins/core/ui/client/components";

// Form elements
import { TextField } from "/imports/plugins/core/ui/client/components";
import { FieldGroup } from "/imports/plugins/core/ui/client/components";
import { Checkbox } from "/imports/plugins/core/ui/client/components";
import { NumericInput } from "/imports/plugins/core/ui/client/components";

// Layout
import { Divider } from "/imports/plugins/core/ui/client/components";
import { Items } from "/imports/plugins/core/ui/client/components";
import { Item } from "/imports/plugins/core/ui/client/components";
```

### Providers

```javascript
import { Translatable } from "/imports/plugins/core/ui/client/providers";
```

## Node Modules

### React

```javascript
import React, { Component, PropTypes } from "react";
```

### Utils

```javascript
import moment from "moment-timezone";
```

## Meteor

```javascript
import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { Template } from "meteor/templating";
import { Match, check } from "meteor/check";
import { Tracker } from "meteor/tracker";

// Make a valid attempt to avoid using session
import { Session } from "meteor/session";
```

### Atmosphere packages

```javascript
import { FlowRouter as Router } from "meteor/kadira:flow-router-ssr";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
```
