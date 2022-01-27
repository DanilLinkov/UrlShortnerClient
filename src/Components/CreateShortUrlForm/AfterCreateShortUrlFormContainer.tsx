import { Button, Grid, Popover, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { isSameDay, isWithinInterval } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreateShortUrlType,
  GetSingleCreatedShortUrlsType,
} from "../../Api/ApiResponseTypes";
import FormTextInput from "../FormInput/FormTextInput";
import FormTextLabel from "../FormInput/FormTextLabel";

interface Props {
  item?: GetSingleCreatedShortUrlsType;
  onShortenAnotherClick: () => void;
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

  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;

  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;

  return (
    <div className={classes.buttonsContainer}>
      <div style={{ width: "100%" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          style={{ marginBottom: "20px" }}
        >
          URL Shortened
        </Typography>
        <FormTextLabel
          text="Original URL"
          textVariant="h6"
          fontWeight="normal"
          containerStyle={{
            textAlign: "start",
            marginBottom: "5px",
          }}
        />
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
        <Popover
          id={id1}
          open={open1}
          anchorEl={anchorEl1}
          onClose={() => setAnchorEl1(null)}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
        >
          <Typography sx={{ p: 2 }}>Copied!</Typography>
        </Popover>
        <FormTextLabel
          text="Short URL"
          textVariant="h6"
          fontWeight="normal"
          containerStyle={{
            textAlign: "start",
            marginBottom: "5px",
          }}
        />
        <FormTextInput
          readonly
          value={props.item?.result.shortenedUrl}
          onClick={(event) => {
            copyToClipBoard(props.item?.result.shortenedUrl);
            setAnchorEl2(event.currentTarget);
            setTimeout(() => setAnchorEl2(null), 800);
          }}
        />
        <Popover
          id={id2}
          open={open2}
          anchorEl={anchorEl2}
          onClose={() => setAnchorEl1(null)}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
        >
          <Typography sx={{ p: 2 }}>Copied!</Typography>
        </Popover>
      </div>
      <Button
        onClick={() => props.onShortenAnotherClick()}
        variant="contained"
        size="large"
        style={{ marginTop: "20px" }}
      >
        Shorten Another
      </Button>
    </div>
  );
}

export default AfterCreateShortUrlFormContainer;
