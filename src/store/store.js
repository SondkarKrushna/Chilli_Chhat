import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { loginApi } from "./api/loginApi";
import { registerApi } from "./api/registerApi";
import { waiterPannelApi } from "./api/waiterPannelApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [waiterPannelApi.reducerPath]: waiterPannelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      registerApi.middleware,
      waiterPannelApi.middleware
    ),
});
