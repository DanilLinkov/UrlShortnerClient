import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterType } from "../Api/ApiResponseTypes";
import AuthApi from "../Api/AuthApi";
import RegisterContainer from "../Components/RegisterForm/RegisterContainer";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function Register(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const classes = useStyles();

  const onSubmit = (registerDetails: RegisterType) => {
    setLoading(true);

    AuthApi.Register(registerDetails).then((response) => {
      setLoading(false);

      // Link to created short url screen
    });

    navigate("/app/");
  };

  return <RegisterContainer onSubmit={onSubmit} />;
}

export default Register;
