import axios from "axios";
import {
  LoginResponseType,
  LoginType,
  RegisterResponseType,
  RegisterType,
} from "./ApiResponseTypes";

const API_URL = "https://shorturlapi.azurewebsites.net/api";

class AuthApi {
  CheckLogin() {
    return axios.get<LoginResponseType>(API_URL + "/login", {
      withCredentials: true,
    });
  }

  Login(login: LoginType) {
    return axios.post<LoginResponseType>(API_URL + "/login", login, {
      withCredentials: true,
    });
  }

  Register(register: RegisterType) {
    return axios.post<RegisterResponseType>(API_URL + "/register", register, {
      withCredentials: true,
    });
  }

  Logout() {
    return axios.post<LoginResponseType>(API_URL + "/logout", null, {
      withCredentials: true,
    });
  }
}

export default new AuthApi();
