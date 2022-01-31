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
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        style={{ marginBottom: "20px" }}
        color="white"
      >
        Login
      </Typography>
      <div style={{ width: "80%" }}>
        <FormTextLabel
          text="Username"
          textVariant="h6"
          fontWeight="bold"
          textColor="white"
        />
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
        <FormTextLabel
          text="Password"
          textVariant="h6"
          fontWeight="bold"
          textColor="white"
        />
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
          text="Login"
          onClick={() => props.onSubmit(loginDetails)}
          buttonSx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "rgba(0, 0, 0, 0.5)",
            fontSize: "1rem",
            border: "1px solid transparent",
            borderRadius: "2rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 1)",
              color: "rgb(255, 255, 255)",
            },
          }}
        />
      </div>
    </div>
  );
}

export default LoginContainer;
