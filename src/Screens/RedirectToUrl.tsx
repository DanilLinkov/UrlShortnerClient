import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShortUrlType } from "../Api/ApiResponseTypes";
import ShortUrlApi from "../Api/ShortUrlApi";
import RedirectionToUrlPromtContainer from "../Components/RedirectionToUrl/RedirectionToUrlPromtContainer";

function RedirectToUrl() {
  const [loading, setLoading] = useState<boolean>(true);
  const [shortUrl, setShortUrl] = useState<ShortUrlType>();
  const [error, setError] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const shortUrlId = location.pathname.slice(1);

    if (shortUrlId.length <= 0) {
      setError("Invalid short url id");
      setLoading(false);
      return;
    }

    ShortUrlApi.GetShortUrlIdLongUrl(shortUrlId)
      .then((response) => {
        setShortUrl(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
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
      loading={loading}
    />
  );
}

export default RedirectToUrl;
