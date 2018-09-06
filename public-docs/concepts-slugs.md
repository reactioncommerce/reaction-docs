---
title: Slugs
---

The term **"slug"** refers to a string of text that is URL-safe. Web URL paths are not allowed to have certain characters in them, so any text that needs to appear as part of a URL path needs to be "slugified". In Reaction Commerce, shop names and tag names are used to make shop and tag slugs, respectively, and then these slugs are used where necessary in the URL path.

The most noticeable differences between a slug and its source text are that whitespace becomes a single dash and all characters are converted to lowercase. The exact way a slug is generated differs among languages, but the end result is always a string of text that is safe to be in a URL path. Most slugs can also be changed by a store operator after being generated.

Example:

- Tag name: Boots and Shoes
- Tag slug: boots-and-shoes
