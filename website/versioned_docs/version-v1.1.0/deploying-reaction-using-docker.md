---
original_id: deploying-reaction-using-docker
id: version-v1.1.0-deploying-reaction-using-docker
title: Docker
---

We think [Docker](https://www.docker.com) is one of the easiest ways to deploy modern apps and it's currently the recommended approach if you're hosting your own Reaction Commerce shop.  If you aren't using a customized version of Reaction, there are only a few steps to get up and running and you don't even need to know much about Docker to do it. Let's get started!

### Install

First, you should find the [Docker installer for your platform](https://www.docker.com/products/overview). This will install all of the Docker tools that you'll need for the rest of this section.

As described by Docker:

- **[Docker Engine](https://docs.docker.com/engine/understanding-docker/)** provides the core functions you need to create Docker images and run Docker containers.
- **[Docker Compose](https://docs.docker.com/compose/overview/)** defines and manages multi-container applications.
- **[Docker Machine](https://docs.docker.com/machine/overview/)** automates Docker host provisioning on your network or in the cloud.

The following documentation only aims to show you how to setup a production deployment of Reaction Commerce.  If you would like to learn more about the basics of Docker and how it might be useful for your development workflow, we strongly encourage reading Docker's [Getting Started docs](https://docs.docker.com/) and going through some of their [beginner tutorials](https://docs.docker.com/learn/).

Ok, let's do this!

### Deploy

Since the default Docker install only applies to a local development environment, the rest of these docs will assume you will be running Docker on a remote machine on the public internet so your containers will be accessible to anyone. Aside from the server setup, the process for running containers is identical either way, so you can go through the same steps locally to test your containers before deploying them publicly.

Ok, so step #1 will be to set up a Docker host to deploy to.  To accomplish this, we'll be using [Docker Machine](https://docs.docker.com/machine/overview/) to launch and manage a server on [Digital Ocean](https://digitalocean.com).

#### Docker Machine

Docker Machine has drivers for [most of the major cloud providers](https://docs.docker.com/machine/drivers/).  They each have their own settings, but the process is essentially the same for all of them.  We're going to focus on the Digital Ocean driver because it's one of the easiest to use. Only a few settings are required to start a new server, but see [the Digital Ocean driver docs](https://docs.docker.com/machine/drivers/digital-ocean/) for all of the available options.

Before you start a machine, you'll need to get an API key from your Digital Ocean account.  See "_[How Do I Get My API Credentials?](https://www.digitalocean.com/help/api/)_"

Once you have that, you're ready to use Docker Machine to provision a server. To do so, run:

```sh
docker-machine create \
  --driver digitalocean \
  --digitalocean-access-token <your API key> \
  --digitalocean-size 1gb \
  reaction-host
```

That command is fairly self-explanatory.  The name at the end (`reaction-host`) can be anything you want.  That's just a name for the machine that you will use to reference it with future commands.

Also note that the above command will create your server in the `nyc3` region by default.  If you'd like to change this, you can use the `--digitalocean-region` flag to set a different region.  Or you can set the `DIGITALOCEAN_REGION` environment variable to set a different default region to be used for all `docker-machine` commands.

Once your server is done launching, you just need to point Docker at it to start launching containers.  You can do that with the following command:

```sh
eval "$(docker-machine env reaction-host)"
```

Now when you run Docker commands, they will be executing on the remote server instead of your local machine.  Ok, let's fire up some Docker containers on your new server!

#### Docker

If you don't have a customized version of Reaction Commerce, you can use our official release builds that are [available on Docker Hub](https://hub.docker.com/r/reactioncommerce/reaction/) as `reactioncommerce/reaction:latest`. The official releases are built by [Circle CI](https://circleci.com/) every time code is merged into [the  branch on Github](https://github.com/reactioncommerce/reaction/tree/trunk).

All you need to run the latest stable build of Reaction is a single Docker command (assuming you have a Mongo database hosted somewhere - e.g. [Compose.io](https://compose.io), etc.)

```sh
docker run -d \
  -p 80:3000 \
  -e ROOT_URL="http://<your app url>" \
  -e MONGO_URL="mongodb://<your mongo url>" \
  -e REACTION_EMAIL="youradmin@yourdomain.com" \
  -e REACTION_USER="admin-username" \
  -e REACTION_AUTH="admin-password" \
  reactioncommerce/reaction:latest
```

Let's break down what's going on here...

The first argument (`-d`) means ["detached" mode](https://docs.docker.com/engine/reference/run/#detached-vs-foreground).  This allows your terminal to disconnect from the running container while it continues to run in the background.

Next is `-p 80:3000`.  That simply means that traffic going to port 80 on your Docker host will route to port 3000 on the container (Reaction's default exposed port).  So, in short... `-p host:container` [More info](https://docs.docker.com/engine/reference/run/#expose-incoming-ports).

The next two lines (`ROOT_URL` and `MONGO_URL`) are standard environment variables that are required by all deployed Meteor apps. `ROOT_URL` should be set to the URL that users will reach your site with and `MONGO_URL` should be the URL of your MongoDB deployment. (Note that you can and should use a `MONGO_OPLOG_URL` if your Mongo deployment is a replica set. [More info about the Mongo Oplog and Meteor](https://themeteorchef.com/snippets/setting-up-mongodb-oplog-tailing/)).

And finally, the last 3 environment variables (`REACTION_EMAIL`, `REACTION_USER`, `REACTION_AUTH`) are for your default admin user in Reaction.  If these variables are set the first time you run Reaction, a new user will be created for you with the email, username, and password you provide.

Now the only thing left to do is point your domain name for your site at the host you created with docker-machine.  To get the IP address of the host, you can simply run:

```sh
docker-machine ip <machine name>
```

So if you created you machine with the exact command above, it would be:

```sh
docker-machine ip reaction-host
```

Once you have your host IP, go to your domain name provider and point your domain name at that IP.

That's it.  You're done!  Once your DNS records update, you should then be able to access your deployed Reaction Commerce shop.
