---
title: Developing API Plugins
---

Let's take a closer look at how the Reaction Commerce headless API works, by building one from scratch.

```
mkdir my-reaction-api
cd my-reaction-api
echo "12.14.1" >> .nvmrc
nvm use
# run nvm install if prompted
npm init -y
touch index.js
```

(Note: You can choose a higher version of Node.js, but 12.14.1 is the minimum.)

This will create a simple Node.js app. Now open this directory in your favorite code editor. For example, enter `code .` to open it in Visual Studio Code.
Reaction Commerce API packages assume that your project is using ECMAScript modules, so first edit `package.json` and add `”type”: “module”`.
Also in `package.json`, add the following

```
"engines": {
  "node" : ">=12.14.1"
},
```

Add a start script in the scripts object:

```
"scripts": {
  "start": "node --experimental-modules --experimental-json-modules ./index.js"
},
```

Note: if you’re using Node.js 14+, the --experimental-modules flag is no longer necessary but --experimental-json-modules flag may still be needed
Then install the `@reactioncommerce/api-core` NPM package:

```
npm install @reactioncommerce/api-core
```

Edit the `index.js` file and paste in the following:

```
import { ReactionAPICore } from "@reactioncommerce/api-core";
import packageJson from "./package.json";
const api = new ReactionAPICore({
  version: packageJson.version
});
async function run() {
  await api.start();
}
run().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

This is technically all you need to do to create a barebones Reaction Commerce API. Before we start it, though, you’ll need a MongoDB server running on the default port on localhost. The quickest way to do this is:

```
docker pull mongo:4.2.0
docker run -p 27017:27017 mongo:4.2.0 mongod \
  --oplogSize 128 --replSet rs0 --storageEngine=wiredTiger
```

With the database now running, you can enter `npm start` in the `my-reaction-api` directory and you should see some startup logging ending with “GraphQL listening at http://localhost:3000/graphql (port 3000)”
If you go to that URL in any browser, you should see a GraphQL Playground UI. But view the Docs on the right side of the screen and you’ll notice that there are only 3 operations available: ping, echo, and tick. These are simple test operations included with the `api-core` package, but most of Reaction Commerce is missing! That’s because the stock Reaction Commerce API is really a combination of 37 API plugins, which need to be installed and registered.

## Registering a Plugin

To get an idea of what registering an API plugin entails, add this in the `run` function, above the `api.start()` call.

```
await api.registerPlugin({
  name: "test",
  functionsByType: {
    startup: [
      function testStartupFunction() {
        console.log("I am startup code for the test plugin.");
      },
    ],
  },
});

```

Press `ctrl+c` to stop the running API, and then `npm start` to start it again. It should now pick up our test plugin and you should see the startup logging. Hopefully this gives you an idea of how plugins work, but plugins can actually do much more than this, and we recommend that all plugins be separate packages that you can install with NPM. For more information, refer to https://github.com/reactioncommerce/api-core#plugins

## A Better Way to Register Plugins

We saw above how you can call `api.registerPlugin` one or more times before calling `api.start` to register plugins. You could `npm install` any plugin packages, import them into `index.js`, and then pass each one in to `api.registerPlugin`, but there is a simpler, more declarative way.
The recommended way to add plugins to a Reaction Commerce API project is by listing them in a JSON file:

1. Create a file `plugins.json` alongside `index.js`
2. npm install each plugin package you need
3. List all plugins in the `plugins.json` file, which is an object where each key is any unique identifier for the plugin and each value is the plugin package name, for example, `@reactioncommerce/api-plugin-carts`
4. In `index.js`, import and use the importPluginsJSONFile function from `api-core`

```
async function run() {
  const plugins = await importPluginsJSONFile("./plugins.json");
  await api.registerPlugins(plugins);
  await api.start();
}
```

Note that if you want to experiment with a plugin without yet creating a separate package for it, the keys in the `plugins.json` file can also be a relative path to a local ES module file that exports the package configuration.

## Stock Reaction Commerce

As we’ve seen, you can build a Reaction Commerce API from scratch with your own mix of plugins. However, if you have simple needs or just want to try it out, it’s unlikely that you’ll need to do that. There’s an easier way!

The `reaction` GitHub repo is a Node.js project in which we’ve already installed and registered a particular “blessed” set of API plugins. This is the API configuration that Reaction Commerce maintainers test against, and which we believe to be the most useful for most use cases. So you can start by simply cloning or forking that repository if you know how to do so.

In fact, this stock Reaction Commerce configuration is also published as a Docker image, so you can very easily install and run it on any computer or on Docker-based cloud hosting services, too.

But what about all of the related services and UI applications? As explained in the “Current Reaction Commerce Architecture” section, Reaction is actually made up of several different services. How do you run the whole system locally?

Well, actually all Reaction Commerce services are published as Docker images, so all you need to do is pull, configure, and run them, with proper connections among them. For an easy way to do this, there is the [Reaction Development Platform](https://github.com/reactioncommerce/reaction-development-platform), which is where most people, whether you are looking to try, demo, test, or develop Reaction Commerce, will want to start.

## Switching to Development Mode

Now let’s say you want to make some changes to a service and be able to see those changes reflected in the running service. By default, any changes you make do not affect the running service because all services run in standard mode. It’s done this way because it is much faster to start a service in standard mode. To develop a service, you need to switch it to development mode.
Development mode differs from standard mode in the following ways:

- A generic Node.js development Docker image is used for the container rather than the published service image.
- Your locally checked out project files, other than those under `node_modules`, are mirrored into the container by way of a Docker volume mount.
- NPM packages are installed when the container starts and therefore reflect the project’s `package.json` file. (In other words, you can add additional NPM dependencies and then stop and restart the container.)
- In the container, the project runs within nodemon, which will restart the app whenever you change any file in the project.

Switching a project to development mode is easy.

1. Start the whole system in standard mode using `make` command in the Reaction Development Platform directory.
2. Run `make dev-<project folder name>` for one or more services to restart them in development mode. For example, `make dev-reaction` if you want to make API changes.

But what exactly is this doing? Hopefully you don’t need to concern yourself with the details, but for those who want to know or who run into troubles, here’s the breakdown:

- Every project repo has two Docker Compose configuration files: `docker-compose.yml` for standard mode and `docker-compose.dev.yml` for dev mode. The dev mode file is intended to extend the standard file, so it isn’t a complete configuration.
- There is a feature built in to Docker Compose that looks for a `docker-compose.override.yml` file and uses it to extend `docker-compose.yml` whenever you run `docker-compose` commands.
- The `make dev-*` commands stop the service if necessary, symlink `docker-compose.dev.yml` to `docker-compose.override.yml` in that service’s project folder, and then restart the service with the dev override now in effect. Conversely the `make` command and other non-dev-mode `make` subcommands always remove the `docker-compose.override.yml` symlink before running the service, ensuring that it will revert to standard mode.

To put that another way, this sequence of commands:

```
make dev-reaction
cd reaction
```

is equivalent to this sequence of commands:

```
cd reaction
docker-compose down
ln -sf docker-compose.dev.yml docker-compose.override.yml
docker-compose pull
docker-compose up -d
```

## Developing API Plugins

Everything discussed so far has been true since the 3.0.0 release or earlier. With the 3.7.0 release, though, developing the API is slightly more complicated because almost all API code actually lives in NPM plugins, each of which lives in its own GitHub repository. You may be familiar with the `npm link` command as a way of temporarily linking NPM package code into a project to test before publishing it, but unfortunately `npm link` doesn’t work easily with code running inside a Docker container.

Initially, the solution was to use temporary Docker volume links to map NPM package code from the host machine into the `node_modules` directory in the API container. However, this had a number of rather severe down sides, including the fact that the `node_modules` folder in the linked plugin project folder on the host machine would often get completely deleted.
So Reaction Commerce 3.8.0 introduces two new scripts that implement a smarter way of linking in plugin packages (or any NPM packages): `bin/package-link` and `bin/package-unlink`.

But before we discuss the linking approach, let’s talk about how to clone the built-in plugin packages in the first place. There are nearly 40 API plugins. That’s a lot of repositories to clone, and it can be helpful to clone them all so that you can run searches across the full codebase. Fortunately, there is a quick way to do that, too:

```
make clone-api-plugins
```

When you run this command in the Reaction Development Platform directory, it will clone every built-in plugin into an `api-plugins` subfolder, alongside the service subfolders. You can then modify files in these plugins as necessary and link them into the API project to test them.

So back to the linking scripts. Let’s say you think there’s a bug in the built-in carts plugin. You cloned all the plugins and then changed a file in `api-plugins/api-plugin-carts` directory in an attempt to fix the bug. Now the first thing to do is to put the API in development mode if you haven’t already. After that, linking in your local carts plugin code is as simple as this:

```
cd reaction
bin/package-link @reactioncommerce/api-plugin-carts
```

The already-running API server will automatically restart to pull in your changes.

If your fix wasn’t quite correct and you make more changes to files in the carts plugin, you’ll have to run the link command again:

```
bin/package-link @reactioncommerce/api-plugin-carts
```

If necessary, you can run the link command for other plugins as well. You can even run it for other NPM packages that are not API plugins, but then you’ll need an additional argument that is the relative or absolute path to the package code on your host machine. For example:

```
bin/package-link some-other-package ../../some-other-package
```

(You can also use the code path argument for API plugin linking if you have cloned your API plugins to a non-standard location.)

When you’re done, be sure to unlink before stopping the API service or running `make stop`:

```
bin/package-unlink @reactioncommerce/api-plugin-carts
```

This linking approach works pretty well but has the potential to get the API into a state where it complains about missing dependencies and won’t start. If this happens and restarting the API service does not fix it, you will need to use the `docker volume rm` command to delete the API `node_modules` volume (usually named something like `reaction_api_node_modules`). If that doesn’t work, running `docker-compose down -v` in the `reaction` directory will work, but be careful because that command will also wipe out your local MongoDB database.

### Link multiples packages with package configuration file

Before running the `bin/package-link` script, create a `yalc-packages` file from the example.

```sh
cp yalc-packages.example yalc-packages
```

Then run the link script without any arguments
```sh
./bin/package-link
```

This will link every package in the `yalc-packages` file to your api app. If you don't want every plugin to be linked, edit `yalc-packages` and set the packages you want disabled and unlinked to `false`.

Format: `path=true|false`
```
../api-plugins/api-core=true
../api-plugins/api-plugin-accounts=true

```
(You must have a blank line at the end of the file, otherwise your last plugin will be omitted)

### Update package links on stop/start

If you've stopped, then started your container you may notice your linked packages have been reset. To re-link previously linked packages you can run the package update script.

```
./bin/package-update
```

(This runs `yalc update` under the hood, and only re-links packages in the `yalc.lock` file, and only if those packages are still published inside the docker container.)

Alternatively, if you've configured `yalc-packages`, then you can always run `./bin/package-link` again to re-link and update everything.