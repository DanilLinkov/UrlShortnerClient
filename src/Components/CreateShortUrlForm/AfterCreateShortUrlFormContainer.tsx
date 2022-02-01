import { Button, Grid, Popover, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { isSameDay, isWithinInterval } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreateShortUrlType,
  GetSingleCreatedShortUrlsType,
} from "../../Api/ApiResponseTypes";
import FormButton from "../Buttons/FormButton";
import FormTextInput from "../FormInput/FormTextInput";
import FormTextLabel from "../FormInput/FormTextLabel";
import CustomPopover from "../Popover/CustomPopover";
import FormTitle from "./Text/FormTitle";
import InputLabel from "./Text/InputLabel";

interface Props {
  item?: GetSingleCreatedShortUrlsType;
  onShortenAnotherClick: () => void;
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

function AfterCreateShortUrlFormContainer(props: Props) {
  const classes = useStyles();

  const [anchorEl1, setAnchorEl1] = React.useState<
    (EventTarget & HTMLDivElement) | null
  >(null);
  const [anchorEl2, setAnchorEl2] = React.useState<
    (EventTarget & HTMLDivElement) | null
  >(null);

  const copyToClipBoard = (text: string | undefined) => {
    text && navigator.clipboard.writeText(text);
  };

  const fullShortenedUrl =
    "https://shorturlclient.azurewebsites.net/" +
    props.item?.result.shortenedUrlId;

  return (
    <div className={classes.buttonsContainer}>
      <div style={{ width: "100%" }}>
        <FormTitle style={{ marginBottom: "20px" }}>
          Your new Shortened URL
        </FormTitle>
        <InputLabel>Original URL</InputLabel>
        <FormTextInput
          containerStyle={{ marginBottom: "15px" }}
          readonly
          value={props.item?.result.longUrl}
          onClick={(event) => {
            copyToClipBoard(props.item?.result.longUrl);
            setAnchorEl1(event.currentTarget);
            setTimeout(() => setAnchorEl1(null), 800);
          }}
        />
        <CustomPopover
          anchorEl={anchorEl1}
          text="Copied!"
          onClose={() => setAnchorEl1(null)}
        />
        <InputLabel>Short URL</InputLabel>
        <FormTextInput
          readonly
          value={fullShortenedUrl}
          onClick={(event) => {
            copyToClipBoard(fullShortenedUrl);
            setAnchorEl2(event.currentTarget);
            setTimeout(() => setAnchorEl2(null), 800);
          }}
        />
        <CustomPopover
          anchorEl={anchorEl2}
          text="Copied!"
          onClose={() => setAnchorEl2(null)}
        />
      </div>
      <FormButton
        style={{ marginTop: "25px" }}
        text="Shorten Another"
        onClick={() => props.onShortenAnotherClick()}
      />
    </div>
  );
}

export default AfterCreateShortUrlFormContainer;
