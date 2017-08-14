# Command line

## reaction run

To start Reaction, run the `reaction` command

```js
reaction
```

This command runs a script that executes `meteor`. You can use any [Meteor command line option](http://docs.meteor.com/#/full/meteorhelp).

Browse to [http://localhost:3000](https://localhost:3000) and you should see Reaction running (sample data same as on demo site)

## reaction reset

To reset the Reaction database, and optionally clear development packages. This will give you a fresh test dataset from `reactioncommerce:reaction-sample-data`.

```sh
reaction reset
```

See the [package development documentation](developer/packages/packages.md)  and the [settings and fixture data documentation](developer/architecture/fixtures.md) for detailed instructions on modifying initial fixture data.

## reaction pull

```sh
reaction pull
```

You can just use `git pull`, but `reaction pull` will run a script that pulls all local packages as well as Reaction. It's the easiest way to make sure you're working with the complete developer package set.

```sh
cd reaction
reaction pull
reaction
```

You can also use `meteor upgrade` to upgrade to the latest Atmosphere published Meteor packages.

## reaction test

```sh
reaction test
```

Reaction server integration tests in the console.

## meteor

Full Meteor command line documentation can be found here: <http://docs.meteor.com/#/full/commandline>

```sh
meteor —settings settings/settings.json
```

Meteor command line options:

```sh
  --port, -p       Port to listen on (instead of the default 3000). Also
                   uses port N+1 and a port specified by --app-port.
                   Specify as --port=host:port to bind to a specific interface.
  --debug-port     Specify a port to enable server-side debugging. The
                   server will be paused at startup, waiting for incoming
                   connections from debugger clients on the specified port.
  --mobile-server  Location where mobile builds connect to the Meteor server.
                   Defaults to your local IP and the port that the Meteor
                   server binds to. Can include a URL scheme (for
                   example, --mobile-server=https://example.com:443).
  --production     Simulate production mode. Minify and bundle CSS and JS files.
  --raw-logs       Run without parsing logs from stdout and stderr.
  --settings       Set optional data for Meteor.settings on the server.
  --release        Specify the release of Meteor to use.
  --verbose        Print all output from builds logs.
  --no-lint        Don't run linters used by the app on every rebuild.
  --allow-incompatible-update   Allow packages in your project to be upgraded or
                   downgraded to versions that are potentially incompatible with
                   the current versions, if required to satisfy all package
                   version constraints.
  --test           [Experimental] Run Velocity tests using phantomjs and exit.
```
