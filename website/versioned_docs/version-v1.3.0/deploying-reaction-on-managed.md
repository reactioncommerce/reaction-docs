---
id: version-v1.3.0-deploying-reaction-on-managed
title: Managed
original_id: deploying-reaction-on-managed
---

Reaction Commerce offers managed deployments for Reaction. The `reaction-cli` incorporates functionality for any team to deploy Reaction to multiple environments. [Contact us](https://reactioncommerce.com/#get-a-demo) to get a demo or request an invite.

`Launchdock` is the name of our registration gateway for the managed platform.

## Register/Login

As a user of the Reaction managed platform, you'll receive an email with a `Launchdock` registration token. You will be asked for this token when you register with `reaction-cli`.

**Register as a platform user**

```sh
# Register with invite token
reaction register

# or if you've already registered, login with your username and password
reaction login
```

## Apps

### Deployment

There are two ways you can deploy your apps with Launchdock.  The first is by using a prebuilt image that is hosted somewhere like [Docker Hub](https://hub.docker.com/) and the second is by pushing your custom code to our build servers where they will create a custom Docker image and deploy it.  Below are examples of both scenarios.

**Deploy with a prebuilt Docker image**

```sh
# Create and configure your new app deployment
reaction apps create \
  --name <appname> \
  --no-remote \
  -e REACTION_USER="yourname" \
  -e REACTION_AUTH="P@s5w0rd" \
  -e REACTION_EMAIL="you@example.com" \
  --registry  path/to/reaction.json \
  --settings path/to/settings.json

# Deploy your pre-built image
reaction deploy --name <appname> --image myorg/myapp:v1.1.0

# To deploy an updated version of your image,
# simply run the command again with your new image tag
reaction deploy --name <appname> --image myorg/myapp:v1.1.1
```

**Deploy a custom build**

Custom builds are pushed to Launchdock using git. It's essentially the same as doing a `git push` to Github. The only difference from the commands above is you omit the `--no-remote` flag and you don't need to specify an `--image` because you'll be building a custom image. That said, there are a few more setup steps required to push custom code.

First, you will need to set up an SSH key to securely communicate with Launchdock.

Set up an SSH key pair:

```sh
# https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
#
# create a new SSH key pair
# prompts for filename
# suggest "~/.ssh/launchdock" for ease
ssh-keygen -t rsa -b 4096 -C "you@example.com"

# make sure the ssh-agent is running in the background
eval "$(ssh-agent -s)"

# add your new key to the agent
ssh-add -K ~/.ssh/<private key created above>

# add your public key to Launchdock
reaction keys add ~/.ssh/<keyname>.pub
```

Then from your Reaction project directory:

```sh
# This adds a git remote called 'launchdock-<appname>' to your project
reaction apps create \
  --name <appname> \
  -e REACTION_USER="yourname" \
  -e REACTION_AUTH="P@s5w0rd" \
  -e REACTION_EMAIL="you@example.com" \
  --registry  path/to/reaction.json \
  --settings path/to/settings.json

# Push your custom code and start a new build
reaction deploy --name <appname>

# To build/deploy an updated version of your code,
# commit changes to your current branch
git commit -m "updated some code"
# and run the deploy command again
reaction deploy --name <appname>
```

### Configuration

**Environment Variables**

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

**Domains**

```sh
# add a custom domain for your app
# (first, update your DNS to point your domain at your app's default URL)
reaction domains add --app <appname> -d mycoolshop.com

# remove a custom domain from your app
reaction domains remove --app <appname> -d mycoolshop.com

# list your apps and their domains
reaction apps list
```

## Basic Example

Below is an example deployment using the latest official Reaction image from [Docker Hub](https://hub.docker.com/) and only setting the minimum required settings.

```sh
# create the app
reaction apps create \
  --name simple-demo \
  --no-remote \
  -e REACTION_USER="yourname" \
  -e REACTION_AUTH="P@s5w0rd" \
  -e REACTION_EMAIL="you@example.com"

# deploy a Docker image
reaction deploy --app simple-demo --image reactioncommerce/reaction:latest

# open your app in your browser
reaction open simple-demo
```

## Full Example

Below is a more complete example that sets up a SMTP mail server URL (for app emails), imports [Reaction registry](https://docs.reactioncommerce.com/reaction-docs/trunk/registry) settings and [Meteor settings](https://docs.meteor.com/api/core.html#Meteor-settings), and deploys the latest official Reaction image. Then we update the app with an API key environment variable.  And finally, we add a custom domain to the app and open it in our browser.

```sh
# create the app
reaction apps create \
  --name full-demo \
  --no-remote \
  -e REACTION_USER="yourname" \
  -e REACTION_AUTH="P@s5w0rd" \
  -e REACTION_EMAIL="you@example.com" \
  -e MAIL_URL="smtp://USERNAME:PASSWORD@NEW_HOST:PORT" \
  --registry  private/settings/reaction.json \
  --settings settings/settings.json

# deploy a Docker image
reaction deploy --app full-demo --image reactioncommerce/reaction:latest

# set/update an environment variable
reaction env set --app full-demo -e SOME_API_KEY="<secret API key>"

# add a custom domain
reaction domains add --app full-demo --domain mycoolshop.com

# list your apps to confirm your configuration, URL's, etc.
reaction apps list

# open your app in your browser
reaction open full-demo
```
