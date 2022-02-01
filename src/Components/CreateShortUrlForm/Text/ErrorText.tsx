import { Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

interface Props {
  display?: boolean;
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

function ErrorText(props: Props) {
  const classes = useStyles();

  return (
    <>
      {props.display && (
        <Typography
          color="red"
          fontWeight="bold"
          fontStyle="italic"
          textAlign="center"
          className={[classes.labelStyle, props.className].join(" ")}
          style={{ ...props.style }}
        >
          {props.children}
        </Typography>
      )}
    </>
  );
}

export default ErrorText;
