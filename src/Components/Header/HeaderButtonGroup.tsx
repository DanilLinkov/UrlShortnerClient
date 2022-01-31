import { Container, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderButton from "./HeaderButton";

interface Props {
  loggedIn: boolean;
  logout: () => void;
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonsContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

function HeaderButtonGroup(props: Props) {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.buttonsContainer}>
      <HeaderButton
        text="Shorten Url"
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
    </div>
  );
}

export default HeaderButtonGroup;
