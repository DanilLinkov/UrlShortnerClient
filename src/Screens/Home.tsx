import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import CreateShortUrlFormContainer from "../Components/CreateShortUrlForm/CreateShortUrlFormContainer";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function Home(props: Props) {
  const classes = useStyles();

  return <CreateShortUrlFormContainer />;
}

export default Home;
