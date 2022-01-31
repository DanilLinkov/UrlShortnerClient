import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GetSingleCreatedShortUrlsType,
  ShortUrlType,
} from "../Api/ApiResponseTypes";
import AuthApi from "../Api/AuthApi";
import ShortUrlApi from "../Api/ShortUrlApi";
import RedirectionToUrlPromtContainer from "../Components/RedirectionToUrl/RedirectionToUrlPromtContainer";
import AuthContext from "../Context/AuthContext";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);

function RedirectToUrl(props: Props) {
  const classes = useStyles();
  const [shortUrl, setShortUrl] = useState<ShortUrlType>();
  const [error, setError] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const shortUrlId = location.pathname.slice(1);

    if (shortUrlId.length <= 0) {
      setError("Invalid short url id");
      return;
    }

    ShortUrlApi.GetShortUrlIdLongUrl(shortUrlId)
      .then((response) => {
        setShortUrl(response.data.result);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  const onContinue = () => {
    if (shortUrl) {
      window.open(shortUrl.longUrl, "_blank", "noopener");
      navigate("/app");
    }
  };

  const onCancel = () => {
    navigate("/app");
  };

  return (
    <RedirectionToUrlPromtContainer
      error={error}
      shortUrl={shortUrl}
      onContinue={onContinue}
      onCancel={onCancel}
    />
  );
}

export default RedirectToUrl;
