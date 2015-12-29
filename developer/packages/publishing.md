# Publishing

You can develop, or even deploy with your packages in the `reaction/packages` directory. If you'd like to publicly share the package, you'll need to publish it to the Meteor package registry.

Use the [meteor publish](http://docs.meteor.com/#/full/meteorpublish) command line tool to publish a package to `Atmosphere`.

You will need to create a Meteor account at https://meteor.com

A new package (from the package root):

```
meteor publish —create
```

Or an update to an existing package:

```
meteor publish
```

See [meteor publish](https://docs.meteor.com/#/full/meteorpublish) for details on publishing to the Meteor package registry.


*To include your package in a Reaction release, please create a GitHub issue.*