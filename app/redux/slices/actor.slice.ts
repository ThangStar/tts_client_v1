import { TTSApi, voice_list_params_dto, voice_list_response_dto } from "@/app/api/tts.api";
import { Actor } from "@/app/types/actor.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const action = {
    listActor: createAsyncThunk('actor/listActor', async (actor: voice_list_params_dto, thunkAPI) => {
        try {
            const res = await TTSApi.voices(actor);
            return thunkAPI.fulfillWithValue(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }),
}

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
    extraReducers: (builder) => {
        builder.addCase(action.listActor.fulfilled, (state, action) => {
            console.log("ACTORES22222", action.payload)
            state.value.actors = action.payload
        })
            .addCase(action.listActor.rejected, (state, action) => {
                console.log("ACTORES FAILED", action.payload);

            })
    },
})
export const ActorAction = {
    ...actorSlice.actions, ...action
}
export default actorSlice