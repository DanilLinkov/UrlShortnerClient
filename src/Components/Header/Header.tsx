import { Container, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../Api/AuthApi";
import AuthContext from "../../Context/AuthContext";
import HeaderButtonGroup from "./HeaderButtonGroup";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "20px",
      marginBottom: "20px",
    },
  })
);

function Header(props: Props) {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    AuthApi.CheckLogin()
      .then((response) => {
        if (response.data.result) {
          authContext.setUser(response.data.result);
          navigate("/app/");
        }
      })
      .catch(() => {
        authContext.setUser(null);
      });
  }, []);

  const logout = () => {
    AuthApi.Logout().then((response) => {
      authContext.setUser(null);
    });
  };

  console.log(authContext);

  return (
    <div className={classes.container}>
      <HeaderButtonGroup loggedIn={authContext.user !== null} logout={logout} />
    </div>
  );
}

export default Header;
