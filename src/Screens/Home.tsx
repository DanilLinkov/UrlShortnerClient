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
  const [apiError, setApiError] = useState<string>("");

  const classes = useStyles();

  const createShortUrl = (createShortUrl: CreateShortUrlType) => {
    setApiError("");
    setLoading(true);

    ShortUrlApi.CreateShortUrl(createShortUrl)
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setApiError(error.response.data.message);
      });
  };

  return (
    <CreateShortUrlFormContainer
      onSubmit={createShortUrl}
      apiError={apiError}
      loading={loading}
    />
  );
}

export default Home;
