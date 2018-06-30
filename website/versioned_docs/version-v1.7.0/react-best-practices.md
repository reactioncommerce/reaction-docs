---
id: version-v1.7.0-react-best-practices
title: React Best Practices
original_id: react-best-practices
---
    
## Handling events in React

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
      <button onClick={this.handleClick}>{"Click"}</button>
    )
  }
}
```

Try a demo on <a class="jsbin-embed" href="https://jsbin.com/merebe/edit?js,console,output">JS Bin on jsbin.com</a>

## Resources

- ESnext Class fields - <https://github.com/tc39/proposal-class-fields>
