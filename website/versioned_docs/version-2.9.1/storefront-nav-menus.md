---
id: version-2.9.1-storefront-nav-menus
title: Build navigation menus
original_id: storefront-nav-menus
---

This article is part of the [Storefront UI Development Guide](./storefront-intro.md).
- Previous Task: [Build a product detail page](./storefront-product-detail-page.md)
- Next Task: [Add a way to add an item to a cart](./storefront-add-to-cart.md)

If you are building your storefront in the recommended order, at this point you have a product listing page and a product detail page. It's probably about time to add some navigation UI, a home page, and perhaps some additional pages.

You're free to add any additional pages you want using whatever method your router prescribes. A home page may be a specific view of a product list, multiple product lists, static content, or whatever your storefront design spec requires.

After you have created several types of pages, you're ready to add links to them in a navigation component. For a very simple storefront with few navigation links, you may want to design this as a static component. This may be easier in the short term, but remember that it will require a code change and redeployment every time navigation changes are needed.

Most storefronts require more complex and dynamic navigation menus. For this purpose, the Reaction operator UI allows those with proper permissions to build navigation menus and then publish them to one or more storefronts.

On the storefront UI side, you only need to query for the navigation menu that you want when initially loading the UI. Then use that data to dynamically build whatever menu design you need.

You can get the default navigation tree for a shop when you query the shop, which you'll likely want to do on initial UI load anyway, in order to get other shop details for display.

```graphql
fragment NavigationItemFields on NavigationItemData {
  contentForLanguage
  classNames
  url
  isUrlRelative
  shouldOpenInNewWindow
}

query shop($id: ID!, $language: String! = "en") {
  shop(id: $id) {
    defaultNavigationTree(language: $language) {
      items {
        navigationItem {
          data {
            ...NavigationItemFields
          }
        }
        items {
          navigationItem {
            data {
              ...NavigationItemFields
            }
          }
          items {
            navigationItem {
              data {
                ...NavigationItemFields
              }
            }
          }
        }
      }
    }
    description
    name
  }
}
```

As you can see, the response is a tree with up to three levels. Your component should support rendering all three levels of navigation unless you have made a business decision that you will only have a certain number of levels.

Each navigation item has the following information:
- `contentForLanguage`: Display this as the content the shopper sees, e.g., the name of the page the navigation item links to. It will be in whatever language you requested with the `language` variable to your query.
- `classNames`: Optionally set the `className` property of the navigation item element to this. Your organization may choose not to implement this. It is available as a convenience if you need it.
- `url`: Use this as the navigation item link URL
- `isUrlRelative`: This will be `true` or `false`. Use this to build your navigation item component's click handling logic. Relative URLs may need to be handled internally by your router while absolute URLs could be handled in the normal browser way.
- `shouldOpenInNewWindow`: This will be `true` or `false`. Use this to build your navigation item component's click handling logic. If this is `true`, typically you would add `target="_blank"` attribute or do the equivalent in code.

Next Task: [Add a way to add an item to a cart](./storefront-add-to-cart.md)
