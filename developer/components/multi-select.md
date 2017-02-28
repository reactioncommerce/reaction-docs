# MultiSelect

## Import

```js

import { MultiSelect } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```js

import { MultiSelect } from "/imports/plugins/core/ui/client/components";

Template.myTemplate.helpers({
  MultiSelect() {
    return MultiSelect;
  },

  multiSelectOptions() {
    return {
      name: "multiselect",
      options: [{value: 'one', label: 'One'},{value:'two',label:'Two'},{value:'three',label:'Three'}],
      placeholder: "Please choose",
      value: [],
      onChange: () => {
        return (values) => {
          console.log("Values are ", values);
        };
      }
    };
  }
});
```

```html

<template name="myTemplate">
  {{#let options=multiSelectOptions}}
    <div>{{> React component=MultiSelect
      options=options.options
      placeholder=options.placeholder
      name=options.name
      value=options.value
      onChange=options.onChange}}</div>
  {{/let}}
</template>
```
