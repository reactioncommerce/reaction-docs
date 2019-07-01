---
id: swag-shop-3
title: Custom Styling
---

## Styling a existing component

All the CSS styles can be added directly in `lib/reactionTheme.js` file. The Example Storefront uses a combination of [JSS](http://cssinjs.org/) with [Material-UI](https://material-ui.com/) and [Styled Components](http://styled-components.com/) for CSS in React components.

For example, to style the Header component:

1. Open the Header component at `/src/components/Header/Header.js` and take note of the `name` of the Component passes to `withStyle`. Here it is "Header" as is evident from the line `@withStyles(styles, { name: "Header" })`
2. Open `src/custom/reactionTheme.js` and in the object being passed to `createMuiTheme` add a property `overrides` in the following way:
  ```javascript
  const theme = createMuiTheme({
    overrides: {
      Header: {
        title: {
          color: "black",
          textTransform: "uppercase",
          borderBottom: "2px"
        }
      },
      layout: {.....},
      .....
    }
  ```
3. Refresh the webpage for the changes to load.

## Styling a new component

Either you can follow the above approach of naming the component and writing the styles in the `lib/reactionTheme.js` file. Or you can write the styling code within the component. 

For example, we wrote the following `component(HomePageStaticText)`, to display static text on the homepage:

1. In the component file, define a style object like:
```javascript
const styles = (theme) => ({
  root: {
    textAlign: "center",
    marginBottom: 70
  },
  heading: {
    fontSize: 25
  },
  text: {
    fontSize: 28
  }
});
```
2. Add a `@withStyle` notation to the component class and pass the style object to it like: `@withStyles(styles, { name: "HomePageStaticText" })`
3. Now assign classes to the sub-components in the `render()` like:
```javascript
render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1 className={classes.heading}>#MADEINTHESUNSHINE</h1>
        <p className={classes.text}>There is no one who loves pain itself, wants to have it, simply because it is pain...</p>
        <p className={classes.text}>There is no one who loves pain itself</p>
      </div>
    );
}
```
