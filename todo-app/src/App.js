// App.js
import React, { useState } from 'react';
import {Todos} from './components/Todos'; // Assuming your Todos component is in the same directory

function App() {
  const [inputValue, setInputValue] = useState(""); // For handling input field text

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    // Here you will call a GraphQL mutation to add a new todo item
    // For now, let's log the inputValue to ensure things are wired up
    console.log("Adding Todo:", inputValue);
    
    // Reset input field after submission for better user experience
    setInputValue("");
  };

  return (
    <div className="App">
      <header>
        <h1>Todo</h1>
      </header>
      <Todos />
    </div>
  );
}

export default App;
