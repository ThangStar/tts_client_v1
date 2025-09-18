import { history_list_params_dto, history_list_response_dto, key_state_dto, tts_params_dto, TTSApi } from "@/app/api/tts.api";
import { Actor } from "@/app/types/actor.type";
import socketManager, { SocketManager } from "@/app/web_socket/socket";
import { KEY_LOCAL } from "@/constants/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const action = {
    downloadAudio: createAsyncThunk('voice/downloadAudio', async (params: { url: string, filename: string }, ) => {
        try {
            console.log("Tự động tải xuống audio:", params.url);

            // Kiểm tra URL
            if (!params.url) {
                throw new Error('URL không hợp lệ');
            }

            // Xử lý URL nếu là relative path
            let fullUrl = params.url;
            if (params.url.startsWith('/') || !params.url.startsWith('http')) {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || window.location.origin;
                fullUrl = `${baseUrl}${params.url.startsWith('/') ? params.url : `/${params.url}`}`;
                console.log('URL đã được xử lý:', fullUrl);
            }

            // Thử tải xuống trực tiếp trước
            try {
                const link = document.createElement('a');
                link.href = fullUrl;
                link.download = params.filename;
                link.target = '_blank';

                // Tự động click để tải xuống
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                toast.success("Đã tải xuống file audio thành công!");
                return params;
            } catch (directError) {
                console.log('Tải xuống trực tiếp thất bại, thử fetch method:', directError);

                // Fallback: Sử dụng fetch method
                const response = await fetch(fullUrl, {
                    method: 'GET',
                    headers: { 'Accept': 'audio/*' },
                    mode: 'cors'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const blob = await response.blob();
                const objectUrl = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = objectUrl;
                link.download = params.filename;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                window.URL.revokeObjectURL(objectUrl);

                toast.success("Đã tải xuống file audio thành công!");
                return params;
            }
        } catch (error) {
            console.error('Tự động tải xuống thất bại:', error);
            toast.error("Không thể tải xuống file audio");

            // Fallback: Mở trong tab mới
            try {
                window.open(params.url, '_blank');
                console.log('Đã mở audio trong tab mới');
            } catch (fallbackError) {
                console.error('Fallback cũng thất bại:', fallbackError);
            }

            throw error;
        }
    }),
    tts: createAsyncThunk('voice/fetchTTS', async (voice: tts_params_dto, thunkAPI) => {
        // try {
        //     const res = await TTSApi.tts(voice);
        //     return thunkAPI.fulfillWithValue(res)
        // } catch (error) {
        //     toast.error("Máy chủ đang bận, vui lòng thử lại sau")
        //     return thunkAPI.rejectWithValue(error)
        // }
        const key = localStorage.getItem(KEY_LOCAL)
        if (key) {
            console.log("socketManager.isConnected", socketManager.isConnected());

            if (!socketManager.isConnected()) {
                // Đợi kết nối hoàn thành trước khi emit
                socketManager.connect();

                // Đăng ký listener cho sự kiện kết nối
                const onConnect = () => {
                    console.log("Socket connected, now emitting TTS request");

                    // Đăng ký listener cho TTS result
                    socketManager.on(SocketManager.EVENTS.TTS_OBSER, (data) => {
                        console.log("data?.status", data?.status)
                        console.log("data receive", data);
                        if (data?.status == "Đang xử lý") {
                            toast.success("Đã thêm vào danh sách yêu cầu...")


                            thunkAPI.dispatch(action.verifyKey({
                                key: key
                            }));
                        } else if (data?.status == "done") {
                            toast.success("Hoàn tất")

                            // Tự động tải xuống file MP3 khi hoàn tất
                            if (data.url) {
                                thunkAPI.dispatch(action.downloadAudio({
                                    url: data.url,
                                    filename: `audio_${Date.now()}.mp3`
                                }));
                            }
                            thunkAPI.dispatch(action.history({
                                page: 1,
                                key: key
                            }));

                        } else if (data?.error) {
                            toast.error(data.error)
                            return
                        }

                    });

                    // Emit sau khi đã kết nối
                    socketManager.emit(SocketManager.EVENTS.ENQUEUE_TTS, {
                        key: key,
                        content: voice.content,
                        speech: voice.speech,
                        voice: voice.voice,
                        punctuation: voice.punctuation
                    });

                    // Xóa listener này để tránh duplicate
                    socketManager.off(SocketManager.EVENTS.CONNECT, onConnect);
                };

                socketManager.on(SocketManager.EVENTS.CONNECT, onConnect);
            } else {
                // Socket đã kết nối, emit ngay lập tức
                socketManager.on(SocketManager.EVENTS.TTS_OBSER, (data) => {
                    console.log("CB SERVER", data);
                    thunkAPI.dispatch(action.history({
                        page: 1,
                        key: key
                    }));
                });

                socketManager.emit(SocketManager.EVENTS.ENQUEUE_TTS, {
                    key: key,
                    content: voice.content,
                    speech: voice.speech,
                    voice: voice.voice,
                    punctuation: voice.punctuation
                });
            }
        }
    }),
    ttsPending: createAsyncThunk('voice/ttsPending', async (voice: tts_params_dto & { actor: Actor }, thunkAPI) => {
        return thunkAPI.fulfillWithValue(voice)
    }),
    history: createAsyncThunk('voice/history', async (voice: history_list_params_dto, thunkAPI) => {
        try {
            if (!voice.key) {
                const key_local = localStorage.getItem(KEY_LOCAL) || ""
                voice.key = key_local
            }
            const res = await TTSApi.history(voice);
            return thunkAPI.fulfillWithValue(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }),
    verifyKey: createAsyncThunk('voice/verifyKey', async (key: { key: string }, thunkAPI) => {
        try {
            const res = await TTSApi.verifyKey(key)
            console.log("KEY RES", res);
            if (res.status == 200) {
                console.log("OK");
                // toast.success("Đã xác minh key")

                thunkAPI.dispatch(action.history({
                    page: 1,
                    key: res.data.key
                }));
                localStorage.setItem(KEY_LOCAL, res.data.key)

                return thunkAPI.fulfillWithValue(res.data)

            } else {
                toast.error("Key không chính xác")
            }
        } catch (error: any) {
            console.log("KEY RES ERROR", error);
            if (error.response?.status === 404) {
                console.log("404 Error");
                toast.error("Key không chính xác")
            } else {
                toast.error("Có lỗi xảy ra khi xác minh key")
            }
            throw error; // Re-throw để createAsyncThunk biết action bị rejected
        }
    })

}

export type VoiceState = {
    voiceHistories: history_list_response_dto,
    keyState: key_state_dto,
}

export const initialData: VoiceState = {
    voiceHistories: {
        items: [],
        pagination: {
            has_next: false,
            has_prev: false,
            page: 1,
            per_page: 1,
            next_num: 1,
            pages: 1,
            prev_num: 1,
            total: 1
        },

    },
    keyState: {
        createdAt: '',
        id: 0,
        key: 'FIRST',
        remaining_chars: 0,
        updatedAt: ''
    }
}

export const voiceHistorySlice = createSlice({
    name: 'voiceHistories',
    initialState: {
        value: initialData
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(action.history.fulfilled, (state, action) => {
                state.value.voiceHistories = action.payload;
            })
            .addCase(action.verifyKey.fulfilled, (state, action) => {
                state.value.keyState = action.payload
            })
    },
})
export const VoiceHistoryAction = {
    ...voiceHistorySlice.actions, ...action
}
export default voiceHistorySlice