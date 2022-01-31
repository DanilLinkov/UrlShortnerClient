import { LoadingButton } from "@mui/lab";
import { Button, Container, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

interface Props {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  loading?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonContainer: {
      marginLeft: "10px",
      marginRight: "10px",
    },
  })
);

function HeaderButton(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <LoadingButton
        loading={props.loading}
        size="large"
        onClick={props.onClick}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          border: "1px solid rgba(255, 255, 255, 1)",
          color: "rgb(255, 255, 255)",
          fontSize: "1rem",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "rgba(0, 0, 0, 0.5)",
            border: "1px solid transparent",
            transition: "background-color 0.3s",
          },
        }}
      >
        {props.text}
      </LoadingButton>
    </div>
  );
}

export default HeaderButton;
