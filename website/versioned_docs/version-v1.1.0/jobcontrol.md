---
original_id: jobcontrol
id: version-v1.1.0-jobcontrol
title: Job Control
---
    
Reaction Commerce has a Job Control system based on the excellent [job-collection](https://atmospherejs.com/vsivsi/job-collection) package. This allows you to run tasks in the background, separate from any user actions. You can easily extend or modify this to add your own jobs to do any kind of work where a task is appropriate.

There is a `Job` collection which is based on the `JobCollection` object provided in the package. You can then use then to build and queue your jobs.

There are essentially two parts you need to make your job active and that's a "Job Definition" and a "Job Schedule". You can look at the code we have built (in `imports/plugins/included/jobcontrol`) for fetching exchange rates as an example.

The `Jobs.processJobs` command creates the job definition (in this case just calling a Meteor method but it could be any code that can run on the server).

You can then use `new Job` to add the job to the queue. If you add the `cancelRepeats` option to the `save` portion, you can avoid adding duplicate jobs when you restart your server. You add them to the Event hooks for `onJobServerStart` or if you need to wait until the server is fully started you can use `afterServerInit`.
