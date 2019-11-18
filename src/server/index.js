var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
  type Query {
    hello: String,
    name: String,
    age: String,
    id: ID
  }

  type User {
    id: ID
    name: String
  }
`);

var root = {
  hello: () => "Hello world!",
  name: "zhangyan",
  age: 30,
  id: 100
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
