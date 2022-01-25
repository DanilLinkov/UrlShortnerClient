import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginType, ShortUrlType } from "../Api/ApiResponseTypes";
import AuthApi from "../Api/AuthApi";
import LoginContainer from "../Components/LoginForm/LoginContainer";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function Login(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const classes = useStyles();

  const onSubmit = (loginDetails: LoginType) => {
    setLoading(true);

    AuthApi.Login(loginDetails).then((response) => {
      setLoading(false);

      // Link to created short url screen
    });

    navigate("/app/");
  };

  return <LoginContainer onSubmit={onSubmit} />;
}

export default Login;
