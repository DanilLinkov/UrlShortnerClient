import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import FormButton from "../Buttons/FormButton";
import DateInput from "../FormInput/DateInput";
import FormTextInput from "../FormInput/FormTextInput";
import FormTextLabel from "../FormInput/FormTextLabel";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonsContainer: {
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.57)",
      borderRadius: "5px",
      boxShadow: "-10px 10px 20px 10px rgba(0,0,0,0.23)",
      width: "90%",
      border: "#FFFFFF solid 2px",
    },
  })
);

function CreateShortUrlFormContainer(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.buttonsContainer}>
      <FormTextLabel
        text="Enter URL to shorten"
        textVariant="h6"
        fontWeight="bold"
      />
      <FormTextInput placeHolderText="eg www.shortUrl.com" />
      <div>
        <FormTextLabel
          text="Customize short URL ID"
          textVariant="h6"
          fontWeight="bold"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormTextInput
            placeHolderText="ShortUrl.com/"
            readonly={true}
            containerStyle={{ flex: "1", marginRight: "10px" }}
          />
          <FormTextInput
            placeHolderText="eg www.shortUrl.com"
            containerStyle={{ flex: "1", marginLeft: "10px" }}
          />
        </div>
        <div>
          <FormTextLabel
            text="Customize exipration date"
            textVariant="h6"
            fontWeight="bold"
          />
          <FormTextLabel
            text="short URL expires in 1 month from creation by default"
            textVariant="body1"
            fontStyle="italic"
            textColor="rgba(0,0,0,0.54)"
          />
          <DateInput onChange={(date) => console.log(date)} />
        </div>
        <FormButton text="Shorten" />
      </div>
    </div>
  );
}

export default CreateShortUrlFormContainer;
