import { Container, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
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
      justifyContent: "space-between",
      padding: "20px",
      marginBottom: "20px",
    },
  })
);

function Header(props: Props) {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    AuthApi.CheckLogin()
      .then((response) => {
        if (response.data.result) {
          authContext.setUser(response.data.result);
        }
      })
      .catch(() => {
        authContext.setUser(null);
      });
  }, []);

  const logout = () => {
    setLoading(true);
    AuthApi.Logout().then((response) => {
      authContext.setUser(null);
      setLoading(false);
      window.location.reload();
    });
  };

  return (
    <div className={classes.container}>
      <Typography
        variant="h3"
        fontStyle="oblique"
        fontWeight="bold"
        color="white"
        padding="10px"
        borderRadius="20px"
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
          userSelect: "none",
        }}
        onClick={() => {
          navigate("/app/");
        }}
      >
        ShortURL
      </Typography>
      <HeaderButtonGroup
        loggedIn={authContext.user !== null}
        logout={logout}
        loading={loading}
      />
    </div>
  );
}

export default Header;
