import { Container, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import HeaderButtonGroup from "./HeaderButtonGroup";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "20px",
    },
  })
);

function Header(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <HeaderButtonGroup></HeaderButtonGroup>
    </div>
  );
}

export default Header;
