import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../firebaseConfig";

export async function addTask(task) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), task);
    console.log("Task added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

export async function deleteTask(taskId) {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
    console.log("Task deleted:", taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

export async function updateTask(taskId, updatedTask) {
  try {
    await updateDoc(doc(db, "tasks", taskId), updatedTask);
    console.log("Task updated:", taskId);
  } catch (error) {
    console.error("Error updating task:", error);
  }
}
