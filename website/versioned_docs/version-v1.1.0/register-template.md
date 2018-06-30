---
original_id: register-template
id: version-v1.1.0-register-template
title: Create Custom Templates
---
    
Register and fetch a templates by name. This is server-only. Mostly suited for server side rendering of email templates. See [Customize Email Templates](register-email.md).

## Register a new email template

```js
import { Reaction } from "/server/api";

Reaction.registerTemplate({
  title: "My Template",
  name: "my-template"
  type: "template",
  template: `
    <div>Custom Email Template!<div>
  `,
});
```

## Get Template

```js
import { getTemplateByName } from "/server/api/templates";

const myTemplate = getTemplateByName("my-template");
```
