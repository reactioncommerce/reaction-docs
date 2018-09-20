---
id: version-1.16.0-link
title: Link
original_id: link
---

Link is a drop-in replacement for the HTML `<a>` tag. It uses Reaction's router to navigate to the specified href, preventing the entire client app from reloading. It also scrolls to the top of the next page.

## Import

```javascript
import { Link } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React from "react";
import { Link } from "/imports/plugins/core/ui/client/components";

const MyReactComponent = (props) => {
  return (
    <Link href="/tag/shop">Click me!</a>
  )
};

export default MyReactComponent;
```

## Props

| Property  | Type   | Description       |
| --------- | ------ | ----------------- |
| href      | String | Link URL          |
