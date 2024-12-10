import http from "../http/http"

export type auth_login_params_dto = {
    email: string,
    password: string,
}

export type auth_register_params_dto = {
    displayName: string,
    email: string,
    password: string,
}

export const AuthApi = {
    login: async (params: auth_login_params_dto) => (await http.post("/auth/login", params)).data.data,
    register: async (params: auth_register_params_dto) => (await http.post("/auth/register", params)).data,
    profile: async () => (await http.get("/auth/profile")).data
}
