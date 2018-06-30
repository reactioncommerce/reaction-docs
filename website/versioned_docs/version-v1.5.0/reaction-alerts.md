---
id: version-v1.5.0-reaction-alerts
title: Alerts
original_id: reaction-alerts
---
    
`Alerts` is exported to the client global namespace.

## Inline Alerts

```js
Alerts.inline("Alert message.", "success | info | warning | error", {
  placement: "placementId",
  autoHide: 1000 | false
});
```

In your template:

```html
{{> inlineAlerts placement="placementId"}}
```

## Toast Alerts

See: <http://s-alert.meteor.com/> for more options.

```js
Alerts.toast("message", "success | info | warning | error", options);
```

## Alert Popup

See: <http://t4t5.github.io/sweetalert/> for more options.

```js
let options = {
  type: "success | info | warning | error"
};

Alerts.alert("Alert Title", "Alert Message", options, callback);
```
