---
id: version-1.14.0-database-optimizations
title: Database optimizations
original_id: database-optimizations
---

## List of indexes to add to make queries faster

Start the Mongo client to connect to your database.

Run `use <database_name>` and run the following commands:

1. `db.Catalog.createIndex({ createdAt: 1 })` 
2. `db.Catalog.createIndex({ "product._id": 1 })` - used in addToCart
3. `db.Catalog.createIndex({ "product.variants._id": 1 })` - used in addToCart
4. `db.Catalog.createIndex({ "product.variants.options._id": 1 })` - used in addToCart
5. `db.Products.createIndex({ "ancestors" : 1 })`
6. `db.Orders.createIndex({ cartId: 1, userId: 1 })`
7. `db.Jobs.createIndex({ status: 1, expiresAfter: 1 })`
8. `db.Assets.createIndex({ type: 1 })`
9. `db.users.createIndex({  roles: "hashed" })` - used in login
10. `db.users.createIndex({  "roles.__global_roles__": 1 })` - used in login
11. `db.users.createIndex({  "roles.J8Bhq3uTtdgwZx3rz": 1 })` - used in login
12. `db.Accounts.createIndex({ groups: 1 })` - used in login
13. `db.cfs.Media.filerecord.createIndex({ "metadata.type" : 1 })` - useful if media is stored in db
14. `db.cfs_gridfs.small.chunks.createIndex({ files_id: 1, n: 1 })` - useful if media is stored in db
15. `db.cfs_gridfs.image.chunks.createIndex({ files_id: 1, n: 1 })` - useful if media is stored in db
16. `db.cfs_gridfs.large.chunks.createIndex({ files_id: 1, n: 1 })` - useful if media is stored in db
17. `db.cfs_gridfs.thumbnail.chunks.createIndex({ files_id: 1, n: 1 })` - useful if media is stored in db
18. `db.cfs_gridfs.medium.chunks.createIndex({ files_id: 1, n: 1 })` - useful if media is stored in db

If you are using the default Meteor database, you can connect to mongodb by running `meteor mongo` in the reaction directory.

Then `use meteor` and then run the above commands.