import React from "react";

import { Box } from "@mui/material";

import AiGeneratedInsight from "./AiGeneratedInsight";

export default function AiContent() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "92vh" }}
    >
      <Box sx={{ mx: { xs: 0, sm: "auto" }, maxWidth: 650 }}>
        <AiGeneratedInsight />
      </Box>
    </Box>
  );
}
