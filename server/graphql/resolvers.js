


const resolvers = {
    Query: {
        todoItems: () => {
          return inMemTodoStore; // Fetch all todo items
        },
        todoItem: (_, { id }) => {
          return inMemTodoStore.find(item => item.id === id); // Fetch a single todo item by id
        },
    },
    Mutation: {
      createTodoItem: (_, { title, description, dueDate, completed }) => {
        const newTodoItem = {
          id: `id_${Math.random().toString(16).slice(2)}`, // Simple ID generation
          title,
          description,
          dueDate,
          completed
        };
        inMemTodoStore.push(newTodoItem);
        return newTodoItem; // Create a new todo item
      },
      updateTodoItem: (_, { id, title, description, dueDate, completed }) => {
        let itemUpdated = false;
        const updatedTodoItems = inMemTodoStore.map(item => {
          if (item.id === id) {
            itemUpdated = true;
            return { ...item, title, description, dueDate, completed };
          }
          return item;
        });
        if (itemUpdated) {
          inMemTodoStore = updatedTodoItems;
          return updatedTodoItems.find(item => item.id === id); // Return the updated item
        } else {
          throw new Error("TodoItem not found");
        }
      },
      deleteTodoItem: (_, { id }) => {
        const itemIndex = inMemTodoStore.findIndex(item => item.id === id);
        if (itemIndex > -1) {
          inMemTodoStore.splice(itemIndex, 1);
          return { id }; // Return the deleted item's id
        } else {
          throw new Error("TodoItem not found");
        }
      },
    }
  };

    // Initial in-memory todo store
    let inMemTodoStore = [];

  module.exports = resolvers;
  