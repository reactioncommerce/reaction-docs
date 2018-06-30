---
id: version-v1.4.0-plugin-fixtures-5
title: Fixtures
original_id: plugin-fixtures-5
---
    
As we have been going through this tutorial you may have noticed that we keep having to `reaction reset` which clears
out all your data in the database.

If you are just learning and playing with the sample data this is fine. But if you want to start customizing your store
by changing things like the name then you may find this a little frustrating. Even more so, if you have started
creating products you probably don't want to reset your data and lose your work. So we are going to fix that by
creating "fixtures".

When we create fixtures we are going to create JSON files that contain the "static" data that makes up your site
(as opposed to things like orders). This is usually really helpful when developing as you may want to dramatically
change the way some things are stored in the database but don't want to start over with the stock data.

The sample data files are located at `private/data` in the example repo. To use them you need to copy them to the `private/data`
directory at the root of your project.

Now let's look at the data we moved over. There are four files there `Shops.json`, `Products.json`, `Shipping.json` and `Tags.json`.
Primarily we are going to be concerned with Shops and Products but these are not the only types of data you can import.
If you want to import other data types please consult the main documentation under "Import".

Let's look at the Shops file. There is a lot of stuff there and a lot of it you won't want to change (unless you have
revolutionary opinions about how many provinces Canada has, etc.). But there are some critical pieces to change.

The first thing we are going to do is remove the `<blank store>` record. This second entry is to highlight how you
can have multiple stores within Reaction Commerce. However for the purposes of this tutorial we are just creating the
one store so the second one just adds confusion so let's remove the whole record. (Shops is an array of Shop records,
so you can just delete the second entry in the array).

Now if you look at the top level records in the first shop you will see a lot of things that you want to change.
Critical things like Name and Description. You will also want to look at the `addressBook` entry.

After you change those entries and reset, you will now see your new entries take effect. Remember, if you make
changes within the site those settings **will not** be saved when you reset unless they are stored in this file.

## Sidebar: How do I look at my data? Where is it?

When in development mode Meteor uses its own copy of Mongo and will use the port that your dev server is running on +1.
You can use [RoboMongo](https://robomongo.org/) or similar GUI's to see your data. Or alternately you run run `meteor mongo`
while your application is running and query your data via the command line.

If you look at the `Shops` collection in the database you can see that it pretty much looks exactly like the JSON files
you have. This makes it relatively easy to make a change in the admin, look at the changed record in the db, and then
replicate that change in the JSON, saving your change for all eternity. (or you can use the export method that we talk
about next, but knowing where things are in the Shops collection can be fairly valuable when developing)

## Creating the Products files

Our Bee's Knees example store is relatively simple with just a few products. However your store may be much more complex
with possibly hundreds of products. And even with a few products, the process of looking at the database and changing
records is tedious and unreliable. The better way is to create your products in Reaction and then export them to a file.

To do this we are going to use the `mongoexport` utility which is only installed with a "full" installation of MongoDb
(i.e. not included with the version installed with Meteor. Please see the Mongo documentation on how to install Mongo on
your platform).

You will need to run the export utility against the running Mongo version for your local shop. The Meteor Mongo always
defaults to the port you are running Mongo on +1. If you used the default port of 3000, then your Mongo is running on
port 3001 so your command to export the `Products` collection would be:

```sh
mongoexport --db meteor --collection Products --port 3001 --jsonArray --pretty > Products.json
```

Note that while MongoDB is not a relational database, things like Products and Shops are tied to each via their unique
ID's. So it's good to be conscious of that when exporting things. For example, all products are tied to a Shop and if
you don't have a Shop with that ID the import will not work.

Now you should have your fixtures ready to go. Remember that they need to be placed in the `private/data` directory
at the root of the project to be imported automatically.

Next: [Creating Custom Routes](plugin-routes-6.md)

## Read More

[Mongo Export](https://docs.mongodb.com/manual/reference/program/mongoexport/
)
