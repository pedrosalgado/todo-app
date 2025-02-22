import React from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";

const FilterControl = ({ filter, handleFilterChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <FormControl fullWidth sx={{ mb: 2, overflow: "visible" }}>
        <InputLabel id="filter-label">Filtro</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          label="Filtro"
          onChange={(e) => handleFilterChange(e, e.target.value)}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="pending">Pendentes</MenuItem>
          <MenuItem value="done">Concluídos</MenuItem>
        </Select>
      </FormControl>
    );
  }

  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={handleFilterChange}
      sx={{ mb: 2 }}
    >
      <ToggleButton value="all">Todos</ToggleButton>
      <ToggleButton value="pending">Pendentes</ToggleButton>
      <ToggleButton value="done">Concluídos</ToggleButton>
    </ToggleButtonGroup>
  );
};

FilterControl.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default FilterControl;
