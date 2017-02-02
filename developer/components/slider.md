# Slider

## Import

```js
import { Slider } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```js
import { Slider } from "/imports/plugins/core/ui/client/components";

Template.myTemplate.helpers({
  Slider() {
    return Slider;
  },

  sliderOptions() {
    return {
      range: { min: 0, max: 5000 },
      start: [0, 2000],
      margin: 50,
      connect: true,
      step: 50,
      onChange: () => {
        return (values, handle, unencoded, tap, positions) => {
          console.log("slider changed", values);
        };
      },
      onSlide: () => {
        return (values, handle, unencoded, tap, positions) => {
          console.log("slider is being changed", values);
        };
      }
    };
  }
});
```
```html
<template name="myTemplate">
  {{#let options=sliderOptions}}
    <div class="slider">
      {{> React component=Slider
        range=options.range
        start=options.start
        margin=options.margin
        connect=options.connect
        step=options.step
        onChange=options.onChange
        onSlide=options.onSlide}}
    </div>
  {{/let}}
</template>
```
