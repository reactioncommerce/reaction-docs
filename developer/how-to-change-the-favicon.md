# How to change the favicon

## Step 1: Copy the favicon code from default-theme
Copy the [favicon code](https://github.com/reactioncommerce/reaction/blob/master/imports/plugins/included/default-theme/client/favicons.js) from the default-theme package into your own package, e.g. into `/imports/plugins/custom/<your-plugin-name>/client/favicons.js`

## Step 2: Create the favicon bundle for different platforms
For best results, you may want to create favicons for different devices. You can create favicon bundles with various online tools, e.g. https://realfavicongenerator.net

### Step 3: Adjust *basePath* to your webserver
Depending on how you intend to serve your static favicons, you can adjust the `basePath` variable in favicons to the public URL, where your favicons live. If you don't want to go the extra mile and deliver them through a dedicated webserver, a CDN or AWS S3, you can also put them into your application's `/public` folder and let Meteor serve them.

Example:
```js
const basePath = "/resources/favicons/";
```
with favicon bundle files living in `<project_root>/public/resources/favicons/`

### Step 4: Make sure to import favicons.js
** /imports/plugins/custom/&lt;your-plugin-name&gt;/client/index.js **
```js
import "./favicons"
```

#### Notice
The above described method yields duplicated favicons links in the HTML head. Although this will result in a few extra bytes transmitted, it shouldn't generally be a problem, as the browser will actually use the favicon that it sees last.
