import http from "../http/http"
import { Actor, } from "../types/actor.type"
export type tts_params_dto = {
    prompt: string,
    code: string,
}

export type tts_response_dto = {
    id?: string,
    createdAt?: string,
    filename?: string,
    path?: string,
    size?: number,
    status?: string,
    url?: string,
    progress?: boolean,
    content?: string,
    metadata?: {
        prompt: string,
        language: string,
    }
}

export interface voice_list_params_dto {
    search?: string,
    limit: number,
    page: number,
    category_code?: string,
    language_code?: string,
    type?: number,
    gender?: number,
}
export type voice_list_response_dto = {
    items: Actor[],
    meta: {
        limit: number,
        page: number,
        total: number,
        totalPages: number,
    },
}

export const TTSApi = {
    tts: async (params: tts_params_dto) => (await http.post("/tts", params)).data.data as tts_response_dto,
    voices: async (params: voice_list_params_dto) => (await http.get("/tts/voices", { params: params })).data.data as voice_list_response_dto,
}
