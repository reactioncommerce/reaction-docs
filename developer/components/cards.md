# Cards

```html
{{#card}}
  Content at the body of the card
{{/card}}
```

| Property              | Type  | Description                                            |
| --------------------- | ----- | ------------------------------------------------------ |
| [controls](#controls) | Array | Array of button Props. [see button component](#button) |

## Examples

### controls

```js
Template.myTemplate.helpers({
  cardProps() {
    return {
      controls: [{
        icon: "fa fa-plus-square fa-fw",
        onClick() {
          console.log("Clicked!");
        }
      }]
    }
  }
});
```

```html
{{#card cardControls}}
  Content at the body of the card
{{/card}}
```
