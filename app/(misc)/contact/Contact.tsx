"use client";
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function () {
  const theme = useTheme();
  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Typography
        fontWeight={700}
        sx={{ mb: 2, fontSize: "1.2rem" }}
        color="text.secondary"
      >
        Get in Touch
      </Typography>
      <Typography color="text.primary" sx={{ mb: 4 }}>
        We’d love to hear from you! Whether you have questions, feedback, or
        need assistance, feel free to reach out. Our team is here to help and
        will get back to you as soon as possible.
      </Typography>
      <Typography
        fontWeight={700}
        sx={{ mb: 2, fontSize: "1.2rem" }}
        color="text.secondary"
      >
        Contact Information
      </Typography>
      <Typography color="text.primary" sx={{ fontSize: "1rem" }}>
        Phone: +880-1311086137
      </Typography>
      <Typography color="text.primary" sx={{ fontSize: "1rem" }}>
        Email: support@stocksupporter.com
      </Typography>
      <Typography color="text.primary" sx={{ pt: 4 }}>
        Thank you for connecting with us!
      </Typography>
      <Box sx={{ mt: 2 }}>
        <img
          src={
            theme.palette.mode === "dark"
              ? "/images/logo/logo-full-dark.png"
              : "/images/logo/logo-full-light.png"
          }
          style={{
            width: "auto",
            height: "35px",
            marginLeft: "-4px",
          }}
          alt="logo of stocksupporter"
        />
      </Box>
    </Box>
  );
}
