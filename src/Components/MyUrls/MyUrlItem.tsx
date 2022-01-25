import { Button, Grid, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { ShortUrlType } from "../../Api/ApiResponseTypes";

interface Props {
  item: ShortUrlType;
  onDelete: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemContainer: {
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.57)",
      borderRadius: "5px",
      boxShadow: "-10px 10px 20px 10px rgba(0,0,0,0.23)",
      width: "90%",
      border: "#FFFFFF solid 2px",
      marginBottom: "20px",
    },
  })
);

function MyUrlItem(props: Props) {
  const classes = useStyles();

  const onDelete = () => {};

  return (
    <div className={classes.itemContainer}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography style={{ textAlign: "start" }}>
              {props.item.shortenedUrl}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ textAlign: "end" }}>
              {props.item.creationDate}
            </Typography>
            <Typography style={{ textAlign: "end" }}>
              {props.item.expirationDate}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography style={{ textAlign: "start" }}>
              {props.item.longUrl}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ textAlign: "end" }}>
              {props.item.uses}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={6}>
          <Grid item>
            <Button variant="contained">Copy</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Share</Button>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item>
            <Button variant="contained">Edit</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={props.onDelete}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyUrlItem;
