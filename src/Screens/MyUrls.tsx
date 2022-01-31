import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShortUrlType } from "../Api/ApiResponseTypes";
import AuthApi from "../Api/AuthApi";
import ShortUrlApi from "../Api/ShortUrlApi";
import MyUrlsContainer from "../Components/MyUrls/MyUrlsContainer";
import AuthContext from "../Context/AuthContext";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function MyUrls(props: Props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [myUrls, setMyUrls] = useState<ShortUrlType[]>();

  useEffect(() => {
    setLoading(true);
    ShortUrlApi.GetAllCreatedShortUrls().then((response) => {
      setMyUrls(response.data.result);
      setLoading(false);
    });
  }, []);

  const onDelete = (item: ShortUrlType) => {
    setLoading(true);
    ShortUrlApi.DeleteCreatedShortUrl({
      shortenedUrlId: item.shortenedUrlId,
    }).then((response) => {
      setMyUrls(
        myUrls?.filter((i) => i.shortenedUrlId !== item.shortenedUrlId)
      );
      setLoading(false);
    });
  };

  return (
    <MyUrlsContainer myUrls={myUrls} onDelete={onDelete} loading={loading} />
  );
}

export default MyUrls;
