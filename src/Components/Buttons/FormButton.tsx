import { LoadingButton } from "@mui/lab";
import { Button, buttonClasses, SxProps, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

interface Props {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  buttonSx?: SxProps<Theme> | undefined;
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
        sx={
          props.buttonSx || {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "rgba(0, 0, 0, 0.5)",
            fontSize: "1rem",
            border: "1px solid transparent",
            borderRadius: "2rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 1)",
              color: "rgb(255, 255, 255)",
            },
          }
        }
      >
        {props.text}
      </LoadingButton>
    </div>
  );
}

export default FormButton;
