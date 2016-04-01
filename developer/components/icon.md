# Icon

## Using the component

The icon components give you a simple way to use the available icon sets in reaction commerce with one component.

### Properties

Property                       | Type     | Description
------------------------------ | -------- | -----------------------------------------------------------------------------
icon                           | String   | name of [font awesome](https://fortawesome.github.io/Font-Awesome/) icon

##### Example (Client) (Blaze)

###### Basic Usage

```
import { icon } from "meteor/reactioncommerce:reaction-ui"

Template.myTemplate.helpers({
  iconComponent() {
    return icon
  }
})
```

```
<template name="myTemplate">
  <div class="iconContainer">
    {{> React component=iconComponent icon="clock"}}
  </div>
</template>
```
##### Example (Client) (React)

###### Basic Usage
In this example we display a clock icon. The base icon pack for Reaction Commerce is font awesome. The namespace `fa fa-` are automatically applied for you.

```
<icon icon="clock" />
```

The above is equivalent to the following:

```
<icon icon="fa fa-clock" />
```

###### In React Component
```
import { icon } from "meteor/reactioncommerce:reaction-ui"

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        {"Things in my component"}
        <icon icon="clock" />
      <div>
    )
  }
}
```
