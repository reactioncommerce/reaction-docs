---
id: version-1.15.0-register-template
title: How To: Register a custom email template
original_id: register-template
---

## Register a new email template

```js
import { Reaction } from "/server/api";

Reaction.registerTemplate({
  title: "My Template",
  name: "my-template",
  type: "email",
  template: `
  <html>
  <body>
    Custom Email Template!
  </body>
  </html>
  `,
  subject: "A message from {{shop.name}}"
});
```

## Get Template

```js
import { getTemplateByName } from "/server/api/templates";

const myTemplate = getTemplateByName("my-template");
```
