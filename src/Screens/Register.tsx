import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterType } from "../Api/ApiResponseTypes";
import AuthApi from "../Api/AuthApi";
import RegisterContainer from "../Components/RegisterForm/RegisterContainer";
import AuthContext from "../Context/AuthContext";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function Register(props: Props) {
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

  const classes = useStyles();

  const onSubmit = (registerDetails: RegisterType) => {
    setLoading(true);
    setErrors(new Array<string>());

    AuthApi.Register(registerDetails)
      .then((response) => {
        setLoading(false);
        navigate("/app/");
      })
      .catch((error) => {
        setLoading(false);

        let newErrors = new Array<string>();

        for (let [key, value] of Object.entries(error.response.data.result)) {
          newErrors.push(value as string);
        }

        setErrors(newErrors);
      });
  };

  return (
    <RegisterContainer onSubmit={onSubmit} loading={loading} errors={errors} />
  );
}

export default Register;
