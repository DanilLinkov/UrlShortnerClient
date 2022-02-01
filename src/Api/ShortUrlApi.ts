import axios from "axios";
import {
  CreateShortUrlType,
  DeleteShortUrlType,
  GetAllCreatedShortUrlsType,
  GetSingleCreatedShortUrlsType,
  StatusCodeResponseType,
  UpdateShortUrlType,
} from "./ApiResponseTypes";

const API_URL = "https://localhost:6001/api";

class ShortUrlApi {
  GetAllCreatedShortUrls() {
    return axios.get<GetAllCreatedShortUrlsType>(API_URL, {
      withCredentials: true,
    });
  }

  CreateShortUrl(createShortUrl: CreateShortUrlType) {
    return axios.post<GetSingleCreatedShortUrlsType>(API_URL, createShortUrl, {
      withCredentials: true,
    });
  }

  UpdateShortUrl(updateShortUrl: UpdateShortUrlType) {
    return axios.put<GetSingleCreatedShortUrlsType>(API_URL, updateShortUrl, {
      withCredentials: true,
    });
  }

  GetShortUrlIdLongUrl(shortUrlId: string) {
    return axios.get<GetSingleCreatedShortUrlsType>(
      API_URL + "/" + shortUrlId,
      {
        withCredentials: true,
      }
    );
  }

  DeleteCreatedShortUrl(shortUrl: DeleteShortUrlType) {
    return axios.delete<StatusCodeResponseType>(API_URL, {
      data: shortUrl,
      withCredentials: true,
    });
  }
}

export default new ShortUrlApi();
