# Alerts


## Inline Alerts
```
Alerts.inline("Alert message.", "success | info | warning | error", {
	placement: "placementId",
	autoHide: 1000 | false
});
```

In your template:

```
{{> inlineAlerts placement="placementId"}}
```

## Toast Alerts
See: http://s-alert.meteor.com/ for more options.

```
Alerts.toast("message", "success | info | warning | error", options);
```


## Alert Popup
See: http://t4t5.github.io/sweetalert/ for more options.

```
let options = {
	type: "success | info | warning | error"
};

Alerts.alert("Alert Title", "Alert Message", options, callback);
```
