import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import FormButton from "../Buttons/FormButton";
import FormTextInput from "../FormInput/FormTextInput";
import FormTextLabel from "../FormInput/FormTextLabel";

interface Props {}

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

function RedirectionToUrlPromtContainer(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormTextLabel text="Are u sure?" textVariant="h6" fontWeight="bold" />
      <FormTextInput placeHolderText="eg www.shortUrl.com" readonly />
      <FormButton text="Continue" />
      <FormButton text="Cancel" />
    </div>
  );
}

export default RedirectionToUrlPromtContainer;
