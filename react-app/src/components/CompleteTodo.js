import {useMutation} from "@apollo/client";
import {UPDATE_TODO_MUTATION} from "./UpdateTodo";

function CompleteTodo({id, completed, ...rest}) { 
    const [updateTodoItem, {loading, error}] = useMutation(UPDATE_TODO_MUTATION,
        {
            refetchQueries: ["GetTodos"]
        });

    if(loading) return <span>⏱️</span>;
    if(error) return <span>⚠️ {error.message}</span>;

    return (
        <div onClick={
            ()=>{
                updateTodoItem({variables: {id, title: rest.title, dueDate: rest.dueDate, completed: !completed, description: rest.description}});
            }
        } style={{display:"inline-block", cursor:"pointer"}}>
            
            <span style={{ cursor:"pointer"}}>
                {completed ? "✅" : "⬜"}  
            </span>
        </div>
    );
}


export {CompleteTodo};
