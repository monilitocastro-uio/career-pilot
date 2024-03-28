import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { UpdateTodo } from './UpdateTodo';
import {CreateTodo} from './CreateTodo'; // Assuming your CreateTodo component is in the same directory
import { CompleteTodo } from './CompleteTodo';

const GET_TODOS = gql`
    query GetTodos {
        todoItems {
        id
        title
        description
        dueDate
        completed
        }
    }
    `;

const DELETE_TODO = gql`
    mutation DeleteTodoItem($id: ID!) {
        deleteTodoItem(id: $id) {
            id
        }
    }
    `;

const UPDATE_TODO = gql`
    mutation UpdateTodoItem($id: ID!) {
        updateTodoItem(id: $id) {
            id
            title
            description
            dueDate
            completed
        }
    }
    `;

function Todos() {
    const [editingField, setEditingField] = useState(null);
    const [deleteTodoItem] = useMutation(DELETE_TODO, {
        refetchQueries: ["GetTodos"]
    });
    const [updateTodoItem] = useMutation(UPDATE_TODO, {
        refetchQueries: ["GetTodos"]
    });
    const {loading, error, data} = useQuery(GET_TODOS);

    if( loading ) return <p>Loading...</p>; 
    if( error ) return <p>Error: {error.message}</p>;

    return(
        <>
            {
                editingField !== null 
                ? 
                    <div style={{height: "1rem"}} />
                : 
                    <CreateTodo />
            }
            <ul>
                {data.todoItems.map(({id, title, description, dueDate, completed}) => (
                    <li key={id} styles="list-style-decoration:none;">
                        <span onClick={()=>deleteTodoItem({variables:{id}})} style={{cursor:"pointer"}}>
                            🗑️
                        </span>
                        <span onClick={()=>{
                            setEditingField(id);
                        }}  style={{cursor:"pointer"}}>
                            ✏️
                        </span>
                        {" "}
                        <CompleteTodo id={id} title={title} description={description} dueDate={dueDate} completed={completed} />
                        {
                            editingField === id ? ( 
                                <UpdateTodo toggleOffHandler={()=>{
                                    setEditingField(null);
                                }} id={id} title={title} description={description} dueDate={dueDate} completed={completed} />
                            ) : (
                                <span>{title}</span>
                            )
                        }
                    </li>
                ))}
            </ul>
        </>
    );
}

export { Todos };