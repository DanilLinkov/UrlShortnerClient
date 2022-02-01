import { Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelStyle: {
      width: "100%",
      textAlign: "start",
      paddingBottom: "5px",
    },
  })
);

function InputSubLabel(props: Props) {
  const classes = useStyles();

  return (
    <Typography
      variant="body1"
      fontStyle="italic"
      color="rgba(255,255,255,0.9)"
      fontFamily="sans-serif"
      className={[classes.labelStyle, props.className].join(" ")}
      style={{ ...props.style }}
    >
      {props.children}
    </Typography>
  );
}

export default InputSubLabel;
