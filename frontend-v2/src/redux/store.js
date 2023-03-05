import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserSlice';
import currentProjectReducer from './currentProjectSlice';
import projectReducer from './projectSlice';
import searchReducer from './searchSlice';

const persistedState = localStorage.getItem('reduxState') 
    ? JSON.parse(localStorage.getItem('reduxState')) : {};

export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        currentProject: currentProjectReducer,
        project: projectReducer,
        search: searchReducer
    },
    preloadedState: persistedState
})

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});