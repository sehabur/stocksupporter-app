import { Box } from "@mui/material";
import React from "react";
import Ipo from "./Ipo";

export default async function Page({}) {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          py: 2,
          px: 2,
        }}
      >
        <Ipo />
      </Box>
    </Box>
  );
}
