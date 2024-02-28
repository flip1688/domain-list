import {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useContext,
  useCallback,
} from "react";
import axios from "axios";

axios.defaults.baseURL = "https://pklaos88.online";

const apiURL = process.env.API_URL ? process.env.API_URL : "";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { auth: action.payload };
    case "USER":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { auth: null, user: null };
    case "REFRESH":
      return { auth: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { auth: null });

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const user = (localStorage.getItem("user"));

    if (auth) {
      dispatch({ type: "LOGIN", payload: auth });
    }

    if (user) {
      dispatch({ type: "USER", payload: auth });
    }
  }, []);

  useEffect(() => {
    if (state.auth) {
      localStorage.setItem("auth", JSON.stringify(state.auth));
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.auth, state.user]);

  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post(apiURL + "/api/auth/user/signin", {
        username,
        password,
      });

      const token = response.data.accessToken;
      const rtoken = response.data.refreshToken;
      localStorage.setItem("token", token);
      localStorage.setItem("rtoken", rtoken);

      const userInfoResponse = await axios.get(apiURL + "/api/user/me", {
        headers: {
          Authorization: `Bearer ${response.data.accessToken}`,
        },
      });

      dispatch({
        type: "LOGIN",
        payload: response.data,
      });

      dispatch({
        type: "USER",
        payload: userInfoResponse.data,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(apiURL + "/api/user", {
        headers: {
          Authorization: `Bearer ${state.auth.accessToken}`,
        },
      });
      console.log(response);
  
      return response.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [state.auth]);  

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post(apiURL + "/api/auth/user/refresh", {
        refreshToken: state.auth.refreshToken,
        accessToken: state.auth.accessToken,
      });
      dispatch({ type: "REFRESH", payload: response.data });
    } catch (error) {
      console.error(error);
    }
  }, [state.auth]);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  const isAuthenticated = useCallback(() => {
    return state.auth !== null;
  }, [state.auth]);

  const value = useMemo(
    () => ({
      login,
      refreshToken,
      logout,
      isAuthenticated,
      fetchUsers,
      user: state.user, 
    }),
    [state.user, login, refreshToken, logout, isAuthenticated, fetchUsers]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
