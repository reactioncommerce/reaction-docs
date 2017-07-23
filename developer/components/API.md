# The Reaction Components API

Most of the React components in the Reaction UI can be replaced or extended with the API outlined here. This allows anyone to create a custom plugin that can easily change the look of the UI and/or extend its functionality without having to edit core Reaction code.

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

## Higher Order Components

To understand how theming works in Reaction, it's important to understand what higher order components (HOC's) are and how they interact with UI (presentational) components. If this is the first time you're hearing about higher order components, we recommend you read some or all of the following items to get familiar with this pattern of writing React components.

- Official React docs <https://facebook.github.io/react/docs/higher-order-components.html>
- Higher Order Components in React <https://spin.atomicobject.com/2017/03/02/higher-order-components-in-react/>
- A Gentle Introduction to React's Higher Order Components <https://www.robinwieruch.de/gentle-introduction-higher-order-components/>
- Recompose (a handy library of HOC's that we use in Reaction) <https://github.com/acdlite/recompose/blob/master/docs/API.md>

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

As you can see above, the `withCurrentUser` HOC was inherited from the original dropdown and we've added the `withIsAdmin` to it.

## Extending Components

For components that are defined as ES6 classes, you can optionally `extend` the original component instead of completely replacing it. This will let you choose which class methods you actually need to replace, while inheriting the ones that you don't overwrite in your new component.

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

In the example above, all of the original class methods and state handlers that exist in the `MainDropdown` class will still be available and the only customization will be on the methods that you specifically define (the `render()` method in this example). This is extremely helpful if you only want to change one small detail about complex component, but you don't want to have to rewrite the entire thing from scratch.

# API

Below is the full API for the Reaction components system.

...
