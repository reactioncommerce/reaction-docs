# Layout
## Package Registry - Layout
**Available in the Packages collection, ie: `package.layout`**

```javascript
"layout" : [
        {
            "template" : "checkoutLogin",
            "label" : "Login",
            "workflow" : "coreCartWorkflow",
            "container" : "checkout-steps-main",
            "audience" : [
                "guest",
                "anonymous"
            ],
            "priority" : "1",
            "position" : "1"
        },
        {
            "template" : "checkoutAddressBook",
            "label" : "Address Details",
            "workflow" : "coreCartWorkflow",
            "container" : "checkout-steps-main",
            "audience" : [
                "guest",
                "anonymous"
            ],
            "priority" : "2",
            "position" : "2"
        },
        {
            "template" : "coreCheckoutShipping",
            "label" : "Shipping Options",
            "workflow" : "coreCartWorkflow",
            "container" : "checkout-steps-main",
            "audience" : [
                "guest",
                "anonymous"
            ],
            "priority" : "3",
            "position" : "3"
        },
        {
            "template" : "checkoutReview",
            "label" : "Review Payment",
            "workflow" : "coreCartWorkflow",
            "container" : "checkout-steps-side",
            "audience" : [
                "guest",
                "anonymous"
            ],
            "priority" : "4",
            "position" : "4"
        },
        {
            "template" : "checkoutPayment",
            "label" : "Complete",
            "workflow" : "coreCartWorkflow",
            "container" : "checkout-steps-side",
            "audience" : [
                "guest",
                "anonymous"
            ],
            "priority" : "5",
            "position" : "5"
        },
        {
            "template" : "coreOrderCreated",
            "label" : "Created",
            "workflow" : "coreOrderWorkflow",
            "audience" : [
                "dashboard/orders"
            ]
        },
        {
            "template" : "coreShipmentTracking",
            "label" : "Tracking",
            "workflow" : "coreOrderWorkflow",
            "audience" : [
                "dashboard/orders"
            ]
        },
        {
            "template" : "coreOrderDocuments",
            "label" : "Preparation",
            "workflow" : "coreOrderWorkflow",
            "audience" : [
                "dashboard/orders"
            ]
        },
        {
            "template" : "coreProcessPayment",
            "label" : "Process Payments",
            "workflow" : "coreOrderWorkflow",
            "audience" : [
                "dashboard/orders"
            ]
        },
        {
            "template" : "coreShipmentShipped",
            "label" : "Shipped",
            "workflow" : "coreOrderWorkflow",
            "audience" : [
                "dashboard/orders"
            ]
        },
        {
            "template" : "coreOrderCompleted",
            "label" : "Completed",
            "workflow" : "coreOrderWorkflow",
            "audience" : [
                "dashboard/orders"
            ]
        },
        {
            "template" : "coreOrderAdjustments",
            "label" : "Adjusted",
            "workflow" : "coreOrderWorkflow",
            "audience" : [
                "dashboard/orders"
            ]
        }
    ]
```
