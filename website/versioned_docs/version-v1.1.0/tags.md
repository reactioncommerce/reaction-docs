---
original_id: tags
id: version-v1.1.0-tags
title: Tags
---
    
## Import

```javascript
import { TagList, TagItem } from "/imports/plugins/core/ui/client/components";
```

## Usage Example

```javascript
import React from "react";
import { TagList } from "/imports/plugins/core/ui/client/components";

const tags = [
  { name: "Shop", slug: "shop" },
  { name: "Example Product", slug: "example-product" }
];

const MyReactComponent = () => {
  return (
    <Tags
      tags={tags}
    />
  )
};

export default MyReactComponent;
```

## Props

### TagList

Property         | Type          | Description
---------------- | ------------- | ----------------------------------------------------------------------------------
editable         | Boolean       | True: enable editable tags. False (default) show tags for display only.
enableNewTagForm | Boolean       | Show new tag form for creating tags
newTag           | Object        | Tag object for new tag from. `{ name: "" }`
onGetSuggestions | Function      | Passthrough callback from TagItem to request suggestions from container component.
onMoveTag        | Function      | React DnD drag move callback. `(moveIndex, hoverIndex) => {}`
onNewTagSave     | Function      | New Tag save callback. `(tag, parentTag) => {}`
onNewTagUpdate   | Function      | New Tag updated callback. `(tag, parentTag) => {}`
onTagMouseOut    | Function      | Tag mouse out callback. `(tag, parentTag) => {}`
onTagMouseOver   | Function      | Tag mouse over callback. `(tag, parentTag) => {}`
onTagRemove      | Function      | Tag remove callback. `(tag, parentTag) => {}`
onTagSave        | Function      | Tag save callback. `(tag, parentTag) => {}`
onTagUpdate      | Function      | Tag update callback. `(tag, parentTag) => {}`
parentTag        | Tag           | ParentTag (Tag) this tag list belongs to.
suggestions      | Array[Object] | Array of suggestion for TagItem
tagProps         | Object        | Props to apply to TagItem
tags             | Array[Tag]    | Array of Tag objects

### TagItem

Property                | Type          | Description
----------------------- | ------------- | -----------------------------------------------------------------------------
blank                   | Boolean       | Render a blank, editable tag for adding new tags
connectDragSource       | Function      | React DnD drag source
connectDropTarget       | Function      | React DnD drop target
editable                | Boolean       | True: Display editable tag. False: tag for display
fullWidth               | Boolean       | Fill with of parent container
i18nKeyInputPlaceholder | String        | Input placeholder i18n key
index                   | Number        | Index in array
inputPlaceholder        | String        | Input placeholder
onGetSuggestions        | Function      | Ask for suggestions from parent component when needed.
onTagInputBlur          | Function      | Tag input blur callback. callback signature `(event, tag) => {}`
onTagMouseOut           | Function      | Tag mouse out callback. callback signature `(event, tag) => {}`
onTagMouseOver          | Function      | Tag mouse over callback. callback signature `(event, tag) => {}`
onTagRemove             | Function      | Tag remove callback. callback signature `(tag) => {}`
onTagSave               | Function      | Tag save callback. callback signature `(event, tag) => {}`
onTagUpdate             | Function      | Tag change callback. callback signature `(event, tag) => {}`
parentTag               | Object        | Parent tag if this tag is a child of another.
suggestions             | Array[Object] | Array of suggestions for Autosuggest input. `[{ label: "Suggestion Label" }]`
tag                     | Object        | Tag object, see tag schema
