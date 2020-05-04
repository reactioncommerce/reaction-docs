---
id: version-3.0.0-devs-node-es-modules
title: Developer Concepts: Node ECMAScript Modules
sidebar_label: Node ECMAScript Modules
original_id: devs-node-es-modules
---

> This article pulls out some Reaction-specific key points from [the NodeJS documentation](https://nodejs.org/docs/latest-v12.x/api/esm.html), which you may want to read for more details.

The Reaction API runs as a Node 12 program that uses modern ECMAScript module loading. There is no Babel transpilation step. If you are used to CommonJS, Babel, or Webpack module loading, there are some differences to be aware of.

There are two main ways to import code from another package or file in a Reaction API code file: `import` and `require`. In general, **use `import` for anything that exports an ECMAScript module and use `require` for anything that exports a CommonJS module**. Over time, as more packages export ECMAScript modules and the `import` spec supports more file types, you should need to use `require` less frequently.

One key change to be aware of is that **file extensions are never automatically resolved**. If you are used to import specifiers (the string after `from`) that have no file extension, you now need to add the `.js` suffix. If it would resolve to an index file, you need to add `/index.js`.

Early NodeJS ESM support required you to use `.mjs` extension if your file exports a module. This is no longer true, but you can still use `.mjs` and `.cjs` extensions if you want to be explicit. For Reaction API, we recommend sticking with good old fashioned `.js`. **In a custom plugin, you will need to add `type: "module"` to your `package.json` to ensure that Node loads all of your `.js` files as ECMAScript modules rather than CommonJS modules.**

Let's go through some common use cases to see how to do each import properly.

## Import from another JavaScript file in the same plugin

All Reaction 3.0.0+ plugin files must be ECMAScript modules, so use `import`.

```
import someDefaultExport, { someNamedExport } from "./relative/path/to/file.js";
```

## Import from a package that provides ECMAScript module (ESM) exports from its entry point

Package documentation is not always clear about whether it exports CJS or ESM. If you're unsure, start by trying this and see if you get errors.

```
import someDefaultExport, { someNamedExport } from "package-name";
```

## Import from a specific path in a package that provides ECMAScript module (ESM) exports

```
import someDefaultExport, { someNamedExport } from "package-name/path/relative/to/package/root/file.js";
```

## Import from a package entry point that provides only CommonJS exports

Currently CommonJS named exports can't be imported using `import` syntax in an ES module. You must call `createRequire` and then use `require`.

```
// You can use import when importing the default export
import someDefaultExport from "package-name";

// But for named CommonJS exports you need to use require
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { someNamedExport } = require("package-name");
```

## Import from a specific path in a package that provides only CommonJS exports

```
// You can use import when importing the default export
import someDefaultExport from "package-name/path/relative/to/package/root/file.js";

// But for named CommonJS exports you need to use require
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { someNamedExport } = require("package-name/path/relative/to/package/root/file.js");
```

## Import a JSON file

The `import` keyword supports JSON files. The parsed JSON is imported.

```
import config from "./config.json";

// JSON in a package works, too
import config from "package-name/path/to/config.json";
```

## Further reading

- [https://blog.logrocket.com/es-modules-in-node-js-12-from-experimental-to-release/](https://blog.logrocket.com/es-modules-in-node-js-12-from-experimental-to-release/)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)
- [https://nodejs.org/docs/latest-v12.x/api/esm.html](https://nodejs.org/docs/latest-v12.x/api/esm.html)
- [https://medium.com/@nodejs/announcing-a-new-experimental-modules-1be8d2d6c2ff](https://medium.com/@nodejs/announcing-a-new-experimental-modules-1be8d2d6c2ff)
