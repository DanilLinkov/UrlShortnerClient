import { Container, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import HeaderButton from "./HeaderButton";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonsContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

function HeaderButtonGroup(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.buttonsContainer}>
      <HeaderButton text="Shorten Url"></HeaderButton>
      <HeaderButton text="My URLs"></HeaderButton>
      <HeaderButton text="Register"></HeaderButton>
      <HeaderButton text="Log in"></HeaderButton>
    </div>
  );
}

export default HeaderButtonGroup;
