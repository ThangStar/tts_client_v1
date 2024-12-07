import { http } from "../http/http";

export type tts_params_dto = {
    prompt: string,
}

export const TTSApi = {
    tts: async (params: tts_params_dto) => {
        return (await http.post("/", params)).data
    },
    
}
