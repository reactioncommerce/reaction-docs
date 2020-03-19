---
id: version-3.0.0-graphql-what
title: What is GraphQL?
original_id: graphql-what
---

GraphQL is a query language that allows clients to make requests with POSTs over HTTP to a single URL. Those requests can indicate exactly which data they need back, and all data is sent back in the response. Both client and server are aware of a strongly typed shared schema, so data validation is automatic.

Before going much further in learning about Reaction’s GraphQL implementation, you should be sure to thoroughly read and understand the materials at https://graphql.org/learn/.

To understand our pagination approach, which is Relay-spec compliant, use these resources:
- http://graphql.org/learn/pagination/
- https://facebook.github.io/relay/docs/en/graphql-server-specification.html#connections
- https://facebook.github.io/relay/graphql/connections.htm
- https://www.apollographql.com/docs/react/features/pagination.html#relay-cursors
