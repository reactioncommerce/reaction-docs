# Launchdock

```sh
# Register with invite token
reaction register
```

**Set up an SSH key pair to securely communicate with Launchdock**

```sh
# https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
#
# create a new SSH key pair
ssh-keygen -t rsa -b 4096 -C "you@example.com"

# make sure the ssh-agent is running in the background
eval "$(ssh-agent -s)"

# add your new key to the agent
ssh-add -K ~/.ssh/<private key created above>

# add your public key to Launchdock
reaction keys add ~/.ssh/<keyname>.pub
```

**Create an app from a prebuilt image**

```sh
reaction apps create --name <appname> --image myorg/myapp:v1.0.0

# To deploy an updated version of your pre-built image
reaction deploy --name <appname> --image myorg/myapp:v1.1.0
```

**Or run a custom build** (waiting on Meteor 1.4.4 for this to work properly)

```sh
# (Must be in a Reaction project dir. This adds a git remote called 'launchdock-<appname>' to your project)
reaction apps create --name <appname>
# Push your custom code and start a build
reaction deploy --name <appname>
```
