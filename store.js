import { configureStore } from "@reduxjs/toolkit";
import { storeApi } from "./src/reducers/api";
import searchReducer from './src/reducers/searchSlice'
import authReducer from "./src/reducers/authSlice"
import cartReducer from "./src/reducers/api.js"
import guestCartReducer from "./src/reducers/guestSlice";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: 'root', 
  storage, 
}

const rootReducer = combineReducers( {
  [storeApi.reducerPath]: storeApi.reducer,
    search: searchReducer,
    auth: authReducer,
    cart: cartReducer,
    guestCart: guestCartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware),
});

const persistor = persistStore(store)

export { store, persistor };
