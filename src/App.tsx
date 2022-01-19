import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import CreateShortUrlFormContainer from "./Components/CreateShortUrlForm/CreateShortUrlFormContainer";
import Header from "./Components/Header/Header";
import HeaderButton from "./Components/Header/HeaderButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonsContainer: {
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
    <div className={classes.buttonsContainer}>
      <CreateShortUrlFormContainer></CreateShortUrlFormContainer>
    </div>
  );
}

export default App;
