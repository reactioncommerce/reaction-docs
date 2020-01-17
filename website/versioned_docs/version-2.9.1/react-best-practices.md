---
id: version-2.9.1-react-best-practices
title: React Best Practices
original_id: react-best-practices
---

## General guidelines

- Use class components rather than pure function components
- Use ES6
- Include a `static propTypes = {};` at the top of the component class definition.
- Include a description comment above each propType property, wrapped in `/** */`.
- If the component takes and renders children, use `children: PropTypes.node` as the propType definition.
- If the component relies on a prop being set and cannot provide a defaultProp for it, add `.isRequired` to the prop type.
- Add `static defaultProps` below `static propTypes` if necessary.

## Handling events in React

- Props that accept a function should generally begin with `on`, for example, `onClick`
- Be more specific with function prop names when necessary by adding a descriptive suffix. For example, `onClickSave` and `onClickCancel` for a component that has multiple things that could be clicked.
- For functions that will handle an event (i.e., will be passed to an `on...` prop), create a component instance method that is named the same as the prop, but with `on` changed to `handle`. For example, `onClick={this.handleClick}`. Be more specific with handler function names when necessary by adding a descriptive suffix. Be sure to properly bind the handler method. See below.

## Properly bind an event handler component instance method

### Don't

`handleClick` is not properly bound. `this` will not be available in the function body.

```js
class MyComponent extends Component {
  handleClick() {
    // Handle click event
    console.log("this will be null", this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>{"Click"}</button>
    )
  }
}
```

### Don't

Don't bind functions inside `render`. A new function reference will be created everytime the component is re-rendered.

```js
class MyComponent extends Component {
  handleClick() {
    // Handle click event
  }

  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>{"Click"}</button>
    )
  }
}
```

### Don't

Don't use arrow functions to bind callbacks in `render` functions. A new function reference will be created everytime the component is re-rendered.

```js
class MyComponent extends Component {
  handleClick() {
    // Handle click event
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>{"Click"}</button>
    )
  }
}
```

### Don't

Binding in the constructor and binding with the class fields syntax is reduntant.

```js
class MyComponent extends Component {
  constructor() {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    // Handle click event
  }

  render() {
    return (
      <button onClick={this.handleClick}>{"Click"}</button>
    )
  }
}
```

### Do

Bind with the class fields syntax to bind callbacks for events. Requires [ESNext class fields](https://github.com/tc39/proposal-class-fields) which is enabled by default in Reaction.

```js
class MyComponent extends Component {
  handleClick = () => {
    // Handle click event
    console.log("this will be defined", this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>Click</button>
    )
  }
}
```

## Setting state asynchronously

React `this.setState` logs errors when called after the component instance has been unmounted. For this reason, you must check whether the element is mounted before calling `this.setState` in any callback or Promise chain, or after the `await` keyword in an `async` function.

```js
componentDidMount() {
  this._isMounted = true;
}

componentWillUnmount() {
  this._isMounted = false;
}
```

In each callback where you need to set state:

```js
if (this._isMounted) this.setState({ /*...*/ });
```

You may hear it said that canceling promises on unmount is a better approach, and that's probably true, but there is not yet an established pattern for this in wide use so we've decided to use `isMounted` until the React maintainers have a concrete recommendation.

## Using Other Components in a Component

If you are creating a component that renders other components within it, for example, a component with a button in it, you should not import those other components. Instead, have them passed in as props, and use the components context.

Read about the components context [here](https://github.com/reactioncommerce/components-context).

In general:

(1) Add a prop named `components` that expects an object with components in it by name. The names should exactly match our component names. Here's an example for `Button`:

```js
/**
 * If you've set up a components context using
 * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
 * (recommended), then this prop will come from there automatically. If you have not
 * set up a components context or you want to override one of the components in a
 * single spot, you can pass in the components prop directly.
 */
components: PropTypes.shape({
  /**
   * Pass either the Reaction Button component or your own component that is
   * compatible with ReactoForm.
   */
  Button: CustomPropTypes.component.isRequired,
}).isRequired,
```

- Use the same or similar comments as in the above example.
- Remove `.isRequired` if your component can render without it.

(2) Import `withComponents` and wrap your component

```js
import { withComponents } from "@reactioncommerce/components-context";

// ...

export default withComponents(SomeComponent);
```

This will merge components from a components context provider into the `components` prop so that they don't need to be passed in explicitly unless they need to be overridden in a specific instance.
