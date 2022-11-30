const express = require("express");
const db = require("./config/connection")
const { ApolloServer } = require("apollo-server-express")
const { typeDefs, resolvers } = require("./schemas");

const PORT = process.env.PORT || 3007;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async(typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });


db.once("open", () => {
    app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
})
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers)