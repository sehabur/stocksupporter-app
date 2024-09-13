import { Box } from "@mui/material";
import React from "react";
import Details from "./Details";

export default async function Ipo() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Details />
    </Box>
  );
}
