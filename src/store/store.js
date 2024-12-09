// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/userSlice'; // user auth & login status

const store = configureStore({
    reducer: {
        // counter: counterReducer,
        user: userReducer
    }
});

export default store;
