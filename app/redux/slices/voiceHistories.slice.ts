import { history_list_params_dto, history_list_response_dto, tts_params_dto, tts_response_dto, TTSApi } from "@/app/api/tts.api";
import { Actor } from "@/app/types/actor.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const action = {
    tts: createAsyncThunk('voice/fetchTTS', async (voice: tts_params_dto, thunkAPI) => {
        try {
            const res = await TTSApi.tts(voice);
            return thunkAPI.fulfillWithValue(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }),
    ttsPending: createAsyncThunk('voice/ttsPending', async (voice: tts_params_dto & { actor: Actor }, thunkAPI) => {
        return thunkAPI.fulfillWithValue(voice)
    }),
    history: createAsyncThunk('voice/history', async (voice: history_list_params_dto, thunkAPI) => {
        try {
            const res = await TTSApi.history(voice);
            return thunkAPI.fulfillWithValue(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }),

}

export type VoiceState = {
    voiceHistories: history_list_response_dto,
}

export const initialData: VoiceState = {
    voiceHistories: {
        message: "",
        statusCode: 0,
        data: {
            items: [],
            meta: {
                limit: 5,
                page: 1,
                total: 1,
                totalPages: 2,
            },
        }
    },

}

export const voiceHistorySlice = createSlice({
    name: 'voiceHistories',
    initialState: {
        value: initialData
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(action.tts.fulfilled, (state, action) => {
            const index = state.value.voiceHistories.data.items.findIndex(voice => voice.metadata?.prompt === action.payload.metadata?.prompt)
            if (index !== -1) {
                const newVoice = { ...action.payload, progress: false } as tts_response_dto;
                state.value.voiceHistories.data.items[index] = newVoice;
            } else {
                state.value.voiceHistories.data.items.push(action.payload);
            }

        })
            .addCase(action.ttsPending.fulfilled, (state, action) => {
                state.value.voiceHistories.data = {
                    items: [
                        {
                            id: new Date().getTime().toString(),
                            progress: true,
                            status: "pending",
                            voice: action.payload.actor,
                            metadata: {
                                prompt: action.payload.prompt,
                                language: action.payload.code,
                            },
                        },
                        ...state.value.voiceHistories.data.items
                    ],
                    meta: state.value.voiceHistories.data.meta
                }
            })
            .addCase(action.tts.rejected, (state) => {
                state.value.voiceHistories.data.items.push({
                    progress: false,
                    status: "error",
                    content: "Hello, how can I assist you today?",
                })
            })
            .addCase(action.history.fulfilled, (state, action) => {
                state.value.voiceHistories.data = action.payload.data;
            })
    },
})
export const VoiceHistoryAction = {
    ...voiceHistorySlice.actions, ...action
}
export default voiceHistorySlice