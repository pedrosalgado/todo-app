import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TaskFormModal from "./TaskFormModal";
import TaskList from "./TaskList";
import FilterControl from "./FilterControl";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../firebaseConfig";
import { addTask, deleteTask, updateTask } from "../services/taskService";
import { getTodayDate } from "../utils/dateUtils";
import PropTypes from "prop-types";

const TaskModal = ({ open, handleClose, userName }) => {
  const [tasks, setTasks] = useState([]);
  const [openTaskFormModal, setOpenTaskFormModal] = useState(false);

  const [taskToEdit, setTaskToEdit] = useState(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const [filter, setFilter] = useState("all");

  const showSnackbar = (message, severity = "info") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenAddModal = () => {
    setTaskToEdit(null);
    setOpenTaskFormModal(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setOpenTaskFormModal(true);
  };

  const handleCloseFormModal = () => {
    setTaskToEdit(null);
    setOpenTaskFormModal(false);
  };

  const handleSubmitTask = async (taskData) => {
    if (taskToEdit) {
      await updateTask(taskToEdit.id, taskData);
      showSnackbar("Tarefa atualizada com sucesso!", "success");
    } else {
      const newTask = {
        ...taskData,
        author: userName,
      };
      await addTask(newTask);
      showSnackbar("Tarefa adicionada com sucesso!", "success");
    }
    handleCloseFormModal();
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setOpenDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete.id);
      setTaskToDelete(null);
      setOpenDeleteConfirm(false);
      showSnackbar("Tarefa excluída!", "success");
    }
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
    setOpenDeleteConfirm(false);
  };

  const handleMarkDone = async (task) => {
    const todayStr = getTodayDate();
    const today = new Date(todayStr);
    const taskStart = new Date(task.startDate);

    if (taskStart > today) {
      showSnackbar(
        "A data de início da tarefa é posterior à data atual e não pode ser marcada como concluída.",
        "warning",
      );
      return;
    }
    await updateTask(task.id, { done: true, endDate: todayStr });
    showSnackbar("Tarefa marcada como concluída!", "success");
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  useEffect(() => {
    if (userName) {
      const tasksRef = collection(db, "tasks");
      const q = query(tasksRef, where("author", "==", userName));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasksList = [];
        querySnapshot.forEach((doc) => {
          tasksList.push({ id: doc.id, ...doc.data() });
        });
        setTasks(tasksList);
      });
      return () => unsubscribe();
    }
  }, [userName]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {`Tarefas de ${userName}`}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ overflow: "visible" }}>
          <FilterControl
            filter={filter}
            handleFilterChange={handleFilterChange}
          />
          <TaskList
            tasks={filteredTasks}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteClick}
            onMarkDone={handleMarkDone}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddModal}
            sx={{ mt: 2 }}
          >
            Adicionar Nova Tarefa
          </Button>
        </DialogActions>
      </Dialog>
      <TaskFormModal
        open={openTaskFormModal}
        handleClose={() => {
          setOpenTaskFormModal(false);
          setTaskToEdit(null);
        }}
        initialTask={taskToEdit}
        handleSubmit={handleSubmitTask}
      />
      <Dialog open={openDeleteConfirm} onClose={handleCancelDelete}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir esta tarefa?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

TaskModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default TaskModal;
