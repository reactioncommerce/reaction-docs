# Component: Button
## Using the Blaze Component
Pros:
- More future proof if there are updates to button structure
- Ensure all buttons use the same styles and structure
- Easy to update all buttons by updating the original template
- Cons:
- You'll have to use the button the way we designed it to be used.

Why choose this method? Choose to use the blaze component if you just need a button that works and don't want to worry about the underlying html or css classes.

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
[label](#p-label)              | String   | Button text (alias for title)
[title](#p-title)              | String   | Button text
[i18nKeyLabel](#p-i18KeyLabel) | String   | i18nKey path
[className](#p-className)      | String   | Additional CSS Class names
[status](#p-status)            | String   | default **(default)** &#124; info &#124; danger &#124; success &#124; warning
[type](#p-type)                | String   | button **(default)** &#124; submit
[onClick](#p-onClick)          | Function | function reference from template helper

## Property Examples
(#property-label)

### label

```
{{> button label="Add Product"}}
```

(#property-title)

### title

```
{{> button title="Add Product"}}
```

i18nKeyLabel: i18n key for translation. If provided with `label`, then `label` will be used as the default if the i18n key is not found.

icon: name of icon. We use font awesome as our default font. [fontawesome](fontawesome.io)

onClick: function reference from template helper:

## Event handling
### On Click

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
Pros:
- You'll get more customization over how the button structure
- Cons:
- You'll loose any special functionality from the button component.
- If the structure of the button changes, you'll have to manually update all instances.
- Locked out of any future updates to the button that may fix issues or add additional functionality

Why choose this method? Choose to use the html if you need to do something not supported by the button component.

```
<button
  type="{{type}}"
  class="rui button btn"
  data-event-action="{{title}}">
  <div class="contents">
    <!-- text, icons and other thing go in here -->
  </div>
</button>
```
