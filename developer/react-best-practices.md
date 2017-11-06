# React best practices in Reaction

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

Don't use arrow functions to bind callbacks in `render` fucntions. A new function reference will be created everytime the component is re-rendered.

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

<a class="jsbin-embed" href="https://jsbin.com/merebe/embed?html,js,console,output">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?4.1.0"></script>

# Resources

- ESnext Class fields - https://github.com/tc39/proposal-class-fields
