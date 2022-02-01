import { Grid, Theme, useMediaQuery } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderButton from "./HeaderButton";

interface Props {
  loggedIn: boolean;
  logout: () => void;
  loading: boolean;
}

function HeaderButtonGroup(props: Props) {
  const navigate = useNavigate();

  return (
    <Grid
      container
      item
      display="flex"
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="center"
      xs={12}
      md={9}
      spacing={1}
    >
      <HeaderButton
        text="Home"
        onClick={() => {
          navigate("/app/");
        }}
      />
      <HeaderButton
        text="My URLs"
        onClick={() => {
          navigate("/app/myurls");
        }}
      />
      {props.loggedIn ? (
        <HeaderButton
          text="Log out"
          onClick={() => {
            props.logout();
          }}
          loading={props.loading}
        />
      ) : (
        <>
          <HeaderButton
            text="Register"
            onClick={() => {
              navigate("/app/register");
            }}
          />
          <HeaderButton
            text="Log in"
            onClick={() => {
              navigate("/app/login");
            }}
          />
        </>
      )}
    </Grid>
  );
}

export default HeaderButtonGroup;
