import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginType, ShortUrlType } from "../Api/ApiResponseTypes";
import AuthApi from "../Api/AuthApi";
import LoginContainer from "../Components/LoginForm/LoginContainer";
import AuthContext from "../Context/AuthContext";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function Login(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>(new Array<string>());

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    AuthApi.CheckLogin().then((response) => {
      if (response.data.result) {
        authContext.setUser(response.data.result);
        // navigate("/app/");
      }
    });
  }, []);

  const classes = useStyles();

  const onSubmit = (loginDetails: LoginType) => {
    setLoading(true);
    setErrors(new Array<string>());

    AuthApi.Login(loginDetails)
      .then((response) => {
        authContext.setUser(response.data.result);
        setLoading(false);
        navigate("/app/");
      })
      .catch((error) => {
        setLoading(false);

        let newErrors = new Array<string>();
        newErrors.push(error.response.data.message);

        setErrors(newErrors);
      });
  };

  return (
    <LoginContainer onSubmit={onSubmit} loading={loading} errors={errors} />
  );
}

export default Login;
