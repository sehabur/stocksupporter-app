"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { App } from "@capacitor/app";
import { Preferences } from "@capacitor/preferences";
import { useSelector } from "react-redux";
import { Browser } from "@capacitor/browser";
import { Device } from "@capacitor/device";

const AppUpdateDialog = () => {
  const [open, setOpen] = useState(false);

  const [dontAskAgainChecked, setDontAskAgainChecked] = useState(false);

  const marketOpenStatus = useSelector((state: any) => state.marketOpenStatus);

  const checkVersionAndPrompt = async () => {
    const { platform } = await Device.getInfo();

    let build = "99";

    if (platform != "web") {
      const appInfo = await App.getInfo();
      build = appInfo.build;
    }

    const { androidVersionCode, iosVersionCode } = marketOpenStatus;

    const { value }: any = await Preferences.get({
      key: "appUpdateReminderDate",
    });

    const targetVersion =
      platform == "android"
        ? androidVersionCode
        : platform == "ios"
        ? iosVersionCode
        : 0;

    // console.log(
    //   "newborn",
    //   build,
    //   platform,
    //   androidVersionCode,
    //   iosVersionCode,
    //   targetVersion,
    //   value,
    //   marketOpenStatus.androidVersionCode,
    // );

    if (
      Number(build) < targetVersion &&
      (!value || new Date() > new Date(value))
    ) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDontAskAgain = async (event: any) => {
    setDontAskAgainChecked(event.target.checked);
  };

  const handleMaybeLater = async () => {
    const reminderDate = new Date();

    if (dontAskAgainChecked) {
      reminderDate.setMonth(reminderDate.getMonth() + 3);
    } else {
      reminderDate.setDate(reminderDate.getDate() + 7);
    }
    await Preferences.set({
      key: "appUpdateReminderDate",
      value: reminderDate.toISOString(),
    });
    handleClose();
  };

  const handleUpdate = async () => {
    const reminderDate = new Date();

    if (dontAskAgainChecked) {
      reminderDate.setMonth(reminderDate.getMonth() + 3);
    } else {
      reminderDate.setDate(reminderDate.getDate() + 7);
    }

    await Preferences.set({
      key: "appUpdateReminderDate",
      value: reminderDate.toISOString(),
    });

    handleClose();
    await Browser.open({
      url: '"https://play.google.com/store/apps/details?id=com.yourapp.id",',
    });
  };

  useEffect(() => {
    checkVersionAndPrompt();
  }, [marketOpenStatus]);

  return (
    <Dialog open={open}>
      <DialogTitle>Update Available</DialogTitle>
      <DialogContent>
        <DialogContentText>
          A new version of the app is available. Please update to the latest
          version for the best experience.
        </DialogContentText>
        <FormControlLabel
          control={
            <Checkbox
              checked={dontAskAgainChecked}
              onChange={handleDontAskAgain}
            />
          }
          label="Don't ask again"
        />
      </DialogContent>
      <DialogActions sx={{ mr: 2 }}>
        <Button onClick={handleMaybeLater} color="primary">
          Maybe later
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppUpdateDialog;
