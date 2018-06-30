---
id: version-v1.3.0-react-testing
title: React Testing
original_id: react-testing
---
    
## Description

Reaction has testing set up for react components. Frameworks in place for these tests are:
  - [jest](https://facebook.github.io/jest/)
  - [enzyme](http://airbnb.io/enzyme/index.html#enzyme)
  
The purpose of this section is to showcase how to write a few tests for components using the frameworks mentioned above.

## Running tests

To run tests:

```sh
  npm test
```

To update snapshots (must have Jest installed globally on local machine): 

```sh
  jest -u
```

With Jest installed locally you can run a bunch of other useful options. Find these options [here](https://facebook.github.io/jest/docs/cli.html).

## Creating tests

To create tests, create a file with the extension `*.test.js` or `*.spec.js`. When `npm test` is run no special instructions are needed for Jest to recognize the test files.

Jest utilizes the **Jasmine assertion library** therefore the syntax of the tests will be very familiar to developers who've used Jasmine before.


## Unit Testing

For every component we test **presentaion** and expected **behaviour**.
Assertions made include:
  - Given a set of inputs (states OR props) assert what a component should output (render).
  - Given a user action, assert how a component behaves:
      - It might make a state update.
      - Call a prop function passed to it by a parent.

### Enzyme

**Shallow Rendering**

Enzyme has the capability to shallow render our components. When a component is shallow rendered it is rendered only one level deep. Also it does not render to the actual DOM, it maintains a virtual representation of the DOM. So if the render function of your component contains children, those children won't actually be rendered. Instead the virtual DOM representation will contain references to unrendered child components.

- Allows us to test components in isolation, i.e. test parent components without worrying about children.
- Its fast because there isn't much interaction with the actual DOM.

Getting started with enzyme: 

```js
  import React from "react";
  import Custom from "../Custom";

  class Buzz extends React.Component {
    render() {
      return (
        <div>
          <Custom />
          <div className="fizz"> Lorem ipsum ... </div>
        </div>
      );
    }
  }
```

```js
  import React from "react";
  import { shallow } from "enzyme";
  import Buzz from "./Buzz";

  describe("Shallow render component", () => {
    it("asserts component is called at least once", () => {
      const wrapper = shallow(<Buzz />);
      expect(wrapper.find(Custom).length).toEqual(1);
      expect(wrapper.find(".fizz").length).toEqual(1);    
    }); 
  })
```

*Steps 1*: Shallow render a component


*Steps 2*: Traverse the shallow DOM searching for expected elements e.g. `div`, `li`, `a` ... tags

*Steps 3*: Use methods provided by enzyme wrapper to make assertions. Find methods in the enzyme [docs](http://airbnb.io/enzyme/docs/api/shallow.html#shallow-rendering-api).

### Jest

**Snapshot Testing**

Snapshots render a component and dumps it in a JSON file. This file is used to compare rendered component in the future. In this way, this test ensures that the component continues looking like the first iteration.

Snapshots are a convinient way to test display components. Display components just take in some input and display the data without much interaction with it.

These tests easily break but on the flip side are easy to update. Everytime you change the look of a certain component you could just flag an update of the snapshot.

Example snapshot: 

```js
  import React from "react";
  import { shallow } from "enzyme";
  import shallowToJSON from "enzyme-to-json";
  import Buzz from "./Buzz";
  
  describe("Shallow render component", () => {
    it("Buzz snapshot example", () => {
      const component = shallow(<Buzz />);
      const tree = shallowToJSON(component);
      expect(tree).toMatchSnapshot();
    }); 
  })
```

**Mocking**

Jest has its own mocking capability. This will come in handy when testing modules that depend on other modules.

You generate a Jest mock by:

```js
  const myMockFunc = jest.fn()
```

This mock function can be invocked as any other function, by default, it won't have a value.

```js
  console.log(myMockFunc) //undefined
```

Jest mock functions keep track of invocations. There are methods that you could use to inspect what happened when a component is rendered.

For example: 
You could check how many times a mock function was called.

```js
  const exampleFunction = jest.fn();
  console.log(exampleFunction.mock.calls.length); // 0

  exampleFunction("Buzz");
  console.log(exampleFunction.mock.calls.length); // 1

  exampleFunction("Fizz");
  console.log(exampleFunction.mock.calls.length); // 2
```

Jest also has a mock generator for entire modules. We do this by calling the following method:

```js
  jest.mock("./exampleModule");
```

It will look into the `exampleModule` and notice that, for example, exampleModule exports an object with a method called `fruits()`. It then creates a fake object with a fruits() method thats a mock function. This fake exampleModule is then used everywhere in the tests as opposed to the real exampleModule.

For further mock implementations go through Jest mocking [docs](https://facebook.github.io/jest/docs/en/mock-function-api.html#content).
