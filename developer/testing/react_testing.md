# Testing React Components

## Description

Reaction has testing set up for react components. Frameworks in place for these tests are:
  - [jest](https://facebook.github.io/jest/)
  - [enzyme](http://airbnb.io/enzyme/index.html#enzyme)
  
The purpose of this section is to showcase how to write a few tests for components using the frameworks mentioned above.

## Unit Testing

For every component we test **presentaion** and expected **behaviour**.
Assertions made include:
  - Given a set of inputs (states OR props) assert what a component should output (render).
  - Given a user action, assert how a component behaves:
      - It might make a state update.
      - Call a prop function passed to it by a parent.

### Enzyme

**Shallow Rendering**

Enzyme has the capability to shallow render our components. When a component is shallow rendered it is rendered only one level deep. Also it does not render to the actual DOM, it maintains a virtual representation of the DOM. So if the render function of your component contains children, those children wont actually be rendered. Instead the virtual DOM representation will contain references to unrendered child components.

- Allows us to test components in isolation, i.e. test parent components without worrying about children.
- Its fast because there isn't much interaction with the actual DOM.

Getting started with enzyme: 

```
import React from "react";
import { shallow } from "enzyme";

describe("Shallow render component", () => {
  it("asserts component is called at least once", () => {
    const component = shallow(
      <OrderSummary
        dateFormat={dateFormat}
        tracking={tracking}
        profileShippingAddress={profileShippingAddress}
        shipmentStatus={shipmentStatus}
        printableLabels={printableLabels}
        order={order}
      />
    );
  }); 
})
```

### Jest

**Snapshot Testing**

Snapshots render a component and dumps it in a JSON file. This file is used to compare rendered component in the future. In this way, this test ensures that the component continues looking like the first iteration.

Snapshots are a convinient way to test display components. Display components just take in some input and display the data without much interaction with it.

These tests easily break but on the flip side are easy to update. Everytime you change the look of a certain component you could just flag an update of the snapshot.

Example snapshot: 

```
  const component = shallow(
    <OrderSummary
      dateFormat={dateFormat}
      tracking={tracking}
      profileShippingAddress={profileShippingAddress}
      shipmentStatus={shipmentStatus}
      printableLabels={printableLabels}
      order={order}
    />
  );

  const tree = shallowToJSON(component);
  expect(tree).toMatchSnapshot();
```
