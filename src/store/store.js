import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { loginApi } from "./api/loginApi";
import { registerApi } from "./api/registerApi";
import { waiterPannelApi } from "./api/waiterPannelApi";
import { menuApi } from "./api/menuApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [waiterPannelApi.reducerPath]: waiterPannelApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      registerApi.middleware,
      waiterPannelApi.middleware,
      menuApi.middleware
    ),
});
