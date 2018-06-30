---
id: version-v1.7.0-metadata
title: Metadata
original_id: metadata
---
    
Horizontal divider with the ability to display a text label.

## Import

```javascript
import { Metadata, Metafield } from "/imports/plugins/core/ui/client/components";
```

### Usage Example

```javascript
import React from "react";
import { MediaGallery } from "/imports/plugins/core/ui/client/components";


const metafields = [
  { key: "Material", value: "Cotton" },
  { key: "Condition", value: "New" },
]

const MyReactComponent = (props) => {
  return (
    <Metadata
      editable={false}
      metafields={metafields}
    />
  )
};

export default MyReactComponent;
```

### Props
<!--lint disable-->
| Property     | Type          | Description                                                                                                           |
| ------------ | ------------- | --------------------------------------------------------------------------------------------------------------------- |
| editable     | Boolean       | toggle between an editable and non editable states                                                                    |
| metafields   | Array[Object] | Array of meta field objects: `[{key: "", value: ""}]`                                                                 |
| newMetafield | Object        | Meta field object for the new meta field form. `{key: "", value: ""}`                                                 |
| onMetaChange | Function      | On metafield change via input. callback signature `(event, metafield, index) => {}`                                   |
| onMetaRemove | Function      | Metafield remove callback. callback signature `(event, metafield, index) => {}`                                       |
| onMetaSave   | Function      | Metafield save callback. callback signature `(event, metafield, index) => {}` index may be `undefined` if its is new. |
<!--lint enable-->
## Media

```javascript
import React from "react";
import { Metafield } from "/imports/plugins/core/ui/client/components";

const metafield = {
  key: "Material",
  value: "Cotton"
}

const MyReactComponent = () => {
  return (
    <Metafield
      metafield={metafield}
    />
  )
};

export default MyReactComponent;
```

### Props

| Property              | Type     | Description                                                               |
| --------------------- | -------- | ------------------------------------------------------------------------- |
| blank                 | Boolean  | Shows submit buttons if `true`, shows delete button when `false`          |
| detailInfoPlaceholder | Function | Detail info input placeholder (value)                                     |
| detailNamePlaceholder | Function | Detail name input placeholder (key)                                       |
| i18nKeyDetailInfo     | Function | Detail info i18n placeholder (value)                                      |
| i18nKeyDetailName     | Function | Detail name i18n placeholder (value)                                      |
| index                 | Number   | Index in array                                                            |
| metafield             | Object   | `{key: "", value: ""}`                                                    |
| onBlur                | Function | On input blur. callback signature `(event, metafield, index) => {}`       |
| onChange              | Function | On input change. callback signature `(event, metafield, index) => {}`     |
| onRemove              | Function | On remove metafield. callback signature `(event, metafield, index) => {}` |
