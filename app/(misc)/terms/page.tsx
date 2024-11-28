import { terms } from "@/data/info";
import { Box, Typography } from "@mui/material";
import PageTitleSetter from "@/components/shared/PageTitleSetter";

export default async function Terms() {
  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <PageTitleSetter pageTitle="Terms" />
      <Box
        sx={{
          maxWidth: { sm: "1080px" },
          mx: "auto",
          py: 3,
        }}
      >
        <Box sx={{ px: 2 }}>
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "text.primary",
              fontWeight: 600,
              mb: 2,
            }}
          >
            Terms & Conditions
          </Typography>
          <Typography
            sx={{
              color: "text.primary",
              whiteSpace: "pre-wrap",
              fontSize: ".875rem",
              textAlign: "left",
            }}
          >
            {terms}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
