import { createSlice } from "@reduxjs/toolkit";

const allGainerLoserSlice = createSlice({
  name: "allGainerLoser",
  initialState: {
    dataFetched: false,
    data: [],
  },
  reducers: {
    setData: (state: any, { payload }: { payload: any }) => {
      return {
        dataFetched: true,
        data: payload,
      };
    },
  },
});

export default allGainerLoserSlice;
