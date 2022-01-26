import { Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

interface Props {
  text: string;
  textVariant:
    | "inherit"
    | "button"
    | "overline"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2";
  textColor?: string;
  fontStyle?: "italic" | "normal" | "oblique";
  fontWeight?:
    | "bold"
    | "normal"
    | "lighter"
    | "bolder"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  containerStyle?: React.CSSProperties;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textContainer: {},
  })
);

function FormTextLabel(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.textContainer} style={{ ...props.containerStyle }}>
      <Typography
        variant={props.textVariant}
        color={props.textColor}
        fontStyle={props.fontStyle}
        fontWeight={props.fontWeight}
        fontFamily="sans-serif"
      >
        {props.text}
      </Typography>
    </div>
  );
}

export default FormTextLabel;
