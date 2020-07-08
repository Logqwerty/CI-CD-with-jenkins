require("dotenv").config();
const express = require("express");
const monogoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const UserSchema = new monogoose.Schema({
  name: { type: String, require: true },
  age: { type: Number, require: true },
});
const UserModel = monogoose.model("User", UserSchema, "users");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    user: User
  }

  type User {
    name: String
    age: Int
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: () => UserModel.findOne({ name: "aaa" }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

(async () => {
  try {
    await monogoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      auth: {
        user: DB_USER,
        password: DB_PASSWORD,
      },
      authMechanism: "SCRAM-SHA-1",
      authSource: "admin",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info("db connection success!");
    app.listen({ port: 4000 }, () => console.log(`🚀 Server ready!`));
  } catch (err) {
    console.error(err);
  }
})();
