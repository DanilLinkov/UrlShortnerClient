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
      <FormTextLabel
        text="Update Long URL"
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
        defaultValue={props.item.longUrl}
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
            disabled={props.loading || dateError.length > 0}
            loading={props.loading}
            style={{ marginRight: "20px" }}
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
