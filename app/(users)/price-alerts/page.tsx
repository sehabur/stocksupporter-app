import React from "react";
import { Box, Typography } from "@mui/material";
import Alerts from "./Alerts";

export default function Page() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "secondaryBackground",
        minHeight: "90vh",
        py: 2,
        px: 1.3,
      }}
    >
      <Alerts />
    </Box>
  );
}
