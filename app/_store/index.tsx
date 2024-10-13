import { configureStore } from "@reduxjs/toolkit";

import themeColorSlice from "./themeColorSlice";
import latestPriceSlice from "./latestPriceSlice";
import authSlice from "./authSlice";
import pageTitleSlice from "./pageTitleSlice";
import indexInfoSlice from "./indexInfoSlice";
import favoriteSlice from "./favoriteSlice";
import marketOpenStatusSlice from "./marketOpenStatusSlice";

const store = configureStore({
  reducer: {
    themeColor: themeColorSlice.reducer,
    pageTitle: pageTitleSlice.reducer,
    latestPrice: latestPriceSlice.reducer,
    auth: authSlice.reducer,
    favorite: favoriteSlice.reducer,
    marketOpenStatus: marketOpenStatusSlice.reducer,
    indexInfo: indexInfoSlice.reducer,
  },
});

export const themeColorActions = themeColorSlice.actions;
export const latestPriceActions = latestPriceSlice.actions;
export const authActions = authSlice.actions;
export const pageTitleActions = pageTitleSlice.actions;
export const indexInfoActions = indexInfoSlice.actions;
export const marketOpenStatusActions = marketOpenStatusSlice.actions;
export const favoriteActions = favoriteSlice.actions;

export default store;
