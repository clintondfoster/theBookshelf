import { configureStore } from "@reduxjs/toolkit";
import { storeApi } from "./src/reducers/api";
import searchReducer from './src/reducers/searchSlice'

const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    search: searchReducer,
    // auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware),
});

export default store;
