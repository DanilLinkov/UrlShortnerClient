import { Button, Grid, Popover, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import moment from "moment";
import React from "react";
import { ShortUrlType } from "../../Api/ApiResponseTypes";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";

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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const copyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.itemContainer}>
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
              {props.item.shortenedUrlId}
            </Typography>
            <Typography
              textAlign="start"
              fontWeight="normal"
              fontSize="1em"
              fontFamily="sans-serif"
            >
              {props.item.longUrl}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              textAlign="end"
              fontStyle="italic"
              fontFamily="sans-serif"
            >
              Created {moment(props.item.creationDate).fromNow()}
            </Typography>
            <Typography
              textAlign="end"
              fontStyle="italic"
              fontFamily="sans-serif"
            >
              Expires {moment(props.item.expirationDate).fromNow()}
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
            {props.item.uses} views
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
                copyToClipBoard(props.item.shortenedUrlId);
                setAnchorEl(event.currentTarget);
                setTimeout(() => setAnchorEl(null), 500);
              }}
            >
              Copy
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
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
            <ConfirmationDialog confirm={() => props.onDelete()} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyUrlItem;
