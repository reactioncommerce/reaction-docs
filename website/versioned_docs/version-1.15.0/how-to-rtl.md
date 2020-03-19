---
id: version-1.15.0-how-to-rtl
title: How To: Add right-to-left language support in the Meteor app
original_id: how-to-rtl
---

> ⚠️ Note: This guide has been deprecated as the release of Reaction 2.0. The latest custom home page guide can be found [here](https://docs.reactioncommerce.com/docs/swag-shop-3).

The default Reaction Meteor app theme (core-theme) uses [Bootstrap 3](https://getbootstrap.com/css/#less) and the [Less](https://lesscss.org) preprocessor to build the theme.

If you want to learn how to make a theme, see our [How To: Create a theme for the Meteor app](https://docs.reactioncommerce.com/reaction-docs/trunk/creating-a-theme) documentation.

## Mixins

### Core Theme Bootstrap RTL (Right to Left)

Support for Right to Left languages

The `rtl` class is added when the shops.languages language direction is 'rtl'. See [packages/core-theme/default/bootstrap.rtl.less](https://github.com/reactioncommerce/reaction/blob/v1.15.0/packages/reaction-core-theme/default/bootstrap.rtl.less) file for RTL mixins that you should use instead of standard css properties when editing LESS themes.

For example, instead of doing the following:

```less
.mystyle {
  padding-right: 50px;
}
```

You should use the RTL mixin instead:

```less
.mystyle {
  .padding-right(50px);
}
```

The following RTL Less mixins are available:

- .rtl
- .ltr
- .left
- .right
- .margin-left
- .margin-right
- .padding-left
- .padding-right
- .float
- .clear
- .text-align
