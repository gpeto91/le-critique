import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export type Comment = {
  id?: string | null;
  author: string;
  text: string;
  created_at: string;
  filmSlug: string;
}

export type CommentState = {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: []
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload)
    },
    remove: (state, action: PayloadAction<string>) => {
      const commentIndex = state.comments.findIndex(comment => comment.id === action.payload)

      if (commentIndex !== -1)
        state.comments.splice(commentIndex, 1)
    }
  },
})

export const { add, remove } = commentSlice.actions
export const selectComments = (state: RootState) => state.comment.comments
export default commentSlice.reducer
