import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import RedirectionToUrlPromtContainer from "./Components/RedirectionToUrl/RedirectionToUrlPromtContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: "10%",
      marginRight: "10%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RedirectionToUrlPromtContainer />
    </div>
  );
}

export default App;
