### Security
Community tested Meteor packages that enforce security rules are installed as required dependencies in Reaction Core.

**ongoworks/security**<br>**alanning:meteor-roles**<br>**audit-argument-checks**

Use [`check`](https://docs.meteor.com/#/full/check) for all `Meteor.methods` arguments.

You can remove with `meteor remove audit-argument-checks` if necessary, but packages will be required to pass `check` to be accepted as Reaction packages.

**browser-policy**

The [browser-policy](https://atmospherejs.com/meteor/browser-policy) package lets you set security-related policies that will be enforced by newer browsers. These policies help you prevent and mitigate common attacks like cross-site scripting and clickjacking.

`browser-policy` is installed by reaction-core and is not optional.

## Publishing
You can develop, or even deploy with your packages in the `reaction/packages` directory. If you'd like to publically share the package, you'll need to publish it to the Meteor package registry.

To have your package included in a Reaction release, please create a GitHub issue.

See [meteor publish](https://docs.meteor.com/#/full/meteorpublish) for details on publishing to the Meteor package registry.

_We can fork and publish packages under the reactioncommerce organization if the packages are included, and a pull request is made in reaction-core or reaction application distribution._
