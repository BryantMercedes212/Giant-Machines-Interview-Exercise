import React from "react";
import { TextField } from "@mui/material";
import "./input.css";

//making my code dry and not having this code multiple times in the main file
function input(label, name, value, handleChange, error) {
  if (name === "hours" || name === "billableRate") {
    return (
      <div className="textField">
        <TextField
          variant="standard"
          margin="normal"
          label={label}
          inputProps={{ style: { fontSize: 20 } }}
          InputLabelProps={{
            style: { fontSize: 22 },
          }}
          required
          name={name}
          value={value}
          onChange={handleChange}
          error={error}
          helperText={error && "Only numbers are allowed"}
        />
      </div>
    );
  }

  return (
    <div className="textField">
      <TextField
        variant="standard"
        margin="normal"
        label={label}
        inputProps={{ style: { fontSize: 20 } }}
        InputLabelProps={{
          style: { fontSize: 22 },
        }}
        required
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default input;
