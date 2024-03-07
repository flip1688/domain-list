import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { userApi } from './service/user'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddlewere) => 
    getDefaultMiddlewere().concat(userApi.middleware)
 
})

export default store