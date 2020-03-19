---
id: version-2.9.1-dev-debug-app-slowness
title: How To: Debug slowness
original_id: dev-debug-app-slowness
---

Nobody likes a slow experience on the web. But even worse than experiencing slowness is being tasked with figuring out *why* something is slow. When dealing with the Internet, there are layers upon layers of processing and transfer, and any layer or layers may be causing the slowness. In some cases, the cause may be that one layer is really slow. In other cases, there may be multiple slow layers, each of which are just a little bit slower than they should be, but the cumulative effect is unacceptable slowness.

Although this article won't delve into the subject, your first step when debugging slowness should be to rule out a network cause. Test on a fast network, with a wired connection, on a computer that is near the server's data center. If it's still slow, then proceed with the rest of this article.

## Step 1: Identify and describe the causal action

> Hint: Although the rest of this article is aimed at developers, anyone can do this step!

Before you start reading code and examining database queries, be sure that you understand the issue in the most specific terms possible. Answer the following questions:

- What user or system action begins the slowness? Document the specific reproduction steps.
- How slow is it and how fast should it be to meet your users' expectations?
- If it is user interface slowness, on what types of devices or which frontend apps does it happen?
- What, if anything, has changed since it was fast? Is there a different data set? Additional load? Configuration differences? A different set of plugins running?
- Is it slow in all environments? Is the problem still present if you reduce the number of plugins?

It is extremely important to drill down as far as possible before going further. If your issue description is "the listing page is slow", then you haven't gone specific enough. If your description is "when sorting by price, from low to high, on any listing page on a desktop browser, the listings take on average 7 seconds to load and paint, and we need that to be 2 seconds or less", then put on your hard hat and don your spectacles because it's time to debug some slowness!

## Step 2: Read some code

With your detailed issue description in hand, start reading code. If you are debugging frontend slowness, start with the relevant frontend code. Look at what queries it's making, what mutations it's calling, and what external libraries or resources it's loading. If possible, test each in isolation to narrow down where most of the slowness is coming from. Keep in mind the possibility that many slightly slow queries are adding up to more extreme slowness.

If you're able to narrow down browser slowness to a few GraphQL queries or mutations (or if you're investigating server-only slowness, such as a slow import), then turn your attention to the relevant server code. You'll dig deeper later, but for now, try to make a "suspect list" of functions, loops, or database queries that seem like possible causes. You'll need to investigate each one.

## Step 3: Reproduce the slowness on a local installation

Although you may be tempted to jump right to tweaking your production database and randomly adding indexes, you won't really be able to test and prove your slowness fix if you can't reproduce the slowness on your own local installation. If you're sure it's only a database issue, you might be able to get away with experimenting in a shared development or staging environment, but it's usually worth the extra bit of effort to get everything set up locally.

In general:

- Using a script or database export/import, try to create a representative database on your local installation.
    - Be sure that you have the same MongoDB indexes for the relevant collections as the environment in which you first saw the slowness.
    - You'll want about the same number of documents in the relevant collections, with similar data in each.
- Ensure that your environment variables, installed plugins, integrations, and shop settings are as close as possible to what they are in the slow deployed environment.

Then try the identified causal action and verify that you see similar slowness. If you can't reproduce the slowness locally, turn your attention back to possible problems with the network, server architecture, or allocated server resources. The rest of this article is specifically aimed at debugging and fixing slow code or database commands.

## Step 4: Profile any suspect database queries

> Read [the MongoDB indexing guidelines](https://docs.mongodb.com/manual/applications/indexes/) before going any further.

1. Connect to your local `reaction` database in a MongoDB shell, and enter the command `db.setProfilingLevel(1)`. This will begin logging all queries that take more than 100ms to a "system.profile" collection. For more details about this, see [this MongoDB documentation](https://docs.mongodb.com/manual/reference/method/db.setProfilingLevel/).
2. Run the app with debugging enabled. Follow the steps that produce slowness.
3. In the MongoDB shell, query to see what slow queries were logged:

    ```
    db.system.profile.find({}).sort({ ts: -1.0 });
    ```

4. Look through the slow queries.
    - The `command` field tells you what the Collection was, what type of query, and what the filter was. You can use this to locate the relevant area of code from the suspect list you made.
    - The `millis` field tells you how slow it was.
    - The `planSummary` field tells you whether an index was used and which index. If it contains the string `IXSCAN`, an index was used for the lookup. `IDHACK` is also good because it means the internal `_id` index was used. If it's `COLLSCAN`, this is probably why it's slow. Think about whether the query could be rewritten to include a field that is already indexed. If not, think about whether a new index might help. Refer to [the official MongoDB indexing docs](https://docs.mongodb.com/manual/tutorial/create-indexes-to-support-queries/)

5. If you've identified a slow query using `COLLSCAN`, at this point it's easiest to begin running each slow query directly in the MongoDB shell while trying various optimizations. There are two main ways to try to get MongoDB to use an index:
    - Modify the query to add a field that is already indexed. Keep in mind that this field value must be available to your code that is running the query.
    - Add a new index for the fields in your query. Do this [directly from the MongoDB shell](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/) for now.

6. After each fix you try, rerun the offending query and then rerun the `system.profile` query to see whether that query is still slow enough to appear in the results. (If it does still appear but it's now using `IXSCAN` instead of `COLLSCAN`, that's progress. Continue with these steps to see if other improvements can be made to make it faster.) You can add additional filters to the `find` to find only a particular command or collection. It's also helpful to filter out any queries that were in your previous results. To do this, copy the `ts` field value from the first document in your results, and add it to your next query filter:

    ```
    db.system.profile.find({
      ts: {
        $gt: ISODate("2019-04-26T02:29:39.315+0000")
      }
    }).sort({ ts: -1.0 });
    ```

## Step 5: Look at other potential causes

1. If a query is slow but it used an index for lookup, often the slowness is caused by the `sort`. Does the slow query have a specified sort, and if so, is there an index that supports that sort? If not, create one locally and check whether the query is faster.
    - Tip: A sort with multiple keys can only use an index with those same keys in the same order. The index direction need not be the same as the sort direction. For example, if the query sort is `{ createdAt: 1, _id: 1 }`, Mongo will use a `{ createdAt: 1, _id: 1 }` index or a `{ createdAt: -1, _id: -1 }` index, but it will not use a `{ createdAt: 1 }` index.
2. If a query is optimized and MongoDB is using an index for both lookup and sorting, look at what fields are being used by the code. It's always a good idea to include the `projection` option with a list of only the fields you actually need. This may not make a huge difference in the speed, but it benefits memory and bandwidth as well.
3. Sometimes no individual queries are slow enough to be flagged by MongoDB, but a certain block of code, often a loop or several nested loops, may be calling `findOne` many times in a row. If this is the case, consider doing a single `find` outside of the loop to get all of the relevant documents at once, and then `filter` or `find` in the local array of documents in the code loop. Similarly, you may be calling `updateOne` or `deleteOne` many times in a loop, which can be improved by composing [a MongoDB bulk operation](https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite/#db.collection.bulkWrite) in the loop and executing it once after the loop.
4. If there does not appear to be any database slowness but yet an action results in system slowness, consider how much work is being done as a result of that action. Does your CPU or memory jump much higher than you would expect? In a situation like this, especially if the system is trying to do many things in a code loop, consider using the job queue instead. Update your code loop to instead add jobs to a queue, and move the code from your loop into a worker, which can be invoked to work each job with throttling to prevent it from consuming all of your system resources while performing the work.

## Step 6: Next steps

When you are done debugging, in a MongoDB shell enter the command `db.setProfilingLevel(0)` to turn off profiling. Profiling slows down your database and should not be left on if you don't need it.

By this point, hopefully you've identified some code changes or new indexes that solve your slowness problem. To ensure that necessary indexes are created in all your environments, add `collectionIndex` calls in the related plugin's startup function [as described here](./dev-how-do-i#ensure-mongodb-collection-indexes-from-a-plugin).

If any of the related code is in Reaction core or community plugins (as opposed to being in your own custom plugins) and you believe that others would experience the same slowness, please take a minute to write an issue either [in the API repository](https://github.com/reactioncommerce/reaction/issues) or in the repository in which the relevant plugin lives. **In your issue, include all of the specific reproduction details from the first step of this article, as well as how you fixed it, how much faster it is after your fix, why you fixed it this way, and what other potential fixes you considered or tried.**
