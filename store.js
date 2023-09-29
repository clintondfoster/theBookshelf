import { configureStore } from "@reduxjs/toolkit";
import { storeApi } from "./src/reducers/api";
import searchReducer from './src/reducers/searchSlice'
import authReducer from "./src/reducers/authSlice"
import { orderProductApi } from "./src/reducers/orderproduct";

const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    search: searchReducer,
    auth: authReducer,
    [orderProductApi.reducerPath]: orderProductApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware),
});

export default store;
