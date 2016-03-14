This guide has been confirmed working as of 2015-01-22 for ReactionCommerce version 0.11.0

# Heroku

This will be a step by step guide on going from 0 to Heroku deployment for Reaction Commerce

If you don't have one already sign up for a [Heroku](https://signup.heroku.com/login) account.

Install the Heroku Toolbelt based on your OS [here](https://toolbelt.heroku.com/) and follow the heroku login instructions on the page.

# Reaction

Install a copy of reaction commerce.

```bash
git clone https://github.com/reactioncommerce/reaction.git
git checkout master 
heroku create
```

Heroku create generates a random app name, so let's change it.

```bash
heroku apps:rename (desired-name) --app (current-name) 
```

Now add a ROOT_URL environment variable 

```bash
heroku config:set ROOT_URL=http://(desired-name).herokuapp.com
```

Now Add a Mongolab instance (they have a free tier for heroku) 

```bash
heroku addons:create mongolab
```

Now we'll need to add the buildpack that'll let Meteor play nice with Heroku

```bash
heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
```

Finally

```bash
git push heroku master
```

Wait... And Done :) 