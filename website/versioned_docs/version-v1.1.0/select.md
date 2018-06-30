---
original_id: select
id: version-v1.1.0-select
title: Select
---
    
Dropdown, radio or checkbox select component

| Property | Type     | Description                                                     |
| -------- | -------- | --------------------------------------------------------------- |
| options  | Array    | An array of objects that have an `value`, and `label property`. |
| type     | String   | **Optional** `radio`, `checkbox`, `select` (default)            |
| onSelect | function | Function callback for change event.                             |

## Examples

### options

```js
Template.myTemplate.helpers({
  selectOptions() {
    return [
      {value: "one", label: "One"},
      {value: "two", label: "Two"},
      {value: "three", label: "Three"}
    ];
  }
})
```

```html
{{> select options=selectOptions}}
```

### onChange

```js
Template.myTemplate.helpers({
  selectOptions() {
    return [
      {value: "one", label: "One"},
      {value: "two", label: "Two"},
      {value: "three", label: "Three"}
    ];
  },

  handleSelect() {
    return (value, event) => {
      console.log(value);
    }
  }
})
```

```html
{{> select options=selectOptions onSelect=handleSelect}}
```

### type

```js
Template.myTemplate.helpers({
  selectOptions() {
    return [
      {value: "one", label: "One"},
      {value: "two", label: "Two"},
      {value: "three", label: "Three"}
    ];
  },

  handleSelect() {
    return (value, event) => {
      console.log(value);
    }
  }
})
```

```html
{{> select type="checkbox" options=selectOptions onSelect=handleSelect}}
```

checkboxes will be used instead of a select dropdown.
