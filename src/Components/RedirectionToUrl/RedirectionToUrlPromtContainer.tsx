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
      marginBottom: "20px",
      padding: "4%",
      backgroundColor: "rgba( 255, 255, 255, 0.1 )",
      borderRadius: "4px",
      boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur( 50px )",
      WebkitBackdropFilter: "blur( 50px )",
      width: "70%",
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
            color="white"
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
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              color: "rgba(0, 0, 0, 0.5)",
              fontSize: "1rem",
              border: "1px solid transparent",
              fontWeight: "bold",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 1)",
                color: "rgb(255, 255, 255)",
              },
            }}
          >
            Shorten a URL
          </Button>
        </div>
      ) : (
        <>
          <FormTextLabel
            textColor="white"
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
              buttonSx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "rgba(0, 0, 0, 0.5)",
                fontSize: "1rem",
                border: "1px solid transparent",
                fontWeight: "bold",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 1)",
                  color: "rgb(255, 255, 255)",
                },
              }}
            />
            <FormButton
              text="Home"
              style={{
                width: "100px",
              }}
              onClick={() => props.onCancel()}
              buttonSx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "rgba(0, 0, 0, 0.5)",
                fontSize: "1rem",
                border: "1px solid transparent",
                fontWeight: "bold",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 1)",
                  color: "rgb(255, 255, 255)",
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default RedirectionToUrlPromtContainer;
