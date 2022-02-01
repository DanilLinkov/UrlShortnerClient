import { Popover, PopoverOrigin, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

interface Props {
  text: string;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  anchorOrigin?: PopoverOrigin | undefined;
  transformOrigin?: PopoverOrigin | undefined;
}

function CustomPopover(props: Props) {
  const open = Boolean(props.anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
      anchorOrigin={
        props.anchorOrigin || {
          vertical: "center",
          horizontal: "right",
        }
      }
      transformOrigin={
        props.transformOrigin || {
          vertical: "center",
          horizontal: "right",
        }
      }
    >
      <Typography sx={{ p: 2 }}>{props.text}</Typography>
    </Popover>
  );
}

export default CustomPopover;
