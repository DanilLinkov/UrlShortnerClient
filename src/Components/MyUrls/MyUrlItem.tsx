import {
  Button,
  Grid,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
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

  const mainContainerRef = React.useRef<HTMLDivElement | null>(null);

  const [editedAnchor, setEditedAnchor] = React.useState<HTMLDivElement | null>(
    null
  );

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
        setEditedAnchor(mainContainerRef.current);
        setTimeout(() => {
          setEditedAnchor(null);
        }, 1000);
      })
      .catch((error) => {
        setApiError(error.response.data.message);
        setLoading(false);
      });
  };

  const mdScreenMatch = useMediaQuery("(max-width:900px)");

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
        <div
          ref={mainContainerRef}
          className={classes.itemContainer}
          style={{ position: "relative" }}
        >
          <CustomPopover
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            text="Edited item successfully"
            onClose={() => setEditedAnchor(null)}
            anchorEl={editedAnchor}
          />
          <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            style={{ marginBottom: "25px" }}
          >
            <Grid item xs={12} md={8}>
              <Typography
                fontWeight="bold"
                fontSize="1.3em"
                className={classes.urlTextStyle}
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {fullItemUrl}
              </Typography>
              <Typography
                fontSize="1em"
                className={classes.urlTextStyle}
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {item.longUrl}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              style={
                mdScreenMatch
                  ? {
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      flexDirection: "column",
                      paddingTop: "10px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.5)",
                    }
                  : {
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      flexDirection: "column",
                    }
              }
            >
              <Typography className={classes.dateTextStyle}>
                Created {moment(item.creationDate).fromNow()}
              </Typography>
              <Typography className={classes.dateTextStyle}>
                Expires {moment(item.expirationDate).fromNow()}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {mdScreenMatch ? (
              <Typography
                style={
                  mdScreenMatch
                    ? { position: "absolute", top: "40%", right: "4%" }
                    : undefined
                }
                display="inline"
                fontWeight="bold"
                textAlign="center"
                fontSize="1.2em"
                fontFamily="sans-serif"
                color="rgba( 60, 60, 60, 1 )"
              >
                {item.uses} views
              </Typography>
            ) : (
              <Grid item xs={12} sm={4}>
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
            )}
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={8}
              display="flex"
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
                  xs={6}
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
                <Grid
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  item
                  xs={mdScreenMatch ? 6 : undefined}
                >
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
                    style={{ width: "100px" }}
                  >
                    Share
                  </Button>
                </Grid>
              )}
              <Grid
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                item
                xs={mdScreenMatch ? 6 : undefined}
              >
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
                  style={{ width: "100px" }}
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
              <Grid
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                item
                xs={mdScreenMatch ? 6 : undefined}
              >
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
                  style={{ width: "100px" }}
                >
                  Edit
                </Button>
              </Grid>
              <Grid
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                item
                xs={mdScreenMatch ? 6 : undefined}
              >
                <DeleteButton
                  confirm={() => props.onDelete()}
                  style={{ width: "100px" }}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default MyUrlItem;
