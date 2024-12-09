// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// utils
import { getCookie, setCookie, eraseCookie } from '@/utils/cookie';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        userInfo: null
    },
    reducers: {
        login: (state, action) => {
            console.log('login:', action);
            state.isAuthenticated = true;
            state.userInfo = action.payload; // 假設 payload 包含用戶資料
            setCookie('iii_token', '1234567890');
        },
        logout: state => {
            state.isAuthenticated = false;
            state.userInfo = null;
            eraseCookie('iii_token');
        }
    }
});

export const {
    login, // user login
    logout // user logout
} = userSlice.actions;

export default userSlice.reducer;
