---
id: version-2.9.1-how-to-extend-graphql-with-remote-schema
original_id: how-to-extend-graphql-with-remote-schema
title: How To: Extend GraphQL with Remote Schema Delegation
---

If you have an external service providing a GraphQL interface and you would like to make it available via the main Reaction GraphQL API, here's how to do it. For this example, we'll use the [public sample Pokemon GraphQL API](https://github.com/lucasbento/graphql-pokemon) from `https://graphql-pokemon.now.sh`.

## Export your service's schema

Use the [`get-graphql-schema`](https://www.npmjs.com/package/get-graphql-schema) command line utility from npm to generate the Schema Definition Language (SDL) text file you need.

```sh
cat <<EOF | docker run --interactive node bash > pokemon.graphql
set -eu
npm install --silent --global get-graphql-schema >/dev/null
get-graphql-schema "https://graphql-pokemon.now.sh"
EOF
```

Incorporate that `pokemon.graphql` file into your plugin's directory structure.

## Load your schema and link your service

In your plugin's `register.js` file, load the schema and use the graphql-tools helper functions to generate a remote schema instance, which your plugin can then provide to Reaction.

```js
import Reaction from "/imports/plugins/core/core/server/Reaction";
import {
  makeExecutableSchema,
  makeRemoteExecutableSchema
} from "graphql-tools";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import schemaSDL from "./pokemon.graphql";

const pokemonUrl = "https://graphql-pokemon.now.sh";
const link = new HttpLink({ uri: pokemonUrl, fetch });
const exSchema = makeExecutableSchema({ typeDefs: schemaSDL });
const remoteSchema = makeRemoteExecutableSchema({ schema: exSchema, link });
Reaction.registerPackage({
  label: "Pokemon",
  name: "pokemon",
  icon: "fa fa-example",
  graphQL: {
    schemas: [remoteSchema]
  },
  autoEnable: true,
  functionsByType: {},
  settings: {},
  registry: []
});
```

## Verify your queries

Once your plugin is loading properly, execute the additional queries from your remote service via the Reaction GraphQL endpoint. The queries will be delegated to your service and responses will be merged together.

```graphql
# Submit this query via the reaction graphiql interface to verify
# the graphql schema delegation is working correctly
{
  pokemon(name: "Pikachu") {
    id
    name
    attacks {
      special {
        name
        type
        damage
      }
    }
    evolutions {
      id
      name
      weight {
        minimum
        maximum
      }
    }
  }
}
```
