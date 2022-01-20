import { Button, Grid, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import FormButton from "../Buttons/FormButton";
import DateInput from "../FormInput/DateInput";
import FormTextInput from "../FormInput/FormTextInput";
import FormTextLabel from "../FormInput/FormTextLabel";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemContainer: {
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

function EditMyUrlItem(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.itemContainer}>
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
        <FormButton text="Save" />
        <FormButton text="Cancel" />
      </div>
    </div>
  );
}

export default EditMyUrlItem;
