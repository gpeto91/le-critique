import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import commentReducer from "../store/slices/commentSlice"

export const store = configureStore({
  reducer: {
    comment: commentReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
