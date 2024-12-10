import { tts_params_dto, TTSApi} from "@/app/api/tts.api";
import { Voice } from "@/app/types/voice.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type tts_response = {
    progress: boolean,
    voice: Voice
}
const action = {
    tts: createAsyncThunk('voice/fetchTTS', async (voice: tts_params_dto, thunkAPI) => {
        try {
            const res = await TTSApi.tts(voice);
            return thunkAPI.fulfillWithValue(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }),
    
}

export type VoiceState = {
    voiceHistories: tts_response[],
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
            console.log("VOICE HISTORY", action.payload)
            state.value.voiceHistories.push(action.payload)
        })
            .addCase(action.tts.pending, (state, action) => {
                state.value.voiceHistories.push({
                    progress: true,
                    voice: {
                        content: "Hello, how can I assist you today?",
                        idRepo: '123',
                    }
                })
            })
            .addCase(action.tts.rejected, (state, action) => {
                console.log(action.payload)
                state.value.voiceHistories.push({
                    progress: false,
                    voice: {
                        content: "Hello, how can I assist you today?",
                        idRepo: '123',
                    }
                })
            })
    },
})
export const VoiceHistoryAction = {
    ...voiceHistorySlice.actions, ...action
}
export default voiceHistorySlice