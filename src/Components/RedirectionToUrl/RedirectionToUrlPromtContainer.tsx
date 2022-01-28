import { Button, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ShortUrlType } from "../../Api/ApiResponseTypes";
import FormButton from "../Buttons/FormButton";
import FormTextInput from "../FormInput/FormTextInput";
import FormTextLabel from "../FormInput/FormTextLabel";

interface Props {
  error: string;
  shortUrl?: ShortUrlType;
  onContinue: () => void;
  onCancel: () => void;
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
    },
  })
);

function RedirectionToUrlPromtContainer(props: Props) {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      {props.error.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            color="black"
            fontWeight="bold"
            fontStyle="italic"
            textAlign="center"
            variant="h5"
            style={{ marginTop: "15px" }}
          >
            {props.error}
          </Typography>
          <Button
            onClick={() => props.onCancel()}
            variant="contained"
            size="large"
            style={{ marginTop: "25px" }}
          >
            Shorten a URL
          </Button>
        </div>
      ) : (
        <>
          <FormTextLabel
            text="Are u sure you want to proceed to this URL?"
            textVariant="h6"
            fontWeight="bold"
            containerStyle={{ textAlign: "center", marginBottom: "20px" }}
          />
          <FormTextInput readonly value={props.shortUrl?.longUrl} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FormButton
              text="Continue"
              style={{
                marginRight: "20px",
                width: "100px",
              }}
              onClick={() => props.onContinue()}
            />
            <FormButton
              text="Home"
              style={{
                width: "100px",
              }}
              onClick={() => props.onCancel()}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default RedirectionToUrlPromtContainer;
