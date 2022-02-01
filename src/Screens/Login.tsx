import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginType } from "../Api/ApiResponseTypes";
import AuthApi from "../Api/AuthApi";
import LoginContainer from "../Components/LoginForm/LoginContainer";
import AuthContext from "../Context/AuthContext";

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>(new Array<string>());

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    AuthApi.CheckLogin()
      .then((response) => {
        if (response.data.result) {
          authContext.setUser(response.data.result);
          navigate("/app/");
        }
      })
      .catch(() => {
        authContext.setUser(null);
      });
  }, []);

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
