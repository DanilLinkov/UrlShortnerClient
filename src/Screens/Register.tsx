import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import RegisterContainer from "../Components/RegisterForm/RegisterContainer";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function Register(props: Props) {
  const classes = useStyles();

  return <RegisterContainer />;
}

export default Register;
