# Icon

The icon components give you a simple way to use the available icon sets in Reaction with one component.

### Properties

Property                       | Type     | Description
------------------------------ | -------- | -----------------------------------------------------------------------------
icon                           | String   | name of [font awesome](https://fortawesome.github.io/Font-Awesome/) icon

##### Example (Client) (Blaze)

###### Basic Usage

```
import { Icon } from "/imports/plugins/core/ui/client/components"

Template.myTemplate.helpers({
  IconComponent() {
    return Icon;
  }
});
```

```
<template name="myTemplate">
  <div class="iconContainer">
    {{> React component=IconComponent icon="clock"}}
  </div>
</template>
```
##### Example (Client) (React)

###### Basic Usage
In this example we display a clock icon. The base icon pack for Reaction is font awesome. The namespace `fa fa-` are automatically applied for you.

```
<icon icon="clock" />
```

The above is equivalent to the following:

```
<icon icon="fa fa-clock" />
```

###### In React Component
```
import React, { Component } from "react";
import { Icon } from "/imports/plugins/core/ui/client/components";

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
