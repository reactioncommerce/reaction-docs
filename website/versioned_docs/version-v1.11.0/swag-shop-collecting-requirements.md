---
id: version-v1.11.0-swag-shop-collecting-requirements
title: Part 1: Collecting the shop requirements
original_id: swag-shop-collecting-requirements
---

> ⚠️ Note: This tutorial has been deprecated as the release of Reaction 2.0. The latest tutorial can be found at [here](https://docs.reactioncommerce.com/docs/swag-shop-1).

For me, as an engineer, the first encounter with people from our design team during a project's kick-off is always exciting. It’s usually the first time I actually get a deeper understanding on the challenges I’m going to work on for the next couple of weeks. It’s also the time I get first doubts about having a timeline that’s maybe too ambiguous. Sometimes I’m asking myself, “Why I did commit to something in advance before actually knowing exactly what I'm supposed to do?” But hey—I have solved this challenge before. Why should this swag shop project be any different?

To set the scene: in this particular project, our design team will play the role of the customer. Let's have a quick sneak peek into the ideas of our design team, shall we?

## Landing page designs
Below is a screenshot of the landing page layout that I've been given from the design team:

![](https://user-images.githubusercontent.com/1733229/33711844-b2fffe6c-db45-11e7-9a23-bbab24396004.png)

When I get to see the designs for a project the first time, I often feel a bit overwhelmed initially. What almost always helps me is to chop the things up into bite-sized chunks. Let's say the landing page shall be our first epic. Each part outlined in the chopped-up picture will be a task of the epic, which gets separated out into its own user story:

![](https://user-images.githubusercontent.com/1733229/33712085-794fd970-db46-11e7-9c57-60fff1d69f4b.jpg)

**Epic #1: Landing page**: This was derived from the above chopped-up picture, as well as additional information from the product owner. An epic called [Landing Page](https://github.com/reactioncommerce/reaction-swag-shop/issues/2) was created, which got the following tasks assigned:

- Header [#1](https://github.com/reactioncommerce/reaction-swag-shop/issues/1) (which itself consists of two parts)
 - Utility bar (Slogan, News-Link, Language, Sign-In)
 - Navigation bar (Brand, Categories, Search, Cart)
- Hero image
- Category tiles [#12](https://github.com/reactioncommerce/reaction-swag-shop/issues/12)
- Products we love (wrongly called Bestsellers in screen shot) [#13](https://github.com/reactioncommerce/reaction-swag-shop/issues/13)
- Static text section
- Responsive image gallery [#14](https://github.com/reactioncommerce/reaction-swag-shop/issues/14)
- Footer

**Note**: As you may have noticed, I didn't go the extra mile to consequently have a own user story for each outlined section. I've considered the `Hero` and the `static text` section to be small enough to have it covered by the epic itself.

The exact same thing was done for the remaining designs. I had a meeting with the design team and the product owners and had them explain how this piece of software is supposed to work. After that meeting, I felt “entitled” to write the user stories myself (my take-away: user stories don't necessarily have to be written from product owners :-).

**Epic #2: Category grid**: Our next epic is defined through the [Category Grid](https://github.com/reactioncommerce/reaction-swag-shop/issues/6) view:

![](https://user-images.githubusercontent.com/1733229/33216840-de11e922-d135-11e7-9afa-ef7fae915131.jpg)

This epic consists of three user stories. Follow the links if you're interested in how the Filter Bar is supposed to work:

- The Filter Bar feature from a shop visitor's (a.k.a. user) perspective [#7](https://github.com/reactioncommerce/reaction-swag-shop/issues/7)
- The Filter Bar feature from a shop admin's perspective [#20](https://github.com/reactioncommerce/reaction-swag-shop/issues/20)
- Displaying the results of a filtered search action [#15](https://github.com/reactioncommerce/reaction-swag-shop/issues/15)

**Epic #3: Product Detail Page (PDP)**: Our third and final epic, [Product Detail Page](https://github.com/reactioncommerce/reaction-swag-shop/issues/5), is derived from this design:

![](https://user-images.githubusercontent.com/1733229/33169183-f2b34bb6-d043-11e7-80d4-4df55c510ce8.jpg)

The third epic consists of three user stories:

- Implement product detail section [#9](https://github.com/reactioncommerce/reaction-swag-shop/issues/9)
- Feature: show similar products [#8](https://github.com/reactioncommerce/reaction-swag-shop/issues/8)
- Footer (which — strictly speaking — is not a user story specifically belonging to this particular epic, as it will be shown on almost every page) [#3](https://github.com/reactioncommerce/reaction-swag-shop/issues/3)

## Estimating

After writing all of these user stories, I've felt myself pretty conscious about what has to be done. The big question mark, however, still did not vanish: how much effort is this going to be? My idea was to actually try to estimate the complete project. Even though that does not adhere to pure Scrum, I felt this makes sense for several reasons:

- Scrum is suited for a long-running product life-cycle, which is not the case here. We need to push out this project as a one-off and tell our client how much this will cost. Almost impossible when going pure Scrum.
- This is going to be a rather small project where we don't expect for business requirements to change (we'll see if this thinking will prove naive..).
- I'm not expecting that a lot of people are going to work on this project. The collaboration aspect can probably be minimized.

To get a feeling how much work this will going to be, I've implemented one user story that can serve as reference task for the others. I've chosen the issue #1: [Implement swag shop header for all pages](https://github.com/reactioncommerce/reaction-swag-shop/issues/1).

The above task took me a little more than 1 day, albeit there's some project boilerplate included. Nevertheless, I was deliberately assigning that task 2 story points.

Having all estimations in place, it was pretty clear that the Filter Bar feature [#7](https://github.com/reactioncommerce/reaction-swag-shop/issues/7), [#15](https://github.com/reactioncommerce/reaction-swag-shop/issues/15), and [#20](https://github.com/reactioncommerce/reaction-swag-shop/issues/20) will be the most expensive with at least 8 story points. And within that 8 story points, the admin backend functionality was not even considered, because it was not specified yet how this should be going to work.

So we had another meeting with the product owner and explained the situation. When they realized that we were going to sell at most a few dozens article through our swag shop, but the Filter Bar would be the most expensive feature, they decided to postpone it to a possible later release of the shop. This is because a sophisticated filter mechanism is very useful for a shop offering hundreds or thousands of articles with different traits, but not so much for a shop with few dozens.

In the end, we agreed to strip down the functional requirements for our swag shop a bit, which resulted in different tasks to be labeled as phase2 in GitHub's [issue tracker](https://github.com/reactioncommerce/reaction-swag-shop/issues).

## What's next
Read in part 2 about how to setup a new [Reaction project](swag-shop-initialization).
