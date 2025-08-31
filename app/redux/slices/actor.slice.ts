import {  voice_list_response_dto } from "@/app/api/tts.api";
import { createSlice } from "@reduxjs/toolkit";


export type ActorState = {
    actors: voice_list_response_dto
}

export const initialData: ActorState = {
    actors: {
        items: [],
        meta: {
            limit: 5,
            page: 1,
            total: 0,
            totalPages: 0,
        }
    }
}

export const actorSlice = createSlice({
    name: 'actor',
    initialState: {
        value: initialData
    },
    reducers: {
    },
})
export const ActorAction = {
    ...actorSlice.actions
}
export default actorSlice