# Tooltip

Tooltips are provided by [tooltip](http://github.hubspot.com/tooltip/docs/welcome/). If you are using `reaction-ui` components then tooltips will be available to you on components such as [Button](#button).

## Examples

This example represents manual usage of the tooltip component.

```js
Template.button.onRendered(function () {
  const element = this.$(".js-my-element")[0];

  this.createTooltip = () => {

    if (this.tooltip) {
      this.tooltip.destroy();
    }

    this.tooltip = new Tooltip({
      target: element,
      position: "top left",
      content: "Tooltip content"
    });

  };
});
```
