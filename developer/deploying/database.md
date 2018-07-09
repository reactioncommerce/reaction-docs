## List of indexes to add to make queries faster

1. `db.Catalog.createIndex({ createdAt: 1 })` 
1. `db.Catalog.createIndex({ "product._id": 1 })` - used in addToCart
1. `db.Catalog.createIndex({ "product.variants._id": 1 })` - used in addToCart
1. `db.Catalog.createIndex({ "product.variants.options._id": 1 })` - used in addToCart
1. `db.Products.createIndex({ "ancestors" : 1 })`
1. `db.Orders.createIndex({ cartId: 1, userId: 1 })`
1. `db.Jobs.createIndex({ status: 1, expiresAfter: 1 })`
1. `db.Assets.createIndex({ type: 1 })`
1. `db.users.createIndex({  roles: "hashed" })` - used in login
1. `db.users.createIndex({  "roles.__global_roles__": 1 })` - used in login
1. `db.users.createIndex({  "roles.J8Bhq3uTtdgwZx3rz": 1 })` - used in login
1. `db.Accounts.createIndex({ groups: 1 })` - used in login
1. `db.cfs.Media.filerecord.createIndex({ "metadata.type" : 1 })` - useful if media is stored in db
1. `db.cfs_gridfs.small.chunks.createIndex({ files_id: 1, n: 1 })` - useful if media is stored in db
1. `db.cfs_gridfs.image.chunks.createIndex({ files_id: 1, n: 1 })` - useful if media is stored in db
1. `db.cfs_gridfs.large.chunks.createIndex({ files_id: 1, n: 1 })` - useful if media is stored in db
1. `db.cfs_gridfs.thumbnail.chunks.createIndex({ files_id: 1, n: 1 })` - useful if media is stored in db
1. `db.cfs_gridfs.medium.chunks.createIndex({ files_id: 1, n: 1 })` - useful if media is stored in db
