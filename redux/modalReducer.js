import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SignInModalOpen: false,
  SignUpModalOpen: false,
  PasswordModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignInModal: (state) => {
      state.SignInModalOpen = !state.SignInModalOpen;
    },
    openSignUpModal: (state) => {
      state.SignUpModalOpen = !state.SignUpModalOpen;
    },
    openPasswordModal: (state) => {
      state.PasswordModalOpen = true;
    },
    closePasswordModal: (state) => {
      state.PasswordModalOpen = false;
    },
  },
});

export const {
  openSignInModal,
  closeSignInModal,
  openSignUpModal,
  closeSignUpModal,
  openPasswordModal,
  closePasswordModal,
} = modalSlice.actions;

export default modalSlice.reducer;
