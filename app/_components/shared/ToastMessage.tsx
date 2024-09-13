"use client";
import React from "react";

import { Alert, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ToastMessage({
  open,
  severity = "info",
  message,
  onClose,
  autoHideDuration = 4000,
}: any) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          sx={{ p: 0.5 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      }
    >
      <Alert
        variant="filled"
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
