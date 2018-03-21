## Adding a new GraphQL Connection

In this example, we'll be adding a new `Groups` connection, which will return a shops groups, if the user has permission to view them.

### Set up devserver data for testing
Use the [GraphQL schema](https://github.com/reactioncommerce/reaction/blob/feat-3915-mikemurray-gql-group/imports/plugins/core/graphql/server/schemas/group.js) to add test data for the devserver to use, and save into `.reaction/devserver/queries.js`

- Create your functions / methods inside their appropriate folder inside their respective packages. In this case, we are creating our methods inside `imports/plugins/core/accounts/server/methods/groupQuery.js`.

- Create your Connection and Edge Resolvers, and import them:

- - `imports/plugins/core/graphql/server/resolvers/account/GroupConnection.js`
- - `imports/plugins/core/graphql/server/resolvers/account/GroupEdge.js`
- - `imports/plugins/core/graphql/server/resolvers/account/index.js`






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

