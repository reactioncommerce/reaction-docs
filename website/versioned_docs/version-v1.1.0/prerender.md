---
original_id: prerender
id: version-v1.1.0-prerender
title: Prerender
---
    
Reaction uses [prerender](https://prerender.io/documentation) to serve cached prerendered versions of your pages to web crawlers. [prerender.io](http://prerender.io) offers a hosted service for this which is free for up to 250 pages. Prerender is open source software, if you do not want to use the hosted version of the service, you may set up your own prerender server. Reaction does not provide any support or documentation for self-hosted prerender servers.

## Usage

To enable prerender for your app set the following environment variables

```shell
PRERENDER_TOKEN: YOURTOKEN
PRERENDER_HOST: example.com
```

You can find your `PRERENDER_TOKEN` on your [prerender.io account page](https://prerender.io/account)

Your `PRERENDER_HOST` should be the domain your app is using (e.g. `example.com` or `www.example.com`)

## Customization

### Delaying capture of a page

[By default](https://prerender.io/documentation/best-practices) prerender attempts to determine when a page is done loading by counting requests in flight.
> We try our very best to detect when a page is done loading by counting the number of requests in flight and saving the page when the number of requests in flight reaches zero (after a slight delay). You can tell us when your pages are ready so that we can be more accurate.

If you need to set a page's readiness more specifically, you can use `window.prerenderReady`. We've done this on the [product grid](https://github.com/reactioncommerce/reaction/blob/development/imports/plugins/included/product-variant/client/templates/products/products.js) already and you can use that as an example if you need to set readiness for other templates.

For the product grid, we set `window.prerenderReady = false` at the top of our onCreated function and then in our autorun block, we wait until the products subscription is ready to set `window.prerenderReady = true`

```js
Template.products.onCreated(function () {
  // We're not ready to capture prerendered page until products have loaded
  window.prerenderReady = false;

  this.autorun(() => {
    const productsSubscription = this.subscribe("Products", scrollLimit, queryParams);

    // Once our products subscription is ready, we are ready to capture
    if (productsSubscription.ready()) {
      window.prerenderReady = true;
    }
  })
});
```

More details can be found in the [Prerender Best Practices Documentation](https://prerender.io/documentation/best-practices)

### Setting HTTP Status Codes

Prerender has a special meta tag that must be used to send a response other than `200` to the crawler.
For example, the meta tag to return a `404` to the crawler should look like this.

```html
<meta name="prerender-status-code" content="404">
```

We use the following pattern to insert this meta tag into the `notFound` template

```js
Template.notFound.onCreated(function () {
  document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", "<meta name='prerender-status-code' content='404'>");
});
```

We also insert this tag with a `403` status code whenever the `unauthorized` template is rendered.

More details can be found in the [Prerender Best Practices Documentation](https://prerender.io/documentation/best-practices)
