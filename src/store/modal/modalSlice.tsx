import { createSlice } from "@reduxjs/toolkit";

interface modalStateProps {
  open: boolean;
}
const initial: modalStateProps = {
  open: false,
};
const ModalStateSlice = createSlice({
  name: "ModalState",
  initialState: initial,
  reducers: {
    show: (state) => {
      state.open = true;
    },
    hide: (state) => {
      state.open = initial.open;
    },
  },
});

export const { show, hide } = ModalStateSlice.actions;
export default ModalStateSlice.reducer;
