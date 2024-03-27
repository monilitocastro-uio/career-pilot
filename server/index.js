const dotenv = require('dotenv');
dotenv.config();
const APOLLO_PORT = process.env.APOLLO_PORT || 4000;
const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000;


const express = require('express');

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');


const server = new ApolloServer({ typeDefs, resolvers });

server.listen({port: APOLLO_PORT}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});



const app = express();
const PORT = EXPRESS_PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    