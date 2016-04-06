# Buttons

```
{{> button
  label="My Label"
  i18nKeyLabel="path.to.translation"
  icon="plus"
  className="j"
  onClick=(function)
}}
```

## Properties

Property                       | Type     | Description
------------------------------ | -------- | -----------------------------------------------------------------------------
[label](#label)              | String   | Button text (alias for title)
[title](#title)              | String   | Button text
[i18nKeyLabel](#i18KeyLabel) | String   | i18nKey path
[className](#className)      | String   | Additional CSS Class names
[status](#status)            | String   | default **(default)** &#124; info &#124; danger &#124; success &#124; warning
[type](#type)                | String   | button **(default)** &#124; submit
[onClick](#onClick)          | Function | function reference from template helper

## Property Examples

## label

```
{{> button label="Add Product"}}
```

## title

```
{{> button title="Add Product"}}
```

## i18nKeyLabel

i18n key for translation. If provided with `label`, then `label` will be used as the default if the i18n key is not found.

## icon

name of icon. We use font awesome as our default font. [fontawesome](fontawesome.io)

```
{{ button label="Add Product" icon="clock"}}
```

```
{{ button label="Add Product" icon="fa fa-clock"}}
```

## onClick

```
Template.myTemplate.helpers({
  handleButtonClick(event) {
    return () => {
      console.log("Thing");
    }
  }
});
```

```
{{ button label="Add Product" onClick=handleButtonClick}}
```

## Event handling
There are a number of ways to handle events with components in [Reaction](https://reactioncommerce.com).

### On Click
On click events represents a user clicking, or taping on a button that then triggers this event.

##### Example (Client) (Blaze)

###### myTemplate.html
```
<template name="myTemplate">
  {{> button title="Show Alert" onClick=handleButtonClick}}
</template>
```

###### myTemplate.js
```
Template.myTemplate.helpers({
  handleButtonClick() {
    const instance = Template.instance();
    return (event) => {
      Alerts.alert("Button was clicked");
    }
  }
});
```

### Standard events
You can also use the standard way of attaching events to the button.

```
{{> button label="My Label" className="js-button"}}

Template.myTemplate.events({
  "click .js-button"(event, instance) {
    Alerts.alert("Button was clicked");
  }
});
```

## Using the HTML version

```
<button
  type="button"
  class="rui btn btn-default"
  data-event-action="eventAction">
  <div class="contents">
    <!-- text, icons and other thing go in here -->
  </div>
</button>
```
