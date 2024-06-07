import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type User = {
  id: number;
  username: string;
  chats: string[];
  socketId?: string;
}

type UserState = {
  users: User[];
}

const initialState: UserState = {
  users: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addNewUser(state, action: PayloadAction<User>) {
      const existingUserIdx = state.users.findIndex(user => user.id === action.payload.id);
      if(existingUserIdx === -1) {
        if(state.users.length === 0) {
          state.users = [state.users[0], action.payload];
        } else {
          state.users.push(action.payload);
        }
      } else {
        state.users[existingUserIdx].socketId = action.payload.socketId
      }
    },
    setCurrentUser(state, action: PayloadAction<User>) {
      state.users[0] = action.payload;
    }
  },
})

export const userActions = userSlice.actions

export default userSlice.reducer