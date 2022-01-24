import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import MyUrlsContainer from "../Components/MyUrls/MyUrlsContainer";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function MyUrls(props: Props) {
  const classes = useStyles();

  return <MyUrlsContainer />;
}

export default MyUrls;
