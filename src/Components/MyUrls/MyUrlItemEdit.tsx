import { Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { ShortUrlType, UpdateShortUrlType } from "../../Api/ApiResponseTypes";
import FormButton from "../Buttons/FormButton";
import DateInput from "../FormInput/DateInput";
import FormTextInput from "../FormInput/FormTextInput";
import ErrorText from "../Text/ErrorText";
import InputLabel from "../Text/InputLabel";
import InputSubLabel from "../Text/InputSubLabel";

interface Props {
  item: ShortUrlType;
  onSubmit: (createShortUrl: UpdateShortUrlType) => void;
  apiError: string;
  loading: boolean;
  onCancel: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemContainer: {
      width: "90%",
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

function MyUrlItemEdit(props: Props) {
  const classes = useStyles();

  const minDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const maxDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

  const [shortUrl, setShortUrl] = useState<UpdateShortUrlType>({
    shortenedUrlId: props.item.shortenedUrlId,
    longUrl: props.item.longUrl,
    expirationDate: props.item.expirationDate,
  });

  const [dateError, setDateError] = useState<string>("");

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
    if (props.apiError.includes("URL")) {
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
    <div className={classes.itemContainer}>
      <InputLabel>Update Long URL</InputLabel>
      <FormTextInput
        placeHolderText="eg www.shortUrl.com"
        defaultValue={shortUrl.longUrl}
        onChange={(event) => {
          setLongUrl(event.target.value);
        }}
        containerStyle={{ width: "100%" }}
      />
      <ErrorText display={getApiErrorType() === "longUrl"}>
        {props.apiError}
      </ErrorText>
      <div style={{ width: "100%", marginTop: "15px" }}>
        <div>
          <InputLabel>Update expiration Date</InputLabel>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <FormButton
            style={{ marginRight: "20px" }}
            text="Update"
            onClick={() => onSubmitForm()}
            disabled={props.loading || dateError.length > 0}
            loading={props.loading}
            buttonSx={{
              backgroundColor: "#2BE49F",
              "&:hover": { backgroundColor: "#4AF6B6" },
            }}
          />
          <FormButton
            text="Cancel"
            onClick={() => props.onCancel()}
            disabled={props.loading}
            loading={props.loading}
            buttonSx={{
              backgroundColor: "#E16161",
              "&:hover": { backgroundColor: "#FC4C4C" },
            }}
          />
        </div>
        <ErrorText
          style={{ marginTop: "15px" }}
          display={getApiErrorType() === "Internal error"}
        >
          {props.apiError}
        </ErrorText>
      </div>
    </div>
  );
}

export default MyUrlItemEdit;
