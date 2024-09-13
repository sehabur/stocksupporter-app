import React from "react";

import Favorites from "./Favorites";

import { Box } from "@mui/material";

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
      <Favorites />
    </Box>
  );
}
