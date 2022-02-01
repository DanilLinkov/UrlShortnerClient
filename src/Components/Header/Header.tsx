import {
  Grid,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../Api/AuthApi";
import AuthContext from "../../Context/AuthContext";
import HeaderButtonGroup from "./HeaderButtonGroup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "20px",
      marginBottom: "20px",
    },
  })
);

function Header() {
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

  const mdScreenMatch = useMediaQuery("(max-width:900px)");

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={3}>
        <Typography
          textAlign={mdScreenMatch ? "center" : "left"}
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
      </Grid>
      <HeaderButtonGroup
        loggedIn={authContext.user !== null}
        logout={logout}
        loading={loading}
      />
    </Grid>
  );
}

export default Header;
