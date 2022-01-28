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

  // const navigate = useNavigate();
  // const authContext = useContext(AuthContext);

  // useEffect(() => {
  //   AuthApi.CheckLogin().then((response) => {
  //     if (response.data.result) {
  //       authContext.setUser(response.data.result);
  //     }
  //   });
  // }, []);

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
