import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import EnhancedEncryptionRoundedIcon from "@mui/icons-material/EnhancedEncryptionRounded";
import Dashboard from "./Dashboard";

export default function SignIn() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "90vh" }}
    >
      <Box
        sx={{
          pt: 6,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "text.secondary" }}>
          <EnhancedEncryptionRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="text.primary">
          Set new password
        </Typography>
      </Box>
      <Box sx={{ px: 4, pb: 4, maxWidth: 400, mx: "auto" }}>
        <Dashboard />
      </Box>
    </Box>
  );
}
