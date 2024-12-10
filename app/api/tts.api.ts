import http from "../http/http"
export type tts_params_dto = {
    prompt: string,
    language: string,
    voice_type: string,
}

export type voice_history_params_dto = {
    search: string,
    limit: string,
    page: string,
}

export const TTSApi = {
    tts: async (params: tts_params_dto) => {
        return (await http.post("/tts", params)).data
    },
    history: async (params: voice_history_params_dto) => {
        return (await http.get("/tts/history", {
            params: params
        })).data
    }
}
