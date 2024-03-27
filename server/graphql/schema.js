const { gql } = require('apollo-server');

   const typeDefs = gql`
     type TodoItem {
       id: ID!
       title: String!
       description: String
       dueDate: String
       completed: Boolean!
     }

     type Query {
       todoItems: [TodoItem!]!
       todoItem(id: ID!): TodoItem
     }

     type Mutation {
       createTodoItem(title: String!, description: String, dueDate: String, completed: Boolean!): TodoItem!
       updateTodoItem(id: ID!, title: String, description: String, dueDate: String, completed: Boolean!): TodoItem!
       deleteTodoItem(id: ID!): TodoItem!
     }
   `;

   module.exports = typeDefs;
   