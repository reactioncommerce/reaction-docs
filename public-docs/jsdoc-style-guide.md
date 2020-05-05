---
id: jsdoc-style-guide
title: JSDoc Style Guide
---

## The basics

Document every JavaScript function by adding [JSDoc](http://usejsdoc.org/) comments above the function definition with the following tags:

### required
- `@summary` can use Markdown here
- `@param` {type} name description, use `[]` square brackets around param for optional params
- `@return` {type} name description, or `@return {undefined}`

### optional
- `@async`
- `@private`
- `@default`
- `@deprecated` - since version number
- `@since` - version number
- `@todo` - any TODO notes here
- `@ignore` - if you don't want the function to output docs
- `@author` - to indicate third-party method authors
- `@see` - link to relevant third-party documentation

## Example

```js
/**
 * @summary Import all plugins listed in a JSON file. Relative paths are assumed
 *   to be relative to the JSON file. This does NOT register the plugins. It builds
 *   a valid `plugins` object which you can then pass to `api.registerPlugins`.
 * @param {String} pluginsFile An absolute or relative file path for a JSON file.
 * @param {Function} [transformPlugins] A function that takes the loaded plugins object and
 *   may return an altered plugins object.
 * @returns {Promise<Object>} Plugins object suitable for `api.registerPlugins`
 */
```
