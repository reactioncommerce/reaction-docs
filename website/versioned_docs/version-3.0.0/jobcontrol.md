---
id: version-3.0.0-jobcontrol
title: Background Jobs
original_id: jobcontrol
---

Reaction has a built-in background jobs plugin, `job-queue`. You can swap in a different plugin, but it is expected that you will make the same API available to all other plugins if you do so.

The public interface to background jobs is made up of the following:
- `context.backgroundJobs` object, available wherever you have context
- `backgroundJobs` option on `registerPlugin` calls

## Register a background job worker

Registering a worker is typically done in a plugin startup function:

```js
const workerInstance = await context.backgroundJobs.addWorker({
  type: "someUniqueJobType",
  async worker(job) {
      await doTheWork(job.data); // Whatever function you create that does the task
      job.done("Done message");
      // If anything throws, it will automatically call job.fail(errorMessage), but you
      // could also call job.fail yourself to provide better failure details.
  }
});
```

## Schedule a background job

To schedule a job for a worker, either on startup or anywhere you have context:

```js
const job = await context.backgroundJobs.scheduleJob({
  type: "someUniqueJobType",
  data: {}, // any data your worker needs to perform the work
  // Retry is optional
  retry: {
    retries: 5,
    wait: 60000,
    backoff: "exponential"
  },
  // Priority is optional
  priority: "normal",
  // Schedule is optional if you just need to run it once.
  // Set to any text that later.js can parse.
  schedule: "every day",
  // Set cancelRepeats to true if you want to cancel all other pending jobs with the same type
  cancelRepeats: true
});
```

## Cancel a background job

To cancel all scheduled jobs that match a certain filter:

```js
await context.backgroundJobs.cancelJobs({
  type: "foo",
  data: { shopId }
});
```

## Get a background job

To get a job by ID:

```js
const job = await context.backgroundJobs.getJob(jobId);
```

## Request background job cleanup

Plugins can request cleanup of their finished/old jobs through `registerPlugin`:

```js
app.registerPlugin({
  // ...
  backgroundJobs: {
      cleanup: [
        { type: "saveImage/local", purgeAfterDays: 7 },
        { type: "saveImage/remote", purgeAfterDays: 7 }
      ]
    }
});
```
