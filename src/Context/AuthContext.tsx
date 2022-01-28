import * as React from "react";
import { UserType } from "../Api/ApiResponseTypes";

interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export default AuthContext;
