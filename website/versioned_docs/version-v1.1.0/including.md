---
original_id: including
id: version-v1.1.0-including
title: Priority
---
    
Package authors should choose a support path for their packages, and use the `priority` property in the **Reaction package registry** to indicate the kind of support path a package uses.

**Core**

Core packages are developed, and fully supported by the Reaction Core team.

```js
 priority: 1 // core
```

**Foundation**

Generally this is a repository that's been transferred to the reactioncommerce organization.

You can transfer a package repo to the Reaction Commerce Github organization (where you'll be given admin rights to the repo). Do this if you would prefer to not to be solely responsible for ongoing updates and compatibility maintenance. We'll adopt these packages as our own, and should be considered the most stable packages, and will be identified as **Core** packages.   Packages of this type should also provide reasonable integration testing coverage. Security tests on publications and methods are required. Must include continuous integration config file.

Foundation packages should be reliable for use as dependencies by other packages.

Any documentation blocks should contain your organization and author information, while if you need to document a maintainer, you can use `Reaction Commerce <maintainer at reactioncommerce.org>`.

In the package registry, packages of this type should be configured priority:2.

**Community**

If a package needs to distributed with the base Reaction app installation, we can create a reactioncommerce org **fork** of your package repo, and maintain a supported fork that we publish as a `reactioncommerce:*` package. These packages may be included in the default `.meteor/packages` file for Reaction.  Packages of this type should be configured as `Foundation` ,  `priority: 2` in the package registry.  Ideally these packages have CI and some testing coverage.

**Local** All other package types should be `priority:4`.

You want to manage all org, control and package publishing. You'll be responsible for compatibility updates and ensure that corresponding _Atmosphere and NPM_ package updates are published for every major Reaction release to maintain compatibility.  Packages of this type should be configured as `Public` ,  `priority: 3` in the package registry.

We'll do limited testing on these packages, so they will only be made available as optional packages that have to be manually added.

**Licensing**

The Reaction application is GPL v3 licensed. Package licensing may be GPL v3 compatible licenses such as GPL v3, MIT, APACHE v2 if you want to distribute with the Reaction application.
