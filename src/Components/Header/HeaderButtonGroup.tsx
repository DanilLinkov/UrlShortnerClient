import { Container, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderButton from "./HeaderButton";

interface Props {}

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
      ></HeaderButton>
      <HeaderButton
        text="My URLs"
        onClick={() => {
          navigate("/app/myurls");
        }}
      ></HeaderButton>
      <HeaderButton
        text="Register"
        onClick={() => {
          navigate("/app/register");
        }}
      ></HeaderButton>
      <HeaderButton
        text="Log in"
        onClick={() => {
          navigate("/app/login");
        }}
      ></HeaderButton>
    </div>
  );
}

export default HeaderButtonGroup;
