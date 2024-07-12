import { createSlice } from "@reduxjs/toolkit";

interface fingerPrintProps {
  image: string;
}

const INITIAL_STATE: fingerPrintProps = {
  image: "",
};

const fingerPrintSlice = createSlice({
  name: "fingerPrint",
  initialState: INITIAL_STATE,
  reducers: {
    storeFingerPrint: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { storeFingerPrint } = fingerPrintSlice.actions;
export default fingerPrintSlice.reducer;
