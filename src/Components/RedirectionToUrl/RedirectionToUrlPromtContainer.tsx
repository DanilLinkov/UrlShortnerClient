import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { ShortUrlType } from "../../Api/ApiResponseTypes";
import FormButton from "../Buttons/FormButton";
import FormTextInput from "../FormInput/FormTextInput";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "../Text/InputLabel";

interface Props {
  error: string;
  shortUrl?: ShortUrlType;
  onContinue: () => void;
  onCancel: () => void;
  loading?: boolean;
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

  return (
    <div className={classes.container}>
      {props.loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : props.error.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <InputLabel style={{ marginBottom: "15px", textAlign: "center" }}>
            {props.error}
          </InputLabel>
          <FormButton
            onClick={() => props.onCancel()}
            text="Shorten a URL"
            style={{ marginTop: "25px" }}
          />
        </div>
      ) : (
        <>
          <InputLabel style={{ marginBottom: "20px", textAlign: "center" }}>
            Are u sure you want to proceed to this URL?
          </InputLabel>
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
