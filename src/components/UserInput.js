import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import PropTypes from "prop-types";

const UserInput = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleButtonClick = () => {
    if (onSubmit) {
      onSubmit(name);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <TextField
        label="Coloque o seu nome"
        variant="outlined"
        value={name}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        disabled={!name.trim()}
        sx={{ mt: 2 }}
      >
        Visualizar Tarefas
      </Button>
    </Box>
  );
};

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserInput;
