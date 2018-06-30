---
original_id: plugin-workflow-7
id: version-v1.1.0-plugin-workflow-7
title: Workflow
---
    
_Note: If you are looking to actually change the fields in the checkout flow, you will actually want to look at the
"Customizing Schemas" chapter. That chapter will explain why_

Reaction Commerce currently has a relatively simple workflow system. Workflows are simply an array of ordered records that point to a template.
Here is what the checkout workflow looks like in the database. Each a record in the `core/checkout` plugin (in the Packages collection):

Login:

```json
{
    "template" : "checkoutLogin",
    "label" : "Login",
    "workflow" : "coreCartWorkflow",
    "container" : "checkout-steps-main",
    "audience" : [
        "guest",
        "anonymous"
    ],
    "priority" : 1,
    "position" : 1,
    "enabled" : true
}
```

Address Book:

```json
{
    "template" : "checkoutAddressBook",
    "label" : "Shipping Billing",
    "workflow" : "coreCartWorkflow",
    "container" : "checkout-steps-main",
    "audience" : [
        "guest",
        "anonymous"
    ],
    "priority" : 2,
    "position" : 2,
    "enabled" : true
}
```

Shipping Options:

```json
{
    "template" : "coreCheckoutShipping",
    "label" : "Shipping Options",
    "workflow" : "coreCartWorkflow",
    "container" : "checkout-steps-main",
    "audience" : [
        "guest",
        "anonymous"
    ],
    "priority" : 3,
    "position" : 3,
    "enabled" : true
}
```

Review:

```json
{
    "template" : "checkoutReview",
    "label" : "Review Payment",
    "workflow" : "coreCartWorkflow",
    "container" : "checkout-steps-side",
    "audience" : [
        "guest",
        "anonymous"
    ],
    "priority" : 4,
    "position" : 4,
    "enabled" : true
}
```

and Completion:

```json
{
    "template" : "checkoutPayment",
    "label" : "Complete",
    "workflow" : "coreCartWorkflow",
    "container" : "checkout-steps-side",
    "audience" : [
        "guest",
        "anonymous"
    ],
    "priority" : 5,
    "position" : 5,
    "enabled" : true
}
```

To change this workflow you simple need to modify these records. In our example we are going to change the template for
the Review step to a custom one (which will actually look just mostly like the original, but you can imagine that you could do a lot more.)

So to solidify our change we are going to have our changes to the database done in our `init.js` script so that these changes are made when the store is bootstrapped.

We want to make this change after everything else has been set up (we want to make sure those records are there before
we try to modify them) so we are going to add our function on to the `afterCoreInit` event.
So we just call out function from the Hook Event we created earlier

```js
Hooks.Events.add("afterCoreInit", () => {
    addRolesToVisitors();
    modifyCheckoutWorkflow();
});
```

You will also need to add `Packages` to the imports from `/lib/collections`

Our function call is just a call out to modify the record in the collection using standard Meteor Mongo syntax:

```js
function modifyCheckoutWorkflow() {
  // Replace checkoutReview with our custom Template
  Packages.update({
    "name": "reaction-checkout",
    "layout": {
      "$elemMatch": {
        "template": "checkoutReview"
      }
    }
  }, {
    "$set": {
      "layout.$.template": "checkoutReviewBeesknees",
      "layout.$.label": "Review Order"
    }
  });
}
```

Now of course we will need to create our template and add that file to our imports but I am leaving that up to you since
we have covered it a few times now. The code is available in the BeesKnees repo if you want to take a look at it.
You will notice that there is nothing special about this command, we are just directly modifying the MongoDb.

Once we `reaction reset` and begin again we can look in the db and see that our changes have taken effect. And if we put
something in our cart and checkout, we should see the change to the checkout flow.

Next: [Schemas](plugin-schemas-8)

## Read More

[Workflow](workflow)

[Meteor Collections](http://docs.meteor.com/api/collections.html)
