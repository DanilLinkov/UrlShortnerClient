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
          value={
            "https://shorturlclient.azurewebsites.net/" +
            props.item?.result.shortenedUrlId
          }
          onClick={(event) => {
            copyToClipBoard(
              "https://shorturlclient.azurewebsites.net/" +
                props.item?.result.shortenedUrlId
            );
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
        sx={{
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
      >
        Shorten Another
      </Button>
    </div>
  );
}

export default AfterCreateShortUrlFormContainer;
