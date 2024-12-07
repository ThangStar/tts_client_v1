import http from "../http/http"

export type auth_login_params_dto = {
    email: string,
    password: string,
}

export const AuthApi = {
    login: async (params: auth_login_params_dto) => {
        console.log(params);
        
        return (await http.post("/auth/login", params)).data
    },
    
}
