import { createSlice } from "@reduxjs/toolkit";

const pageTitleSlice = createSlice({
  name: "pageTitle",
  initialState: "Homepage",
  reducers: {
    setPageTitle: (state: any, { payload }: { payload: string }) => {
      return payload;
    },
  },
});

export default pageTitleSlice;
