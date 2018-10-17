---
id: swag-shop-6
title: Customizing the Product Detail Page
---

To customize the Product Detail Page (PDP), I had to add a static image to the layout and remove the breadcrumbs, basically I wanted to override the `render()` of `ProductDetail`. For this the easiest way is to create a custom `render` function and pass it in the props to `ProductDetail`. The code in almost all the components is written in such a way that if a `render` function is passes in the `props`, that function will be run instead of the default one.

Create the render function in a file, for example in `custom/components/ProductDetailCustom.js`, the code is in the format:

```javascript
export default {
  render() {
      // custom render code
  }
}
```
And this is passed to the `ProductDetail` component in `src/pages/products.js` like:

```javascript
import ProductDetailCustom from "custom/components/ProductDetailCustom";
render() {
    ....
    <ProductDetail
    ...
    render={ProductDetailCustom.render}
    />
}
```
To read more about this pattern follow https://reactjs.org/docs/render-props.html

A example of customization was that price had to displayed with title instead of with the ProductDetail. So in `ProductDetailCustom.render` we add

```javascript
<ProductDetailTitle pageTitle={product.pageTitle} title={product.title} priceRange={productPrice.displayPrice} render={ProductDetailTitleCustom.render}/>
<ProductDetailInfo
  description={product.description}
  vendor={product.vendor}
  render={ProductDetailInfoCustom.render}
/>
```

As you can see from the above code, `priceRange` is now passed to `ProductDetailTitle` instead of `ProductDetailTitleCustom`.
But we still have to display the `priceRange` in `ProductDetailTitle`, for this we again follow the above approach.
Create a file `ProductDetailTitleCustom` which exports a `render` function like:

```javascript
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default {
  render() {
    const { title, pageTitle, priceRange, classes } = this.props;

    // Render nothing if neither the title nor pageTitle exists
    if (!title && !pageTitle) return null;

    return (
      <Grid className={classes.root} item sm={12}>
        {title && <Typography className={classes.title} gutterBottom={true} variant="display2">{title}</Typography>}
        {pageTitle && <Typography className={classes.pageTitle} color="primary" component="h2" variant="title">{pageTitle}</Typography>}
        {priceRange && <Typography className={classes.priceRange} gutterBottom={true} variant="display2">{priceRange}</Typography>}
      </Grid>
    );
  }
}
```
In this the `render` function adds the code to display `priceRange`. Now this function is exported and passed to the `ProductDetailTitle` via `props`

The final thing left to do is to remove the code to display `priceRange` from `ProductDetailInfo`. This can be done in exactly the same way.
Create a file `ProductDetailInfoCustom` which exports `render()` which has exactly the same code as ProductDetailInfo's `render` except the component that displays the `priceRange`. Pass this `render` to the `props` of `ProductDetailInfo` as shown above.

Done!

The whole of PDP is customized in a similar way.