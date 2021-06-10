# ew-graphql
Graphql Service implemented by Akamai EdgeWoker

## Schema
```
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }
  
  type Book {
    id: ID!
    name: String!
    publisher: Publisher!
    authors: [Author!]!
  }
  
  type Publisher {
    id: ID!
    name: String!
    books: [Book!]!
  }
  
  type Query {
    authors: [Author!]!
    author(id: ID!): Author!
    books: [Book!]!
    book(id: ID!): Book!
    publishers: [Publisher!]!
    publisher(id: ID!): Publisher!
  }
```

## Example URLs

https://ewdemo.test.edgekey.net/graphql?query={books{name}}<br>
https://ewdemo.test.edgekey.net/graphql?query={books{name,authors{name}}}<br>
https://ewdemo.test.edgekey.net/graphql?query={books{name,authors{name},publisher{name}}}<br>
https://ewdemo.test.edgekey.net/graphql?query={books{name,authors{name},publisher{name,books{name}}}}<br>


## Known EW Issue
when upload bundle file to sandbox or staging, you will see error 
```
ERROR: got unexpected response from API:
{
  "type": "/sandbox-api/error-types/bad-request",
  "title": "Bad Request.",
  "detail": "Error in tarball file : [Error[message=uncompressed size exceeds the limit of 1 MB, type=MAX_UNCOMPRESSED_SIZE_EXCEEDED]]",
  "instance": "/sandbox-api/error-instances/f4a1637a-c44f-43ec-b02a-f3e60c9ba3c3",
  "status": 400,
  "path": "/sandbox-api/v1/sandboxes/d125b951-d59e-46cf-96b5-f545449d7a1a/edgeworkers/5939",
  "method": "PUT"
}
```
This is due to the EW limitation that bundled code size need to be < 1MB.
to avoid this error, you need to edit follwoing file

```
./node_modules/graphql-helix/dist/render-graphiql.js

const renderGraphiQL = (options = {}) => {
 ...
 const css = "[DELETE CODE]";
 const javascript = "[DELETE CODE]";
```

This will save more than 1MB of code size, and can deploy bundle without error.
