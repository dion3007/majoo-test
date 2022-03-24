import axios from "axios";

export const getTodoList = () => {
    return (dispatch) => {
        axios.get('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
            .then(function (response) {
                dispatch({ type: 'TODO_LIST', payload: response.data })
            })
            .catch(function (error) {
                dispatch({ type: 'TODO_LIST', payload: error })
            })
    }
}

export const CreateTodoList = (values) => {
    return (dispatch) => {
        if (values) {
            dispatch({ type: 'CREATE_TODO_LIST', payload: values })
        } else {
            dispatch({ type: 'CREATE_TODO_LIST', payload: 'error' })
        }
    }
}

export const UpdateTodoList = (values) => {
    return (dispatch) => {
        if (values) {
            dispatch({ type: 'UPDATE_TODO_LIST', payload: values })
        } else {
            dispatch({ type: 'UPDATE_TODO_LIST', payload: 'error' })
        }
    }
}

export const DeleteTodoList = (ids) => {
    return (dispatch) => {
        if (ids) {
            dispatch({ type: 'DELETE_TODO_LIST', payload: ids })
        } else {
            dispatch({ type: 'DELETE_TODO_LIST', payload: 'error' })
        }
    }
}
