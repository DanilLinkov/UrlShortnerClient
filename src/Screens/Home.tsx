import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreateShortUrlType,
  GetSingleCreatedShortUrlsType,
} from "../Api/ApiResponseTypes";
import ShortUrlApi from "../Api/ShortUrlApi";
import AfterCreateShortUrlFormContainer from "../Components/CreateShortUrlForm/AfterCreateShortUrlFormContainer";
import CreateShortUrlFormContainer from "../Components/CreateShortUrlForm/CreateShortUrlFormContainer";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function Home(props: Props) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");
  const [newShortUrl, setNewShortUrl] =
    useState<GetSingleCreatedShortUrlsType>();

  const classes = useStyles();

  const createShortUrl = (createShortUrl: CreateShortUrlType) => {
    setApiError("");
    setLoading(true);

    ShortUrlApi.CreateShortUrl(createShortUrl)
      .then((response) => {
        setLoading(false);
        setNewShortUrl(response.data);
      })
      .catch((error) => {
        setApiError(error.response.data.message);
        setLoading(false);
      });
  };

  const onShortenAnotherClick = () => {
    navigate("/app");
    setNewShortUrl(undefined);
  };

  return (
    <>
      {!newShortUrl ? (
        <CreateShortUrlFormContainer
          onSubmit={createShortUrl}
          apiError={apiError}
          loading={loading}
        />
      ) : (
        <AfterCreateShortUrlFormContainer
          item={newShortUrl}
          onShortenAnotherClick={onShortenAnotherClick}
        />
      )}
    </>
  );
}

export default Home;
