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
import MyUrlItemEdit from "./MyUrlItemEdit";
import ShortUrlApi from "../../Api/ShortUrlApi";

interface Props {
  item: ShortUrlType;
  onDelete: () => void;
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

function MyUrlItem(props: Props) {
  const classes = useStyles();

  const [item, setItem] = useState<ShortUrlType>(props.item);
  const [copyAnchor, setCopyAnchor] = React.useState<HTMLButtonElement | null>(
    null
  );

  const copyOpen = Boolean(copyAnchor);
  const copyAnchorId = copyOpen ? "simple-popover" : undefined;

  const copyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showEditedMessage, setShowEditedMessage] = useState<boolean>(false);

  const [apiError, setApiError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
          {showEditedMessage && (
            <Typography
              variant="h6"
              color="green"
              style={{ position: "absolute", top: "0px", right: "40%" }}
            >
              Edited successfully
            </Typography>
          )}
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
                  fontFamily="sans-serif"
                >
                  {item.shortenedUrlId}
                </Typography>
                <Typography
                  textAlign="start"
                  fontWeight="normal"
                  fontSize="1em"
                  fontFamily="sans-serif"
                >
                  {item.longUrl}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  textAlign="end"
                  fontStyle="italic"
                  fontFamily="sans-serif"
                >
                  Created {moment(item.creationDate).fromNow()}
                </Typography>
                <Typography
                  textAlign="end"
                  fontStyle="italic"
                  fontFamily="sans-serif"
                >
                  Expires {moment(item.expirationDate).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={4} justifyContent="flex-start" alignItems="center">
              <Typography
                style={{
                  backgroundColor: "white",
                  borderRadius: "25px",
                  padding: "15px",
                  display: "inline",
                }}
                fontWeight="bold"
                textAlign="center"
                fontSize="1.2em"
                fontFamily="sans-serif"
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
              <Grid item>
                <Button
                  variant="contained"
                  endIcon={<ContentCopyIcon />}
                  onClick={(event) => {
                    copyToClipBoard(item.shortenedUrlId);
                    setCopyAnchor(event.currentTarget);
                    setTimeout(() => setCopyAnchor(null), 500);
                  }}
                >
                  Copy
                </Button>
                <Popover
                  id={copyAnchorId}
                  open={copyOpen}
                  anchorEl={copyAnchor}
                  onClose={() => setCopyAnchor(null)}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    Copied shortened url to clipboard.
                  </Typography>
                </Popover>
              </Grid>
              <Grid item>
                <Button variant="contained" endIcon={<ShareIcon />}>
                  Share
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => setShowEdit(true)}
                  endIcon={<EditIcon />}
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
