import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { RegisterType } from "../../Api/ApiResponseTypes";
import FormButton from "../Buttons/FormButton";
import FormTextInput from "../FormInput/FormTextInput";
import ErrorText from "../Text/ErrorText";
import FormTitle from "../Text/FormTitle";
import InputLabel from "../Text/InputLabel";

interface Props {
  onSubmit: (registerDetails: RegisterType) => void;
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

function RegisterContainer(props: Props) {
  const classes = useStyles();

  const [registerDetails, setRegisterDetails] = useState<RegisterType>({
    username: "",
    password: "",
  });

  return (
    <div className={classes.container}>
      <FormTitle style={{ marginBottom: "20px" }}>Register</FormTitle>
      <div style={{ width: "80%" }}>
        <InputLabel>Username</InputLabel>
        <FormTextInput
          placeHolderText="eg www.shortUrl.com"
          onChange={(event) => {
            setRegisterDetails({
              ...registerDetails,
              username: event.target.value,
            });
          }}
          containerStyle={{ marginBottom: "30px" }}
        />
        <InputLabel>Password</InputLabel>
        <FormTextInput
          placeHolderText="eg www.shortUrl.com"
          onChange={(event) => {
            setRegisterDetails({
              ...registerDetails,
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
          text="Register"
          onClick={() => props.onSubmit(registerDetails)}
          loading={props.loading}
          disabled={props.loading}
        />
      </div>
    </div>
  );
}

export default RegisterContainer;
