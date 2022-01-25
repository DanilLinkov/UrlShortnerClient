import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { CreateShortUrlType } from "../Api/ApiResponseTypes";
import ShortUrlApi from "../Api/ShortUrlApi";
import CreateShortUrlFormContainer from "../Components/CreateShortUrlForm/CreateShortUrlFormContainer";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function Home(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const classes = useStyles();

  const createShortUrl = (createShortUrl: CreateShortUrlType) => {
    setLoading(true);

    ShortUrlApi.CreateShortUrl(createShortUrl).then((response) => {
      setLoading(false);

      // Link to created short url screen
    });
  };

  return <CreateShortUrlFormContainer onSubmit={createShortUrl} />;
}

export default Home;
