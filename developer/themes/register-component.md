# Customization of Email Templates

## Register a new React Component

```js
import React, { Component } from "react";
import { registerComponent } from "/imports/plugins/core/layout/lib/components"

// Create a react component
class MyComponent extends Component {
  render() {
    return (
      <div>
        {" My React Component!"}
      </div>
    )
  }
}

// Register react component.
// Now MyComponent can be accessed anywhere on the client with the name "my-react-component"
registerComponent({
  name: "my-react-component",
  component: MyComponent
});
```

## Get React Component

```js
import React, { Component } from "react";
import { getComponent } from "/imports/plugins/core/layout/lib/components"


class MyWrapperComponent extends Component {
  render() {
    return (

      const myComponent = React.createElement(getComponent("my-react-component"), {
        // ... custom props
      })

      <div>
        {myComponent}
      </div>
    )
  }
}
```
