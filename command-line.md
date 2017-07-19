## reaction run

The `run` command accepts all the options that Meteor's `run` command accepts. Run `meteor help run` to see the full list of options.

```sh
# Specify a different port to listen on
reaction --port 5000
```

Reaction adds the `--raw-logs` option by default.

## reaction pull

```sh
reaction pull
```

You could just use `git pull`, but `reaction pull` will update npm modules and other dependencies.

## reaction reset

Resets the Reaction database, updates npm modules, and optionally removes `node_modules` before updating.

This will give you a fresh test dataset from `private/data`.

```sh
reaction reset
```

Options:
-y
-n

## reaction debug

## reaction --help
