import { Button, Grid, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { isSameDay, isWithinInterval } from "date-fns";
import React, { useState } from "react";
import { CreateShortUrlType } from "../../Api/ApiResponseTypes";
import FormButton from "../Buttons/FormButton";
import DateInput from "../FormInput/DateInput";
import FormTextInput from "../FormInput/FormTextInput";
import FormTextLabel from "../FormInput/FormTextLabel";

interface Props {
  onSubmit: (createShortUrl: CreateShortUrlType) => void;
  apiError: string;
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonsContainer: {
      padding: "4%",
      backgroundColor: "rgba( 255, 255, 255, 0.1 )",
      borderRadius: "4px",
      boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur( 50px )",
      WebkitBackdropFilter: "blur( 50px )",
      width: "70%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
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

  return (
    <div className={classes.buttonsContainer}>
      <FormTextLabel
        text="Enter URL to shorten"
        textVariant="h6"
        fontWeight="bold"
        containerStyle={{
          width: "100%",
          textAlign: "start",
          marginBottom: "5px",
        }}
        textColor="white"
      />
      <FormTextInput
        placeHolderText="eg www.shortUrl.com"
        onChange={(event) => {
          setLongUrl(event.target.value);
        }}
        containerStyle={{ width: "100%" }}
      />
      {getApiErrorType() === "longUrl" && (
        <Typography
          color="red"
          fontWeight="bold"
          fontStyle="italic"
          style={{ marginTop: "5px" }}
        >
          {props.apiError}
        </Typography>
      )}
      <div style={{ width: "100%" }}>
        <FormTextLabel
          text="Customize short URL ID"
          textVariant="h6"
          fontWeight="bold"
          containerStyle={{
            width: "100%",
            textAlign: "start",
            marginBottom: "5px",
            marginTop: "15px",
          }}
          textColor="white"
        />
        <FormTextLabel
          text="The short url will be in the form of https://shorturl.com/<customId>"
          textVariant="body1"
          fontStyle="italic"
          textColor="rgba(255,255,255,0.9)"
          containerStyle={{ marginBottom: "10px" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
            flexDirection: "column",
          }}
        >
          <FormTextInput
            placeHolderText="eg www.shortUrl.com"
            defaultValue={shortUrl.customId}
            onChange={(event) => {
              setCustomId(event.target.value);
            }}
            containerStyle={{ width: "100%" }}
          />
          {getApiErrorType() === "customId" && (
            <Typography
              color="red"
              fontWeight="bold"
              fontStyle="italic"
              style={{ marginTop: "5px" }}
            >
              {props.apiError}
            </Typography>
          )}
        </div>
        <div>
          <FormTextLabel
            text="Customize exipration date"
            textVariant="h6"
            fontWeight="bold"
            textColor="white"
          />
          <FormTextLabel
            text="short URL expires in 1 day from creation by default"
            textVariant="body1"
            fontStyle="italic"
            textColor="rgba(255,255,255,0.9)"
            containerStyle={{ marginBottom: "10px" }}
          />
          <DateInput
            value={shortUrl.expirationDate}
            onChange={(date) => setExpirationDate(date)}
            minDate={minDate}
            maxDate={maxDate}
            setDateError={setDateError}
          />
          {dateError.length > 0 && (
            <Typography
              color="red"
              fontWeight="bold"
              fontStyle="italic"
              textAlign="center"
              style={{ marginTop: "5px" }}
            >
              {dateError}
            </Typography>
          )}
        </div>
        <FormButton
          text="Shorten"
          onClick={() => onSubmitForm()}
          disabled={props.loading || dateError.length > 0}
          loading={props.loading}
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
        {getApiErrorType() === "Internal error" && (
          <Typography
            color="red"
            fontWeight="bold"
            fontStyle="italic"
            textAlign="center"
            style={{ marginTop: "15px" }}
          >
            {props.apiError}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default CreateShortUrlFormContainer;
