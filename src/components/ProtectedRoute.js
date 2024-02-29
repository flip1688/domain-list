import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";
import {userRefreshToken} from '../features/auth/authActions'

const ProtectedRoute = ({ children }) => {
  const { loading, userAuth, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()

  
  if (!userAuth) {
    return <Navigate to="/login" />;
  }
  dispatch(userRefreshToken(userAuth.accessToken, userAuth.refreshToken))
  
  return children;
};

export default ProtectedRoute;
