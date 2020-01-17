---
id: version-2.9.1-swag-shop-8
title: Creating the Featured Products component
original_id: swag-shop-8
---

To display our featured products block we can create a custom component called HomePageFeatured that just loops over the featured products. But how to we fill the component with data? We will create a new Higher Order Component that will drop the featured products data into our component. Let's start that now.

First let's create a `containers` directory in `custom` and in that directory let's create a `homepage` directory. In that directory let's create a `featured.gql` file. This is where our GraphQL query will placed.

To that file let's add this code:

```graphql
query featuredQuery($shopId: ID!) {
  featuredProductsByShop(shopId: $shopId) {
    nodes {
      _id
      ...on CatalogItemProduct {
        product {
          title,
          description,
          slug
          media {
            URLs {
              thumbnail
              small
            }
          }
        }
      }
    }
  }
}
```

So let's break this down a little bit. First we declared that we are creating a query and we gave it a name `featuredQuery`, and said that we take a shopId of type `ID` as our type. We will then call the server query called `featuredProductsByShop` with the `shopId` we were passed in.

Next we are declaring the 'shape' of our return type. Since we are getting a cursor we says we want nodes, we want the Id of the node and we want those nodes to be of type `CatalogItemProduct` and then we declare which fields of the `CatalogItemProduct` type we want. And that's it. You can see that query looks just like our test code above with just an additional wrapper around.

Now let's create our actual HOC which we will call `withFeatured.js`. That file will look something like this:

```javascript
import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import featuredQuery from "./featured.gql";


export default (Component) => (
  class WithFeatured extends React.Component {
    static propTypes = {
      shopId: PropTypes.string
    }

    render() {
      const { shop: { _id: shopId } } = this.props; // Or primaryShopId

      if (!shopId) {
        return <Component {...this.props} shouldSkipGraphQL />
      }

      return (
        <Query query={featuredQuery} variables={{ shopId }}>
          {({ error, data, loading }) => {
            if (error) {
              console.log(error)
            }
            if (!loading && data) {
              const { featuredProductsByShop } = data;

              return (
                <Component
                  {...this.props}
                  featuredProducts={featuredProductsByShop.nodes}
                />
              );
            }
            return <Component {...this.props} isLoadingFeatured/>
          }}
        </Query>
      );
    }
  }
);

```

This is a Component that will wrap our display components which is why we take in the argument `Component`. We are also going to wrap our component in an HOC called `withShop` so we will be getting the `shopID` of the current shop. And then we use the `Query` component from the `react-apollo` library to wrap our passed-in component and then we can pass in `featuredProducts`. So the snipped where we do the actual wrapping looks something like this

```javascript
export default compose(
  withShop,
  withFeatured,
  withStyles(styles)
)(HomePageFeatured);
```

We have `HomePageFeatured` which is our presentation component wrapped by `withStyles` then wrapped by `withFeatured` and then wrapped by `withShop`. We can then write our presentation component accepting an array of product objects passed in as the `featuredProducts` prop.

So a simple version of a featured product component might look something like this:

```javascript
@withStyles(styles, { name: "HomePageFeatured" })
class HomePageFeatured extends Component {
  render() {

    const { classes, featuredProducts } = this.props;
    return (
      <div className={classes.root}>
        <div>HomePage Featured</div>
        {!!featuredProducts && featuredProducts.map((product) => {
          return (
            <div className="featured-product-box" key={product.product.slug} style={{ border: "1px solid black", width: "350px" }}>
              <div className="featured-product-title"><a href={`/product/${product.product.slug}`}>{product.product.title}</a></div>
              </div>
            </div>
          )}
        )}

      </div>
    );
  }
}
```

While this is a deliberately simple example, you can see how you can easily take data from any source on the server side and easily pass it down to the client side without having to have any understanding of where it came from or its original data structure.

With that you should have a working `Featured Products` section of the home page that you can edit by just editing the tags on individual products.


Congratulations. You can completed the Swag Shop Tutorial 🎉