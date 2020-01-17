---
id: version-2.9.1-swag-shop-4
title: Customizing the Layout
original_id: swag-shop-4
---

Most people will want to change the way the overall site is structured visually. Maybe you don't want the MiniCart to show up or you want to use your own version of it. 

The simplest way is to just replace the built-in layout with a custom version of your own. The starter-kit already contains a `custom` directory that is intended as a place to put your own custom components and containers (or anything else you want to add).

1. Let's create a ` components` directory in the `custom` directory if it's not there already and just copy the existing `Layout` component in there for now. 
2. Now, we just need to change one import in "core" code to have our new Layout take affect and that's in the `_app.js` file in the `src/pages` directory. 
3. Just change the import of `Layout` to come from our custom Layout at `custom/components/Layout`. ([Next.js](http://nextjs.org/) provides that all imports from within `src` don't need a path prefixer)

Now all changes to our custom layout will take effect site-wide with just this one change.
