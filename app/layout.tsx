"use client";
import React from "react";

import { Provider } from "react-redux";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import BottomNav from "./_components/BottomNav";
import Header from "./_components/Header";
import store from "./_store";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider store={store}>
          <ThemeRegistry options={{ key: "mui" }}>
            <Header />
            {children}
            <BottomNav />
          </ThemeRegistry>
        </Provider>
      </body>
    </html>
  );
}
