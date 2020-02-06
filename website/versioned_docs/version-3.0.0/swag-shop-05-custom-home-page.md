---
id: version-3.0.0-swag-shop-5
title: Adding a custom homepage
original_id: swag-shop-5
---

By default, the home page for the starter-kit just shows a grid of products, but some people will probably want some custom content. So let's create a new component in the `custom` directory with just some placeholder text for now. So it would look something like this:

```javascript
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


const styles = (theme) => ({
  homepage: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing.unit * 2
  }
});

const HomePage = () => (
  <Typography variant="caption">
    <div className="homepage">
        <p>This is out placeholder text</p>
    </div>
  </Typography>
);

HomePage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HomePage);
```

You can see we wrapped this with the `withStyles` higher-order component (HOC), so that our styling takes place and with the `<Typography>` wrapper component for consistent typography. This helps make sure that any global styling is also applied to our `HomePage` content.

In addition to this new component, we need to create a new "page" in the `src/pages` directory. Let's call this new file `home.js`

```javascript
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
import HomePage from "custom/components/HomePage";

@inject("routingStore")
@observer
class Home extends Component {
  static propTypes = {
    routingStore: PropTypes.object,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    })
  };


  render() {
    const { shop } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{shop && shop.name}</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
        <HomePage />
      </Fragment>
    );
  }
}

export default Home;
```

This page just wraps our `HomePage` component and applies any site `Metadata` through the `Helmet` helper. Passing in `shop` here allows us to add any dynamic components (most of which will rely on knowing the `shopId` as we will see when we get into adding custom GraphQL components).

The last change we need is to make a change to our routes which is done in `src/routes.js`. Just change the entry for the `/` route to be to our home page. We provide "route-name", "path", and the name of the file in `src/pages` that it should point to.

```javascript
const routes = require("next-routes")();

routes
  .add("home", "/", "home")
  .add("cart", "/cart", "cart")
  .add("checkout", "/cart/checkout", "checkout")
  .add("checkoutLogin", "/cart/login", "checkout")
  .add("checkoutComplete", "/checkout/order/:orderId", "checkoutComplete")
  .add("login", "/login", "login")
  .add("shopProduct", "/shop/:shopSlug/product/:slugOrId", "product")
  .add("product", "/product/:slugOrId/:variantId?", "product")
  .add("shop", "/shop/:shopId/:tag", "productGrid")
  .add("tag", "/tag/:slug", "tag");

module.exports = routes;
```

With this last change, if you visit the home page you should now see your placeholder text. In the finished tutorial files you can see how we've used this component to import all of the other components into our homepage, making the layout of this very clean and modular.
ame="homepage">
        <p>This is out placeholder text</p>
    </div>
  </Typography>
);

HomePage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HomePage);

```

You can see we wrapped this with the `withStyles` HOC so that our styling takes place and with the `<Typography>` wrapper component for consistent typography. This helps make sure that any global styling is also applied to our HomePage content.

In addition to this new component we need to create a new "page" in the `src/pages` directory. Let's call this new file `home.js`

```javascript
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";
import HomePage from "custom/components/HomePage";

@inject("routingStore")
@observer
class Home extends Component {
  static propTypes = {
    routingStore: PropTypes.object,
    shop: PropTypes.shape({
      currency: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    })
  };


  render() {
    const { shop } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{shop && shop.name}</title>
          <meta name="description" content={shop && shop.description} />
        </Helmet>
        <HomePage />
      </Fragment>
    );
  }
}

export default Home;
```

This page just wraps our `HomePage` component and applies any site Metadata through the `Helmet` helper. Passing in `shop` here allows us to add any dynamic components (most of which will rely on knowing the `shopId` as we will see when we get into adding custom GraphQL components).

The last change we need is to make a change to our routes which is done in `src/custom/routes.js`. Just change the entry for the `/` route to be to our home page. We provide "route-name", "path", and the name of the file in `src/pages` that it should point to.

```javascript
const routes = require("next-routes")();

routes
  .add("home", "/", "home")
  .add("cart", "/cart", "cart")
  .add("checkout", "/cart/checkout", "checkout")
  .add("checkoutLogin", "/cart/login", "checkout")
  .add("checkoutComplete", "/checkout/order/:orderId", "checkoutComplete")
  .add("login", "/login", "login")
  .add("shopProduct", "/shop/:shopSlug/product/:slugOrId", "product")
  .add("product", "/product/:slugOrId/:variantId?", "product")
  .add("shop", "/shop/:shopId/:tag", "productGrid")
  .add("tag", "/tag/:slug", "tag");

module.exports = routes;
```

With this last change, if you visit the home page you should now see your placeholder text. In the finished tutorial files you can see how we've used this component to import all of the other components into our homepage, making the layout of this very clean and modular.
