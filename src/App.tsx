import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import RedirectionToUrlPromtContainer from "./Components/RedirectionToUrl/RedirectionToUrlPromtContainer";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import MyUrls from "./Screens/MyUrls";
import RedirectToUrl from "./Screens/RedirectToUrl";
import Register from "./Screens/Register";

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
    <div>
      <Header></Header>
      <div className={classes.root}>
        <Routes>
          <Route path="/app/register" element={<Register />} />
          <Route path="/app/login" element={<Login />} />
          <Route path="/app/myurls" element={<MyUrls />} />
          <Route path="/app/*" element={<Home />} />
          <Route path="/*" element={<RedirectToUrl />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
