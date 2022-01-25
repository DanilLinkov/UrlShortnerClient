import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { ShortUrlType } from "../../Api/ApiResponseTypes";
import MyUrlItem from "./MyUrlItem";

interface Props {
  myUrls: ShortUrlType[] | undefined;
  onDelete: (item: ShortUrlType) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

function MyUrlsContainer(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {props.myUrls?.map((item, index) => {
        return (
          <MyUrlItem
            key={index}
            item={item}
            onDelete={() => props.onDelete(item)}
          />
        );
      })}
    </div>
  );
}

export default MyUrlsContainer;
