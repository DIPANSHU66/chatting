import { createSlice } from "@reduxjs/toolkit";
const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
  },
  reducers: {
    setsocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});
export const { setsocket } = socketSlice.actions;
export default socketSlice.reducer;
