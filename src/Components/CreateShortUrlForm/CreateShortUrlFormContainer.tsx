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
      backgroundColor: "rgba(255, 255, 255, 0.57)",
      borderRadius: "20px",
      boxShadow: "-10px 10px 20px 10px rgba(0,0,0,0.23)",
      width: "70%",
      border: "#FFFFFF solid 2px",
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
    customId: "",
    longUrl: "",
    expirationDate: minDate,
  });

  const [customIdError, setCustomIdError] = useState<string>("");
  const [longUrlError, setLongUrlError] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");

  const setCustomId = (customId: string) => {
    if (customId.length > 12) {
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
    let isError = false;

    var longUrl = shortUrl.longUrl;

    setCustomIdError("");
    setLongUrlError("");

    if (
      !(
        shortUrl.longUrl.startsWith("http://") ||
        shortUrl.longUrl.startsWith("https://")
      )
    ) {
      setShortUrl({ ...shortUrl, longUrl: "http://" + shortUrl.longUrl });
      longUrl = "http://" + longUrl;
    }

    if (!isValidURL(longUrl)) {
      setLongUrlError("Invalid URL format");
      isError = true;
    }

    if (shortUrl.customId!!.length > 0 && shortUrl.customId!!.length < 4) {
      setCustomIdError("Custom ID must be at least 4 characters long");
      isError = true;
    }

    if (!isError) {
      props.onSubmit(shortUrl);
    }
  };

  function isValidURL(str: string) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

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
      />
      <FormTextInput
        placeHolderText="eg www.shortUrl.com"
        onChange={(event) => {
          setLongUrlError("");
          setLongUrl(event.target.value);
        }}
        containerStyle={{ width: "100%" }}
      />
      {longUrlError.length > 0 && (
        <Typography
          color="red"
          fontWeight="bold"
          fontStyle="italic"
          style={{ marginTop: "5px" }}
        >
          {longUrlError}
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
            marginBottom: "15px",
            marginTop: "15px",
          }}
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
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <FormTextLabel
                text="https://shorturl.com/"
                textVariant="body1"
                fontStyle="italic"
                containerStyle={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={9}>
              <FormTextInput
                placeHolderText="eg www.shortUrl.com"
                value={shortUrl.customId}
                onChange={(event) => {
                  setCustomId(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          {customIdError.length > 0 && (
            <Typography
              color="red"
              fontWeight="bold"
              fontStyle="italic"
              style={{ marginTop: "5px" }}
            >
              {customIdError}
            </Typography>
          )}
        </div>
        <div>
          <FormTextLabel
            text="Customize exipration date"
            textVariant="h6"
            fontWeight="bold"
          />
          <FormTextLabel
            text="short URL expires in 1 day from creation by default"
            textVariant="body1"
            fontStyle="italic"
            textColor="rgba(0,0,0,0.54)"
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
          disabled={props.loading}
          loading={props.loading}
        />
        {props.apiError.length > 0 && (
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
