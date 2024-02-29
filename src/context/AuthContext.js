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
      return { ...state, auth: action.payload };
    case "USER":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { auth: null, user: null };
    case "REFRESH":
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { auth: null });

  const refreshTokenInceptor = (err) => {
    const { config, message } = err;
    if (!config || !config.retry) {
      return Promise.reject(err);
    }
    // retry while Network timeout or Network Error
    // console.log(message)
    if (!(message.includes("timeout") || message.includes("Network Error") || err.response.status === 401)) {
      console.log("error ", err);
      return Promise.reject(err);
    }
  
    config.retry -= 1;
    const delayRetryRequest = new Promise((resolve) => {
      refreshToken();
      setTimeout(() => {
        
        config.headers.Authorization = `Bearer ${state.auth.accessToken}`
        console.log("retry the request", config.url);
        resolve();
      }, config.retryDelay || 1000);
    });
    return delayRetryRequest.then(() => axios(config));
  }

  

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    // const user = JSON.parse(localStorage.getItem("user"));

    if (auth) {
     
     try {
      console.log("auth", auth);
     
      // dispatch({type: "LOGIN", payload: auth});
      refreshToken(auth.accessToken, auth.refreshToken);
      // getSelf(auth.accessToken, auth.refreshToken);
     } catch (error){
      console.log("err refresh:",error);
      // refreshToken(auth.accessToken, auth.refreshToken);
     }
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

  const getSelf = useCallback(async (accessToken, rfToken) => {
    console.log("do get me");
    try {
      const response = await axios.get(apiURL+'/api/user/me' ,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        rretry: 1,
      });
      console.log("get me:". response.data);
      dispatch({type: "USER" , payload: response.data})
    } catch (error){
      console.log(error)
      // if (error.response.status === 401) {
      //   console.log("do refresh");
      //   refreshToken(accessToken, rfToken);
      // }
    }
  }, [state.auth])
  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post(apiURL + "/api/auth/user/signin", {
        username,
        password,
      });

      dispatch({
        type: "LOGIN",
        payload: response.data,
      });
      getSelf(response.data.accessToken, response.data.refreshToken)
      return response;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const refreshToken = useCallback(async (accessToken, refreshToken) => {
    try {
      const response = await axios.post(apiURL + "/api/auth/user/refresh", {
        "refreshToken": refreshToken,
        "accessToken": accessToken,
      }, {
        retry: 3,
        retryDelay: 3000,
      });
      dispatch({ type: "REFRESH", payload: response.data });
      dispatch({ type: "USER", payload: state.user,
      });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401)
      logout();
      return false;
    }
  }, [state.auth,state.user]);

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
      await refreshToken();
      return false;
    }
  }, [state.auth , refreshToken]);

  const ChangeOwnPass = useCallback(
    async (password, newPassword,) => {
      try {

        await refreshToken();
        
        const response = await axios.post(apiURL + "/api/user/me/password", {
          password,
          newPassword,
          headers: {
            Authorization: `Bearer ${state.auth.accessToken}`,
          },
        });

        if (response.status === 200) {
          return response.data.data;
        } else {
          if (await refreshToken()) {
            const response = await axios.post(apiURL + "/api/user/me/password", {
              password,
              newPassword,
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
    [state.auth,refreshToken]
  );

  const ChangeOwnName = useCallback(
    async (name) => {
      try {

        await refreshToken();
        
        const response = await axios.post(apiURL + "/api/user/me/name", {
          name,
          headers: {
            Authorization: `Bearer ${state.auth.accessToken}`,
          },
        });

        if (response.status === 200) {
          return response.data.data;
        } else {
          if (await refreshToken()) {
            const response = await axios.post(apiURL + "/api/user/me/name", {
              name,
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
    [state.auth,refreshToken]
  );

  const UpdateUserStatus = useCallback(
    async (user_id,status) => {
      try {

        await refreshToken();
        
        const response = await axios.post(apiURL + `/api/user/${user_id}/status`, {
          status,
          headers: {
            Authorization: `Bearer ${state.auth.accessToken}`,
          },
        });

        if (response.status === 200) {
          return response.data.data;
        } else {
          if (await refreshToken()) {
            const response = await axios.post(apiURL + `/api/user/${user_id}/status`, {
              status,
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
    [state.auth,refreshToken]
  );

  const ResetUserPass = useCallback(
    async (user_id,new_user_password) => {
      try {

        await refreshToken();
        
        const response = await axios.post(apiURL + `/api/user/${user_id}/password`, {
          password:new_user_password,
          headers: {
            Authorization: `Bearer ${state.auth.accessToken}`,
          },
        });

        if (response.status === 200) {
          return response.data.data;
        } else {
          if (await refreshToken()) {
            const response = await axios.post(apiURL + `/api/user/${user_id}/password`, {
              password:new_user_password,
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
    [state.auth,refreshToken]
  );

  const CreateNewUser = useCallback(
    async (username, password, name, role) => {
      try {

        await refreshToken();
        
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
          if (await refreshToken()) {
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
    [state.auth,refreshToken]
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
      // getAccessToken
    }),
    [
      state.user,
      login,
      refreshToken,
      logout,
      isAuthenticated,
      fetchUsers,
      CreateNewUser,
      ChangeOwnPass,
      ChangeOwnName,
      UpdateUserStatus,
      ResetUserPass,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
