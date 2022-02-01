import React, { useEffect, useState } from "react";
import { ShortUrlType } from "../Api/ApiResponseTypes";
import ShortUrlApi from "../Api/ShortUrlApi";
import MyUrlsContainer from "../Components/MyUrls/MyUrlsContainer";

function MyUrls() {
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
    })
      .then((response) => {
        setMyUrls(
          myUrls?.filter((i) => i.shortenedUrlId !== item.shortenedUrlId)
        );
        setLoading(false);
      })
      .catch((error) => {
        window.location.reload();
        setLoading(false);
      });
  };

  return (
    <MyUrlsContainer myUrls={myUrls} onDelete={onDelete} loading={loading} />
  );
}

export default MyUrls;
