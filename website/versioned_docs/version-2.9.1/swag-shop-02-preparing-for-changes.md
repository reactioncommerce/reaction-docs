---
id: version-2.9.1-swag-shop-2
title: Preparing for Upstream changes
original_id: swag-shop-2
---

If you are going to make changes, you will need to have your own copy of the repo: one that you can make your changes on seperate from the original repo. The simplest way to do that is to create a "fork".

### Method 1: Create a public fork through GitHub

If you go to the [example-storefront](https://github.com/reactioncommerce/example-storefront) repository and click on **Fork** you can now fork the repo into your own user or organization and push changes to it. You also "own" the repo in terms of adding collaborators, setting up webhooks, etc. 

One thing to be aware of is that by default PR's will be created against the "parent" repo i.e. the Reaction Commerce version. You can change this, but it can throw people so it's important to be aware of.

If you need a private repository, you cannot use this method. **You cannot create a private fork from a public repo**. So if you need to keep your development private you will need to use the second method below.

### Method 2: Create a new repo and point your clone at it

1. Clone [example-storefront](https://github.com/reactioncommerce/example-storefront) to your local machine
2. In your new clone, run `git remote remove origin`. This makes your clone no longer pointed at the Reaction repo.
3. Create a new private repository on GitHub. Get the new Git url for this repo by using the **Clone or download** button on the home page of the repo.
4. In your new clone, run `git remote add origin <your_new_repo_url>`. Your local copy is now pointed at your private repo.

## Pulling in Upstream changes

For either method, you may want to pull in upstream changes so to get any new features or bug fixes. 

To do this run:

```sh
git remote add rcmain git@github.com:reactioncommerce/example-storefront.git
```

Then to merge in upstream changes do:

1. `git fetch rcmain`
1. `git merge rcmain/master`

**Congratulations!** You are now all set up to begin customizing the Example Storefront.
