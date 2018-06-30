---
id: version-v1.4.1-components
title: Components
original_id: components
---
    
Reaction UI components using Blaze and React.

## Component StyleGuide

Below is a basic example of how a component should look. Components should be reusable without any dependencies on Meteor, database, session, trackers, composeWithTracker or redux connect if possible. There are a few exceptions, however, fetching from the database is best served from a higher order component.

```js
import React, { Component } from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
  // Default props, (optional)
  // Do not include, if you do not need
  static defaultProps = {
    someDefaultProp: true
  }

  // Prop types, (required)
  static propTypes = {
    someProp: PropTypes.any // Do not use `any`, unless it really is `any` type
  }

  // All callbacks should use arrow function instead of `.bind(this)`
  handleChange = () => {}

  // Additional and / or conditional rendering should be split up if it is
  // significant or helps with readability
  renderSomethingElse() {
    return (
      <span>{"Hello"}</span>
    )
  }

  render() {
    return (
      <div onClick={this.handleChange}>
        {this.renderSomethingElse()}
      </div>
    );
  }
}

export default MyComponent;
```
