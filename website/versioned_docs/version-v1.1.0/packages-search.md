---
original_id: packages-search
id: version-v1.1.0-packages-search
title: Search
---
    
Search is an important part of any ecommerce solution as studies have found that
40-50% of users will completely bypass traditional navigation and head straight
to search.

In addition to being critical, Search is rarely the same for every merchant. How
you organize, categorize, and market your products will affect how you want
search to behave. So we have tried to create an search package that is customizable,
expandable, and ultimately replaceable.

## Decoupled Interface

One of the things we tried to do was ensure that you could replace one part
of the search interface with another without having to rewrite all of it. To do so
we broke the search down into a back-end and front-end component each of which
can be replaced with another that uses the same interface. This was accomplished
by using a publication to communicate between these two packages.

The `search-mongo` package creates a `SearchResult` publication that can be consumed
by any front-end, but by default is consumed by the `ui-search` package. But any
back-end that creates this same publication will be utilized by the front-end package.

## search-mongo plugin

This package implements the server-side elements of search. This package was a
compromise between more sophisticated engines like Elastic Search that require
more maintenance and setup and trying to create a package that will meet the needs
of most developers.

This package tries to provide a comprehensive product search, while also providing a
relatively simple search API for orders and accounts.

For product search this package leverages Mongo's own built-in [full-text search](https://docs.mongodb.com/manual/reference/operator/query/text/)
capabilities which provides more intelligent matching algorithms than just plain text searches and
gives a "weight" based on the quality of the match. It also allows admins to customize
which fields they include and what ranking they are given through the admin
interface.

In addition it will create dedicated search collections which allows the search
to operate only on a subset of fields and records. This allows for quick
searches even on large product recordsets. In our own testing we were able to search
a product database of more than 50k records and still get <20ms response times. Developers
who customize the Product database can add fields here without too much extra code. Simply
adding them to the settings should work in most cases (in addition you can add
transformations, see below). Every effort was made to not hardcode these fields into
the collection maintenance method.

Creating and maintaining these search collections is all handled automatically
in the background using Job Queues and hooks. In some cases changing the configuration
of the Product search may require rebuilding it, but this is also handled automatically
in the background.

The OrderSearch and AccountSearch collections are similar indexes of this data,
however the search function is simpler. The Order search looks up orders by
ID, email address, phone, or billing/shipping name. The Account search looks up accounts by
phone, email, or first or last name.

Account search is restricted to users who have the `reaction-accounts` permission. Order
search is restricted to users to users with `order` permissions. Users who don't
have these rights will not be able to search and will not see the options available in the
search box.

### Transformations

This is something that will be expanded on later, but this allows you to write
functions that will transform a particular field to make it work better for search.
A common transform will be to "flatten-out" some fields that are deeply nested
in the database to make them work with search, but anything you can put in a function
can be added here without touching the core code, hopefully making upgrading easier
in the future.

## ui-search plugin

The `ui-search` package implements the client-side elements of search - a UI interface, and a subscription to the SearchResults publication created by the search-mongo package.

To subscribe to the SearchResults publication, you must provide the collection you wish to search, the search term (`searchQuery`), and optionally the `facets` you wish to filter by.

Typing in the input field updates the search term by changing the `searchQuery` variable. Updates are sent on every keypress.

Aside from the search icon in Reaction's default navigation bar, all of search is contained inside a full-screen modal window, which appears on-click of the referenced search icon.

### Product Search

By default, product search will search `Title`, `Description`, `Details` and `Vendor`. These options can be changed in the `Search Settings` dashboard.

Clicking on a tag adds that tags `_id` into an array, referred to in the code as `facets`. Clicking a second time removes the tag from the array.

`this.subscribe("SearchResults", "products", searchQuery, facets);`

Search is performed in a keyword and filter manner: users will use the traditional input field to search for a keyword, and once results are found, they will be displayed, with all tags associated with the returned products displayed directly below the input.

Clicking a tag will filter the results, returning results that both 1) meet the initial keyword and 2) have the associated tag attached. The more tags clicked, the more filters applied, and (most likely) the fewer the results shown.

![Search](/assets/developer-search-ui.png)

The product UI purposely mimics our existing product-grid templates. CSS class names are identical to those in our product-grid, however all styling is applied completely separate from the traditional product-grid, using the LESS inside of `/imports/plugins/included/default-theme/client/styles/search/results.less`, which is wrapped in an encompassing `.search-modal` wrapper. Changing any styling on the traditional product-grid should not affect the search grid, and vice versa.

### Account Search

Account search will search by `Name`, `Phone`, and `Email`. Clicking on `Manage` will close the search modal and redirect to the dashboards `Account` settings for that particular user.

### Order Search

Order search will search by `Order ID`, `Name`, and `Email`. Clicking on the order ID will close the search modal and redirect to the dashboards `Orders` panel for that particular order.

#### Sortable Table

The Account and Order search results both display in a sortable table, which is a React component wrapped around an npm module called `Taco Table`. We've tried to keep Taco Table as minimalistic as possible, however it is easily expandable. You can find docs in their [GitHub Repo](https://github.com/pbeshai/react-taco-table).
