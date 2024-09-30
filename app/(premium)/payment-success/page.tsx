import { Box } from "@mui/material";
import React from "react";
import Dashboard from "./Dashboard";

export default function SuccessPage() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "90vh", py: 3 }}
    >
      <Dashboard />
    </Box>
  );
}
