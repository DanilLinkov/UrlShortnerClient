import { Theme, useMediaQuery } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { CreateShortUrlType } from "../../Api/ApiResponseTypes";
import FormButton from "../Buttons/FormButton";
import DateInput from "../FormInput/DateInput";
import FormTextInput from "../FormInput/FormTextInput";
import ErrorText from "../Text/ErrorText";
import FormTitle from "../Text/FormTitle";
import InputLabel from "../Text/InputLabel";
import InputSubLabel from "../Text/InputSubLabel";

interface Props {
  onSubmit: (createShortUrl: CreateShortUrlType) => void;
  apiError: string;
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
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
    formInputLabel: {
      width: "100%",
      textAlign: "start",
      paddingBottom: "5px",
    },
  })
);

function CreateShortUrlFormContainer(props: Props) {
  const classes = useStyles();

  const minDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const maxDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

  const [shortUrl, setShortUrl] = useState<CreateShortUrlType>({
    longUrl: "",
    expirationDate: minDate,
  });

  const [dateError, setDateError] = useState<string>("");

  const setCustomId = (customId: string) => {
    if (customId.length > 12) {
      return;
    }

    if (customId.length === 0) {
      setShortUrl({ ...shortUrl, customId: undefined });
      return;
    }

    setShortUrl({ ...shortUrl, customId: customId });
  };

  const setLongUrl = (longUrl: string) => {
    setShortUrl({ ...shortUrl, longUrl: longUrl });
  };

  const setExpirationDate = (expirationDate: Date | null) => {
    setShortUrl({
      ...shortUrl,
      expirationDate: expirationDate ? expirationDate : minDate,
    });
  };

  const onSubmitForm = () => {
    var longUrl = shortUrl.longUrl;

    if (
      !(
        shortUrl.longUrl.startsWith("http://") ||
        shortUrl.longUrl.startsWith("https://")
      )
    ) {
      setShortUrl({ ...shortUrl, longUrl: "http://" + shortUrl.longUrl });
      longUrl = "http://" + longUrl;
    }

    const shortUrlToSubmit = { ...shortUrl, longUrl: longUrl };

    props.onSubmit(shortUrlToSubmit);
  };

  const getApiErrorType = () => {
    if (props.apiError.includes("Custom Id")) {
      return "customId";
    } else if (props.apiError.includes("URL")) {
      return "longUrl";
    } else if (props.apiError.includes("Expiration Date")) {
      return "expirationDate";
    } else if (props.apiError.length <= 0) {
      return "";
    } else {
      return "Internal error";
    }
  };

  const mdScreenMatch = useMediaQuery("(max-width:900px)");
  const xsScreenMatch = useMediaQuery("(max-width:520px)");

  return (
    <div
      className={classes.mainContainer}
      style={{ width: mdScreenMatch ? "90%" : "70%" }}
    >
      <FormTitle style={{ marginBottom: "20px" }}>Create a ShortURL</FormTitle>
      <InputSubLabel style={{ textAlign: "center", marginBottom: "10px" }}>
        Note: Please be patient with the initial cold start of the application.
      </InputSubLabel>
      <InputLabel>Enter URL to shorten</InputLabel>
      <FormTextInput
        placeHolderText="eg www.shortUrl.com"
        onChange={(event) => {
          setLongUrl(event.target.value);
        }}
        containerStyle={{ width: "100%" }}
      />
      <ErrorText display={getApiErrorType() === "longUrl"}>
        {props.apiError}
      </ErrorText>
      <div style={{ width: "100%", paddingTop: "15px" }}>
        <InputLabel>Customize short URL ID</InputLabel>
        <InputSubLabel>
          {xsScreenMatch
            ? "The short url will be in the form of https://ourdomain/<customId>"
            : "The short url will be in the form of https://shorturlclient.azurewebsites.net/<customId>"}
        </InputSubLabel>
        <div style={{ marginBottom: "15px" }}>
          <FormTextInput
            placeHolderText="eg customId"
            defaultValue={shortUrl.customId}
            onChange={(event) => {
              setCustomId(event.target.value);
            }}
            containerStyle={{ width: "100%" }}
          />
          <ErrorText display={getApiErrorType() === "customId"}>
            {props.apiError}
          </ErrorText>
        </div>
        <div>
          <InputLabel>Customize exipration date</InputLabel>
          <InputSubLabel>
            The short URL expires 1 day after creation by default
          </InputSubLabel>
          <DateInput
            value={shortUrl.expirationDate}
            onChange={(date) => setExpirationDate(date)}
            minDate={minDate}
            maxDate={maxDate}
            setDateError={setDateError}
          />
          <ErrorText display={dateError.length > 0}>{dateError}</ErrorText>
        </div>
        <FormButton
          text="Shorten"
          onClick={() => onSubmitForm()}
          disabled={props.loading || dateError.length > 0}
          loading={props.loading}
        />
        <ErrorText
          style={{ paddingTop: "15px" }}
          display={getApiErrorType() === "Internal error"}
        >
          {props.apiError}
        </ErrorText>
      </div>
    </div>
  );
}

export default CreateShortUrlFormContainer;
