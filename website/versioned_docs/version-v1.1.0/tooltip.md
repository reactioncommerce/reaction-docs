---
original_id: tooltip
id: version-v1.1.0-tooltip
title: Tooltip
---
    
## Import

```javascript
import { Tooltip } from "/imports/plugins/core/ui/client/components";
```

### Usage Example

```javascript
import React, { Component } from "react";
import { Tooltip, Button } from "/imports/plugins/core/ui/client/components";

class MyReactComponent extends Component {
  state = {
    tooltipIsOpen: false
  }

  handleMouseOut = (event, value) => {
    this.setState({
      tooltipIsOpen: false
    });
  }

  handleMouseOver = (event, value) => {
    this.setState({
      tooltipIsOpen: true
    });
  }

  render() {
    const tooltipContent = (
      <span>{"My Tooltip"}</span>
    );

    return (
      <Tooltip tooltipContent={tooltipContent}>
        <div
          onTagMouseOut={this.handleMouseOut}
          onTagMouseOver={this.handleMouseOver}
        >
          <span>{"Element Text"}</span>
        </div>
      </Tooltip>
    );
  }
};

export default MyReactComponent;
```

### Props

Property       | Type                   | Description
-------------- | ---------------------- | --------------------------------
attachment     | String                 | Attachment to wrapped component,
children       | Node (React Component) | Child to attach tooltip to
tooltipContent | Node (React Component) | Content for tooltip

## Tooltip (Blaze)

Tooltips are provided by [tooltip](http://github.hubspot.com/tooltip/docs/welcome/). If you are using `reaction-ui` components then tooltips will be available to you on components such as [Button](#button).

### Examples

This example represents manual usage of the tooltip component.

```javascript
Template.button.onRendered(function () {
  const element = this.$(".js-my-element")[0];

  this.createTooltip = () => {

    if (this.tooltip) {
      this.tooltip.destroy();
    }

    this.tooltip = new Tooltip({
      target: element,
      position: "top left",
      content: "Tooltip content"
    });

  };
});
```
