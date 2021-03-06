import { Theme, useMediaQuery } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { UserType } from "./Api/ApiResponseTypes";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import AuthContext from "./Context/AuthContext";
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
      marginBottom: "100px",
    },
  })
);

function App() {
  const classes = useStyles();

  const [user, setUser] = useState<UserType | null>(null);
  const authContextValue = useMemo(() => ({ user, setUser }), [user]);

  const mdScreenMatch = useMediaQuery("(max-width:900px)");

  return (
    <div style={{ position: "relative", overflow: "auto" }}>
      <AuthContext.Provider value={authContextValue}>
        <Header />
      </AuthContext.Provider>
      <div
        className={classes.root}
        style={{ marginBottom: mdScreenMatch ? "200px" : "100px" }}
      >
        <Routes>
          <Route
            path="/app/register"
            element={
              <AuthContext.Provider value={authContextValue}>
                <Register />
              </AuthContext.Provider>
            }
          />
          <Route
            path="/app/login"
            element={
              <AuthContext.Provider value={authContextValue}>
                <Login />
              </AuthContext.Provider>
            }
          />
          <Route
            path="/app/myurls"
            element={
              <AuthContext.Provider value={authContextValue}>
                <MyUrls />
              </AuthContext.Provider>
            }
          />
          <Route
            path="/app/*"
            element={
              <AuthContext.Provider value={authContextValue}>
                <Home />
              </AuthContext.Provider>
            }
          />
          <Route
            path="/*"
            element={
              <AuthContext.Provider value={authContextValue}>
                <RedirectToUrl />
              </AuthContext.Provider>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
