import {gql, useMutation} from "@apollo/client";

const ADD_TODO_MUTATION = gql`
    mutation CreateTodoItem($title: String!, $description: String, $dueDate: String, $completed: Boolean!) {
        createTodoItem(title: $title, description: $description, dueDate: $dueDate, completed: $completed) {
            id
            title
            description
            dueDate
            completed
        }
    }
`;

function CreateTodo() {
    let input;
    const [createTodoItem, {loading, error}] = useMutation(ADD_TODO_MUTATION,
        {
            refetchQueries: ["GetTodos"]
        });

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createTodoItem({variables: {title: input.value, completed: false}});
                    input.value = '';
                }}
            >
                <input
                    ref={node => {
                        input = node;
                    }}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
}


export {CreateTodo};
