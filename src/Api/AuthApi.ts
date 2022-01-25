import axios from "axios";
import {
  LoginResponseType,
  LoginType,
  RegisterResponseType,
  RegisterType,
} from "./ApiResponseTypes";

const API_URL = "https://localhost:6001/api";

class AuthApi {
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
    return axios.post<LoginResponseType>(API_URL + "/logout", {
      withCredentials: true,
    });
  }
}

export default new AuthApi();
