import { createSlice } from "@reduxjs/toolkit";

const marketOpenStatusSlice = createSlice({
  name: "marketOpenStatus",
  initialState: {},
  reducers: {
    setData: (state: any, { payload }: { payload: any }) => {
      return payload;
    },
  },
});

export default marketOpenStatusSlice;
