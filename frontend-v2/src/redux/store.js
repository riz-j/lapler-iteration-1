import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUserSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
  };
  
const persistedReducer = persistReducer(persistConfig, currentUserReducer);
  
export const store = configureStore({
    reducer: {
      currentUser: persistedReducer
    },
});
  
export const persistor = persistStore(store);