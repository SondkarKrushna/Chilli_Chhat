import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { loginApi } from "./api/loginApi";
import { registerApi } from "./api/registerApi";
import { waiterPannelApi } from "./api/waiterPannelApi";
import { menuApi } from "./api/menuApi";
import { tableApi } from "./api/tableApi";
import { chiefPannelApi } from "./api/chiefPannelApi";
import { logout } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [waiterPannelApi.reducerPath]: waiterPannelApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [tableApi.reducerPath]: tableApi.reducer,
    [chiefPannelApi.reducerPath]: chiefPannelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      registerApi.middleware,
      waiterPannelApi.middleware,
      menuApi.middleware,
      tableApi.middleware,
      chiefPannelApi.middleware
    ),
});
