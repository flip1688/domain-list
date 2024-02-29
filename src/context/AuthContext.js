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

axios.interceptors.response.use(undefined, (err) => {
  const { config, message } = err;
  if (!config || !config.retry) {
    return Promise.reject(err);
  }
  // retry while Network timeout or Network Error
  if (!(message.includes("timeout") || message.includes("Network Error"))) {
    return Promise.reject(err);
  }

  config.retry -= 1;
  const delayRetryRequest = new Promise((resolve) => {
    setTimeout(() => {
      console.log("retry the request", config.url);
      resolve();
    }, config.retryDelay || 1000);
  });
  return delayRetryRequest.then(() => axios(config));
});

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
    const user = JSON.parse(localStorage.getItem("user"));

    if (auth) {
      dispatch({ type: "LOGIN", payload: auth });
    }

    if (user) {
      dispatch({ type: "USER", payload: user });
    }
  }, []);

  useEffect(() => {
    if (state.auth) {
      localStorage.setItem("auth", JSON.stringify(state.auth));
    }
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.auth, state.user]);

  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post(apiURL + "/api/auth/user/signin", {
        username,
        password,
      });

      const userInfoResponse = await axios.get(apiURL + "/api/user/me", {
        retry: 3,
        retryDelay: 3000,
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

      return response;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post(apiURL + "/api/auth/user/refresh", {
        retry: 3,
        retryDelay: 3000,
        refreshToken: state.auth.refreshToken,
        accessToken: state.auth.accessToken,
      });
      dispatch({ type: "REFRESH", payload: response.data });
    } catch (error) {
      return false;
    }
  }, [state.auth]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(apiURL + "/api/user", {
        retry: 3,
        retryDelay: 3000,
        headers: {
          Authorization: `Bearer ${state.auth.accessToken}`,
        },
      });

      if (response.status === 200) {
        return response.data.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }, [state.auth]);

  const CreateNewUser = useCallback(
    async (username, password, name, role) => {
      try {
        const response = await axios.post(apiURL + "/api/user", {
          username,
          password,
          name,
          role,
          headers: {
            Authorization: `Bearer ${state.auth.accessToken}`,
          },
        });

        if (response.status === 200) {
          return response.data.data;
        } else {
          if (refreshToken()) {
            const response = await axios.post(apiURL + "/api/user", {
              username,
              password,
              name,
              role,
              headers: {
                Authorization: `Bearer ${state.auth.accessToken}`,
              },
            });

            return response.data.data;
          } else {
            console.log(response);
            return false;
          }
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [state.auth]
  );

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
      CreateNewUser,
      user: state.user,
    }),
    [
      state.user,
      login,
      refreshToken,
      logout,
      isAuthenticated,
      fetchUsers,
      CreateNewUser,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
