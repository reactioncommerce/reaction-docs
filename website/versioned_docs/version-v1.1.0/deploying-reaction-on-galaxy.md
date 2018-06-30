---
original_id: deploying-reaction-on-galaxy
id: version-v1.1.0-deploying-reaction-on-galaxy
title: Galaxy
---
    
Free development hosting from [Meteor](http://guide.meteor.com/deployment.html#free-hosting) Development Group.

Deploying to Meteor.com with a developer account:

```sh
meteor deploy --settings settings/<prod-settings>.json <yoursite>.meteor.com
```

 A great service for sharing pre-production prototypes, but doesn't include `imagemagick`.

# Galaxy

Production quality AWS deployment from Meteor Development Group with some unique benefits for Meteor applications.

Deploying with a Galaxy account:

```sh
DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy your-app.com --settings production-settings.json
```

The [Meteor guide](http://guide.meteor.com/) has detailed [Galaxy](https://www.meteor.com/galaxy) [deployment instructions.](http://guide.meteor.com/deployment.html#galaxy)
