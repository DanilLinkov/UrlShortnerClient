import { Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { ShortUrlType } from "../../Api/ApiResponseTypes";
import MyUrlItem from "./MyUrlItem";
import CircularProgress from "@mui/material/CircularProgress";
import InputSubLabel from "../Text/InputSubLabel";

interface Props {
  myUrls: ShortUrlType[] | undefined;
  onDelete: (item: ShortUrlType) => void;
  loading?: boolean;
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
      {props.loading && <CircularProgress size={64} />}
      {!props.loading && props.myUrls && props.myUrls.length <= 0 && (
        <>
          <Typography
            color="white"
            fontWeight="bold"
            fontStyle="italic"
            textAlign="center"
            variant="h6"
            paddingTop="15px"
          >
            You have not shortened any URLs, Go to the "Shorten URL" page to
            create some.
          </Typography>
          <InputSubLabel style={{ textAlign: "center", marginTop: "10px" }}>
            Note: Creating ShortURLs and then logging in / registering will
            intentionally transfer ownership of them to that account.
          </InputSubLabel>
        </>
      )}
      {!props.loading &&
        props.myUrls &&
        props.myUrls.map((item, index) => {
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
