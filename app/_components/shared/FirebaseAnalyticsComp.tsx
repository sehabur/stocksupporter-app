"use client";
import React from "react";

import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
import { usePathname } from "next/navigation";

export default function FirebaseAnalyticsComp() {
  const pathname = usePathname();

  React.useEffect(() => {
    FirebaseAnalytics.initializeFirebase({
      apiKey: "AIzaSyBbLheWjRjoc8rIuL_IHNZdFdp519d_VmY",
      authDomain: "stocksupporter.firebaseapp.com",
      projectId: "stocksupporter",
      storageBucket: "stocksupporter.appspot.com",
      messagingSenderId: "542243227226",
      appId: "1:542243227226:web:1b4fad4e2a35b65fedba63",
      measurementId: "G-BY9FBEW106",
    });
  }, []);

  React.useEffect(() => {
    FirebaseAnalytics.logEvent({
      name: "page_view",
      params: {
        path: pathname,
        platform: "app",
      },
    });
  }, [pathname]);

  return <></>;
}
