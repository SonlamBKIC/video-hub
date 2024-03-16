import { createContext } from "react";

interface AppContextProps {
  authenticated: boolean;
  authUser: { username: string };
  setAuthUser: (user: { username: string }) => void;
  setAuthenticated: (auth: boolean) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
  reload: boolean;
  setReload: (reload: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosInstance?: any;
}

const AppContext = createContext<AppContextProps>({
  authenticated: false,
  setAuthenticated: () => {},
  axiosInstance: undefined,
  accessToken: "",
  authUser: { username: "" },
  setAccessToken: () => {},
  setAuthUser: () => {},
  reload: false,
  setReload: () => {},
});

export default AppContext;
