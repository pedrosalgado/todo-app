import React from "react";
import { List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PropTypes from "prop-types";

const TaskList = ({ tasks, onEdit, onDelete, onMarkDone }) => {
  if (tasks.length === 0) {
    return (
      <List>
        <ListItem>
          <ListItemText primary="Nenhuma tarefa encontrada." />
        </ListItem>
      </List>
    );
  }

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemText
            primary={task.text}
            secondary={`Início: ${task.startDate}${task.done ? ` | Fim: ${task.endDate}` : ""}`}
          />
          <Box sx={{ ml: "auto", display: "flex" }}>
            <IconButton
              edge="end"
              aria-label="done"
              onClick={() => !task.done && onMarkDone(task)}
              sx={{
                color: task.done ? "green" : "inherit",
                pointerEvents: task.done ? "none" : "auto",
              }}
            >
              <CheckCircleIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => onEdit(task)}
              disabled={task.done}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(task)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string,
      done: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMarkDone: PropTypes.func.isRequired,
};

export default TaskList;
