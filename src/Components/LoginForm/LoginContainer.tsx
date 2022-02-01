import { Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { LoginType } from "../../Api/ApiResponseTypes";
import FormButton from "../Buttons/FormButton";
import FormTextInput from "../FormInput/FormTextInput";
import FormTextLabel from "../FormInput/FormTextLabel";
import ErrorText from "../Text/ErrorText";
import FormTitle from "../Text/FormTitle";
import InputLabel from "../Text/InputLabel";

interface Props {
  onSubmit: (loginDetails: LoginType) => void;
  errors: string[];
  loading?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "60%",
      marginBottom: "20px",
      padding: "4%",
      backgroundColor: "rgba( 255, 255, 255, 0.1 )",
      borderRadius: "4px",
      boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur( 50px )",
      WebkitBackdropFilter: "blur( 50px )",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
  })
);

function LoginContainer(props: Props) {
  const classes = useStyles();

  const [loginDetails, setLoginDetails] = useState<LoginType>({
    username: "",
    password: "",
  });

  return (
    <div className={classes.container}>
      <FormTitle style={{ marginBottom: "20px" }}>Login</FormTitle>
      <div style={{ width: "80%" }}>
        <InputLabel>Username</InputLabel>
        <FormTextInput
          placeHolderText="eg www.shortUrl.com"
          onChange={(event) => {
            setLoginDetails({
              ...loginDetails,
              username: event.target.value,
            });
          }}
          containerStyle={{ marginBottom: "30px" }}
        />
        <InputLabel>Password</InputLabel>
        <FormTextInput
          placeHolderText="eg www.shortUrl.com"
          onChange={(event) => {
            setLoginDetails({
              ...loginDetails,
              password: event.target.value,
            });
          }}
          type="password"
        />
        {props.errors.length > 0 &&
          props.errors.map((value) => (
            <ErrorText display={true} style={{ paddingTop: "15px" }}>
              {value}
            </ErrorText>
          ))}
        <FormButton
          loading={props.loading}
          disabled={props.loading}
          text="Login"
          onClick={() => props.onSubmit(loginDetails)}
        />
      </div>
    </div>
  );
}

export default LoginContainer;
