"use client";
import { Box, Typography, Avatar } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import SignInComp from "../../(users)/signin/SignInComp";

export default function SigninDialogContent() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ mb: 3, bgcolor: "text.secondary" }}>
          <LockOutlinedIcon />
        </Avatar>
      </Box>

      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography
          color="text.primary"
          sx={{ fontSize: "1.3rem", fontWeight: 700, mb: 1 }}
        >
          You are not signed in !
        </Typography>
        <Typography color="text.primary" sx={{ fontSize: "1rem" }}>
          Please sign in to use this feature
        </Typography>
      </Box>

      <SignInComp />
    </Box>
  );
}
