const reducer = (
    state = { todo: null },
    action,
) => {
    switch (action.type) {
        case 'TODO_LIST':
            return { ...state, todo: action.payload }
        case 'CREATE_TODO_LIST':
            const value = action.payload;
            const todoList = state.todo;

            const objectPush = todoList.concat({
                id: value.id,
                createdAt: value.createdAt,
                status: Number(value.status),
                title: value.title,
                description: value.description
            });

            return { ...state, todo: objectPush };
        case 'UPDATE_TODO_LIST':
            const item_ids = Number(action.payload.id);
            console.log(item_ids)
            return {
                todo: state.todo?.map((item) => (
                    item.id === item_ids ? {
                        ...item,
                        createdAt: action.payload.createdAt,
                        status: Number(action.payload.status),
                        title: action.payload.title,
                        description: action.payload.description
                    } : item
                ))
            }
        case 'DELETE_TODO_LIST':
            return { ...state, todo: state.todo?.filter((_todo) => _todo.id !== action.payload) }
        default:
            return state
    }
}

export default reducer