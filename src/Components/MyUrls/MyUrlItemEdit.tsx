import { Button, Grid, Popover, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import moment from "moment";
import React, { useState } from "react";
import {
  CreateShortUrlType,
  ShortUrlType,
  UpdateShortUrlType,
} from "../../Api/ApiResponseTypes";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteButton from "../Dialog/DeleteButton";
import FormButton from "../Buttons/FormButton";
import DateInput from "../FormInput/DateInput";
import FormTextInput from "../FormInput/FormTextInput";
import FormTextLabel from "../FormInput/FormTextLabel";

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
      padding: "25px",
      backgroundColor: "rgba(255, 255, 255, 0.57)",
      borderRadius: "20px",
      boxShadow: "-10px 10px 20px 10px rgba(0,0,0,0.23)",
      width: "90%",
      border: "#FFFFFF solid 2px",
      marginBottom: "20px",
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
      <FormTextLabel
        text="Update Long URL"
        textVariant="h6"
        fontWeight="bold"
        containerStyle={{
          width: "100%",
          textAlign: "start",
          marginBottom: "5px",
        }}
      />
      <FormTextInput
        value={props.item.longUrl}
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
      <div style={{ width: "100%", marginTop: "15px" }}>
        <div>
          <FormTextLabel
            text="Update Long URL"
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <FormButton
            text="Update"
            onClick={() => onSubmitForm()}
            disabled={props.loading}
            loading={props.loading}
            style={{ marginRight: "20px" }}
          />
          <FormButton
            text="Cancel"
            onClick={() => props.onCancel()}
            disabled={props.loading}
            loading={props.loading}
          />
        </div>
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

export default MyUrlItemEdit;
