import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Task } from '../../components/Task';
import { getTodoList, CreateTodoList, UpdateTodoList, DeleteTodoList } from '../../store/actions/todoAction';
import './Todo.css'

const TodoComponent = ({
    todo,
    getTodoList,
    CreateTodoList,
    UpdateTodoList,
    DeleteTodoList
}) => {
    const [ids, setIds] = useState();
    const [mark, setMark] = useState(false);
    const [status, setStatus] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!todo)
            getTodoList()
    }, [todo]);

    return (
        <>
            <Grid container spacing="6">
                <Grid className='todo-grid' item>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            handleClickOpen()
                            setStatus('0')
                            setMark(false)
                        }}
                    >
                        Add new task undo
                    </Button>
                    {todo?.filter((filteredTask) => filteredTask.status === 0)
                        .map((task) => <div
                            onClick={() => {
                                handleClickOpen()
                                setStatus('0')
                                setIds(Number(task.id))
                                setMark(true)
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <Task
                                title={task?.title}
                                date={task?.createdAt}
                                onClick={() => {
                                    DeleteTodoList(task.id)
                                }}
                            >
                                {task?.description}
                            </Task>
                        </div>
                        )}
                </Grid>
                <Grid className='todo-grid' item>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            handleClickOpen()
                            setStatus('1')
                            setMark(false)
                        }}
                    >
                        Add new task done
                    </Button>
                    {todo?.filter((filteredTask) => filteredTask.status === 1)
                        .map((task) => <div
                            onClick={() => {
                                handleClickOpen()
                                setStatus('1')
                                setIds(Number(task.id))
                                setMark(true)
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <Task
                                title={task?.title}
                                date={task?.createdAt}
                            >
                                {task?.description}
                            </Task>
                        </div>)}
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{!mark ? "Create" : "Update"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        multiline
                        rows={4}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {!mark ? <Button onClick={() => {
                        const d = new Date();
                        let dateString = d.toString();
                        const values = {
                            id: Math.random(),
                            createdAt: dateString,
                            status: status,
                            title: title,
                            description: description
                        }
                        CreateTodoList(values)
                        handleClose()
                    }}
                    >
                        Submit
                    </Button> : <Button onClick={() => {
                        const d = new Date();
                        let dateString = d.toString();
                        const values = {
                            id: ids,
                            createdAt: dateString,
                            status: status,
                            title: title,
                            description: description
                        }
                        UpdateTodoList(values)
                        handleClose()
                    }}
                    >
                        Update
                    </Button>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

const mapStateToProps = (state) => ({
    todo: state.todo.todo
})

function MapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getTodoList,
            CreateTodoList,
            UpdateTodoList,
            DeleteTodoList
        },
        dispatch,
    )
}

export const Todo = connect(mapStateToProps, MapDispatchToProps)(memo(TodoComponent));