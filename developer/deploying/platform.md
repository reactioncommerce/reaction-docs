# Reaction Platform

The following documentation is for paid users of [Reaction Platform](getrxn.io/reaction-platform).

The `reaction-cli` incorporates functionality for any team to deploy Reaction Commerce to multiple environments. [Visit reactioncommerce.com](http://getrxn.io/reaction-platform) to get a demo.

1. Get invite token from welcome email or contract
2. Register local environment
3. Create, add, and publish SSH keys
4. Create application environment
5. Deploy application

## Request invite token

As a paid user of the **Reaction Platform**, you'll receive an email containing a "invite token" from the Reaction Platform API ("Launchdock"). **Launchdock** is the name of our internal  orchestration management platform.

You will be asked for your invite token when you use the [reaction-cli](http://getrxn.io/reaction-cli) to register your local Reaction environment with the Reaction Platform API.

## Register local environment

### Update `reaction-cli`

Beforey you get started, make sure you have the latest version of the `reaction-cli` by running:

```sh
npm i -g reaction-cli
```

To confirm you have the latest version, run:

```sh
reaction -v
```

You should see the versions for `reaction-cli` and all of its dependencies:

```sh
$ reaction -v

Node: 8.2.1
NPM: 5.5.1
Meteor Node: 4.8.4
Meteor NPM: 4.6.1
Reaction CLI: 0.19.0
Docker: 17.09.0-ce
```

Now you're ready to get started.

### register

`reaction register` to create keys locally before configuring your application environment. `reaction login` authenticates you to the Reaction Platform and synchronizes platform services.

```sh
# Register with invite token
reaction register

# or if you've already registered, login with your username and password
reaction login
```

## apps

An "application" is an instance of Reaction Commerce plus any services, connectors, or container dependencies that are configured to deploy as one to an application environment.

```sh
#### apps list
# list your apps and their domains
reaction apps list
```

### create

Creating an "app" configures the environment that the built application will be deployed into.

```sh
# Create and configure your new app deployment
reaction apps create \
  --name <appname> \
  -e REACTION_USER="yourname" \
  -e REACTION_AUTH="P@s5w0rd" \
  -e REACTION_EMAIL="you@example.com" \
  --registry  path/to/reaction.json \
  --settings path/to/settings.json
```

### clone

Git clone a previously deployed app

```sh
# clone an app repo into ./my-app
reaction apps clone --app my-app

# clone an app repo to a custom path
reaction apps clone --app my-app --path ./optional/destination/path/
```

### delete

Deletes an application deployment.

```sh
# delete existing app deployment
reaction apps delete --name <appname>
```

## env

Configure environment variables for the application deployment.

```sh
# set/update environment variables
# (this triggers a redeploy of your app)
reaction env set \
  --app <appname> \
  -e SOME_API_KEY="ec89jmur3jim8e34" \
  -e SOME_OTHER_THING="dj8dr34ju3r@#$" \
  -e MAIL_URL="smtp://USERNAME:PASSWORD@NEW_HOST:PORT"

# unset environment variables
# (this triggers a redeploy of your app)
reaction env unset --app <appname> -e SOME_API_KEY -e SOME_OTHER_THING

# list your currently set environment variables
reaction env list --app <appname>
```

**--registry** pass a `reaction.json` to the environment

**--settings** pass a Meteor `settings.json` to the environment

## domains

```sh
# Add a custom domain for your app
# First, update your DNS to point your domain at: ingress.launchdock.io
# Once DNS has updated and works, set your custom domain for your app.
reaction domain set --app <appname> -d mycoolshop.com

# remove a custom domain from your app
reaction domain unset --app <appname> -d mycoolshop.com
```

## deploy

Submit your application for a deployment. This will begin the CI/CD/CD process. This begins a build process that is unique for every project. Expect this entire process to take around 20 minutes.

- test and build production bundle (continuous integration)
- build container image and publish (continuous delivery)
- deploy application cluster (continuous deployment)

```sh
# Deploy your application
reaction deploy --name <appname>
```

Expect to receive an email with the completed build status (failed or deployed).

## logs

To get all application logs since your app's last startup:

```sh
reaction logs --app <appname>
reaction logs -a <appname>
```

Hint: to get a list of all apps you have access to, run `reaction apps list`

### CI/CD Configuration

[Continuous integration configuration](https://docs.gitlab.com/ee/ci/) should be committed in [.reaction/ci/config.yml](https://github.com/reactioncommerce/reaction/blob/master/.reaction/ci/config.yml).

## Basic example

Below is an example `simple-demo` application deployment, setting the minimum required settings.

```sh
# create the application environment
reaction apps create --name simple-demo

# deploy application to the environment
reaction deploy --app simple-demo

# open your app in your browser once build/deployment has finished
reaction open simple-demo
```

## Full example

Below is a more complete example that sets up a SMTP mail server URL (for app emails), imports [Reaction registry](https://docs.reactioncommerce.com/reaction-docs/master/registry) settings and [Meteor settings](https://docs.meteor.com/api/core.html#Meteor-settings), and deploys the latest official Reaction Commerce image. Then we update the app with an API key environment variable.  And finally, we add a custom domain to the app and open it in our browser.

```sh
# create the app
reaction apps create \
  --name full-demo \
  -e REACTION_USER="yourname" \
  -e REACTION_AUTH="P@s5w0rd" \
  -e REACTION_EMAIL="you@example.com" \
  -e MAIL_URL="smtp://USERNAME:PASSWORD@NEW_HOST:PORT" \
  --registry  private/settings/reaction.json \
  --settings settings/settings.json

# deploy a Docker image
reaction deploy --app full-demo

# set/update an environment variable
reaction env set --app full-demo -e SOME_API_KEY="<secret API key>"

# add a custom domain
reaction domains add --app full-demo --domain mycoolshop.com

# list your apps to confirm your configuration, URL's, etc.
reaction apps list

# open your app in your browser
reaction open full-demo
```
