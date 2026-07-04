import { IAuthUser } from "./IAuthUser";

export interface IToken extends IAuthUser{
  accessToken: string;
  refreshToken: string;
}