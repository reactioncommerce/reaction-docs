# How to create a custom home page


You can change the default layout values in [`/client/config/defaults.js`]( https://github.com/reactioncommerce/reaction/blob/f40ff536c139d70da02ca10ae12655247452d658/client/config/defaults.js#L1-L74) by overriding them in a new file.

1) Create a new custom plugin

```js
   $ reaction plugins create --name custom-home

   Success!
   New plugin created at: /imports/plugins/custom/custom-home
```


2) Create a file called `default.js` in the `/imports/plugins/custom/custom-home/client/` folder already created for you and put this into it:

```js
import { Session } from "meteor/session";

Session.set("INDEX_OPTIONS", {
  template: "MyStoreFront",
  layoutHeader: "NavBar",
  layoutFooter: ""
});
```
3) Create a new React component that renders your index route and
overwrite customize render()
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



4) Import new files from index.js
**/imports/plugins/custom/custom-home/index.js**
```js
  import "./default.js";
  import "./MyStoreFront";
```


5) Customize the render() method  
Start Reaction and navigate to http://localhost:3000, which does now render
`MyStoreFront` component.


NOTE: You also could omit the custom default.js entirely if you'd write

```js
registerComponent("products", MyStoreFront, getHOCs("Products"));
```

instead of

```js
registerComponent("MyStoreFront", MyStoreFront, getHOCs("Products"));
```

But this would also change other routes that make usage of the `products`
component, like _http://localhost:3000/tag/:slug_.
