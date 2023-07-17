import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
    },
    signOutUser : (state) => {
        state.email = null
    }
  },
});

export const {setUser, signOutUser} = userSlice.actions;

export default userSlice.reducer;
