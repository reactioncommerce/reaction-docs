---
id: version-v1.6.4-appearance
title: Themes: Right-to-left
original_id: appearance
---

The default Reaction theme (core-theme) uses [Bootstrap 3](https://getbootstrap.com/css/#less) and the [Less](https://lesscss.org) preprocessor to build the theme.

If you want to learn how to make a theme, see our [Creating a Theme](https://docs.reactioncommerce.com/reaction-docs/trunk/creating-a-theme) documentation.

## Mixins

### Core Theme Bootstrap RTL (Right to Left)

Support for Right to Left languages

The `rtl` class is added when the shops.languages language direction is 'rtl'. See [packages/core-theme/default/bootstrap.rtl.less](https://github.com/reactioncommerce/reaction/blob/v1.6.4/packages/reaction-core-theme/default/bootstrap.rtl.less) file for RTL mixins that you should use instead of standard css properties when editing LESS themes.

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

-   .rtl
-   .ltr
-   .left
-   .right
-   .margin-left
-   .margin-right
-   .padding-left
-   .padding-right
-   .float
-   .clear
-   .text-align
