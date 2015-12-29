### Security
Community tested Meteor packages that enforce security rules are installed as required dependencies in Reaction Core.

**ongoworks/security**<br>**alanning:meteor-roles**<br>**audit-argument-checks**

Use [`check`](https://docs.meteor.com/#/full/check) for all `Meteor.methods` arguments.

You can remove with `meteor remove audit-argument-checks` if necessary, but packages will be required to pass `check` to be accepted as Reaction packages.

**browser-policy**

The [browser-policy](https://atmospherejs.com/meteor/browser-policy) package lets you set security-related policies that will be enforced by newer browsers. These policies help you prevent and mitigate common attacks like cross-site scripting and clickjacking.

`browser-policy` is installed by reaction-core and is not optional.
