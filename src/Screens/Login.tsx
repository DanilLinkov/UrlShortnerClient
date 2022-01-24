import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import LoginContainer from "../Components/LoginForm/LoginContainer";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function Login(props: Props) {
  const classes = useStyles();

  return <LoginContainer />;
}

export default Login;
