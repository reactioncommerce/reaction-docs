---
id: version-v1.9.0-media
title: Media-Related
original_id: media
---
    
`MediaGallery` and `MediaItem` are components used for displaying media from the `Media` [FileCollection](https://github.com/reactioncommerce/reaction-file-collections), which is backed by the `MediaRecords` collection. `MediaUploader` is used for uploading and inserting `Media` files and records.

## MediaGallery

Displays zero or more media items, or placeholders, with ability to turn on editing, such as adding (file upload), removing, and reordering. Used on the default product detail page.

Currently only supports image media.

### Usage Example

```javascript
import React from "react";
import { Components } from "@reactioncommerce/reaction-components";
import { Media } from "/imports/plugins/core/files/client";

const MyReactComponent = (props) => {
  const media = Media.findLocal({
    "metadata.variantId": props.variantId
  }, { sort: { "metadata.priority": 1, "uploadedAt": 1 } });

  return (
    <Components.MediaGallery editable media={media} />
  )
};

export default MyReactComponent;
```

### Props

<!--lint disable-->

| Property      | Type              | Description                                                                                        |
| ------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| editable      | Boolean           | True to enable remove buttons, add button, file drop, and reorder                                  |
| featuredMedia | FileRecord        | A media FileRecord instance that should be the largest item. Default is first item in `media` prop |
| media         | Array[FileRecord] | Array of media FileRecord instance from a FileCollection                                           |

<!--lint enable-->

## MediaItem

`MediaItem` is what `MediaGallery` renders for each item in its `media` prop array. You can also use it separately where you need to render a single media item. Currently only supports image media.

### Usage Example

```javascript
import React from "react";
import { Components } from "@reactioncommerce/reaction-components";

const MyReactComponent = (props) => {
  const source = Media.findOneLocal({
    "metadata.variantId": props.variantId
  }, { sort: { "metadata.priority": 1, "uploadedAt": 1 } });

  return (
    <Components.MediaItem
      defaultSource="/resources/placeholder.gif"
      source={source}
    />
  )
};

export default MyReactComponent;
```

### Props

| Property      | Type       | Description                                                                      |
| ------------- | ---------- | -------------------------------------------------------------------------------- |
| defaultSource | String     | Default image if source is not defined. Defaults to `/resources/placeholder.gif` |
| editable      | Boolean    | Show edit controls, allow drag and drop sorting.                                 |
| onRemoveMedia | Function   | Remove media callback. callback signature `(media) => {}`                        |
| source        | FileRecord | A media FileRecord instance                                                      |

## MediaUploader

The `MediaUploader` component provides a button and dropzone for uploading and inserting `Media` files and records. When image files are dropped or selected, it uploads them all to the Reaction server and then inserts them into the `Media` FileCollection.

### Props

| Property | Type    | Description                                                                                  |
| -------- | ------- | -------------------------------------------------------------------------------------------- |
| metadata | Object  | Any arbitrary metadata that you want on the `metadata` property of the inserted `FileRecord` |

### Usage Example

```javascript
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";

class MyMediaManager extends Component {
  static propTypes = {
    metadata: PropTypes.object,
  };

  renderImages() {
    // Render the existing media
  }

  render() {
    const { metadata } = this.props;

    return (
      <div>
        {this.renderImages()}
        <Components.MediaUploader metadata={metadata} />
      </div>
    );
  }
}

export default MyMediaManager;
```
