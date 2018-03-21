## Adding a new GraphQL Connection

In this example, we'll be adding a new `Groups` connection, which will return a shops groups, if the user has permission to view them.

### Set up devserver data for testing
Use the [GraphQL schema](https://github.com/reactioncommerce/reaction/blob/feat-3915-mikemurray-gql-group/imports/plugins/core/graphql/server/schemas/group.js) to add test data for the devserver to use, and save into `.reaction/devserver/queries.js`

- Update schemas with new Connection data:
- - `imports/plugins/core/graphql/server/schemas/group.js`
- - `imports/plugins/core/graphql/server/schemas/shop.js`

- Create your functions / methods inside their appropriate folder inside their respective packages. In this case, we are creating our methods inside `imports/plugins/core/accounts/server/methods/groupQuery.js`.

- Create your Connection and Edge Resolvers, and import them:

- - `imports/plugins/core/graphql/server/resolvers/account/GroupConnection.js`
- - `imports/plugins/core/graphql/server/resolvers/account/GroupEdge.js`
- - `imports/plugins/core/graphql/server/resolvers/account/index.js`


- Create resolvers inside the `graphql` package, and import them:
- - `imports/plugins/core/graphql/server/resolvers/account/Query/groups.js`
- - `imports/plugins/core/graphql/server/resolvers/shop/Group/createdBy.js`
- - `imports/plugins/core/graphql/server/resolvers/shop/Group/shop.js`
- - `imports/plugins/core/graphql/server/resolvers/shop/Shop/groups.js`
- -
`imports/plugins/core/graphql/server/resolvers/shop/Shop/index.js`
- -
`imports/plugins/core/graphql/server/resolvers/shop/Group/index.js`
- - `imports/plugins/core/graphql/server/resolvers/account/query/index.js`
- - `imports/plugins/core/graphql/server/resolvers/account/index.js`

- Add namespace to namespaces util:
- - `imports/plugins/core/graphql/server/resolvers/util/namespaces.js`

- Create transforms GraphQL data:
- - `imports/plugins/core/graphql/server/resolvers/xforms/group.js`
