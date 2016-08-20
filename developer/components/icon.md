# Icon

The icon components give you a simple way to use the available icon sets in Reaction with one component.

### Properties

| Property | Type   | Description                                                              |
| -------- | ------ | ------------------------------------------------------------------------ |
| icon     | String | name of [font awesome](https://fortawesome.github.io/Font-Awesome/) icon |

##### Example (Client) (Blaze)

###### Basic Usage

```js
import { icon } from "meteor/reactioncommerce:reaction-ui";

Template.myTemplate.helpers({
  iconComponent() {
    return icon;
  }
})
```

```handlebars
<template name="myTemplate">
  <div class="iconContainer">
    {{> React component=iconComponent icon="clock"}}
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

###### React Component

```jsx
import { icon } from "meteor/reactioncommerce:reaction-ui"

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        {"Things in my component"}
        <icon icon="clock" />
      <div>
    );
  }
}
```
