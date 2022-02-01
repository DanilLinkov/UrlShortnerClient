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
      paddingTop: "5px",
    },
  })
);

function FormTitle(props: Props) {
  const classes = useStyles();

  return (
    <Typography
      variant="h4"
      fontWeight="bold"
      textAlign="center"
      color="white"
      fontFamily="sans-serif"
      className={[classes.labelStyle, props.className].join(" ")}
      style={{ ...props.style }}
    >
      {props.children}
    </Typography>
  );
}

export default FormTitle;
