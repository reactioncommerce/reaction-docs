---
id: version-v1.8.0-how-to-create-a-custom-homepage
title: Tutorial: Create a custom homepage
original_id: how-to-create-a-custom-homepage
---

> ⚠️ Note: This guide has been deprecated as the release of Reaction 2.0. The latest custom home page guide can be found [here](https://docs.reactioncommerce.com/docs/swag-shop-5).

## Step 1: Create a new custom plugin

```js
   $ reaction plugins create --name custom-home

   Success!
   New plugin created at: /imports/plugins/custom/custom-home
```

## Step 2: Setting default values for INDEX_OPTIONS

You can change the default layout values in [`/client/config/defaults.js`]( https://github.com/reactioncommerce/reaction/blob/f40ff536c139d70da02ca10ae12655247452d658/client/config/defaults.js#L1-L74) by overriding them in a new file called `default.js` in the `/imports/plugins/custom/custom-home/client/` folder:

```js
import { Session } from "meteor/session";

Session.set("INDEX_OPTIONS", {
  template: "MyStoreFront",
  layoutHeader: "NavBar",
  layoutFooter: ""
});
```

## Step 3: Create a new React component that renders your index route

**/imports/plugins/custom/custom-home/MyStoreFront.js**
```js
import React from "react";
import { registerComponent, getHOCs, getRawComponent } from "/imports/plugins/core/components/lib";

class MyStoreFront extends getRawComponent("Products") {
  // render() {
  //  return (
  //    <div>Custom store front</div>
  //  );
  // }
}

registerComponent("MyStoreFront", MyStoreFront, getHOCs("Products"));
```

## Step 4: Import new files from index.js
**/imports/plugins/custom/custom-home/index.js**
```js
  import "./default.js";
  import "./MyStoreFront";
```

## Step 5: Customize the render() method

Start Reaction and navigate to <http://localhost:3000>, which does now render the `MyStoreFront` component.

### Notice

You also could omit the custom default.js entirely if you'd write

```js
registerComponent("products", MyStoreFront, getHOCs("Products"));
```

instead of

```js
registerComponent("MyStoreFront", MyStoreFront, getHOCs("Products"));
```

But this would also change other routes that make usage of the `products`
component, like <http://localhost:3000/tag/:slug>.
