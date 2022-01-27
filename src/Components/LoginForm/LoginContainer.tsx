import { Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { LoginType } from "../../Api/ApiResponseTypes";
import FormButton from "../Buttons/FormButton";
import FormTextInput from "../FormInput/FormTextInput";
import FormTextLabel from "../FormInput/FormTextLabel";

interface Props {
  onSubmit: (loginDetails: LoginType) => void;
  errors: string[];
  loading?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.57)",
      borderRadius: "5px",
      boxShadow: "-10px 10px 20px 10px rgba(0,0,0,0.23)",
      width: "70%",
      border: "#FFFFFF solid 2px",
      marginBottom: "20px",
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
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        style={{ marginBottom: "20px" }}
      >
        Login
      </Typography>
      <div style={{ width: "80%" }}>
        <FormTextLabel text="Username" textVariant="h6" fontWeight="bold" />
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
        {props.errors.length > 0 &&
          props.errors.map((value) => (
            <Typography
              color="red"
              fontWeight="bold"
              fontStyle="italic"
              textAlign="center"
              style={{ marginTop: "15px" }}
            >
              {value}
            </Typography>
          ))}
        <FormButton
          text="Register"
          onClick={() => props.onSubmit(loginDetails)}
        />
      </div>
    </div>
  );
}

export default LoginContainer;
