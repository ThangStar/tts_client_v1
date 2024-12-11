import { tts_params_dto, tts_response_dto, TTSApi } from "@/app/api/tts.api";
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
    ttsPending: createAsyncThunk('voice/ttsPending', async (voice: tts_params_dto, thunkAPI) => {
        return thunkAPI.fulfillWithValue(voice)
    }),

}

export type VoiceState = {
    voiceHistories: tts_response_dto[],
}

export const initialData: VoiceState = {
    voiceHistories: [],
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
            console.log("fulfilled", action.payload)
            const index = state.value.voiceHistories.findIndex(voice => voice.metadata?.prompt === action.payload.metadata?.prompt)
            if (index !== -1) {
                const newVoice = { ...action.payload, progress: false } as tts_response_dto;
                state.value.voiceHistories[index] = newVoice;
            } else {
                state.value.voiceHistories.push(action.payload);
            }

        })
            .addCase(action.ttsPending.fulfilled, (state, action) => {
                console.log();
                state.value.voiceHistories.push({
                    id: new Date().getTime().toString(),
                    progress: true,
                    status: "pending",
                    metadata: {
                        prompt: action.payload.prompt,
                        language: action.payload.code,
                    },
                })
            })
            .addCase(action.tts.rejected, (state, action) => {
                console.log("rejected", action.payload)
                state.value.voiceHistories.push({
                    progress: false,
                    status: "error",
                    content: "Hello, how can I assist you today?",
                })
            })
    },
})
export const VoiceHistoryAction = {
    ...voiceHistorySlice.actions, ...action
}
export default voiceHistorySlice