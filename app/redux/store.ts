import { configureStore } from '@reduxjs/toolkit'
import { voiceHistorySlice } from './slices/voiceHistories.slice'
import authenticateSlice from './slices/auth.slice'
export default configureStore({
    reducer: {
        voiceHistories: voiceHistorySlice.reducer,
        authenticate: authenticateSlice.reducer,
    },
})