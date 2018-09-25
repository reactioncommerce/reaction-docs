---
id: swag-shop-1
title: Understanding the Starter Kit
---

# Understanding what the Starter Kit is and is not

In the past one developed for Reaction Commerce by creating `plugins` and working with the main Reaction repo. This had advantages and disadvantages but some of the main disadvantages were:

1. Very slow reload times, especially for making styling changes
2. Limited ability to customize without modifying core
3. Using Meteor pub/sub, a technology that was unfamiliar to most devlopers

The Starter Kit takes a different approach. The Starter Kit is Javascript. The Starter Kit features:

1. Ultra fast restarts
2. Ability to completely customize the look, feel, and layout using standard web devlopment practices
3. Uses React + Apollo + GraphQL + NextJS. All technologies well known to Javascript developers and supported by a large, active community


Nothing says that you cannot build your implementation in Angular or Vue or PHP for that matter (don't do that). However, if you want a head start the Starter Kit can do that. You may or may not care about upstream changes because you are going to throw a lot of it away and start from scratch. Or you may only want to keep the logic part of the code (the containers) and change all the presentation components. How completely you want customize is totally up to you and there is no limit to how you can customize. The only issue is if you want to bring in upstream changes (bug fixes or new features that get added to the starter kit) This is still always possible but the more you customize the more difficult this will be. We are doing our best to structure the code so that you can customize some simple things but the more you customize, the harder it will be to update with each release. This tutorial assumes you want to make merging in upstream changes as easy as possible, and we will use techniques that make that easier, and point out where doing something will make that harder.