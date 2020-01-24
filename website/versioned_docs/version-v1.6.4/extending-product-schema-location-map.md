---
id: version-v1.6.4-extending-product-schema-location-map
title: Extending the product schema for Google map
original_id: extending-product-schema-location-map
---

## Step 1: Extending the product schema with longitude and latitude
Because our products should be geotagged, we need to extend each product with two new fields for latitude and longitude. We like to keep all existing product properties from the original schema called `Product` intact. This is why we import the original schema and use it as base schema for the new, extended schema called `ExtendedSchema`. After extending, we make sure that our new schema is attached to the Products collection. To overwrite the schema already bound to the collection, we pass the parameter `replace: true`. Also notice the `selector` option, which is explained [here, section multiple-schemas](https://docs.reactioncommerce.com/reaction-docs/trunk/simple-schema)

**[/imports/plugins/custom/beesknees/server/init.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/server/init.js)**
```js
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Product } from "/lib/collections/schemas";
import { registerSchema } from "/imports/plugins/core/collections/lib/registerSchema";

function extendProductSchema() {
  Logger.info("::: Add location coordinates to simple product schema");
  const ExtendedSchema = new SimpleSchema([Product,
    {
      lat: {
        optional: true,
        type: Number,
        decimal: true
      },
      lng: {
        optional: true,
        type: Number,
        decimal: true
      }
    }
  ]);
  Products.attachSchema(ExtendedSchema, { replace: true, selector: { type: "simple" } });
  registerSchema("Product", ExtendedSchema);
}
```
The important thing about the Products collection is, that its documents don't share the same schema. There are so-called `simple` products and product `variants`. We're going to modify the simple product type, which happens to be an ancestor for variant types as well, so regardless of the flavour of our product, all variants will feature the geo tagging.


Now that we have the new fields on our products, we're going to populate them. We will do that programmatically during application startup for the sake of easiness:
**[/imports/plugins/custom/beesknees/server/init.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/server/init.js)**
```js
function setProductLocation() {
  Logger.info("::: Set location to product 'Basic Reaction product'");
  Products.update({ title: "Basic Reaction Product" }, {
    $set: {
      lat: 34.0059084,
      lng: -118.4903684
    }
  }, {
    publish: true,
    selector: {
      type: "simple"
    }
  });
}
```

Notice that the update operation to add latitude and longitude to the product needs to know which schema are going to be validated. This is done through parameter `selector`. Additionally we need to pass `publish: true` to ensure the internal RevisionAPI allows modification of the document.

## Step 2: Modify the layout of product detail page to show location coordinates

Now that we know where our products are located, let's enhance the existing layout of the product detail page (PDP) to display the coordinates in a Google map. For our example we're going to swap the section with the product metadata for the map.

**[/imports/plugins/custom/beesknees/server/init.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/server/init.js)**
```js
import ProductDetailPageSimpleLayout from "/imports/plugins/included/product-detail-simple/lib/layout/simple";

function changeProductDetailPageLayout() {
  Logger.info("::: changing layouts of product detail page");
  // Customize default productDetailSimple page's layout
  const customPdpLayout = _.cloneDeep(ProductDetailPageSimpleLayout());
  customPdpLayout.forEach((item) => {
    if (item.children) {
      for (const child of item.children) {
        if (child.component === "ProductMetadata") {
          // Replace product metadata with our Google Maps component
          child.component = "AvailabilityMap";
        }
      }
    }
  });
```

`ProductDetailPageSimpleLayout` allows us to define how the PDP should look like in a declarative way. You may have a look into it [here](https://github.com/reactioncommerce/reaction/blob/v1.6.4/imports/plugins/included/product-detail-simple/lib/layout/simple.js).

After we've changed the generic structure and specified that we'd want to render a React component called `AvailabilityMap` rather than the original `ProductMetadata`, we need to re-register the changed layout definition with the original name `productDetailSimple`.

**[/imports/plugins/custom/beesknees/server/init.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/server/init.js)**

```js
import { registerSchema } from "/imports/plugins/core/collections/lib/registerSchema";

Reaction.registerTemplate({
  name: "productDetailSimple",
  title: "Product Detail Simple Layout",
  type: "react",
  templateFor: ["pdp"],
  permissions: ["admin", "owner"],
  audience: ["anonymous", "guest"],
  template: customPdpLayout
});
```

## Step 3: Create the AvailabilityMap React component

The next step is to crate a new React component which is going to render the Google map.
**[/imports/plugins/custom/beesknees/client/components/availabilityMap.js](https://github.com/reactioncommerce/reaction-example-plugin/blob/master/client/components/availabilityMap.js)**
```js
import React from "react";
import PropTypes from "prop-types";
import { DocHead } from "meteor/kadira:dochead";
import { i18next } from "/client/api";

class AvailabilityMap extends React.Component {
  static propTypes = {
   trackingId: PropTypes.string.isRequired
 };

 renderMap() {
   // eslint-disable-next-line no-undef, no-new
   const googleMap = new google.maps.Map(this.refs.map, {
     center: {
       lat: this.props.product.lat,
       lng: this.props.product.lng
     },
     zoom: 13
   });

   // eslint-disable-next-line no-undef, no-new
   new google.maps.Marker({
     position: {
       lat: this.props.product.lat,
       lng: this.props.product.lng
     },
     map: googleMap,
     title: i18next.t("buyHere", "Buy here!")
   });
 }

 componentDidMount() {
   if (this.props.trackingId) {
     if ($("#mapsHead").length === 0) {
       const url = `https://maps.googleapis.com/maps/api/js?key=${this.props.trackingId}`;
       DocHead.loadScript(url, { attrs: { id: "mapsHead" } }, () => {
         this.renderMap();
       });
     } else {
       this.renderMap();
     }
   }
 }

 render() {
   return (
     <div>
       <h3>{i18next.t("availableLocations", "Available at the following stores")}</h3>
       <div className="map" ref="map" />
     </div>
   );
 }
}

export default AvailabilityMap;
```

Great. This React component will inject the JavaScript we need and render the marker according our new product coordinates. One nice thing to notice is the fact, that ReactionCommerce's internal machinery will call our React component with appropriate context, namely the product itself. Therefor we get the React property `this.props.product` for free, which essentially is our document from database that features `lng` and `lat` information. What isn't provided out-of-the-box is the `trackingId` property needed for Google maps inclusion. This is your personal Google API key that is available from [developer.google.com](https://developers.google.com/maps/documentation/javascript/get-api-key). We're going to store that in our settings file in /settings/dev.settings.json:

** [/settings/dev.settings.json](https://github.com/reactioncommerce/reaction/blob/v1.6.4/settings/dev.settings.json)**
```json
{
  "ROOT_URL": "",
  "MAIL_URL": "",
  "reaction": {
    "REACTION_USER": "",
    "REACTION_AUTH": "",
    "REACTION_EMAIL": ""
  },
  "REACTION_LOG_LEVEL": "info",
  "public": {
    "GOOGLE_MAPS_API_KEY": "YOUR_API_KEY"
  }
}

```

Now having that at hand through Meteor.settings variable, we now need to think about how we can pass that as property into the component. Just using it within the React component itself is not ideal, because for one thing the React component should be self-contained with no external dependencies. This ensures that we can use the component in an environment-agnostic way (be it React Native or the server). And the second thing to know is that Meteor.settings is a reactive data source which may not be synced to client yet, when the component is going to be rendered.
This is a very common scenario and luckily our friend called `composer` jumps in. The composer is a higher-order function that has no other intend as to feed in data into our React components. Let's build one!

## Step 4: Shovel data into our component

**[/imports/plugins/custom/beesknees/client/container/availabilityMap.js(https://github.com/reactioncommerce/reaction-example-plugin/blob/master/client/container/availabilityMap.js)**

```js
import { Meteor } from "meteor/meteor";
import { composeWithTracker, registerComponent } from "/imports/plugins/core/components/lib";
import AvailabilityMap from "../components/availabilityMap";
import { i18nextDep } from  "/client/api";

function composer(props, onData) {
  i18nextDep.depend();
  onData(null, {
    trackingId: Meteor.settings.public.GOOGLE_MAPS_API_KEY
  });
}

registerComponent("AvailabilityMap", AvailabilityMap, composeWithTracker(composer));

export default composeWithTracker(composer)(AvailabilityMap);
```

Notice that we put our reactive data sources within the composer function and wait for them to be ready (populated by the Meteor framework). Here we have two reactive data sources: the dependency on translation resources and `Meteor.settings`. Additionally we're going to register our container (read: data-aware component wrapper) as the ready-to-use ReactionCommerce component called `AvailabilityMap`. This is the identifier that connects to the earlier seen `child.component` in function changeProductDetailPageLayout.


Having all pieces together, we can give our location aware PDP a try:
![Screenshot](/assets/extending-product-schema-location-map.png)
