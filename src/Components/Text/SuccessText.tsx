import { Typography } from "@mui/material";
import React from "react";

interface Props {
  display?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function SuccessText(props: Props) {
  return (
    <>
      {props.display && (
        <Typography
          variant="h6"
          color="#38F5AE"
          textAlign="center"
          fontFamily="sans-serif"
          className={props.className}
          style={{ ...props.style }}
        >
          {props.children}
        </Typography>
      )}
    </>
  );
}

export default SuccessText;
