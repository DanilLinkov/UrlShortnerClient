import { TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

interface Props {
  placeHolderText?: string;
  containerStyle?: React.CSSProperties;
  label?: string;
  readonly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "15px",
        border: "1px solid rgba(255, 255, 255, 0.5)",
      },
      "&:hover .MuiOutlinedInput-input": {
        borderRadius: "15px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        color: "rgb(255, 255, 255)",
        transition: "background-color 0.3s",
      },
      "&:focus .MuiOutlinedInput-root": {
        borderColor: "red",
      },
    },
    pointer: {
      "& .MuiOutlinedInput-input": {
        cursor: "pointer",
      },
    },
  })
);

function FormTextInput(props: Props) {
  const classes = useStyles();

  return (
    <div style={{ ...props.containerStyle }}>
      <TextField
        InputProps={{
          className: [classes.input, props.readonly && classes.pointer].join(
            " "
          ),
          readOnly: props.readonly,
        }}
        variant="outlined"
        fullWidth
        label={props.label}
        placeholder={props.placeHolderText}
        onChange={props.onChange}
        value={props.value}
        defaultValue={props.defaultValue}
        sx={{
          borderRadius: "15px",
        }}
        onClick={(event) => props.onClick && props.onClick(event)}
      />
    </div>
  );
}

export default FormTextInput;
