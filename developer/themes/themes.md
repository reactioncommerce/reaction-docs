# Themes
The default Reaction theme (core-theme) uses [Bootstrap 3](https://getbootstrap.com/css/#less) and the [Less](https://lesscss.org) preprocessor to build the theme.

## Creating Your Own Theme

### Step 1: Let's start with a template

Make a copy of the folder `packages/my-custom-theme-template` and call it `my-custom-theme`.

Your packages directory should now look like the following:
```
reaction
  packages
    my-custom-theme
    my-custom-theme-template
```

#### Step 1.1

Open `packages/my-custom-theme/package.js` and change `my:custom-theme-template` to your `my:custom-theme`. Save the file.

The top of your `package.js` file should look like the following:
```
Package.describe({
  // Name of your package
  name: "my:custom-theme",

  // Brief summary or title of your package
  summary: "My Custom Theme",

  // Version number of your theme package
  version: "0.1.0"
});

.... Rest of file omitted for brevity.
```


### Step 2: Enable your new theme

Open `.meteor/packages` and look for the following near the bottom of the file.

```
# Themes
reactioncommerce:default-theme
#my:custom-theme
```

#### Step 2.1
Disable `reactioncommerce:default-theme` by **adding** a hashmark `#` in front of the line.

#### Step 2.2
Enable `my:custom-theme` by **removing** the hashmark `#` in front of the line and save the file.

The resulting `.meteor/packages` file should look like the following:
```
# Themes
#reactioncommerce:default-theme
my:custom-theme
```

With `reactioncommerce:default-theme` disabled, and `my:custom-theme` now enabled, we can start customizing the theme.

### Step 3 (Easy): Customizing your new theme

Open `packages/my-custom-theme/main.less`.
- This file represents all of the style imports for your theme.
- Notice that styles can be imported from other packages. In this case from `reactioncommerce:core-theme`;

Open `packages/my-custom-theme/package.js`.
- This file is a manifest of all the files your custom theme package uses.
- Files **MUST** be included here otherwise they will not be available for use in your theme.

Open `packages/my-custom-theme/styles/variables.less`.
- This file is provided for your convenience.
- Add your new variables and variable overrides here.
- This is the best place to override default `bootstrap` and default `reactioncommerce:core-theme` variables.

Open `packages/my-custom-theme/styles/base.less`.
- This file is provided for your convenience.
- Add any styles here.

### Step 4 (Advanced): Adding more files to your theme

Add a new file in `packages/my-custom-theme/styles`. For example we'll make the file `packages/my-custom-theme/styles/my-new-file.less`.

#### Step 4.1: Add your file to the package.js

Open `packages/my-custom-theme/main.less`.

And add the following under the section `** ADD YOUR CUSTOM STYLES HERE **`
```
api.addFiles("styles/my-new-file.less", "client", {isImport: true});
```

#### Step 4.2: Add your new file to main.less

Open `packages/my-custom-theme/main.less`.

And add this to the bottom of the file:
```
@import "styles/my-new-file.less";
```

After following the above steps, you should now file for adding more custom styles.

### Step 5 (Advanced): Change your theme name

You'll have to change the name in 3 places.

1. Change the folder name from `my-custom-theme` to your new theme name.
2. Open `packages/my-custom-theme/package.js` and change `my:custom-theme` to your new theme name.
3. Open `.meteor/packages` and enable replace `my:custom-theme` with your new theme name. Note

**Note** Meteor package names generally follow this format `namespace:package-name`; where by the `:` separates the namespace, usually your name or organization name, followed by the package name.

Open `.meteor/packages` and look for the following near the bottom of the file.


**NOTE**
There are many ways to go about building a theme, this is a representation of one of those methods. If you've got a good handle on how meteor and its packages work, feel free to use the method you're most comfortable with.

## Mixins

### Core Theme Bootstrap RTL (Right to Left)
Support for Right to Left languages

The `rtl` class is added when the shops.languages language direction is 'rtl'. See [packages/core-theme/default/bootstrap.rtl.less](https://github.com/reactioncommerce/reaction/blob/development/packages/reaction-core-theme/default/bootstrap.rtl.less) file for RTL mixins that you should use instead of standard css properties when editing LESS themes.

For example, instead of

```
  .mystyle {
    padding-right: 50px;
  }
```

You should use the RTL mixin:

```
  .mystyle {
    .padding-right(50px);
  }
```

The following RTL mixins are available:
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


## Alternate HTML/CSS Frameworks
We've developed with Bootstrap, as it's the most common UI framework, however there are other great frameworks such as Zurb's Foundation, and other pre-processors like `Sass` or `Stylus`. By using the **Creating Reusable Theme Packages** method above, you can implement any of the different css frameworks and preprocessors for your own custom theme.

Let us know if you want to get your hands dirty on this, and we'll be excited to help.
