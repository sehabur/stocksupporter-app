import { createSlice } from "@reduxjs/toolkit";

const indexInfoSlice = createSlice({
  name: "indexInfo",
  initialState: {
    marketOpenStatus: "Closed",
    indexLatestData: {
      index: 0,
    },
  },
  reducers: {
    setData: (state: any, { payload }: { payload: any }) => {
      return payload;
    },
  },
});

export default indexInfoSlice;
