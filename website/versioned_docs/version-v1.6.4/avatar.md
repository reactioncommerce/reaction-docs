---
id: version-v1.6.4-avatar
title: ReactionAvatar
original_id: avatar
---
    
The ReactionAvatar component outputs an Avatar based on Gravatar, or a provided image url.

ReactionAvatar is built with [react-avatar](https://github.com/sitebase/react-avatar). See their docs if you'd like to extend it further.

## Import

```javascript
import { Components } from "@reactioncommerce/reaction-components";
```

## Usage Example

```javascript
import React, { Component } from "react";
import { Badge } from "/imports/plugins/core/ui/client/components";

class MyReactComponent extends Component
  return (
    <Components.ReactionAvatar
      className={"classes"}
      email={"me@example.com"}
      name={"Example name"}
      src={"http://myimageurl.com/image.png"}
    />
  )
};

export default MyReactComponent;
```

## Props

| Property       | Type           | Description                                                                                                                 |
| -------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| className      | String, Object | "class-name", or { "class-name": true }                                                                                     |
| color          | String         | Text color to show when `Name` is used.                                                                                     |
| currentUser    | Boolean        | Set as false if displaying an avatar for anyone besides the logged-in user.                                                 |
| email          | String         | Email address to reference Gravatar. If provided, this will be the default image shown.                                     |
| facebookId     | String         | Facebook ID used to get users Facebook profile image.                                                                       |
| fgColor        | String         | Background color to show when `Name` is used. Will default to a random hex if not set.                                      |
| googleId       | String         | Google ID used to get users Google profile image.                                                                           |
| md5Email       | String         | MD5 hash of email address to reference Gravatar. Preferred over `email`. If provided, this will be the default image shown. |
| name           | String         | Name to show in avatar if email and src are not provided. label                                                             |
| round          | Boolean        | Display a circle as the avatar image, as opposed to a square.                                                               |
| size           | String         | Pixel size of the avatar image.                                                                                             |
| skypeId        | String         | Skype ID used to get users Skype profile image.                                                                             |
| source         | String         | URL of image to be used as fallback if email is not available.                                                              |
| style          | Object         | Style provided directly to component.                                                                                       |
| textSizeRation | String         | Ratio of text-size to avatar size when `Name` is used as the display.                                                       |
| twitterHandle  | String         | Twitter handle used to get users Twitter profile image.                                                                     |
| vkontakteId    | String         | Vkontakte ID used to get users VkontakteId profile image.                                                                   |
