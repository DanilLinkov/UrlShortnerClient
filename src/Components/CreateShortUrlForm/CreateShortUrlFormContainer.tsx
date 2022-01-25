import { Theme, Typography } from "@mui/material";
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
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonsContainer: {
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.57)",
      borderRadius: "5px",
      boxShadow: "-10px 10px 20px 10px rgba(0,0,0,0.23)",
      width: "90%",
      border: "#FFFFFF solid 2px",
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
  const [longUrlError, setLongUrlError] = useState<string>("");

  console.log(shortUrl);

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

    if (!isValidURL(longUrl)) {
      setLongUrlError("Invalid URL format");
      return;
    }

    props.onSubmit(shortUrl);
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
      />
      <FormTextInput
        placeHolderText="eg www.shortUrl.com"
        onChange={(event) => {
          setLongUrlError("");
          setLongUrl(event.target.value);
        }}
      />
      {longUrlError.length > 0 && <Typography>{longUrlError}</Typography>}
      <div>
        {/* <FormTextLabel
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
        </div> */}
        <div>
          <FormTextLabel
            text="Customize exipration date"
            textVariant="h6"
            fontWeight="bold"
          />
          <FormTextLabel
            text="short URL expires in 1 month from creation by default"
            textVariant="body1"
            fontStyle="italic"
            textColor="rgba(0,0,0,0.54)"
          />
          <DateInput
            value={shortUrl.expirationDate}
            onChange={(date) => setExpirationDate(date)}
            minDate={minDate}
            maxDate={maxDate}
            setDateError={setDateError}
          />
          {dateError.length > 0 && <Typography>{dateError}</Typography>}
        </div>
        <FormButton text="Shorten" onClick={() => onSubmitForm()} />
      </div>
    </div>
  );
}

export default CreateShortUrlFormContainer;
