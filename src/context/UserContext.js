import {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

axios.defaults.baseURL = "https://pklaos88.online";

const apiURL = process.env.API_URL ? process.env.API_URL : "";

const UserContext = createContext();

const userReducer=  (state, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return {...state, users: action.payload}
    default:
      return state;
  }
} 

export const UserProvider = ({children}) => {
  const {refreshTokenInceptor, getAccessToken} = useAuth()
  const [state, dispatch] = useReducer(userReducer, {users: null});

  axios.interceptors.response.use(undefined, refreshTokenInceptor);

  const fetchUsers = useCallback(async () => {
    if (!getAccessToken()) {
      return false;
    }
    try {
      const response = await axios.get(apiURL + "/api/user", {
        retry: 1,
        retryDelay: 3000,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      if (response.status === 200) {
        dispatch({type: "FETCH_USER", payload: response.data.data})
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }, [state.users]);

  // useEffect(() => {
    
  // }, [state.users]);

  const value = useMemo(
    () => ({
    fetchUsers,
    }),[fetchUsers]);


  return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}

export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;