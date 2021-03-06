import { TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import DatePicker from "@mui/lab/DatePicker";
import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { format } from "date-fns";

interface Props {
  placeHolderText?: string;
  containerStyle?: React.CSSProperties;
  label?: string;
  readonly?: boolean;
  value: Date;
  minDate: Date;
  maxDate: Date;
  onChange: (date: Date | null) => void;
  setDateError: (error: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dateInput: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "15px",
        border: "1px solid rgba(255, 255, 255, 0.5)",
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
          InputProps={{ className: classes.dateInput }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "15px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "rgb(255, 255, 255)",
                  transition: "background-color 0.3s",
                },
              }}
            />
          )}
          onError={(reason, value) => {
            switch (reason) {
              case "invalidDate":
                props.setDateError("Invalid date format");
                break;

              case "disablePast":
                props.setDateError("Values in the past are not allowed");
                break;

              case "maxDate":
                props.setDateError(
                  `Date should not be after ${format(props.maxDate, "P")}`
                );
                break;

              case "minDate":
                props.setDateError(
                  `Date should not be before ${format(props.minDate, "P")}`
                );
                break;

              default:
                props.setDateError("");
            }
          }}
          minDate={props.minDate}
          maxDate={props.maxDate}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DateInput;
