import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import UserInput from "./components/UserInput";
import TaskModal from "./components/TaskModal";

function App() {
  const [userName, setUserName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleUserSubmit = (name) => {
    setUserName(name);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <UserInput onSubmit={handleUserSubmit} />
      <TaskModal
        open={modalOpen}
        handleClose={handleCloseModal}
        userName={userName}
      />
    </div>
  );
}

export default App;
