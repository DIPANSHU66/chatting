import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherusers: null,
    selectedUser: null,
    onlineusers: null,
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setotherusers: (state, action) => {
      state.otherusers = action.payload;
    },
    setselecteduser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setimage: (state, action) => {
      state.image = action.payload;
    },
    setonlineusers: (state, action) => {
      state.onlineusers = action.payload;
    },
  },
});
export const { setAuthUser, setotherusers, setselecteduser, setimage,setonlineusers } =
  userSlice.actions;
export default userSlice.reducer;
