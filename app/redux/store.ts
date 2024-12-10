import { configureStore } from '@reduxjs/toolkit'
import { voiceHistorySlice } from './slices/voiceHistories.slice'
import authenticateSlice from './slices/auth.slice'
import actorSlice from './slices/actor.slice'

export const store = configureStore({
    reducer: {
        voiceHistories: voiceHistorySlice.reducer,
        authenticate: authenticateSlice.reducer,
        actor: actorSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store