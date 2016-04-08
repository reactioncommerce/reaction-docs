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

Property                       | Type     | Description
------------------------------ | -------- | -----------------------------------------------------------------------------
[label](#label)              | String   | Button text (alias for title)
[title](#title)              | String   | Button text
[i18nKeyLabel](#i18KeyLabel) | String   | i18nKey path
[className](#className)      | String   | Additional CSS Class names
[status](#status)            | String   | default **(default)** &#124; info &#124; danger &#124; success &#124; warning
[type](#type)                | String   | button **(default)** &#124; submit
[onClick](#onClick)          | Function | function reference from template helper

## Label

```
{{> button label="Add Product"}}
```

```
{{> button title="Add Product"}}
```

## Translating label

i18n key for translation. If provided with `label`, then `label` will be used as the default if the i18n key is not found.

```
{{> button title="Add Product" i18nKeyLabel="app.addProduct"}}
```

## Using an icon

name of icon. We use font awesome as our default font. [fontawesome](fontawesome.io)

```
{{ button label="Add Product" icon="clock"}}
```

```
{{> button label="Add Product" icon="fa fa-clock"}}
```

## Click events

On click events represents a user clicking, or taping on a button that then triggers this event.

```
Template.myTemplate.helpers({
  handleButtonClick(event) {
    return () => {
      console.log("Button was clicked");
    }
  }
});
```

```
{{> button label="Add Product" onClick=handleButtonClick}}
```

## Custom events
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
