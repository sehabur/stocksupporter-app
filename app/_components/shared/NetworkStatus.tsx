"use client";
import React from "react";

import { Dialog } from "@capacitor/dialog";
import { Network } from "@capacitor/network";

export default function NetworkStatus() {
  const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    if (!status.connected) {
      showAlert();
    }
  };

  const showAlert = async () => {
    await Dialog.alert({
      title: "No Internet",
      message: "No internet on your device. Please check your connection.",
    });
  };

  React.useEffect(() => {
    logCurrentNetworkStatus();
  }, []);

  return <></>;
}
