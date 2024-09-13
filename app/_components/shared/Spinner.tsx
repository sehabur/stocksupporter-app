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
      {/* <Dialog open={true}>
        <Box sx={{ p: 2, pb: 1 }}>
          <CircularProgress color="primary" />
        </Box>
      </Dialog> */}
      <Backdrop open={true} sx={{ bgcolor: "background.default", zIndex: 100 }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Box>
  );
}
