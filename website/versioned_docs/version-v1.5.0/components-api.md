---
id: version-v1.5.0-components-api
title: Reaction Components API
original_id: components-api
---
    
Most of the React components in the Reaction UI can be replaced or extended with the API outlined here. This allows anyone to create a custom plugin that can easily change the look of the UI and/or extend its functionality without having to edit core Reaction code.

See [Full API docs](#api) below.

## Using Reaction Components

A large percentage of the React components in the Reaction UI have been registered and can be imported into your own components like this:

```js
import { Components } from "@reactioncommerce/reaction-components";

const MyCustomNavbar = (props) => (
  <nav>
    <Components.Brand />

    <div>
      custom stuff here...
    </div>

    <Components.Button>
      Click Me!
    </Components.Button>

    <Components.MainDropdown />
  </nav>
);
```

The above example uses the logo, button, and main dropdown components included with Reaction to create a customized navbar that you can then add to the app via your plugin (more on that below).

## Replacing Components

Most Reaction components are available in the `Components` object that we imported above from `@reactioncommerce/reaction-components`. You can replace any of those registered components with the `replaceComponent` method. This will replace the UI component and it will inherit any higher order components (HOC) that might be wrapping the original component (more detail on HOC's below).

```js
import { replaceComponent } from "@reactioncommerce/reaction-components";

const MyCustomNavbar = (props) => (  
  <nav>custom navbar...</nav>
);

replaceComponent("NavBar", MyCustomNavbar);
```

## Registering Components

You also may want to register your own custom components in your plugin so that other users may override them in the same way we did above. For example, if you're writing a theme for Reaction, but want users to be able to easily override certain parts. You can register your components with the same `registerComponent` method that Reaction uses internally to register all of the core components.

```js
import { registerComponent } from "@reactioncommerce/reaction-components";

const MyComponent = (props) => (
  <div>
    custom things...
  </div>
);

registerComponent("MyComponent", MyComponent);
```

## Higher Order Components (HOC's)

To understand how theming works in Reaction, it's important to understand what higher order components (HOC's) are and how they interact with UI (presentational) components. If this is the first time you're hearing about higher order components, we recommend you read some or all of the following items to get familiar with this pattern of writing React components.

-   Official React docs <https://facebook.github.io/react/docs/higher-order-components.html>
-   Higher Order Components in React <https://spin.atomicobject.com/2017/03/02/higher-order-components-in-react/>
-   A Gentle Introduction to React's Higher Order Components <https://www.robinwieruch.de/gentle-introduction-higher-order-components/>
-   Recompose (a handy library of HOC's that we use in Reaction) <https://github.com/acdlite/recompose/blob/master/docs/API.md>

A higher order component's role is essentially to wrap a another component and pass it props that help it to render what you want in the UI. This could be a list of items from the database, the current user, info about the current route, etc.

In Reaction, HOC's are added either at the point when components are registered or when you are replacing an existing component. The first argument of `registerComponent` or `replaceComponent` is the component's name, the second is the component itself, and the third optional argument can be either a single HOC or an array of them.

For example, this is how we pass the `currentUser` object to the `MainDropdown` component in the navbar:

```js
registerComponent("MainDropdown", MainDropdown, withCurrentUser);
```

When `MainDropdown` renders, it will have a prop called `currentUser` that includes the user object for the person currently viewing the page (assuming they're logged in). We can then use that to do things like add their avatar and username to the top of the dropdown or add user-specific links within the dropdown.

Now if you wanted to customize that `MainDropdown` component, but you still want to have that user data available, all you have to do is use `replaceComponent`. That will only replace the UI component and the `withCurrentUser` HOC will remain in place to inject the same user data on the `currentUser` prop as mentioned above. This allows you to customize how a component looks while not having to reimplement how it gets its data or event handlers.

```js
const MyCustomDropdown = ({ currentUser }) => (
  <ul>
    <li>{currentUser.name}</li>
    <li>...</li>
  </ul>
);

// or as a React Component class

class MyCustomDropdown extends React.Component {

  render() {
    return (
      <ul>
        <li>{this.props.currentUser.name}</li>
        <li>...</li>
      </ul>
    )
  }
}

replaceComponent("MainDropdown", MyCustomDropdown);
```

You can also add additional HOC's when replacing a UI component. The final wrapped component will inherit the original HOC's and also add your new HOC(s). For example, we can add the `withIsAdmin` HOC to our custom dropdown:

```js
const MyCustomDropdown = ({ currentUser, isAdmin }) => (
  <ul>
    <li>{currentUser.name}</li>
    <li>...</li>
    {isAdmin &&
      <li>
        <Link to={"/admin/stuff"}>Secret Stuff</Link>
      </li>
    }
  </ul>
);

replaceComponent("MainDropdown", MyCustomDropdown, withIsAdmin);
```

As you can see above, the `withCurrentUser` HOC was inherited from the original dropdown and we've added the `withIsAdmin` HOC to it.

## Extending Components

For components that are defined as ES6 classes, you can optionally `extend` the original component instead of completely replacing it. This will let you choose which class methods you actually need to replace while inheriting the ones that you don't overwrite in your new component.

In order to retrieve the original UI component that you want to extend, we use the `getRawComponent` method:

```js
import { getRawComponent } from "@reactioncommerce/reaction-components";

const MainDropdown = getRawComponent("MainDropdown");

class MyCustomDropdown extends MainDropdown {
  render() {
    return (
      <div>
        customized render method...
      </div>
    )
  }
}

replaceComponent("MainDropdown", MyCustomDropdown);
```

In the example above, all of the original class methods and state handlers that exist in the `MainDropdown` class will still be available and the only customization will be on the methods that you specifically define (the `render()` method in this example). This is extremely helpful if you only want to change one small detail about a complex component, but you don't want to have to rewrite the entire component from scratch.

# API

Below is the full API for the Reaction components system. Each of these items can be imported from `@reactioncommerce/reaction-components`.

#### [Components Objects](#components-objects)

-   [`Components`](#components)
-   [`ComponentsTable`](#componentstable)

#### [Methods](#methods)

-   [`registerComponent()`](#registercomponent)
-   [`replaceComponent()`](#replacecomponent)
-   [`getComponent()`](#getcomponent)
-   [`getRawComponent()`](#getrawcomponent)
-   [`registerHOC()`](#registerhoc)
-   [`getHOCs()`](#gethocs)
-   [`copyHOCs()`](#copyhocs)
-   [`loadRegisteredComponents()`](#loadregisteredcomponents)

#### [Higher Order Components](#higher-order-components)

-   [`withCurrentUser`](#withcurrentuser)
-   [`withCurrentAccount`](#withcurrentaccount)
-   [`withIsAdmin`](#withisadmin)
-   [`withIsOwner`](#withisowner)
-   [`composeWithTracker`](#composewithtracker)

## Components Objects

### Components

This is the main `Components` object where all of the wrapped registered components finally end up. You use this to import and add a component to the UI.

```js
import { Components } from "@reactioncommerce/reaction-components";

class MyCustomComponent extends React.Component {
  render() {
    return (
      <div>
        <Components.Button>
          Click!
        </Components.Button>
      </div>
    )
  }
}

// or if you prefer...

const { Button } = Components;

class MyCustomComponent extends React.Component {
  render() {
    return (
      <div>
        <Button>
          Click!
        </Button>
      </div>
    )
  }
}
```

### ComponentsTable

This is where all of the separate pieces of a component are stored. You will likely never need to access this object directly because the methods below provide a way to access every item in the object in a simple way.

The structure of a single component in the table looks like this:

```js
ComponentsTable.MyComponent = {
   name: "MyComponent",
   hocs: [fn1, fn2],
   rawComponent: MyComponent
}
```

Again, this is just for reference, use the methods below to get/set whatever you need from that table.

## Methods

### registerComponent()

```js
import { registerComponent } from "@reactioncommerce/reaction-components";

const MyComponent = (props) => (
  <div>
    stuff...
  </div>
);

registerComponent("MyComponent", MyComponent);
```

or the same thing, but with a few HOC's

```js
import { registerComponent, withCurrentUser, withIsAdmin } from "@reactioncommerce/reaction-components";

const MyComponent = ({ currentUser, isAdmin }) => (
  <div>
    ID: {currentUser._id}
    name: {currentUser.name}
    {isAdmin &&
      <div>
        Top Secret Stuff!
      </div>
    }
  </div>
);

registerComponent("MyComponent", MyComponent, [
  withCurrentUser,
  withIsAdmin
]);
```

### replaceComponent()

```js
import { replaceComponent } from "@reactioncommerce/reaction-components";

const MyCustomComponent = (props) => (
  <div>
    custom stuff...
  </div>
);

replaceComponent("MyComponent", MyCustomComponent);
```

### getComponent()

This is functionally equivalent to importing `Components` like we did above and using `<Components.SomeName>` to use a component. The obvious tradeoff is you can only get one component at a time.

```js
import { getComponent } from "@reactioncommerce/reaction-components";

const Button = getComponent("Button");

const MyComponent = (props) => (
  <div>
    <Button>
      Click!
    </Button>
  </div>
);
```

### getRawComponent()

This gets the plain UI/presentational component without any HOC's wrapping it. The use case for this is when the original component is an ES6 class and you want to extend it instead of replacing it. See [extending components](#extending-components) above.

```js
import { getRawComponent } from "@reactioncommerce/reaction-components";

const NavBar = getRawComponent("NavBar");

class MyCustomNavbar extends NavBar {
  render() {
    return (
      <div>
        customized render method...
      </div>
    )
  }
}
```

### registerHOC()

It is generally recommended that you register any higher order components at the same time you register your presentational components, but this method exists so that you have the option to only register a HOC and leave the UI component alone. Note that this _adds_ your HOC's and does **not** replace the existing ones.

Considering that a HOC injects things on props, this method will not be likely be useful for most cases (since you have to update the UI component to use the new props). However, one valid use case for this is render highjacking. For example, you might add a HOC that decides whether to render the child component based on conditions outside of the component. In that case, the UI component doesn't need to do anything with props.

```js
import { registerHOC } from "@reactioncommerce/reaction-components";

function withConditionalRender(component) {
  // some logic that decides whether to render the child component
}

registerHOC("SomeComponent", withConditionalRender);
```

### getHOCs()

This gets the array of higher order components from an existing component. One possible use case it to use a set of HOC's on another component. However, depending on your use case, `copyHOCs` (see below) may be a better fit.

```js
import { getHOCs, registerComponent } from "@reactioncommerce/reaction-components";

const SomeComponentHOCs = getHOCs("SomeComponent");

const MyComponent = (props) => (
  <div>
    ...
  </div>
);

registerComponent("MyComponent", MyComponent, SomeComponentHOCs)
```

### copyHOCs()

Similar to `getHOCs` above, except this takes the higher order components from another component and wraps a new component that you provide.

```js
import { copyHOCs, registerComponent } from "@reactioncommerce/reaction-components";

const MyComponent = (props) => (
  <div>
    ...
  </div>
);

const MyComponentWithHOCs = copyHOCs("SomeExistingComponent", MyComponent)
```

### loadRegisteredComponents()

Used to wrap/load all registered components on app startup. This generally should be run right before the router assembles the app tree so that all components are available for the UI. This is run by Reaction internally, so no third parties should ever need to use it.

```js
import { loadRegisteredComponents } from "@reactioncommerce/reaction-components";

Meteor.startup(() => loadRegisteredComponents());
```

## Higher Order Components

### withCurrentUser

Injects the current user object on the `currentUser` prop of the wrapped component. The object is the reactive value of `Meteor.user()` and will update when the user logs in/out or if a field on the user object changes.

```js
import { registerComponent, withCurrentUser } from "@reactioncommerce/reaction-components";

const MyComponent = ({ currentUser }) => (
  <div>
    ID: {currentUser._id}
    Name: {currentUser.name}
    ...
  </div>
);

registerComponent("MyComponent", MyComponent, withCurrentUser)

export default withCurrentUser(MyComponent);
```

### withCurrentAccount

This is similar to `withCurrentUser`, except that it injects the current user's Reaction account object on the `currentAccount` prop of the wrapped component. The Reaction account is mostly the same as the Meteor user object except the logic that fetches it will return `null` if the user is anonymous. (Anonymous users are created for every new visitor so that they may check out as a guest without creating an account). The account object is the reactive and will update when the user logs in/out or if a field on the user object changes.

```js
import { registerComponent, withCurrentAccount } from "@reactioncommerce/reaction-components";

const MyComponent = ({ currentAccount }) => (
  <div>
    ID: {currentAccount._id}
    Name: {currentAccount.name}
    ...
  </div>
);

registerComponent("MyComponent", MyComponent, withCurrentAccount)

export default withCurrentAccount(MyComponent);
```

### withIsAdmin

Sets a Boolean `isAdmin` prop for the current user. You can use this to conditionally show parts of the UI or change what functionality is available.

```js
import { registerComponent, withIsAdmin } from "@reactioncommerce/reaction-components";

const MyComponent = ({ isAdmin }) => (
  <div>
    {isAdmin ?
      <div>
        Top Secret Stuff!
      </div>
      :
      <div>
        Sorry! This is for admins only!
      </div>
    }
  </div>
);

registerComponent("MyComponent", MyComponent, withIsAdmin)

export default withIsAdmin(MyComponent);
```

### withIsOwner

Similar to `isAdmin`, except sets a Boolean `isOwner` prop for the current user. An shop owner is similar to the admin above, but they only have administrative access for the current shop.

```js
import { registerComponent, withIsOwner } from "@reactioncommerce/reaction-components";

const MyComponent = ({ isOwner }) => (
  <div>
    {isOwner ?
      <div>
        Welcome to the shop dashboard!
      </div>
      :
      <div>
        Sorry! This is for shop owners only!
      </div>
    }
  </div>
);

registerComponent("MyComponent", MyComponent, withIsOwner)

export default withIsOwner(MyComponent);
```

### composeWithTracker

This HOC requires a special reactive function to retrieve data for a component. Meteor's Tracker library is used to reactively rerun the function whenever data or subscription state within the function changes.

```js
const MyComponent = ({ products }) => (
  <div>
    {products.map((product) => (
      <div>{product.name}</div>
      ...
    ))}
  </div>
);

// a reactive data fetching function
function composer(props, onData) {
  // will show a spinner component until the subscription is ready
  if (Meteor.subscribe("Products").ready()) {
    // fetch products from the database
    const products = Products.find().fetch();
    // inject them into the wrapped component on the "products" prop
    onData(null, { products });
  }
}

registerComponent("MyComponent", MyComponent, composeWithTracker(composer));

export default composeWithTracker(composer)(MyComponent);
```
