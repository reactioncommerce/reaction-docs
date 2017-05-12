# Deploying

Reaction is an open source platform, and you can run Reaction anywhere just like regular Node.js or Meteor applications. Operating Meteor apps correctly, so that your apps work for everyone, can be tricky if you are managing your infrastructure manually. This is why we recommend running production Reaction deployments on the [Reaction Commerce managed platform](https://reactioncommerce.com/features#get-a-demo).

If you are looking to deploy Reaction manually, head on over to the [Meteor deployment documentation](https://guide.meteor.com/deployment.html) for an excellent, detailed tutorial.

## Images

Docker images are pushed when Reaction successfully builds and passes all tests on the `master` or `development` branches. These images are released on [Reaction Commerce Docker Hub](https://hub.docker.com/u/reactioncommerce/). There are two images available: [reactioncommerce:prequel](https://hub.docker.com/r/reactioncommerce/prequel/) - the latest `development` image and [reactioncommerce:reaction](https://hub.docker.com/r/reactioncommerce/reaction/), the `master` image.

All Reaction [configuration options](configuration.md) can be used with these deployment choices.

Reaction can be deployed as a [standard Node application](https://guide.meteor.com/deployment.html) or as a [Docker container](https://www.docker.com/).

The Reaction core team recommends using Docker for deploying Reaction.

We recommend you deploy with at least **2GB of memory** for Node and Reaction to run well.

-   [Docker and AWS](deploying/docker.md)
-   [Galaxy (MDG)](deploying/galaxy.md)

The database is included in development, and our containers also include a MongoDB instance inside the container, but it is only intended for development and testing. It’s not a production solution, and you should provide an external replica-set db instance with oplog access enabled for production deployment.

## Build System

While Meteor provide some key framework components to Reaction, the heaviest lifting is the build system. The `reaction-cli` command line tool wraps the Meteor command line functionality and provides additional Reaction specific deployment options in addition to the Meteor build system.

You can [read the entire guide for the Meteor build system](https://guide.meteor.com/build-tool.html), but the sections below are direct from that page, compiled for just the most Reaction relevant portions.

### Meteor build system

The Meteor build system is the actual command line tool that you get when you install Meteor. You run it by typing the `reaction` command in your terminal, possibly followed by a set of arguments. Read the [docs about the command line tool](https://github.com/reactioncommerce/reaction-cli) or type `reaction help` in your terminal to learn about all of the commands.

#### What does it do?

The Meteor build tool is what compiles, runs, deploys, and publishes all of your Meteor apps and packages. It's Meteor's built-in solution to the problems also solved by tools like Grunt, Gulp, Webpack, Browserify, Nodemon, and many others, and uses many popular Node.js tools like Babel and UglifyJS internally to enable a seamless experience.

#### Reloads app on file change

When you run `reaction`, the tool starts up, and you should leave it running continuously while developing your app. The tool automatically detects any relevant file changes and recompiles the necessary changes, restarting your client or server environment if needed.

#### Compiles files with build plugins

The main function of the Meteor build tool is to run "build plugins". These plugins define different parts of your app build process. Meteor puts heavy emphasis on reducing or removing build configuration files, so you won't see any large build process config files like you would in Gulp or Webpack. The Meteor build process, and [file load order](structure.html#load-order), is configured almost entirely through adding and removing packages to your app and putting files in specially named directories. For example, to get all of the newest stable ES2015 JavaScript features in your app, you just add the [`ecmascript` package](http://docs.meteor.com/#/full/ecmascript). This package provides support for ES2015 modules, which gives you even more fine grained control over file load order using ES2015 `import` and `export`. As new Meteor releases add new features to this package you just get them for free.

#### Combines and minifies code

Another important feature of the Meteor build tool is that it automatically concatenates and minifies all of your files in production mode. This is enabled by the [`standard-minifier-js`](https://atmospherejs.com/meteor/standard-minifiers-js) and [`standard-minifier-css`](https://atmospherejs.com/meteor/standard-minifiers-css) packages, which are in all Meteor apps by default. If you need different minification behavior, you can replace these packages. Below, we'll talk about how to [switch out a minifier to add PostCSS to your build process](#postcss).

#### Development vs. production

Running an app in development is all about fast iteration time. All kinds of different parts of your app are handled differently and instrumented to enable better reloads and debugging. In production, the app is reduced to just the necessary code, and functions like a regular Node.js app. Therefore, you shouldn't run your app in production by running the `reaction` command. Instead, follow the directions in the [production deployment article](https://guide.meteor.com/deployment.html#custom-deployment).

#### JavaScript transpilation

These days, the landscape of JavaScript tools and frameworks is constantly shifting, and the language itself is evolving just as rapidly. It's no longer reasonable to wait for web browsers to implement the language features you want to use. Most JavaScript development workflows rely on compiling code to work on the lowest common denominator of environments, while letting you use the newest features in development. Meteor has support for some of the most popular tools out of the box.

### CSS & LESS

#### Source vs. import files

An important feature shared by all of the available CSS pre-processors is the ability to import files. This lets you split your CSS into smaller pieces, and provides a lot of the same benefits that you get from JavaScript modules:

1.  You can control the load order of files by encoding dependencies through imports, since the load order of CSS matters.
2.  You can create reusable CSS "modules" that just have variables and mixins and don't actually generate any CSS.

In Meteor, each of your `.scss`, `.less`, or `.styl` source files will be one of two types: "source" or "import".

A "source" file is evaluated eagerly and adds its compiled form to the CSS of the app immediately.

An "import" file is evaluated only if imported from some other file and can be used to share common mixins and variables between different CSS files in your app.

Read the documentation for each package listed below to see how to indicate which files are source files vs. imports.

<h3 id="css-importing">Importing styles</h3>

In all three Meteor supported CSS pre-processors you can import other style files from both relative and absolute paths in your app and from both npm and Meteor Atmosphere packages.

```less
@import '../stylesheets/colors.less';   // a relative path
@import '{}/imports/ui/stylesheets/button.less';   // absolute path with `{}` syntax
```

You can also import CSS from a JavaScript file if you have the `ecmascript` package installed:

```js
import '../stylesheets/styles.css';
```

> When importing CSS from a JavaScript file, that CSS is not bundled with the rest of the CSS processed with the Meteor Build tool, but instead is put in your app's `<head>` tag inside `<style>...</style>` after the main concatenated CSS file.

Importing styles from an Atmosphere package using the `{}` package name syntax:

```less
@import '{my-package:pretty-buttons}/buttons/styles.import.less';
```

> CSS files in an Atmosphere package are declared with [`api.addFiles`](http://docs.meteor.com/#/full/pack_addFiles), and therefore will be eagerly evaluated, and automatically bundled with all the other CSS in your app.

Importing styles from an npm package using the `{}` syntax:

```less
@import '{}/node_modules/npm-package-name/button.less';
```

```js
import 'npm-package-name/stylesheets/styles.css';
```

#### Minification

The current best practice for deploying web production applications is to concatenate and minify all of your app assets. This lets you add all of the comments and whitespace you want to your source code, and split it into as many files as is necessary without worrying about app performance.

Every Meteor app comes with production minification by default with the `standard-minifier-js` and `standard-minifier-css` packages. These minifiers go to some extra effort to do a good job - for example, Meteor automatically splits up your files if they get too big to maintain support for older versions of Internet Explorer which had a limit on the number of CSS rules per file.

Minification usually happens when you `reaction deploy` or `reaction build` your app. If you have an error in production that you suspect is related to minification, you can run the minified version of your app locally with `reaction --production`.
