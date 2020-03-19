---
id: version-2.9.1-core-plugins-sitemap-generator
title: Sitemap Generator Plugin (Meteor)
original_id: core-plugins-sitemap-generator
---

A sitemap is an XML file that contains a complete list of URLs for your website that should be accessible by search engines. Having a sitemap.xml file helps Google and other search engines easily discover and index your pages.

Reaction includes a sitemap generator plugin that periodically generates a sitemap.xml file. This process can also be triggered manually through the operator UI.

## Configuration

### Sitemap Refresh Period
By default, the sitemap generator is set to rebuild the sitemap.xml file every 24 hours. This can be changed by following these steps:
1. Log in to the Reaction Dashboard
2. In the sidebar, click "Shop"
3. Open the "Options" panel
4. Select an interval in the "Sitemap refresh period" select box. Click "Save changes"
5. You can also choose to refresh the sitemap now and view it

### Excluding Products from the Sitemap
By default, all published products are included in the sitemap.xml file. You can choose to exclude products by following these steps:
1. Log in to the Reaction Dashboard
2. Navigate to the detail page of the product you would like to exclude
3. Turn on "Edit mode" from the header
4. Click the product's title to open up the edit panel
5. Under "Product settings" uncheck "Include in sitemap"
