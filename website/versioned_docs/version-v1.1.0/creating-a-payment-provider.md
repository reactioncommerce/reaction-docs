---
original_id: creating-a-payment-provider
id: version-v1.1.0-creating-a-payment-provider
title: Creating a Payment Provider
---
    
## What is a "Payment Provider"

Payment Providers are companies that provide a gateway between ecommerce
software customer payment. In the U.S. that largely means credit cards
but it can also mean something like a Paypal account or in other parts
of the world it could mean cards linked to Kiosks or even BitCoin.
Reaction doesn't really care what you do here, you could even not
collect money at all it just puts that step as part of the workflow and
then records the results.

Included with the default version of Reaction Commerce is the Example
Payment provider. This plugin has two purposes. First to allow you to
put through orders in your local dev system without signing up for a
payment provider, secondly to provide a template for creating plugins
for new Payment Providers.

Note that while charging and capturing should work as expected, refunds are not
recorded since Reaction expects refunds to be recorded by the Payment Gateway.

## Introduction

Payment Providers are implemented as "plugins". Reaction Commerce
plugins are just Meteor modules with some additional configuration.

## Getting Started

Start off by copying the `payments-example` package into the
`imports/plugins/custom` folder. You will need to add imports to the
`main.js` file in both the `client` and `server` directories. If you
wish you can remove imports for the Example Payment Method.

The first task is to choose a simple, single-word identifier for your
payment method. You will use this over and over and having it simple and
consistent will make it easier to keep your package free of bugs. In
this project we have chosen the clever name of `example`.

Then you will want to modify the `register.js` file to reflect your
payment provider. Specifically you will need to at minimum change the
label to whatever name you are using. You can pretty much just change
"example" wherever it is used to whatever identifier you are using.

## The Schema

The main "secret sauce" here is using the [AutoForm](https://atmospherejs.com/aldeed/autoform) along with the
[Simple Schema](https://atmospherejs.com/aldeed/simple-schema) package.
This allows you to declare the schema you want to insert against and
have your form and validations (mostly) built for you. If you look in
`import/plugins/included/payments-example/lib/collections/schemas/example.js`
you can see there are two schemas declared, `ExamplePackageConfig` which
is the data we want to input in settings and `ExamplePayment` which is
the data we submit when submitting a payment.

## Templates and React Components

There are two basic elements that must be created, the payment forms and
the settings panel. Like all Meteor projects you place all your client
code in the `client` directory. For the payment form, it basically displays a standard
credit card entry form. The JS file associated with this form gathers up
the data from the form and calls a client-side version of the
`authorize` method. That method is placed on the `Example` object so
that it can be imported on the client. If you have modified the schemas
as mentioned above, you will also need to modify the form accordingly.
The settings panel on the other hand is implemented using React as opposed to the Blaze
templates. The `component` folder contains the display, which is a simple form that defines an
input field for an `API Key`. The `container` folder contains all the logic for the
component, it takes the data provided in the component and makes the call to the server-side
`update` method that updates the Example Payment Method to contain an API Key.

## Checkout

In this project the payment form is implemented in `templates/cart/checkout/payment/methods/generic`.
The HTML template is just a standard Credit Card entry form with standard validation.
You probably will want to look at the code in `Autoform.hooks` because
here is where the `authorize` function is called. You may want to change
how some elements such as `storedCard` are implemented based on your needs,
although the default will probably work for most people. You have to
change all the references to `example` or`ExamplePayment` to whatever
your payment method is called. Most importantly in the section where
the `paymentMethod` object is created to be stored in the db you must
change the `processor` and `method` values. _(This should probably be
changed in the future to derive this value from the package)_

## Client Methods

Just the one method is called from the client-side: `authorize`, and that method is just a stub that calls the server-side method.

## Dashboard

It is likely that your payment method has some parameters that need to
be customized and should not be stored in code. Typically this includes
usernames, passwords, API keys, etc. The template provided at
`template/settings` provides a form for entering in this information.
The provided form just takes one parameter, an API key (which of course
is not needed or used). You can add any additional parameters required
here.

## Server-side

### Collections

In `paymentmethod/lib/collections/schemas/` you will want to change
the PackageConfig schema to include any settings you added to the
dashboard form. In addition you will want to modify the
`ExamplePayment` schema to have your own name and modify which values
you capture (for most Credit Card methods you can probably leave it
the same).

### Routing

Two new routes are created in the `register.js`, one for payment and one
for settings. If your method is a typical server-side method, you should
not need to add any additional routes, just modify the existing route
for the dashboard to reflect the name of your package. If you need to
implement a client-side package (for example where you go to a provider
and get a token that gets saved) you can look at the PayPal express
implementation which adds more routes for storing the token.

### Methods

In the lib directory you need to modify/implement the methods provided
here. In this file mostly what you are doing is just providing a way for
the client to call the server side methods. If you method does not
require any parameters you may not need the `accountOptions` method but
most payment methods should implement `authorize`, `capture`, `refund`,
and `refunds`.

- **authorize**

Most credit-card processors have a two-step process to allow for different payment models. You should read your merchant agreement and the documentation to get the specifics but typically the **authorize** stage will do a check of the customer's payment method (credit or debit card) and allocate that amount to you **but no funds have been transferred**.

To the consumer it looks like the charge has already gone through and their balance is reduced by the allocated amount. Typically an autorization will expire after a set number of days. Usually you cannot capture more than you authorize but you can capture less and leave the balance still captured or release the balance. In a typical hard-goods shipment scenario an authorize will be performed at time of order then when the actual good are shipped a capture is performed.

- **capture**

As noted before, this will operate against a previously performed authorization and tell the payment processor to transfer the actual funds. Some payment processors allow you to authorize and capture in one step which is why the `authorize` method takes a `transactionType` parameter.

- **refund**

This method is probably self-explanatory, and is just a wrapper for whatever method your payment provider has for processing refunds.

- **refunds**

This method should query for a list of refunds and these refunds will show up in the dashboard when managing orders.

### Server methods (in the `server` directory)

Here you need to provide the server-side implementations of the four methods listed above. The naming is a little
different in that each method must have the name of the provider (the one you selected above) in the method name.
Authorize is a little different in that it is called "Submit", so it's name would be "yourProviderSubmit". The rest
of the method names are just "yourProvider/methodname". The code should be pretty self-explanatory here.

The tricky part is making sure that the necessary data is return in the `results`. Each step except for `authorize`
relies on data saved from the step before so you need to make sure the correct data is there. For example a capture
may require the token of the authorization done before it. This varies a lot from provider to provider so this is
where you will probably spend the most time testing/developing. But if the docs and API are good you should be able
implement this fairly easily.

## Your package Registry

Payment packages, like all Reaction packages must tell Reaction what they are providing to Reaction through the
`provides` keyword. Most payment methods will "provide" three things: A dashboard widget, dashboard settings, and a
checkout form (all covered above). Typically you can just change the names in `register.js` to reflect your package
name and you should be fine. Also you need to define any "Global" objects that the payment method should provide.
In the example we export the "GenericAPI" object which is a stand-in for whatever third-party package you may be using
to integrate with your payment processor.

## Your Package

Like any Meteor package you need to modify the `package.js` at the root of the package to reflect your renamed/created
files.

## Writing Tests

Writing tests for code that is just a wrapper around third-party code is problematic. You don't want to test your
providers code, but you want meaningful tests.

The solution that we at Reaction Commerce have come up with is to create a wrapper around the third-party code. While
this adds a little more complexity it allows you to seamlessly stub/mock out this library so that you aren't testing
code that you have no control over and it prevents your test code from making calls out to a third party service every
time you run your test. These tests won't take the place of actually testing your code from end to end (i.e. trying
to purchase something in the store and pay for it with your payment method), but it will allow you to quickly see
any problems you create as your code changes.

Check out the example tests and the example wrapper we created. This wrapper uses the
["Advanced Method boilerplate"](http://guide.meteor.com/methods.html#advanced-boilerplate) which was designed with testing
in mind by the Meteor folks so that specific features of a larger method could be tested without testing the entire method.

### What to test

My rule of thumb is at least two tests for each method or chunk of code. One for the "happy path"  (when everything
works as expected) and one for if something goes wrong (usually that bad parameters are passed).
With third party libraries you may want to test that error messages are propogated properly if an error is
returned by the library.

This rule gives you a starting point, but you should add tests whereever you see a section that is vulnerable to
bugs or whenever you find a bug, write a test that simulates the bug and fix your code until the test passes. Having
this test helps you prevent a regression down the line if another change re-introduces it.
