---
id: writing-jest-unit-tests
title: Writing Jest Unit Tests
---
    
Every component and utility function must have a corresponding file containing unit tests. All tests are written using, and run by, the [Jest](https://facebook.github.io/jest/) test framework, which is based on the Jasmine framework. If you haven't used Jest, you should read their documentation to get familiar.

If you make changes in a file that does not have unit tests, you must create a unit test file and add all necessary tests to achieve full coverage of that file. This includes testing all existing code as well as your new changes. Often it is easiest to begin your development by writing all of the missing tests without changing the actual code. Then you'll have a better idea of what your changes have done.

## Test Files

Files containing tests for a component must end in `.test.js` and be named after the component. Files containing tests for a utility function must end in `.test.js` and be named after the utility function. They live in the same folder as the file they are testing.

## Code Style for Tests

- Follow the same code style and eslint rules as for the codebase in general.
- Jest tests are automatically file scoped. This means that your test file does not need a `describe` block in it. You _may_ add multiple `describe` blocks to group related tests within the file, but you _should not_ have a file with only a single `describe` block in it. (It will not break anything, but it diminishes simplicity and readability.)
- Jest test functions can be defined using either `it()` or `test()`. Because it is more understandable, we require you to always use `test()`.
- `describe`, `test`, `jest`, `jasmine`, and `expect` are automatic globals in all test files. You do not need to import them from anywhere.
- Use arrow functions for all `describe` and `test` functions.
- Use the built-in `expect` for assertions. See [the documentation](https://facebook.github.io/jest/docs/en/expect.html#content).

## Testing Asynchronous Code

Often you need to test asynchronous code in a Jest test, functions that either return a Promise or take a callback argument.

Reaction code should prefer Promises over callbacks, but when you need to use a callback due to the API of other packages, you can. Where callbacks are involved, make sure to add a `done` argument to your test function and call `done` when all testing is done.

The Jest documentation has a good article about this, so refer to that:

- Preferred in Reaction: [Async/Await](https://facebook.github.io/jest/docs/en/asynchronous.html#async-await)
- Use if it makes a test shorter or easier to read: [resolves/rejects](https://facebook.github.io/jest/docs/en/asynchronous.html#resolves-rejects)
- For callbacks: [Callbacks](https://facebook.github.io/jest/docs/en/asynchronous.html#callbacks)

## Mocking

Jest has its own mocking capability. This will come in handy when testing modules that depend on other modules.

You generate a Jest mock by:

```js
const myMockFunc = jest.fn().mockName("myMockFunc");
```

The `mockName` helps make the test results more readable. This mock function can be invoked as any other function, but by default, it won't return a value.

```js
console.log(myMockFunc()) //undefined
```

Jest mock functions keep track of invocations on their `mock` property, and Jest has [plenty of matchers](https://facebook.github.io/jest/docs/en/mock-functions.html#custom-matchers) that help you expect a certain number of calls with certain arguments.

Jest also has a mock generator for entire modules. We do this by calling the following method:

```js
jest.mock("./exampleModule");
```

It will look into the `exampleModule` and notice that, for example, exampleModule exports an object with a method called `fruits()`. It then creates a fake object with a fruits() method thats a mock function. This fake exampleModule is then used everywhere in the tests as opposed to the real exampleModule.

For more details, refer to the [Jest documentation for mocks](https://facebook.github.io/jest/docs/en/mock-functions.html)

### Mocking with Rewire

This project includes the [rewire-exports](https://www.npmjs.com/package/babel-plugin-rewire-exports) Babel plugin, which you can use to temporarily replace anything that another file exports. This is useful for mocking functions that are imported by the function that you're testing.

Refer to the package documentation for complete details, but in general the process is this:

1. Import `rewire` and `restore` for the function you're testing. These are fake exports added during testing.

  - If you're testing the default export, then the exports are named just `rewire` and `restore`, but you should rename them to `rewire$<export name>` and `restore$<export name>` to better identify the function or other object you are mocking. For example, `import { rewire as rewire$tokenExpiration, restore as restore$tokenExpiration } from "./tokenExpiration";`
  - If you're testing a named export, then the exports are already named `rewire$<name>` and `restore$<name>` by the package.

2. Add a `beforeAll` in which you call `rewire$<name>` and pass it a mock. The mock must be the same type as is exported. For example, `rewire$someFunction(mockFunction)` or `rewire$someObject(mockObject)`.
3. Add an `afterAll` in which you call `restore$<name>` for each export that you've rewired.

```js
// Example usage
import { 
  rewire as rewire$importedFunc, 
  restore as restore$importedFunc 
} from "./importedFunc";
import testedFunc from "./testedFunc";

const mockImportedFunc = jest.fn().mockName("importedFunc");

beforeAll(() => {
 rewire$importedFunc(mockImportedFunc);
});

afterAll(() => {
  restore$importedFunc(mockImportedFunc);
});

test("example test", () => {
  mockImportedFunc.mockReturnValueOnce("mockValue");
  const spec = testedFunc();
  expect(spec).toEqual({ mockProp: "mockValue" });
});
```

Search the codebase for "rewire" to find more examples.

## Rendering Components In Tests

Refer to [Writing Jest Tests for React Components](react-testing.md)
