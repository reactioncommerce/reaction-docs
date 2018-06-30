---
original_id: button
id: version-v1.1.0-button
title: Button
---
    
## Import

```javascript
import { Button } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { Button } from "/imports/plugins/core/ui/client/components";

class MyReactComponent extends Component
  return (
    <Button
      i18nKeyLabel="some.key"
      label="My Button"
      onClick={this.handleClick}
    />
  )
};

export default MyReactComponent;
```

## Props

Property             | Type                      | Description
-------------------- | ------------------------- | ---------------------------
active               | Boolean                   | Active state. true / false
bezelStyle           | String                    | "flat", "solid", "outline")
children             | Component                 | React child nodes
className            | String, Object            | "class-name", or { "class-name": true }
containerStyle       | Object                    | Style object to apply to Button container
disabled             | Boolean                   | Disabled state. true / false
eventAction          | String                    | adds HTML attribute `data-event-action=""` to button element
i18nKeyLabel         | String                    | i18n key for button label (shows in button)
i18nKeyTitle         | String                    | i18n key for button title attribute
i18nKeyToggleOnLabel | String                    | i18n key `on` label for a toggle button
i18nKeyTooltip       | String                    | i18n key for button tooltip
icon                 | String                    | Font awesome icon name. e.g. `fa fa-star`
iconAfter            | Boolean                   | Moves icon behind button label if `true`. default: `false`
label                | String                    | Button label
onClick              | Function                  | Callback on click.<br>(event, value) => {}
onIcon               | String                    | Icon for the toggle button `on` state
onToggle             | Function                  | Callback when button is toggles.<br>(event, value) => {}<br>if value is not set as a prop, true/false is returned instead
onValue              | Any                       | Value for button toggle `on` state. Passed to the `onToggle` callback.
primary              | Boolean                   | Primary state. true / false
status               | String                    | Sets button state with a string. `primary | success | info | warning | danger | link | cta | default`
tagName              | String                    | Specify the name of the HTML tag. Default: `button`. A tag name of `a` will also set the `href=#` by default
title                | String                    | Title attribute, use label for actual button text
toggle               | Boolean                   | Allow button to be toggled
toggleOn             | Boolean                   | Button is toggled `on`
toggleOnLabel        | String                    | Label when button is toggled `on`
tooltip              | String, Object, Component | Button tooltip
tooltipPosition      | String                    | Tooltip position. Default `bottom center`
value                | Any                       | Value to use for `onClick` and `onToggle` callbacks. Value is used for the `off` state when toggling a button
