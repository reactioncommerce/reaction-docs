# Writing tests for Reaction Commerce

## Types of tests

Currently our test suite consists of two types of tests: Integration (what Meteor calls "full app")
and Acceptance tests. Here are the major differences:

1. Integration tests run server-side and test server-side functionality aginst the entire app running. All
parts of the app are loaded before the tests are run but the app is not available during testing.

1. Acceptance tests (also called "Black Box" tests) test RC functionality from the client-side and
attempt to test functionality "as a user". These require special tools to be able to remotely control
a browser.

This tutorial attempts to get you started writing Integration tests as we would normally expect any new
server functionality to be covered by integration tests.

### Writing your first test

The first step to writing tests is writing testiable code. This means writing code that
as few implcit dependencies as possible. The fewer the dependencies, the easier it will be
to write a test and the better the test will be.

So for the purpose of this tutorial we will write a new feature called "Change product to Hank". 
This creates a new API point where someone with the correct permissions can change the name of
any product to "Hank". (we will allow that this feature may have limited value, but it works well
for the example). 
 
 So what do we want this method to do? Well, the basic functionality is to take in product id
 amd then update the database record for that product so that the title is "Hank". 
 
 So before we even write some code let's write a test. For "full app" tests your file must contain
 the words "app-test" as in `product-to-hank.app-test.js`. Normally you want to put your tests cloests
 to the code under tests so we will add our test file under `server/methods`. The starting template
 for a test file looks something like this:
 
 ```js
 import { expect } from "meteor/practicalmeteor:chai";

 
 describe.only("Product-To-Hank", function () { 
     describe("Calling product-to-hank", function () {
         it("should change product title to Hank", function () {
             expect(true).to.be.true;
         });
     });
 });
```
 
This is the basics of a Mocha (and many other testing libraries) using what is called "BDD" syntax. WHen the test
is run it is supposed to describe (hance the name) what is being tested. So when the test we have written is run
the output would say "Product-To-Hank. Calling product-to-hank should change product title to Hank". Then when this
test passes or fails it will give you a pretty good idea what is happening. Writing these descriptions well is a big
step in making sure your tests are valuable. If someone changes some other part of the code and your test starts failing,
they should be able to ascertain right away what is failing (and hopefully why). 

We also have added in the "chai" library which is a set of what is called "expectations". This helps define in as
plain as english as possible what we expected to happen when we ran our test.

So our test is way too easy-going. All it requires is that true is true. So let's have it set it's expectations
a little higher and have it expect that the product title should be "Hank". So we change the expect line to read.

```js

expect(product.title).to.equal("Hank")`;
````
The nice thing about reading this is that is that you can read the line outloud and it would make sense to someone
who didn't know anything about your implementation. Of course, if we run this test now, we won't get a failure
(what we currently want) we would get an error (what we don't want). And that's because for starter we don't have a product.

So let's create a product. But do we do that? Well we will use something called a "Fixture". 

Reaction Commerce has sets of prebuilt fixtures for common testing tasks so that we don't repeat a lot of boilerplate code
building up common types. So firstly we need to import the fixtures. 

```js
import Fixtures from "/server/imports/fixtures";
```

Then as Fixtures (using the excellent Factory package) are implemented using global functions we need to execute
our fixtures, so we add on a line right after all the imports.

```js
Fixtures();
```

Now we have our fixtures available to us. So we can create a product in our test. Let's add those lines so it looks like
this:

 ```js
import { expect } from "meteor/practicalmeteor:chai";
import { Products } from "/lib/collections";

 
 describe.only("Product-To-Hank", function () { 
     describe("Calling product-to-hank", function () {
         it("should change product title to Hank", function () {
           const product = Factory.create("product");
           const productId = product._id;
           setProductToHank(productId);
           const changeedProduct = Products.findOne(productId);
           expect(product.title).to.equal("Hank")`;
         });
     });
 });
````

So now our test is almost there, except that the `setProductToHank` function doesn't exist
and that's going to just give us another error. So let's add that function to a new file called `products.js` in
`/server/methods/core`.

That new function should just look like:

```js
export function setProductToHank(productId) {
  check(productId, String);
}
```

And that's all for now.

Notice how we put `describe.only` in our first block? That means we want to only run *this* test when
we run the suite. So now you should be able run `reaction test` and see our tests fail.

Part of writing good tests is being able to see the success in good failures.

Now our test fails. So let's finish our method so that it satisfies our criteria.

```js
export function setProductToHank(productId) {
  check(productId, String);
  return Products.update(productId, {
    $set: {
      title: "Hank"
    }
  }, {
    selector: { type: "simple" },
    validate: false
  });
}
```
