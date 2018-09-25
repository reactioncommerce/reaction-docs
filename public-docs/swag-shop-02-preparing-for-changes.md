---
id: swag-shop-2
title: Preparing for Upstream changes
---

# Forking the repo and setting up for upstream changes

If you are going to make changes you will need to have your own copy of the repo. One that you can make your changes on seperate from the original repo. The simplest way to do that is to create a "fork".


### Method 1: Create a fork through Github

If you go to the [starter-kit repo](https://github.com/reactioncommerce/reaction-next-starterkit) and click on 'Fork' you can now fork the repo into your own user or organization and push changes to it. You also "own" the repo in terms of adding collaborators, setting up webhooks, etc. One important caveat that you should know right away is that you cannot create a private fork from a public repo. So if you need to keep your development private you will need to use the second method. The other thing to be aware of is that by default PR's will be created against the "parent" repo i.e. the Reaction Commerce version. You can change this but it can throw people so it's important to be aware of.

### Method 2: Create a new repo and point your clone at it

1. Clone the starter kit repo to your local machine
2. In your new clone do `git remote remove origin`. This makes your clone no longer pointed at the Reaction repo.
3. Create a new private repository on Github. Get the new Git url for this repo by using the "Clone or download" button on the home page of the repo.
4. In your new clone do `git remote add origin <your_new_repo_url>`. Your local copy is now pointed at your private repo.

For either method you may want to pull in upstream changes so to get any new features or bug fixes. To do this do:

`git remote add rcmain git@github.com:reactioncommerce/reaction-next-starterkit.git`

Then to merge in upstream changes do:

1. `git fetch rcmain`
1. `git merge rcmain/master`

**Congratulations!** You are now all set up to begin customizing the Starter Kit