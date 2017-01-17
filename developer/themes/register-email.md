# Customization of Email Templates

## Register a new email template

```js
import { Reaction } from "/server/api"

Reaction.registerTemplate({
  title: "My Template",
  name: "my-template"
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
