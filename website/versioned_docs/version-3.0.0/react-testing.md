---
id: version-3.0.0-react-testing
title: Writing Jest Tests for React Components
original_id: react-testing
---

To render your component in Jest unit tests, use either [react-test-renderer](https://reactjs.org/docs/test-renderer.html) or [enzyme](http://airbnb.io/enzyme/index.html#enzyme). `react-test-renderer` is primarily for snapshots, while `enzyme` is for whenever you need to actually interact with the component, like simulate clicking it, feed it new props and see how it changes, etc. There is a good explanation of both of them [here](https://facebook.github.io/jest/docs/en/tutorial-react.html).

## What to Test

For every component we test **presentation** and expected **behaviour**. Assertions made include:

- Given a set of inputs, states OR props, assert what a component should output (render).

- Given a user action, assert how a component behaves:
  - It might make a state update.
  - Call a prop function passed to it by a parent.

## Enzyme

**Shallow Rendering**

Enzyme has the capability to shallow render our components. When a component is shallow rendered, it is rendered only one level deep. Also, it does not render to the actual DOM, it maintains a virtual representation of the DOM. So if the render function of your component contains children, those children won't actually be rendered. Instead the virtual DOM representation will contain references to unrendered child components.

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

1. Shallow render a component

2. Traverse the shallow DOM searching for expected elements e.g. `div`, `li`, `a` ... tags

3. Use methods provided by enzyme wrapper to make assertions. Find methods in the enzyme [docs](http://airbnb.io/enzyme/docs/api/shallow.html#shallow-rendering-api).

## Using Snapshots

Snapshots render a component to HTML, which is then stored in a JSON file that you commit to Git. This file is used to compare the rendered component when running tests again in the future. In this way, this test ensures that the component continues looking like the first iteration.

Snapshots are a convenient way to test display components. Display components just take in some input and display the data without much interaction with it.

These tests easily break but on the flip-side, are easy to update. Every time you change the look of a certain component you can update and commit the snapshot file after confirming that it is what you expect.

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

Run `yarn run test` with flag `-u` to automatically update snapshots, after you have changed the way the component renders.

## Best practices

### Testing component props with snapshots

When testing a React component, we break props into two main groups, “required” and “optional”. In general, we always do a simple snapshot test of the component with only required props.

**Required props example**

```js
import React from "react";
import renderer from "react-test-renderer";
import Fizz from “./Fizz”;

test("basic snapshot", () => {
  const component = renderer.create(<Fizz requiredProp=”is required” />);
  expect(component.toJSON()).toMatchSnapshot();
});
```

Many components will required props that are directly provided by a [Higher Order Component](https://reactjs.org/docs/higher-order-components.html) (HOC) or via a context provider like [MobX](https://github.com/mobxjs/mobx) or [Apollo Client](https://www.apollographql.com/docs/react/). In these cases we create a mock context object and pass it to the component as a prop. Several complex context structers have been mocked out as a testing utility:
  *  [mockComponents](https://github.com/reactioncommerce/reaction-component-library/blob/master/package/src/tests/mockComponents.js) context.
  *  [Products](https://github.com/reactioncommerce/example-storefront/blob/develop/src/components/ProductGrid/__mocks__/products.mock.js) query results.
  *  [Product](https://github.com/reactioncommerce/example-storefront/blob/develop/src/components/ProductDetail/__mocks__/productData.mock.js) query results.
  *  [Variant](https://github.com/reactioncommerce/example-storefront/blob/develop/src/components/VariantItem/__mocks__/variant.mock.js) query results.
  *  [Options](https://github.com/reactioncommerce/example-storefront/blob/develop/src/components/ProductDetailOptionsList/__mocks__/options.mock.js) query results.
  *  [Option](https://github.com/reactioncommerce/example-storefront/blob/develop/src/components/ProductDetailOption/__mocks__/option.mock.js) query results.

**Required context/HOC props example**

```js
import React from "react";
import renderer from "react-test-renderer";
Iimport Fizz from “./Fizz”;
const mockContext = {
  contextProp: true
};

test("basic snapshot", () => {
  const component = renderer.create(<Fizz requiredProp=”required” requiredContext={mockContext} />);
  expect(component.toJSON()).toMatchSnapshot();
});
```

Followed by another snapshot test of the component with all of the optional props. Sometimes optional props can’t be used together if that's the case break this snapshot test into several and test like props in groups.

**Optional props example**
```js
import React from "react";
import renderer from "react-test-renderer";
import Fizz from “./Fizz”;

test("basic snapshot with all optional props", () => {
  const component = renderer.create(<Fizz
      requiredProp=”required”
      someProp=”optional prop”
      anotherProp=”optional prop”
      optionalBool
    />);
  expect(component.toJSON()).toMatchSnapshot();
});
```

Individual props can have a dramatic impact on the markup that gets rendered, these types of props should have their own dedicated snapshot test.

```js
import React from "react";
import renderer from "react-test-renderer";
import Fizz from “./Fizz”;

test("basic snapshot with isVertical props", () => {
  const component = renderer.create(<Fizz requiredProp=”required” isVertical />);
  expect(component.toJSON()).toMatchSnapshot();
});
```

### Testing component interactions and events

It's common for components to have functionality based around user interaction that will usually fire a callback function or manipulate component state in some way.

We can test these interaction using shallow rendering form Enzyme to simulate the interaction event and test for the components reaction.

**Simple interaction example**
```js
import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";

const mockHandleClick = jest.fn();

test("Button component fires callback function onClick", () => {
  const component = shallow(<Button onClick={mockHandleClick}>Button</Button>);
  component.find("button").simulate("click");
  expect(mockHandleClick).toHaveBeenCalled();
});
```

**Interaction with state change example**
```js
import React from "react";
import { shallow } from "enzyme";
import Accordion from "./Accordion";

test("Accordion component open & closes onClick", () => {
  const component = shallow(<Accordion>Content</Accordion>);
  component.find("div.header").simulate("click");
  expect(component.state().isExpanded).toBe(true);
  component.find("div.header").simulate("click");
  expect(component.state().isExpanded).toBe(false);
});
```

### Testing Form components

All new Reaction form & input components are based on the [composable form spec](http://composableforms.com/) and uses the [composable form test](https://github.com/DairyStateDesigns/composable-form-tests#readme) package to user interaction.

**Simple Input test example**
```js
import React from "react";
import { mount } from "enzyme";
import { testInput } from "composable-form-tests";
import Input from "./Input";

testInput({
  component: Input,
  defaultValue: null,
  exampleValueOne: "ONE",
  exampleValueTwo: "TWO",
  mount,
  simulateChanging(wrapper, value) {
    // Refer to Enzyme documentation
    wrapper.find("input").simulate("change", { target: { value } });
  },
  simulateChanged(wrapper, value) {
    // Refer to Enzyme documentation
    wrapper.find("input").simulate("blur", { target: { value } });
  },
  simulateSubmit(wrapper) {
    // Refer to Enzyme documentation
    wrapper.find("input").simulate("keypress", { which: 13 });
  }
});
```
