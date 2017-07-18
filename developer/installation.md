# Installation

[![Installation Video](/assets/guide-installation-video-screenshot.png)](https://www.youtube.com/watch?v=PkFDX8NWskY)

Getting started with Reaction is fast. First, make sure you have all the [ requirements](https://docs.reactioncommerce.com/reaction-docs/development/requirements).

Install the latest Reaction release with npm:

```sh
# Install command-line interface
$ npm install -g reaction-cli

# Verify your installation
$ reaction --version
```

You should see an output like:
```sh
Node: 7.0.0
NPM: 5.3.0
Meteor Node: 4.8.4
Meteor NPM: 4.6.1
Reaction CLI: 0.11.0
```

## Starting `reaction`

Now you're ready to start your Reaction project.

```sh
# Create a new Reaction app and install dependencies
$ reaction init

# Change directory to your app
$ cd reaction

# start Reaction
$ reaction run
```

The initial installation loads sample data from `private/data`. It might take a while.

Once you see `App running at:` in the console, point your browser to  [http://localhost:3000](https://localhost:3000).

Congrats! You have your first Reaction shop running locally.

To stop running `reaction`, use <kbd>CTRL</kbd>+<kbd>c</kbd>.

💡 **Tip!** Use `reaction` or `rc` as a shortcut for `reaction run`

## What's next?

#### Save the admin user credentials

Reaction creates an initial admin user. Remember to keep the email and password printed in the console to test admin features:

![](/assets/guide-installation-default-user.png)

#### Create a settings.json

Reaction provides you a `settings/dev.settings.json` file  and is configured to use that file by default.

To configure your own settings, create a `settings/settings.json`.

#### And more:
See the [package development documentation](/developer/packages/packages.md) and the [settings and import documentation](/developer/core/import.md) for detailed instructions on modifying initial fixture data.
