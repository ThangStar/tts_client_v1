import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth_login_params_dto, AuthApi } from "@/app/api/authenticate.api";
import toast from "react-hot-toast";
const action = {
    login: createAsyncThunk('user/info', async (params: auth_login_params_dto, thunkAPI) => {
        try {
            const res = await AuthApi.login(params);
            return thunkAPI.fulfillWithValue(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }),
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
            window.location.href = '/text-to-speech'
            state.value.user = action.payload
            //set local new token
            localStorage.setItem('token', action.payload.token)
        })
            .addCase(action.login.rejected, (state, action) => {
                console.log(action.payload.response.data);
                toast.error('Đăng nhập thất bại')
            })
    },
})
export const AuthenticateAction = {
    ...authenticateSlice.actions, ...action
}
export default authenticateSlice