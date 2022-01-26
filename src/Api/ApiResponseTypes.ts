export type LoginType = {
  username: string;
  password: string;
};

export type RegisterType = {
  username: string;
  password: string;
};

export type LoginResponseType = {
  statusCode: number;
  message: string;
};

export type RegisterResponseType = {
  statusCode: number;
  message: string;
  result: Map<string, string>;
};

export type CreateErrorType = {
  statusCode: number;
  message: string;
};

export type GetAllCreatedShortUrlsType = {
  statusCode: string;
  result: ShortUrlType[];
};

export type GetSingleCreatedShortUrlsType = {
  statusCode: string;
  result: ShortUrlType;
};

export type StatusCodeResponseType = {
  statusCode: number;
};

export type ShortUrlType = {
  longUrl: string;
  shortenedUrl: string;
  creationDate: Date;
  expirationDate: Date;
  uses: number;
};

export type CreateShortUrlType = {
  customId?: string;
  longUrl: string;
  expirationDate: Date;
};

export type UpdateShortUrlType = {
  longUrl: string;
  shortenedUrl: string;
  expirationDate: Date;
};

export type DeleteShortUrlType = {
  shortenedUrl: string;
};
