import { configureStore } from "@reduxjs/toolkit";
import { storeApi } from "./src/reducers/api";

const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware),
});

export default store;
