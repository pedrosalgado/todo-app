import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getTodayDate } from "../utils/dateUtils";
import PropTypes from "prop-types";

const TaskFormModal = ({
  open,
  handleClose,
  initialTask = null,
  handleSubmit,
}) => {
  const isEditMode = Boolean(initialTask);

  const [taskText, setTaskText] = useState("");
  const [startDate, setStartDate] = useState(getTodayDate());

  useEffect(() => {
    if (initialTask) {
      setTaskText(initialTask.text || "");
      setStartDate(initialTask.startDate || getTodayDate());
    } else {
      setTaskText("");
      setStartDate(getTodayDate());
    }
  }, [initialTask, open]);

  const onSubmit = () => {
    if (taskText.trim()) {
      const taskData = {
        text: taskText,
        startDate: startDate,
        endDate: initialTask ? initialTask.endDate : null,
        done: initialTask ? initialTask.done : false,
      };
      handleSubmit(taskData);
      setStartDate(getTodayDate());
      handleClose();
    }
  };

  const handleTaskTextChange = (e) => {
    const input = e.target.value;
    if (input.length <= 100) {
      setTaskText(input);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Adicionar Nova Tarefa
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Tarefa"
          fullWidth
          variant="outlined"
          value={taskText}
          onChange={handleTaskTextChange}
          helperText={`${taskText.length} / 100 caracteres`}
        />
        <TextField
          label="Data de Início"
          type="date"
          fullWidth
          variant="outlined"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} variant="contained" color="primary">
          {isEditMode ? "Salvar Alterações" : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TaskFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialTask: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default TaskFormModal;
