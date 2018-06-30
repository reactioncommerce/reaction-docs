---
id: version-v1.6.4-testing-tutorial
title: Tutorial: Writing your first test
original_id: testing-tutorial
---
    
## Types of tests

Currently our test suite consists of two types of tests: **Integration** (what Meteor calls "full app")
and **Acceptance** tests. Here are the major differences:

**Integration** tests run server-side and test server-side functionality against the entire app running. All
parts of the app are loaded before the tests are run but the app is not available during testing.

**Acceptance** tests (also called "Black Box" tests) test RC functionality from the client-side and
attempt to test functionality "as a user". These require special tools to be able to remotely control
a browser.

This tutorial attempts to get you started writing Integration tests as we would normally expect any new
server functionality to be covered by integration tests.

### Writing your first test

The first step to writing tests is writing testable code. This means writing code that has
as few implicit dependencies as possible. The fewer the dependencies, the easier it will be
to write a test and the better the test will be.

So for the purpose of this tutorial we will write a new feature called "Change product to Hank".
This creates a new API point where someone with the correct permissions can change the name of
any product to "Hank". If we were writing a user story it would read something like "As an admin, I want to be
to change the title of a product to Hank". (we will allow that this feature may have limited value,
but it works well for the example).

So what do we want this method to do? Well, the basic functionality is to take in product id
and then update the database record for that product so that the title is "Hank".

So before we even write some code let's write a test. For "full app" tests your file must contain
the words "app-test" as in `product-to-hank.app-test.js`. Normally you want to put your tests closest
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

This is the basics of a Mocha (and many other testing libraries) using what is called "[BDD](https://en.wikipedia.org/wiki/Behavior-driven_development)" syntax. When the test
is run it is supposed to describe (hence the name) what is being tested. So when the test we have written is run
the output would say "Product-To-Hank. Calling product-to-hank should change product title to Hank". Then when this
test passes or fails it will give you a pretty good idea what is happening. Writing these descriptions well is a big
step in making sure your tests are valuable. If someone changes some other part of the code and your test starts failing,
they should be able to ascertain right away what is failing (and hopefully why).

We also have added in the [Chai](http://chaijs.com/) library which is a set of what is called "expectations". This helps define in as
plain English as possible what we expected to happen when we ran our test.

So our test is way too easy-going. All it requires is that `true` is `true`. So let's have it set it's expectations
a little higher and have it expect that the product title should be "Hank". So we change the expect line to read.

```js
expect(product.title).to.equal("Hank");
```

The nice thing about reading this is that is that you can read the line out loud and it would make sense to someone who didn't know anything about your implementation. Of course, if we run this test now, we won't get a failure (what we currently want) we would get an error (what we don't want). And that's because we don't have a product.

So let's create a product. But do we do that? Well we will use something called a "Fixture".

Reaction Commerce has sets of prebuilt fixtures for common testing tasks so that we don't repeat a lot of boilerplate code building up common types. So firstly we need to import the fixtures.

```js
import Fixtures from "/server/imports/fixtures";
```

Then as Fixtures (using the excellent Factory package) are implemented using global functions we need to execute
our fixtures, so we add on a line right after all the imports.

```js
Fixtures();
```

Now we have our fixtures available to us. So we can create a product in our test. Let's add those lines so it looks like this:

```js
import { expect } from "meteor/practicalmeteor:chai";

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
```

So now our test is almost there, except that the `setProductToHank` function doesn't exist
and that's going to just give us another error. So let's add that function to a new file called `products.js` in
`/server/methods/core`.

That new function should just look like:

```js
import { check } from "meteor/check";

export function setProductToHank(productId) {
  check(productId, String);
}
```

And that's all for now.

Notice how we put `describe.only` in our first block? That means we want to only run _this_ test when
we run the suite. So now you should be able run `reaction test` and see our tests fail.

It should tell you what it expected and what it actually got. For this test it would have expected "Hank" and got some random Product title instead (the Product fixture add a random product title).

> Part of writing good tests is being able to see the success in good failures.

Now our test fails. So let's finish our method so that it satisfies our criteria.

```js
import { check } from "meteor/check";
import { Products } from "/lib/collections";

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

Now let's run the test again and it should pass. (if it doesn't, well you have found a bug,
see why tests are awesome?)

So we aren't done yet however because 1) our method is not available as a Meteor method and 2)
there are no security checks to ensure the user has the correct rights and 3) We don't do any validation

So let's do the validation first. Let's just do a simple check that the product exists before we try to
act on it. So let's update our method to look like this:

```js
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Products } from "/lib/collections";

export function setProductToHank(productId) {
  check(productId, String);
  const validProduct = Products.findOne(productId);
  if (validProduct) {
     return Products.update(productId, {
       $set: {
         title: "Hank"
       }
     }, {
       selector: { type: "simple" },
       validate: false
     });
  }
  throw new Meteor.error("product-not-found", "Product does not exist");
}
```

So what we did there was just check if we could pull the Product from the db and if we can't, throw an error. So now we will write a second test that verifies we get that error when we the product does not exist.

```js
import { expect } from "meteor/practicalmeteor:chai";
import { Products } from "/lib/collections";
import { setProductToHank } from "./products";

describe.only("Product-To-Hank", function () {
    describe("Calling product-to-hank", function () {
        it("should change product title to Hank", function () {
          const product = Factory.create("product");
          const productId = product._id;
          setProductToHank(productId);
          const changeedProduct = Products.findOne(productId);
          expect(product.title).to.equal("Hank");
        });

        it("should throw an error when the product does not exist", function () {
          expect(setProductToHank("invalidId")).to.throw(Meteor.Error, /Product does not exist/);
        })
    });
 });
```

Here we pass the function to the `expect` function and tell it to expect the function to throw a particular type of error.
In this case a Meteor error that contains the string: `Product does not exist`.

Now we should have two passing tests.

Next we want to make sure that this functionality is only available to users who have the "createProduct" permission. Now this check is only valid in the context of a logged in user (as opposed to being called from server code). So we are going to create a wrapper as a `Meteor.method` and do the check there. This will involve a little more magic.

First let's add our `Meteor.method` wrapper in our file.

```js
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Products } from "/lib/collections";

export function setProductToHank(productId) {
  check(productId, String);
  const validProduct = Products.findOne(productId);
  if (validProduct) {
     return Products.update(productId, {
       $set: {
         title: "Hank"
       }
     }, {
       selector: { type: "simple" },
       validate: false
     });
  }
  throw new Meteor.error("product-not-found", "Product does not exist");
}

Meteor.methods({
  "product/setToHank": function (productId) {
      check(productId, String);
      if (!Reaction.hasPermission("createProduct")) {
        throw new Meteor.Error(403, "Access Denied");
      }
      setProductToHank(productId);
  }
})
```

(Note that we have to do the `check` twice because `audit-argument-checks` will complain if we don't do a check
in a Meteor method, but we also want to check the argument when the function is called directly.)

So now we need to write a test that checks that the function throws an error when we are not a user with the correct permissions. So for that we are going to use the [`sinon`](http://sinonjs.org/docs/) library. This library provides what are called "stubs" and "spies".

It is beyond the scope of this document to describe these in general but you should see how we use them to test Reaction code with this example.

For this test we are going to create a "stub", that is, we will substitute our own function for a function that's going to get called during the test. That stub will look like this:

```js
const roleStub = sinon.stub(Roles, "userIsInRole", () => false);
```

What this code does is replace the code `Roles.userIsInRole` with our own function that always returns false. So our new test will look like this:

```js
import { expect } from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";
import { Products } from "/lib/collections";
import { setProductToHank } from "./products";

describe.only("Product-To-Hank", function () {
   describe("Calling product-to-hank", function () {
       it("should change product title to Hank", function () {
         const product = Factory.create("product");
         const productId = product._id;
         setProductToHank(productId);
         const changeedProduct = Products.findOne(productId);
         expect(product.title).to.equal("Hank");
       });

       it("should throw an error when the product does not exist", function () {
         expect(setProductToHank("invalidId")).to.throw(Meteor.Error, /Product does not exist/);
       });

       it("should throw an error when user does not have permission", function () {
         const roleStub = sinon.stub(Roles, "userIsInRole", () => false);
         expect(Meteor.call("product/setToHank", "someId")).to.throw(Meteor.Error, /Access Denied/);
         roleStub.restore();
       });
   });
});
```

So as we have mentioned, the first line "stubs" our the role check to always return false. Then we execute the method (it doesn't matter what product ID we use since it shouldn't get that far) and we expect it to throw an
access denied error. Since we have stubbed out the role check, after we are done with our test we need to
`restore` the method back to it's original state so that other code executes as normal.

And we're done. Now we want to remove the `only` from our test so that all tests can run and make
sure that all tests still run without error and we are ready to submit our pull request.
