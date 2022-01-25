import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { LoginType } from "../../Api/ApiResponseTypes";
import FormButton from "../Buttons/FormButton";
import FormTextInput from "../FormInput/FormTextInput";
import FormTextLabel from "../FormInput/FormTextLabel";

interface Props {
  onSubmit: (registerDetails: LoginType) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.57)",
      borderRadius: "5px",
      boxShadow: "-10px 10px 20px 10px rgba(0,0,0,0.23)",
      width: "90%",
      border: "#FFFFFF solid 2px",
      marginBottom: "20px",
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
      <FormTextLabel text="Username" textVariant="h6" fontWeight="bold" />
      <FormTextInput
        placeHolderText="eg www.shortUrl.com"
        onChange={(event) => {
          setLoginDetails({
            ...loginDetails,
            username: event.target.value,
          });
        }}
      />
      <FormTextLabel text="Password" textVariant="h6" fontWeight="bold" />
      <FormTextInput
        placeHolderText="eg www.shortUrl.com"
        onChange={(event) => {
          setLoginDetails({
            ...loginDetails,
            password: event.target.value,
          });
        }}
      />
      <FormButton
        text="Register"
        onClick={() => props.onSubmit(loginDetails)}
      />
    </div>
  );
}

export default LoginContainer;
