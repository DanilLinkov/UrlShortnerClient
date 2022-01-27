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
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "15px",
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
        sx={{ borderRadius: "15px", background: "rgb(255, 255, 255)" }}
        onClick={(event) => props.onClick && props.onClick(event)}
      />
    </div>
  );
}

export default FormTextInput;
