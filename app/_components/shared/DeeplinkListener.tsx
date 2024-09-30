"use client";
import React from "react";
import { App } from "@capacitor/app";

export default function DeeplinkListener() {
  App.addListener("appUrlOpen", (data) => {
    console.log("App opened with URL:", data.url);

    // Check if the URL matches your custom condition
    if (data.url.includes("stocksupporterapp://")) {
      // Navigate to a specific page or perform an action
      console.log("Login was successful!");
      // You can use your router to navigate in your app, e.g., using React Router or other navigation libraries.
    } else {
      console.log("Unknown deep link:", data.url);
    }
  });

  return <></>;
}
