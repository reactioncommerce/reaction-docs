---
id: components-primary-app-bar
title: PrimaryAppBar
---

![](/assets/components-primary-app-bar.png "PrimaryAppBar Component")

The PrimaryAppBar component provides a simple way to easily create new toolbars for the main content area an admin view. It provides a prop for a title and positions any elements added as children

## Using the PrimaryAppBar


```js
import React from "react";
import Button from "@material-ui/core/Button";
import PrimaryAppBar from "/imports/client/ui/components/PrimaryAppBar";

export default function MyComponent() {
  return (
    <PrimaryAppBar title="Main Navigation">
      <Button color="primary" variant="contained" onClick={() => {}}>Save Changes</Button>
    </PrimaryAppBar>
  )
}
```

The `title` is placed to the leading edge of the component and is formatted with the `h6` style variant, but is rendered as an `h1`.

The `children` of the component are placed at the trailing edge of the app bar. If there are more elements, they will be automatically spaced apart with using the base unit of spacing defined in the theme.