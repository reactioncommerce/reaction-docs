# Cards

## Using the Component

Property                       | Type     | Description
------------------------------ | -------- | -----------------------------------------------------------------------------
[controls](#controls)          | Array    | Array of button Props. [see button component](#button)

##### Example (Client) (Blaze)

```
{{#card}}
  Content at the body of the card
{{/card}}
```

## Property Examples

### controls

```
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
})
const
```

##### Example

```
{{#card cardControls}}
  Content at the body of the card
{{/card}}
```
