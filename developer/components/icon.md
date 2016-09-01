# Icon

The icon components give you a simple way to use the available icon sets in Reaction with one component.

### Properties

| Property | Type   | Description                                                              |
| -------- | ------ | ------------------------------------------------------------------------ |
| icon     | String | name of [font awesome](https://fortawesome.github.io/Font-Awesome/) icon |

##### Example (Client) (Blaze)

###### Basic Usage

```
import { Icon } from "/imports/plugins/core/ui/client/components";

Template.myTemplate.helpers({
  IconComponent() {
    return Icon;
  }
});
```

```handlebars
<template name="myTemplate">
  <div class="iconContainer">
    {{> React component=IconComponent icon="clock"}}
  </div>
</template>
```

##### Example (Client) (React)

###### Basic

In this example we display a clock icon. The base icon pack for Reaction is font awesome. The namespace `fa fa-` are automatically applied for you.

```html
<icon icon="clock" />
```

The above is equivalent to the following:

```html
<icon icon="fa fa-clock" />
```

<<<<<<< HEAD
###### React Component

```jsx
import { icon } from "meteor/reactioncommerce:reaction-ui"
=======
###### In React Component
```
import React, { Component } from "react";
import { Icon } from "/imports/plugins/core/ui/client/components";
>>>>>>> mikemurray-icon-docs

class MyComponent extends Component {
  render() {
    return (
      <div>
        {"Things in my component"}
        <Icon icon="clock" />
      <div>
    );
  }
}
```
