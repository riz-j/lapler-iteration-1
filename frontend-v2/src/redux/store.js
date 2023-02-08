import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUserSlice";

const persistedState = localStorage.getItem("reduxState") 
    ? JSON.parse(localStorage.getItem("reduxState")) : {};

export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer
    },
    preloadedState: persistedState
})

store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
                                        // Try something like store.currentUserReducer.getState();
});