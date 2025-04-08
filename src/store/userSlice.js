import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin, userLogout } from '@/api/api';

// localstrage 初始化
const user = {
    token: '',
    identity: '', // 前台使用者身分 相關說明參考readme.md
    phones: '',
    userInfo: {},
    doSurvey: null // 是否已填寫問卷，true 為已填寫
};

// 🔹 使用 createAsyncThunk 處理登入的非同步邏輯
const loginAsync = createAsyncThunk('user/login', async data => {
    const response = await userLogin({
        userId: data.account,
        userPwd: data.password
    });
    return response; // 返回 API 回傳的資料
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        loading: false,
        error: null
    },
    reducers: {
        logout: state => {
            state.userInfo = null;
            // 刪除某個鍵的資料
            localStorage.removeItem('ENERGY');
            userLogout();
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginAsync.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                console.log('loginAsync:', action.payload);
                let code = action.payload.code;
                state.loading = false;

                if (code == 200) {
                    state.userInfo = action.payload.data; // 保存登入成功的資料
                    console.log('state.userInfo:', state.userInfo);
                    const { token, phones, identity, userInfo } = state.userInfo;

                    user.token = token;
                    user.phones = phones;
                    user.identity = identity;
                    user.userInfo = { ...userInfo }; // 物件解構賦值 (淺拷貝)

                    localStorage.setItem('ENERGY', JSON.stringify(user)); // 儲存物件（先轉換成 JSON 字串）
                } else {
                }
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // 錯誤處理
            });
    }
});

export const {
    logout // user logout
} = userSlice.actions;

export { loginAsync };

export default userSlice.reducer;
