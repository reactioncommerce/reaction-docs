---
id: version-v1.2.0-deploying-reaction-on-managed
title: Managed
original_id: deploying-reaction-on-managed
---
    
Reaction Commerce offers managed deployments for Reaction. The `reaction-cli` incorporates functionality for any team to deploy Reaction to multiple environments.

`Launchdock` is the name of our registration gateway for the managed platform.

## reaction register

As a user of the Reaction managed platform, you'll receive an email with a `Launchdock` registration token.

**Register as a platform user**

```sh
# Register with invite token
reaction register
```

**Set up an SSH key pair to securely communicate with Launchdock**

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

## reaction create

**Create an app from a prebuilt image**

```sh
reaction apps create --name <appname> --image myorg/myapp:v1.0.0

# To deploy an updated version of your pre-built image
reaction deploy --name <appname> --image myorg/myapp:v1.1.0
```

**Or run a custom build**

```sh
# (Must be in a Reaction project dir. This adds a git remote called 'launchdock-<appname>' to your project)
reaction apps create --name <appname>
# Push your custom code and start a build
reaction deploy --name <appname>
```

## reaction deploy

```sh
# Push your custom code and start a build
reaction deploy --name <appname>
```

**Example deployment**

An example deployment with a custom smtp server and preconfigured settings deploying the latest Reaction image from Docker Hub.

```sh
reaction apps create --name demo
reaction env set \
--app demo \
-e REACTION_EMAIL="testing@yourdomain.com" \
-e REACTION_USER="Administrator" \
-e REACTION_AUTH="PaSSw0Rd" \
-e MAIL_URL="smtp://USERNAME:PASSWORD@HOST:PORT"


reaction deploy \
--name demo \
--image reactioncommerce/reaction:latest \
--registry ../config/reaction.json \
--settings ../config/settings.json

reaction domains add -a demo -d demo.yourdomain.com
reaction open -n demo
```
