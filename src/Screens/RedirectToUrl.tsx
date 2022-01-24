import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import RedirectionToUrlPromtContainer from "../Components/RedirectionToUrl/RedirectionToUrlPromtContainer";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function RedirectToUrl(props: Props) {
  const classes = useStyles();

  return <RedirectionToUrlPromtContainer />;
}

export default RedirectToUrl;
