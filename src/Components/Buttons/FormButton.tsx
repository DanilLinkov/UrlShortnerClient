import { LoadingButton } from "@mui/lab";
import { Button, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

interface Props {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonContainer: {
      marginTop: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

function FormButton(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer} style={{ ...props.style }}>
      <LoadingButton
        variant="contained"
        size="large"
        onClick={props.onClick}
        disabled={props.disabled}
        loading={props.loading}
      >
        {props.text}
      </LoadingButton>
    </div>
  );
}

export default FormButton;
