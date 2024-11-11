"use client";
import React from "react";

import { Provider } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import store from "./_store";
import { NavigationEvent } from "@/components/shared/NavigationEvent";
import NetworkStatus from "@/components/shared/NetworkStatus";
import AppUpdateDialog from "@/components/dialogs/AppUpdateDialog";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider store={store}>
          <ThemeRegistry options={{ key: "mui" }}>
            <Header />
            {children}
            <NavigationEvent />
            <NetworkStatus />
            <AppUpdateDialog />
            <BottomNav />
          </ThemeRegistry>
        </Provider>
      </body>
    </html>
  );
}
