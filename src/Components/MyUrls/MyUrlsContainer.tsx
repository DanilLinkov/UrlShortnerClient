import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import MyUrlItem from "./MyUrlItem";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

function MyUrlsContainer(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <MyUrlItem />
      <MyUrlItem />
    </div>
  );
}

export default MyUrlsContainer;
