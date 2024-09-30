import React from "react";
import { Box } from "@mui/material";
import Notifications from "./Notifications";

export default function Page() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "secondaryBackground",
        minHeight: "90vh",
        pt: 0.3,
        pb: 2,
        px: 1.3,
      }}
    >
      <Notifications />
    </Box>
  );
}
