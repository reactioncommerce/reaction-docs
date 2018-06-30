---
id: troubleshooting-development
title: Troubleshooting issues during development
sidebar_label: Development troubleshooting
---

When working in the Reaction codebase as a developer, many issues can arise due to misconfiguration, missing dependencies, operating system differences, and software bugs. Here are some tips for diagnosing and fixing these issues.

### I cloned the Reaction repo but when I run `meteor` it doesn't work

You need to install and use the Reaction command line tool in order to run Reaction. It does some work building the application
before the app starts that is not optional. You can install the CLI by doing `npm install -g reaction-cli`. Then you should be able to run `meteor npm install` and then start the app by running `reaction run` or just `reaction`.

### I get a `defined in resolvers, but not in schema` error on startup

This happens when you pull in changes to files with the `.graphql` extension but Meteor does not realize they've changed, due to aggressive caching and/or not watching them. The fix is to delete Meteor's cache, and the simplest way to do that is:

```bash
reaction reset
```

But note that this will delete Meteor's local database, too.

If you are running the app in Docker, the same command works and will not affect your data. You can run it in the Docker container if you want, but it's fine to run on the host machine since `.meteor/local` path is shared between them.