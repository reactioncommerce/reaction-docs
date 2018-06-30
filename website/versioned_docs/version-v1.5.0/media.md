---
id: version-v1.5.0-media
title: Media
original_id: media
---
    
Horizontal divider with the ability to display a text label.

## Import

```javascript
import { MediaGallery, Media } from "/imports/plugins/core/ui/client/components";
```

### Usage Example

```javascript
import React from "react";
import { MediaGallery } from "/imports/plugins/core/ui/client/components";

const MyReactComponent = (props) => {
  return (
    <MediaGallery
      editable={false}
      media={props.media}
    />
  )
};

export default MyReactComponent;
```

### Props

| Property      | Type          | Description                                                                   |
| ------------- | ------------- | ----------------------------------------------------------------------------- |
| editable      | Boolean       | toggle between an editable and non editable media gallery                     |
| media         | Array[Object] | Array of media objects from CFS                                               |
| onDrop        | Function      | Dropzone drop event. callback signature `(files) => {}`                       |
| onMove        | Function      | React DnD drag move event. callback signature `(moveIndex, hoverIndex) => {}` |
| onRemoveMedia | Function      | Remove media callback. callback signature `(media) => {}`                     |

## Media

```javascript
import React from "react";
import { Media } from "/imports/plugins/core/ui/client/components";

const MyReactComponent = () => {
  return (
    <Media
      defaultSource="/resources/placeholder.gif"
      source="https://location/to/image.png"
    />
  )
};

export default MyReactComponent;
```

### Props

| Property          | Type          | Description                                                                      |
| ----------------- | ------------- | -------------------------------------------------------------------------------- |
| connectDragSource | Function      | React DnD drag source                                                            |
| connectDropTarget | Function      | React Dnd drop target                                                            |
| defaultSource     | String        | Default image if source is not defined. Defaults to `/resources/placeholder.gif` |
| editable          | Boolean       | Show edit controls, allow drag and drop sorting.                                 |
| onRemoveMedia     | Function      | Remove media callback. callback signature `(media) => {}`                        |
| source            | String, Media | String url for resource, or a CFS file object                                    |
