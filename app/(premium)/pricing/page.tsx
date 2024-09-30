import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

import Pricing from "./Pricing";
import Features from "./Features";
import PageTitleSetter from "@/components/shared/PageTitleSetter";

export default async function Price() {
  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <PageTitleSetter pageTitle="Premium" />
      <Box sx={{ px: 4, pb: 2 }}>
        <Box
          sx={{
            pt: 2,
            pb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <WorkspacePremiumRoundedIcon
              sx={{ fontSize: { xs: 35, sm: 40 }, color: "#2575fc" }}
            />
          </Box>
          <Typography
            component="h1"
            color="text.primary"
            sx={{
              fontSize: { xs: "1.4rem", sm: "1.8rem" },
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Premium Membership
          </Typography>

          <Typography
            color="text.primary"
            sx={{
              fontSize: ".9rem",
              fontWeight: 500,
              color: "text.primary",
              textAlign: "center",
            }}
          >
            Elevate your investing potential with a premium package
          </Typography>
        </Box>

        <Pricing />
      </Box>

      <Box sx={{ px: 2 }}>
        <Features />
      </Box>
    </Box>
  );
}
