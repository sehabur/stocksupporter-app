import React from "react";

import { Box, Typography } from "@mui/material";

import Portfolio from "./Portfolio";
import PageTitleSetter from "@/components/shared/PageTitleSetter";

export default async function Page() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "90vh" }}
    >
      <Box
        sx={{
          maxWidth: { sm: "800px" },
          mx: "auto",
          px: 2,
        }}
      >
        <PageTitleSetter pageTitle="Portfolio" />
        <Portfolio />
      </Box>
    </Box>
  );
}
