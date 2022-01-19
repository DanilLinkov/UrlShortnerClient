import { Button, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

interface Props {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonContainer: {
      marginTop: "10px",
    },
  })
);

function FormButton(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <Button variant="contained" size="large" onClick={props.onClick}>
        {props.text}
      </Button>
    </div>
  );
}

export default FormButton;
