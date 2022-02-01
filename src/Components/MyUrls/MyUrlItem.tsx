import { Button, Grid, IconButton, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import moment from "moment";
import React, { useState } from "react";
import { ShortUrlType, UpdateShortUrlType } from "../../Api/ApiResponseTypes";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteButton from "../Dialog/DeleteButton";
import CancelIcon from "@mui/icons-material/Cancel";
import MyUrlItemEdit from "./MyUrlItemEdit";
import ShortUrlApi from "../../Api/ShortUrlApi";
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import SuccessText from "../Text/SuccessText";
import CustomPopover from "../Popover/CustomPopover";

interface Props {
  item: ShortUrlType;
  onDelete: () => void;
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
    dateTextStyle: {
      textAlign: "end",
      fontStyle: "italic",
      fontFamily: "sans-serif",
      color: "white",
    },
    urlTextStyle: {
      fontFamily: "sans-serif",
      color: "white",
    },
  })
);

function MyUrlItem(props: Props) {
  const classes = useStyles();

  const [item, setItem] = useState<ShortUrlType>(props.item);
  const [copyAnchor, setCopyAnchor] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [shareButtonOpen, setShareButtonOpen] = useState<boolean>(false);

  const copyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showEditedMessage, setShowEditedMessage] = useState<boolean>(false);

  const [apiError, setApiError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fullItemUrl =
    "https://shorturlclient.azurewebsites.net/" + item.shortenedUrlId;

  const updateShortUrl = (updateShortUrl: UpdateShortUrlType) => {
    setApiError("");
    setLoading(true);

    ShortUrlApi.UpdateShortUrl(updateShortUrl)
      .then((response) => {
        setItem(response.data.result);
        setLoading(false);
        setShowEdit(false);
        setShowEditedMessage(true);
        setTimeout(() => {
          setShowEditedMessage(false);
        }, 1000);
      })
      .catch((error) => {
        setApiError(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <>
      {showEdit ? (
        <MyUrlItemEdit
          item={item}
          onSubmit={updateShortUrl}
          apiError={apiError}
          loading={loading}
          onCancel={() => setShowEdit(false)}
        />
      ) : (
        <div className={classes.itemContainer} style={{ position: "relative" }}>
          <SuccessText
            display={showEditedMessage}
            style={{ position: "absolute", top: "0px", right: "40%" }}
          >
            Edited successfully
          </SuccessText>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ marginBottom: "25px" }}
          >
            <Grid
              container
              item
              xs={12}
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Typography
                  fontWeight="bold"
                  fontSize="1.3em"
                  className={classes.urlTextStyle}
                >
                  {fullItemUrl}
                </Typography>
                <Typography fontSize="1em" className={classes.urlTextStyle}>
                  {item.longUrl}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.dateTextStyle}>
                  Created {moment(item.creationDate).fromNow()}
                </Typography>
                <Typography className={classes.dateTextStyle}>
                  Expires {moment(item.expirationDate).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={4} justifyContent="flex-start" alignItems="center">
              <Typography
                display="inline"
                fontWeight="bold"
                textAlign="center"
                fontSize="1.2em"
                fontFamily="sans-serif"
                color="rgba( 60, 60, 60, 1 )"
              >
                {item.uses} views
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={8}
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}
            >
              {shareButtonOpen ? (
                <Grid
                  container
                  item
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="flex-end"
                  spacing={1}
                  xs={5}
                >
                  <Grid item>
                    <EmailShareButton url={fullItemUrl}>
                      <EmailIcon size={30} round={true} />
                    </EmailShareButton>
                  </Grid>
                  <Grid item>
                    <FacebookShareButton
                      quote={"Checkout my short url: " + fullItemUrl}
                      hashtag={"#ShortUrl"}
                      url={fullItemUrl}
                    >
                      <FacebookIcon size={30} round={true} />
                    </FacebookShareButton>
                  </Grid>
                  <Grid item>
                    <RedditShareButton
                      title={"Checkout my short url: " + fullItemUrl}
                      url={fullItemUrl}
                    >
                      <RedditIcon size={30} round={true} />
                    </RedditShareButton>
                  </Grid>
                  <Grid item>
                    <TwitterShareButton
                      title={"Checkout my short url: " + fullItemUrl}
                      url={fullItemUrl}
                    >
                      <TwitterIcon size={30} round={true} />
                    </TwitterShareButton>
                  </Grid>
                  <Grid item>
                    <WhatsappShareButton
                      title={"Checkout my short url: " + fullItemUrl}
                      url={fullItemUrl}
                    >
                      <WhatsappIcon size={30} round={true} />
                    </WhatsappShareButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => setShareButtonOpen(false)}
                      size="small"
                    >
                      <CancelIcon style={{ color: "white" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#0046BF",
                      "&:hover": {
                        backgroundColor: "#4286FC",
                      },
                    }}
                    endIcon={<ShareIcon />}
                    onClick={() => setShareButtonOpen(true)}
                  >
                    Share
                  </Button>
                </Grid>
              )}
              <Grid item>
                <Button
                  variant="contained"
                  endIcon={<ContentCopyIcon />}
                  onClick={(event) => {
                    copyToClipBoard(fullItemUrl);
                    setCopyAnchor(event.currentTarget);
                    setTimeout(() => setCopyAnchor(null), 500);
                  }}
                  sx={{
                    backgroundColor: "#2BE49F",
                    "&:hover": { backgroundColor: "#4AF6B6" },
                  }}
                >
                  Copy
                </Button>
                <CustomPopover
                  text="Copied shortened url to clipboard."
                  onClose={() => setCopyAnchor(null)}
                  anchorEl={copyAnchor}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => setShowEdit(true)}
                  endIcon={<EditIcon />}
                  sx={{
                    backgroundColor: "#2BC0E4",
                    "&:hover": {
                      backgroundColor: "#2BD6E4",
                    },
                  }}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <DeleteButton confirm={() => props.onDelete()} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default MyUrlItem;
