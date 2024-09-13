import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    login: (state, { payload }) => {
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return payload;
    },

    logout: () => {
      return null;
    },

    updateProfile: (state: any, { payload }) => {
      const newState = {
        ...state,
        name: payload.name,
        email: payload.email,
      };

      localStorage.setItem("userInfo", JSON.stringify(newState));

      return newState;
    },

    // addItemToFavorite: (state: any, { payload }) => {
    //   const newState = {
    //     ...state,
    //     favorites: [...state.favorites, payload],
    //   };
    //   localStorage.setItem("userInfo", JSON.stringify(newState));
    //   return newState;
    // },

    // removeItemFromFavorite: (state: any, { payload }) => {
    //   const newState = {
    //     ...state,
    //     favorites: state.favorites.filter((item: string) => item !== payload),
    //   };
    //   localStorage.setItem("userInfo", JSON.stringify(newState));
    //   return newState;
    // },

    // addItemToPriceAlerts: (state: any, { payload }) => {
    //   const newState = {
    //     ...state,
    //     priceAlerts: [...state.priceAlerts, payload],
    //   };
    //   localStorage.setItem("userInfo", JSON.stringify(newState));
    //   return newState;
    // },

    // removeItemFromPriceAlerts: (state: any, { payload }) => {
    //   const newState = {
    //     ...state,
    //     priceAlerts: state.priceAlerts.filter(
    //       (item: any) => item._id !== payload
    //     ),
    //   };
    //   localStorage.setItem("userInfo", JSON.stringify(newState));
    //   return newState;
    // },

    // resetFavoritesWithNewValue: (state: any, { payload }) => {
    //   const newState = {
    //     ...state,
    //     favorites: payload,
    //   };

    //   localStorage.setItem("userInfo", JSON.stringify(newState));

    //   return newState;
    // },
  },
});

export default authSlice;
