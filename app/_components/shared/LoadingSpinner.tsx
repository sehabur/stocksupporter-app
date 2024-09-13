import { CircularProgress, Dialog, Box, Backdrop } from "@mui/material";
import React from "react";

const LoadingSpinner = ({ open }: any) => {
  return (
    <Backdrop open={open} sx={{ bgcolor: "background.default", zIndex: 100 }}>
      <Box sx={{ p: 2.2, pb: 1.5 }}>
        <CircularProgress color="primary" />
      </Box>
    </Backdrop>
  );
};

export default LoadingSpinner;
