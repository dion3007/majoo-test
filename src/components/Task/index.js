import { Button, Grid, Paper, Typography } from "@mui/material";
import { memo } from "react";
import './Task.css';

const TaskComponent = ({
  id,
  children,
  title,
  date,
  onClick
}) => {
  return (
    <Paper id={id} className="task-box">
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item>
          <Typography>{date}</Typography>
        </Grid>
      </Grid>
      <Typography>{children}</Typography>
      {onClick && <Button
        style={{ zIndex: 10 }}
        onClick={onClick}
        variant="outlined"
        color="error"
      >
        Delete
      </Button>}
    </Paper>
  )
}

export const Task = memo(TaskComponent);