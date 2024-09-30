"use client";
import React from "react";

import { alpha } from "@mui/material/styles";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import { IconButton, useTheme } from "@mui/material";

import AlertSetDialog from "../shared/AlertSetDialog";

export default function AlertButton({
  tradingCode,
  variant = "detailed",
}: any) {
  const theme = useTheme();

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <AlertSetDialog
        tradingCode={tradingCode}
        handleDialogClose={handleDialogClose}
        dialogOpen={dialogOpen}
      />
      {variant == "detailed" && (
        <IconButton
          aria-label="delete"
          size="small"
          sx={{
            borderRadius: 2,
            border: `1.2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
            bgcolor: alpha(theme.palette.primary.main, 0.07),
            mr: 1.5,
            px: 0.9,
            py: 0.9,
          }}
          onClick={() => handleDialogOpen()}
        >
          <NotificationsNoneRoundedIcon color="primary" />
        </IconButton>
      )}
      {variant == "iconOnly" && (
        <IconButton
          size="small"
          sx={{
            p: 0,
            m: 0,
          }}
          onClick={() => handleDialogOpen()}
        >
          <NotificationsNoneRoundedIcon color="primary" sx={{ fontSize: 20 }} />
        </IconButton>
      )}
    </>
  );
}
