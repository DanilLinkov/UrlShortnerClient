import { TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import DatePicker from "@mui/lab/DatePicker";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

interface Props {
  placeHolderText?: string;
  containerStyle?: React.CSSProperties;
  label?: string;
  readonly?: boolean;
  value?: Date;
  onChange: (date: Date | null) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      background: "rgb(255, 255, 255)",
      "& .MuiOutlinedInput-notchedOutline": {
        // border: "none",
      },
    },
  })
);

function DateInput(props: Props) {
  const classes = useStyles();

  return (
    <div style={{ ...props.containerStyle }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          InputProps={{ className: classes.input }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" fullWidth />
          )}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DateInput;
