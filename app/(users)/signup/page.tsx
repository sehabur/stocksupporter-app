import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import SignUpComp from "./SignUpComp";

export default function SignUp() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "100vh", pt: 4, pb: 4 }}
    >
      <Box
        sx={{
          pb: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "text.secondary" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="text.primary">
          Create new account
        </Typography>
      </Box>
      <Box sx={{ px: 4, maxWidth: 500, mx: "auto" }}>
        <SignUpComp />
      </Box>
    </Box>
  );
}
