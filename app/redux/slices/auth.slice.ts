import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth_login_params_dto, auth_register_params_dto, AuthApi } from "@/app/api/auth.api";
import toast from "react-hot-toast";
const action = {
    login: createAsyncThunk('auth/login', async (params: auth_login_params_dto, thunkAPI) => {
        try {
            const res = await AuthApi.login(params);
            return thunkAPI.fulfillWithValue(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }),
    register: createAsyncThunk('auth/register', async (params: auth_register_params_dto, thunkAPI) => {
        try {
            const res = await AuthApi.register(params);
            return thunkAPI.fulfillWithValue(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    })
}

export type AuthenticateState = {
    user: any,
}

export const initialData: AuthenticateState = {
    user: null,
}

export const authenticateSlice = createSlice({
    name: 'authenticate',
    initialState: {
        value: initialData
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(action.login.fulfilled, (state, action) => {
            toast.success('Đăng nhập thành công')
            console.log("action.payload", action.payload)
            window.location.href = '/text-to-speech'
            state.value.user = action.payload
            //set local new token
            localStorage.setItem('token', action.payload.token)
        })
            .addCase(action.login.rejected, (state, action: any) => {
                console.log("rejected", action.payload.response.data);
                if (action.payload.response.status === 403) {
                    toast.error('Tài khoản hoặc mật khẩu không đúng')
                } else {
                    toast.error('Đăng nhập thất bại')
                }
            })
            .addCase(action.register.fulfilled, (state, action) => {
                toast.success('Đăng ký thành công')
                window.location.href = '/text-to-speech'
                state.value.user = action.payload
            })
            .addCase(action.register.rejected, (state, action: any) => {
                console.log("rejected", action.payload.response.data);
                if (action.payload.response.status === 403) {
                    toast.error('Tài khoản đã tồn tại')
                } else {
                    toast.error('Đăng ký thất bại')
                }
            })
    },
})
export const AuthenticateAction = {
    ...authenticateSlice.actions, ...action
}
export default authenticateSlice