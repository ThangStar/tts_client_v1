import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth_login_params_dto, auth_register_params_dto, AuthApi } from "@/app/api/auth.api";
import toast from "react-hot-toast";
import { User } from "@/app/types/user.type";

const action = {
    login: createAsyncThunk('auth/login', async (params: auth_login_params_dto, thunkAPI) => {
        try {
            const res = await AuthApi.login(params);
            return thunkAPI.fulfillWithValue(res.data)
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
    }),
    profile: createAsyncThunk('auth/profile', async (_, thunkAPI) => {
        try {
            const res = await AuthApi.profile();
            return thunkAPI.fulfillWithValue(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    })
}

export type AuthenticateState = {
    user: User | undefined,
}

export const initialData: AuthenticateState = {
    user: undefined,
}

export const authenticateSlice = createSlice({
    name: 'authenticate',
    initialState: {
        value: initialData,
        redirectTo: null as string | null,
    },
    reducers: {
        clearRedirect: (state) => {
            state.redirectTo = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(action.login.fulfilled, (state, action) => {
            toast.success('Đăng nhập thành công')
            state.value.user = action.payload.user
            state.redirectTo = '/text-to-speech'
        })
        .addCase(action.login.rejected, (state, action: any) => {
            if (action.payload.response && action.payload.response.status === 403) {
                toast.error('Tài khoản hoặc mật khẩu không đúng')
            } else {
                toast.error('Đăng nhập thất bại')
            }
        })
        .addCase(action.register.fulfilled, (state, action) => {
            toast.success('Đăng ký thành công')
            state.value.user = action.payload
            state.redirectTo = '/text-to-speech'
        })
        .addCase(action.register.rejected, (state, action: any) => {
            if (action.payload.response.status === 400) {
                toast.error('Địa chỉ email đã tồn tại')
            } else {
                toast.error('Đăng ký thất bại')
            }
        })
        .addCase(action.profile.fulfilled, (state, action) => {
            state.value.user = action.payload
            state.redirectTo = '/text-to-speech'
        })
        .addCase(action.profile.rejected, (state, action: any) => {
            console.log("rejected", action.payload.response.data);
        })
    },
})

export const { clearRedirect } = authenticateSlice.actions
export const AuthenticateAction = {
    ...authenticateSlice.actions, ...action
}
export default authenticateSlice