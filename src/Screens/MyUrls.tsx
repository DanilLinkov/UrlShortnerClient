import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { ShortUrlType } from "../Api/ApiResponseTypes";
import ShortUrlApi from "../Api/ShortUrlApi";
import MyUrlsContainer from "../Components/MyUrls/MyUrlsContainer";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function MyUrls(props: Props) {
  const classes = useStyles();

  const [myUrls, setMyUrls] = useState<ShortUrlType[]>();

  useEffect(() => {
    ShortUrlApi.GetAllCreatedShortUrls().then((response) => {
      setMyUrls(response.data.result);
    });
  }, []);

  const onDelete = (item: ShortUrlType) => {
    ShortUrlApi.DeleteCreatedShortUrl({
      shortenedUrl: item.shortenedUrl,
    }).then((response) => {
      setMyUrls(myUrls?.filter((i) => i.shortenedUrl !== item.shortenedUrl));
    });
  };

  return <MyUrlsContainer myUrls={myUrls} onDelete={onDelete} />;
}

export default MyUrls;
