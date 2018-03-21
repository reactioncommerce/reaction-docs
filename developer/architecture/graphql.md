## Adding a new GraphQL Connection

In this example, we'll be adding a new `Groups` connection.

##For testing
- Add object to `.reaction/devserver/queries.js`

## the rest
add server function file where data is retrived
(`imports/plugins/core/accounts/server/methods/groupQuery.js`)

Add GroupConnection resolver
`imports/plugins/core/graphql/server/resolvers/account/GroupConnection.js`

Add GroupEdge resolver
`imports/plugins/core/graphql/server/resolvers/account/GroupEdge.js`

Impoprt hte above:
`imports/plugins/core/graphql/server/resolvers/account/index.js`

Add Group Query resolver
`imports/plugins/core/graphql/server/resolvers/account/Query/groups.js`

Import the above
`imports/plugins/core/graphql/server/resolvers/account/query/index.js`

Add shop Group Createdby resolver
`imports/plugins/core/graphql/server/resolvers/shop/Group/createdBy.js`

Add shop Group shop resolver
`imports/plugins/core/graphql/server/resolvers/shop/Group/shop.js`

Import the above
`imports/plugins/core/graphql/server/resolvers/shop/Group/index.js`

