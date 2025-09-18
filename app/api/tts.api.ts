import http from "../http/http"
import { Actor, } from "../types/actor.type"
export type tts_params_dto = {
    content: string,
    voice: string,
    speech: number,
    punctuation?: string
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
    voice?: Actor,
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

export type history_list_params_dto = {
    page: number,
    key?: string
}

export type tts_dto = {
    connection_id?: string,
    content?: string,
    createdAt?: string,
    id?: number,
    key?: string,
    status?: string,
    text_char_count?: number,
    updatedAt?: string,
    url?: string,
    voice?: string,
    speech?: number
}
export type history_list_response_dto = {
    items?: tts_dto[],
    pagination?:{
        has_next: boolean,
        has_prev: boolean,
        next_num: number,
        page: number,
        pages: number,
        per_page: number,
        prev_num: number,
        total: number
    }

}
export type key_state_dto = {
    createdAt: string,
    id: number,
    key: string
    remaining_chars: number,
    updatedAt: string,
}
// export type key = {
//     key: string
// }
export const TTSApi = {
    tts: async (params: tts_params_dto) => (await http.post("/tts", params)).data.data as tts_response_dto,
    // voices: async (params: voice_list_params_dto) => (await http.get("/tts/voices", { params: params })).data.data as voice_list_response_dto,
    history: async (params: history_list_params_dto) => (await http.get("/api/history", { params: params })).data as history_list_response_dto,
    verifyKey: async (params: { key: string }) => (await http.post("/api/verifyKey", params))
}
