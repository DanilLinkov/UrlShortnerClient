import { LoadingButton } from "@mui/lab";
import { Grid, Theme, useMediaQuery } from "@mui/material";
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
      height: "100%",
    },
  })
);

function HeaderButton(props: Props) {
  const classes = useStyles();

  const mdScreenMatch = useMediaQuery("(max-width:900px)");

  return (
    <Grid
      item
      className={classes.buttonContainer}
      xs={12}
      md={2}
      xl={3}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LoadingButton
        style={{ width: mdScreenMatch ? "70%" : "100%", height: "100%" }}
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
    </Grid>
  );
}

export default HeaderButton;
