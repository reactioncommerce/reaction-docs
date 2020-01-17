---
id: version-2.9.1-devs-breaking-changes
title: Identifying and Avoiding Breaking Changes
original_id: devs-breaking-changes
---

To understand whether a code change is breaking, we need to first break down the project into layers, or domains. Each domain has an interface and contract with one or more other domains. Assuming this contract is perfectly documented (which sadly isn't always true), then any change that breaks the contract is a breaking change.

Remember that breaking changes don't always happen in code. In the Reaction API project, there are GraphQL schemas, which represent a contract between the GraphQL API and all API consumers. There is also a MongoDB database, in which documents have a particular schema. That schema is a contract between the database and all code that directly queries the database.

## Functions

Perhaps the simplest code to analyze for breaking changes is a function. A JavaScript function has three aspects to its contract with calling code:
- The arguments it expects to receive
- What it does for the calling code, including possible side effects
- The return value it promises to pass back

Thus, for a function, the most important step is to ensure these three things are fully documented, such that the function caller has proper expectations. Then, when you need to change this function, the first goal should be to avoid breaking changes. For example:
- Add optional arguments or add optional fields to an object argument, but do not remove or reorder arguments or add required arguments or fields.
- Do not remove any side effects that are documented as being an intentional part of the function contract.
- Do not add any side effects that may cause unexpected behavior
- Add fields to an object return, but do not change the type of the return or of any of the fields on an object return.
- Do not mutate objects passed by reference if the function contract does not say that mutation will occur

> In Reaction JavaScript projects, to avoid getting stuck with unused arguments that can't be removed, we often use a single object argument rather than multiple positional arguments.

## Reaction API Plugins

Moving up from the function and file domain, in the Reaction API codebase we have the plugin domain. A plugin contract is made up of the following:
- Everything registered using `registerPlugin`
- Everything added to `context` in some other way
- Everything it promises to do
- Everything it adds to the database that other plugins rely on
- Everything it adds to the database or GraphQL schemas

In particular note that any function or field added to the `context` object must be considered public because any other plugin may be relying on it being there and behaving in a certain way.

We recommend that plugins do not directly access database collections owned by other plugins, but for historical reasons, it's currently pretty common. Because of this, you should consider most breaking database schema changes to be breaking the public contract as well. But if you are making a new plugin, you can consider the data storage mechanism and schema to be private concerns, as long as you provide a public API for accessing that data.

One feature of Reaction is that plugins can register stuff that other plugins have already registered, and the last one registered will win. For example, if you don't like a query function provided by a core plugin that you cannot remove, you can overwrite it with your own function. **If you do so, it's important to understand what that function's contract is and to write your override code with the same contract.** That way, all other plugins calling that function can continue to do so without needing to know that you've changed it.

## NPM Packages

Some Reaction code is in NPM packages. That is yet another domain that has its own contract with its consumers. In general, an NPM package contract is:
- The list of functions it exports from its "main" file, including their names if they are named exports
- The list of functions it exports from any other files that are a documented part of the package. It's actually possible to import from anywhere in an NPM package, so in one sense nothing that is exported from any file is private. However, if people import from an undocumented package path, they do so at their own risk.
- The function contract for each exported function (see function contract explanation above)
- Any side effects caused by just importing any of the entry points. These days it is considered bad practice for code in imported files to affect the overall environment, but this does sometimes come up. For example, importing a function from some package may have the side effect of polyfilling some property that it needs on `window`, or asynchronously loading a third-party library.

Increasingly, Reaction API plugins will be distributed as NPM packages. In this case, the public contract of the plugin package is a combination of the two lists above: the Reaction plugin contract and the NPM package contract.

## Reaction API

The broadest domain for the Reaction API project is the API itself. This contract is:
- The combined GraphQL schema
- The documented behavior of each GraphQL mutation
- The Express routes (their paths and what they serve)
- The way authorization works
- The MongoDB schema (Ideally this should be a private concern, but in practice third-party data synchronization often relies on this.)

Note that because the Reaction API is just the sum total of all API plugins and microservices, there isn't necessarily one official Reaction API contract. So most of the above actually bubble up from the API plugin contract, but it's important to understand how the plugins build on each other to collectively form a single API contract.

For example, the `simple-inventory` plugin adds a GraphQL mutation named `updateSimpleInventory`. If a Reaction installation has this plugin installed and then is redeployed without this plugin installed, the `updateSimpleInventory` mutation will now be missing from the API. This breaks the API contract of that particular Reaction installation and is technically a breaking change. However, it may be perfectly fine to make this change if the owner of the installation has previously updated their client apps to never call the removed mutation. The key is that you must understand what you are breaking and confirm that nothing will be affected by the break before you release it.

## Public vs Private

When looking out for breaking changes, you should note not only the domain boundaries, but also whether the altered code has any contracts beyond those boundaries. To put it more simply, is the contract private or public?

Thinking about a utility function, if that function is used only by other functions in the same file and is not exported, then it has a private contract. In this case, breaking changes are fine and need not be called out in release notes. Just be sure to update the function description and all places that call it.

By contrast, the entire cumulative Reaction API contract is public by definition.

## Deprecation

If you feel you need to break a public contract, it may be acceptable in some cases, but ideally you should first **deprecate** the part of the contract that you want to eventually change or remove. To deprecate something means to keep it working but recommend against using it. This gives function callers time to rewrite their calling code before the contract they rely on changes.

For example, if you want to rename a function argument field to clarify its purpose, you could simply rename it but that would break your argument contract. Instead, you can add a new optional argument field and make the existing field optional. Then log a deprecation warning when the original field is passed, and explain what new field to use in that warning.

There are many types of breaking changes and many different techniques for maintaining backwards compatibility, but the general idea usually involves keeping older code working alongside newer code for a transition period. Maintaining projects that do this is a lot more work and can be frustrating, but it is a much nicer experience for those who code against your public contract.

## Major Releases

A codebase with hundreds of deprecated things isn't any fun to maintain, so every so often we search the codebase for deprecated things and remove them entirely. All of the removals are called out as breaking changes in the release notes, and the major version number is increased for the release, following [semantic versioning](https://semver.org/).

## Versionless GraphQL

The [official GraphQL best practices](https://graphql.org/learn/best-practices/#versioning) talk about, and essentially recommend, that GraphQL APIs be "versionless", that is, that no breaking changes be made to GraphQL schemas, ever.

While we do aspire to this for the Reaction API, breaking changes are fine in major releases until we remove the "beta" designation from the API. Even then, removing deprecated parts of the API every few years will help keep the codebase maintainable.

## Meteor Methods

The Reaction API is being transitioned from Meteor to Node, but as of the writing of this article and the Reaction 2.0.0 release, there are still many Meteor methods and publications in the codebase. Some of these are used by Catalyst, the Reaction operator portal, while others may no longer be used but haven't been removed yet.

We have decided that, as a general rule, removing Meteor methods and publications
from the API codebase does not require a major version release. **Feel free to remove unused Meteor code, but call this out as a potential breaking change in your pull request.**
