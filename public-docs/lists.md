---
id: lists
title: Lists
---
    
## Import

```javascript
import { List, ListItem } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React from "react";
import { List, ListItem } from "/imports/plugins/core/ui/client/components";

const MyReactComponent = (props) => {
  return (
    <List>
      <ListItem
        icon="fa fa-star"
        label="List Item"
        onClick={props.handleListItemClick}
        actionType="arrow"
        value={"anyValue"}
      />
    </ListItem>
  )
};

export default MyReactComponent;
```

## Props

### List

| Property  | Type   | Description       |
| --------- | ------ | ----------------- |
| className | String | Custom class name |

### ListItem

| Property          | Type     | Description                                                |
| ----------------- | -------- | ---------------------------------------------------------- |
| actionType        | String   | "arrow" / "switch"                                         |
| i18nKeyLabel      | String   | i18n key for label                                         |
| icon              | String   | icon name (fontawesome)                                    |
| isAdmin           | Boolean  | Use admin styles                                           |
| label             | String   | primary label                                              |
| listItemClassName | String   | Custom class name                                          |
| onClick           | Function | Click handler<br> `(event, value) => ()`                   |
| onSwitchChange    | Function | Switch change handler<br> `(event, isChecked, name) => ()` |
| switchName        | String   | Name of switch, passed to the `onSwitchChange` callback    |
| switchOn          | Boolean  | true / false. requires `actionType="switch"`               |
| value             | Any      | Any value you want, gets passed to the `onClick` callback  |
