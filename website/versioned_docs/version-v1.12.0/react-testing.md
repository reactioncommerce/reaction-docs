---
id: version-v1.12.0-react-testing
title: Writing Jest Tests for React Components
original_id: react-testing
---
    
To render your component in Jest unit tests, use either [react-test-renderer](https://reactjs.org/docs/test-renderer.html) or [enzyme](http://airbnb.io/enzyme/index.html#enzyme). `react-test-renderer` is primarily for snapshots, while `enzyme` is for whenever you need to actually interact with the component, like simulate clicking it, feed it new props and see how it changes, etc. There is a good explanation of both of them [here](https://facebook.github.io/jest/docs/en/tutorial-react.html).

## What to Test

For every component we test **presentation** and expected **behaviour**. Assertions made include:

- Given a set of inputs (states OR props) assert what a component should output (render).

- Given a user action, assert how a component behaves
  - It might make a state update.
  - Call a prop function passed to it by a parent.

## Enzyme

**Shallow Rendering**

Enzyme has the capability to shallow render our components. When a component is shallow rendered it is rendered only one level deep. Also it does not render to the actual DOM, it maintains a virtual representation of the DOM. So if the render function of your component contains children, those children won't actually be rendered. Instead the virtual DOM representation will contain references to unrendered child components.

- Allows us to test components in isolation, i.e. test parent components without worrying about children.
- It's fast because there isn't much interaction with the actual DOM.

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

test("expect component is called at least once", () => {
  const wrapper = shallow(<Buzz />);
  expect(wrapper.find(Custom).length).toEqual(1);
  expect(wrapper.find(".fizz").length).toEqual(1);
});
```

_Steps 1_: Shallow render a component

_Steps 2_: Traverse the shallow DOM searching for expected elements e.g. `div`, `li`, `a` ... tags

_Steps 3_: Use methods provided by enzyme wrapper to make assertions. Find methods in the enzyme [docs](http://airbnb.io/enzyme/docs/api/shallow.html#shallow-rendering-api).

## Using Snapshots

Snapshots render a component to HTML, which is then stored in a JSON file that you commit to Git. This file is used to compare the rendered component when running tests again in the future. In this way, this test ensures that the component continues looking like the first iteration.

Snapshots are a convenient way to test display components. Display components just take in some input and display the data without much interaction with it.

These tests easily break but on the flip side are easy to update. Every time you change the look of a certain component you can update and commit the snapshot file after confirming that it is what you expect.

Example snapshot test:

```js
import React from "react";
import renderer from "react-test-renderer";
import Buzz from "./Buzz";

test("basic snapshot", () => {
  const component = renderer.create(<Buzz />);
  expect(component.toJSON()).toMatchSnapshot();
});
```
