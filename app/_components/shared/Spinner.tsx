"use client";
import { CircularProgress, Dialog, Box, Backdrop } from "@mui/material";

export default function Spinner() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        height: "93vh",
      }}
    >
      <Backdrop open={true} sx={{ bgcolor: "background.default", zIndex: 100 }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Box>
  );
}
