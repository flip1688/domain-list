import { createContext, useReducer, useEffect, useMemo, useContext } from 'react'
import axios from 'axios';

axios.defaults.baseURL = 'https://pklaos88.online';

const apiURL = process.env.API_URL ? process.env.API_URL : "";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { auth: action.payload }
    case 'LOGOUT':
      return { auth: null }
    case 'REFRESH':
      return { auth: action.payload }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { auth: null })

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'))

    if (auth) {
      dispatch({ type: 'LOGIN', payload: auth })
    }
  }, []);

  useEffect(() => {
    if (state.auth) {
      localStorage.setItem("auth", JSON.stringify(state.auth))
    }
  }, [state.auth]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(apiURL + '/api/auth/user/signin', { username, password });
      dispatch({ type: 'LOGIN', payload: { ...response.data, username } });

      //dispatch({ type: 'LOGIN', payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(apiURL + '/api/auth/user/refresh', { refreshToken: state.auth.refreshToken, accessToken: state.auth.accessToken });
      dispatch({ type: 'REFRESH', payload: response.data })
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  };

  const isAuthenticated = () => {
    return state.auth !== null;
  };

  const value = useMemo(
    () => ({
      login, refreshToken, logout, isAuthenticated, auth: state.auth // Include auth in the value
    }), [state]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
