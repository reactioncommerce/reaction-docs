---
id: version-2.9.1-storefront-product-listing-page
title: Build a product listing page
original_id: storefront-product-listing-page
---

This article is part of the [Storefront UI Development Guide](./storefront-intro.md).
- Previous Task: [Add and configure Apollo Client](./storefront-apollo-client.md)
- Next Task: [Build a product detail page](./storefront-product-detail-page.md)

Product listing pages can vary among storefronts, but we'll focus on the one thing they all do: query the catalog for products with pagination.

Using the Apollo Client reactive querying mechanism for your UI framework (e.g., a React `Query` component), start with the following GraphQL query to get the data for a product list:

```graphql
query catalogItemsQuery($shopId: ID!, $first: ConnectionLimitInt, $last:  ConnectionLimitInt, $before: ConnectionCursor, $after: ConnectionCursor, $sortBy: CatalogItemSortByField, $sortByPriceCurrencyCode: String, $sortOrder: SortOrder) {
  catalogItems(shopIds: [$shopId], first: $first, last: $last, before: $before, after: $after, sortBy: $sortBy, sortByPriceCurrencyCode: $sortByPriceCurrencyCode, sortOrder: $sortOrder) {
    totalCount
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
        _id
        ... on CatalogItemProduct {
          product {
            _id
            title
            slug
            description
            vendor
            pricing {
              compareAtPrice {
                displayAmount
              }
              displayPrice
            }
            primaryImage {
              URLs {
                small
              }
            }
          }
        }
      }
    }
  }
}
```

Use the variables below to start. As you add more features, such as sort and limit selectors and filters, you can dynamically generate the variables object based on UI state.

```
const variables = {
  shopId: "shop_id_here",
  sortBy: "created_at",
  sortOrder: "desc"
};
```

> We assume that you know your external shop ID. You should store it in your UI app config, or for a multi-shop UI, get it from the URL. If you are stuck, try the `{ primaryShopId }` query in GraphQL Playground to get the primary shop ID, which should work for initial development purposes.

> While we use the word "page" here for simplicity, we recommend designing your product list component so that it works well when there are multiple lists on a page. Often times a home page or a custom feature page will want to display multiple product lists, potentially each with their own pagination, on a single page.

## Add pagination

If you have read [Using the GraphQL API](./graphql-using.md) and the linked resources, you should be familiar with how pagination works in general. Here's a specific example of how to paginate the `catalogItemsQuery` for a product list page.

First, you're going to want a place in application state where your list paging and sorting is saved. For a web app, that's almost always going to be in the URL. That way, visiting a shared URL will show the same page of the list. We'll leave the state details up to you, but assuming you have a reactive way of obtaining URL state variables, a React query would look something like this:

```js
render() {
  const { shopId } = appConfig;

  const variables = {
    shopId,
    ...getPaginationVariablesFromUrl()
  };

  return (
    <Query errorPolicy="all" query={catalogItemsQuery} variables={variables}>
      {({ data, fetchMore, loading }) => {
        const { catalogItems } = data || {};

        const refetchCatalogItems = () => {
          fetchMore({
            variables: getPaginationVariablesFromUrl(),
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const { [queryName]: items } = fetchMoreResult;

              // Return with additional results
              if (items.edges.length) {
                return fetchMoreResult;
              }

              // Send the previous result if the new result contains no additional data
              return previousResult;
            }
          });
        };

        return (
          <YourCustomListComponent
            catalogItems={catalogItems}
            isLoadingCatalogItems={loading}
            refetchCatalogItems={refetchCatalogItems}
          />
        );
      }}
    </Query>
  );
}
```

`getPaginationVariablesFromUrl` is a function that you would write, which will return `{ first, last, after, before, sortBy, sortOrder }` from some reactive state.

`YourCustomListComponent` would have either previous/next buttons or infinite scrolling, as well as "sort by" and "sort order" select lists, that would properly change the reactive state (e.g., update the URL query string) and then call `refetchCatalogItems`.

Next Task: [Build a product detail page](./storefront-product-detail-page.md)
