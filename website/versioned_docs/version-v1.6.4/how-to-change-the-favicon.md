---
id: version-v1.6.4-how-to-change-the-favicon
title: Tutorial: Customize the favicon
original_id: how-to-change-the-favicon
---

## Step 1: Create a new custom package
Create a new package in the `/custom/` folder.

You should have a directory like this: `/imports/plugins/custom/<your-plugin-name>/`.

## Step 2: Copy the favicon code from default-theme
Create a `/client/` folder in the package, and add a `favicon.js` file.

Copy the [favicon code](https://github.com/reactioncommerce/reaction/blob/v1.6.4/imports/plugins/included/default-theme/client/favicons.js) from the [default-theme](https://github.com/reactioncommerce/reaction/tree/v1.6.4/imports/plugins/included/default-theme) package into the `favicon.js` file.

## Step 3: Create the favicon bundle files for different platforms
For best results, you may want to create favicons for different devices. You can create favicon bundles with various online tools, e.g. https://realfavicongenerator.net

## Step 4: Adjust *basePath* to your webserver
Depending on how you intend to serve your static favicons, you can adjust the `basePath` variable in favicons to the public URL, where your favicons live. If you don't want to go the extra mile and deliver them through a dedicated webserver, a CDN or AWS S3, you can also put them into your application's `/public` folder and let Meteor serve them.

Example:
```js
const basePath = "/resources/favicons/";
```
with favicon bundle files living in `<project_root>/public/resources/favicons/`

## Step 5: Make sure to import favicons.js

**/imports/plugins/custom/&lt;your-plugin-name&gt;/client/index.js**
```js
import "./favicons"
```

### Notice
The above described method yields duplicated favicons links in the HTML head. Although this will result in a few extra bytes transmitted, it shouldn't generally be a problem, as the browser will actually use the favicon that it sees last.
