import {gql, useMutation} from "@apollo/client";

export const UPDATE_TODO_MUTATION = gql`
    mutation UpdateTodoItem($id: ID!, $title: String!, $description: String, $dueDate: String, $completed: Boolean!) {
        updateTodoItem(id: $id, title: $title, description: $description, dueDate: $dueDate, completed: $completed) {
            id
            title
            description
            dueDate
            completed
        }
    }
`;

function UpdateTodo({id, title, ...rest}) {
    let input;
    const [updateTodoItem, {loading, error}] = useMutation(UPDATE_TODO_MUTATION,
        {
            refetchQueries: ["GetTodos"]
        });

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>;

    return (
        <div style={{display:"inline-block"}}>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    updateTodoItem({variables: {id, title: input.value, dueDate: rest.dueDate, completed: rest.completed, description: rest.description}});
                    input.value = '';
                    if(rest.toggleOffHandler)
                    {
                        rest.toggleOffHandler();
                    }
                }}
            >
                <input
                    ref={node => {
                        input = node;
                        if(input)
                        {
                            input.value = title;
                        }
                    }}
                />
                <button type="submit">Update Todo</button>
                <button type="button" onClick={()=>{
                    if(rest.toggleOffHandler)
                    {
                        rest.toggleOffHandler();
                    }
                }}>Cancel</button>
            </form>
        </div>
    );
}


export {UpdateTodo};
