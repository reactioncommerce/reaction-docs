/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

const siteConfig = {
  title: "Reaction Docs" /* title for your website */,
  tagline: "Connecting the world through commerce",
  url: "https://docs.reactioncommerce.com" /* your website url */,
  baseUrl: "/" /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: "https://facebook.github.io",
  //   baseUrl: "/test-site/",

  // Used for publishing and more
  projectName: "reaction",
  organizationName: "reactioncommerce",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: "JoelMarcey"
  customDocsPath: "public-docs",
  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "intro", label: "Docs" },
    { search: true },
    { href: "http://marketing.reactioncommerce.com/acton/media/37362/get-in-touch", label: "Get in touch" }
  ],
  cleanUrl: true,
  /* path to images for header/footer */
  headerIcon: "img/Reaction-Logo-Black.png",
  footerIcon: "img/logo@2x.png",
  favicon: "img/favicon.png",

  /* colors for website */
  colors: {
    primaryColor: "#052a4e",
    secondaryColor: "#fffbcf"
  },

  /* custom fonts for website */
  fonts: {
    myFont: [
      "Helvetica Neue",
      "Helvetica",
      "sans serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    `Made in the sunshine in Santa Monica, California by Reaction Commerce, Inc. © ${
      new Date().getFullYear()}`,

  // Use Prism as an additional syntax highlighter for languages not supported by highlight.js
  usePrism: [
    "jsx",
    "git",
    "graphql"
  ],

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: "atom-one-dark"
  },

  // TODO: Get testing Algolia key
  algolia: {
    apiKey: "e129a9a3e6a0851b34513ed15e78192b",
    indexName: "reactioncommerce"
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: [
    "/js/nav.js",
    "/js/side-nav.js",
    "/js/act-on.js",
    "/js/gitter.js",
    "https://sidecar.gitter.im/dist/sidecar.v1.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/js/code-blocks-buttons.js",
    "https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
  ],

  // Add custom stylesheets
  stylesheets: [
    "//cdn.materialdesignicons.com/3.7.95/css/materialdesignicons.min.css"
  ],

  /* On page navigation for the current documentation page */
  onPageNav: "separate",

  /* GitHub Edit button URL */
  editUrl: "https://github.com/reactioncommerce/reaction-docs/blob/trunk/public-docs/",

  /* Open Graph and Twitter card images */
  ogImage: "img/logo@2x.png",
  twitterImage: "img/logo@2x.png",

  gaTrackingId: "UA-44704216-5",

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo"s URL...
  repoUrl: "https://github.com/reactioncommerce/reaction",

  deletedDocs: {
    "v1.13.0": [
      "payment-packages-authnet",
      "payment-packages-braintree",
      "payment-packages-paypal",
      "taxes-packages-avalara",
      "taxes-packages-taxcloud"
    ],
    "1.15.0": [
      "catalog",
      "button",
      "checkbox",
      "including",
      "installation",
      "packages",
      "payment-packages-stripe",
      "register-email",
      "select",
      "testing-tutorial",
      "textfield",
      "tutorial"
    ],
    "2.0.0": [
      "avatar",
      "badge",
      "cards",
      "clickToCopy",
      "components",
      "components-api",
      "core-plugins-search",
      "divider",
      "dropDownMenu",
      "extending-product-schema-location-map",
      "how-to-create-a-custom-homepage",
      "icon",
      "installation-linux",
      "installation-osx",
      "installation-windows",
      "link",
      "lists",
      "media",
      "menu",
      "merchant-shop-setup",
      "metadata",
      "multi-select",
      "popover",
      "revision-api",
      "register-template",
      "reaction-cart",
      "event-hooks",
      "faqs",
      "collection-hooks",
      "method-hooks",
      "reaction-payments",
      "swag-shop-collecting-requirements",
      "swag-shop-initialization",
      "swag-shop-landing-page",
      "swag-shop-pdp",
      "swag-shop-tutorial",
      "sms-notifications",
      "search",
      "settings-card",
      "slider",
      "social-settings",
      "sortableTable",
      "switch",
      "tags",
      "tooltip",
      "translation"
    ],
    "3.0.0": [
      "admin-views",
      "alerts",
      "analytics",
      "architecture",
      "creating-a-theme",
      "creating-test-data-for-meteor-tests",
      "collections",
      "community-channels",
      "core-plugins-marketplace",
      "database-migrations",
      "deploying-reaction-using-docker",
      "developer-faq",
      "email-api",
      "exports",
      "fixtures-images",
      "graphql-api",
      "how-to-change-the-favicon",
      "how-to-configure-meteor-app",
      "how-to-rtl",
      "how-to-write-tests-for-plugins",
      "i18n",
      "installation-reaction-platform",
      "intro-glance",
      "layout",
      "login-auth-services",
      "merchant-shop-setup",
      "navigation-bar-and-grid",
      "payments-discounts",
      "plugin-complete-10",
      "plugin-creating-2",
      "plugin-customizing-templates-4",
      "plugin-fixtures-5",
      "plugin-i18n-9",
      "plugin-intro-1",
      "plugin-layouts-3",
      "plugin-routes-6",
      "plugin-schemas-8",
      "plugin-workflow-7",
      "prerender",
      "reaction-alerts",
      "reaction-cli",
      "reaction-core",
      "reaction-import",
      "reaction-inventory",
      "reaction-localization",
      "reaction-module-cheatsheet",
      "reaction-orders",
      "reaction-product-detail",
      "reaction-products",
      "reaction-shipping",
      "reaction-shops",
      "reaction-tags",
      "reaction-user-accounts",
      "registry",
      "routing",
      "running-meteor-integration-tests",
      "security",
      "seo-metadata",
      "template-helpers",
      "understanding-hydra-setup",
      "workflow"
    ],
    "3.7.1": [
      "community-resources"
    ]
  }
};

module.exports = siteConfig;
