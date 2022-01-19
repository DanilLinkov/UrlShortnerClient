import { TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

interface Props {
  placeHolderText?: string;
  containerStyle?: React.CSSProperties;
  label?: string;
  readonly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      background: "rgb(255, 255, 255)",
      "& .MuiOutlinedInput-notchedOutline": {
        // border: "none",
      },
    },
  })
);

function FormTextInput(props: Props) {
  const classes = useStyles();

  return (
    <div style={{ ...props.containerStyle }}>
      <TextField
        InputProps={{ className: classes.input, readOnly: props.readonly }}
        variant="outlined"
        fullWidth
        label={props.label}
        placeholder={props.placeHolderText}
        onChange={props.onChange}
      />
    </div>
  );
}

export default FormTextInput;
