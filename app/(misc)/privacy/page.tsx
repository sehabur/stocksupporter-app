import PageTitleSetter from "@/components/shared/PageTitleSetter";
import { privacy, terms } from "@/data/info";
import { Box, Typography } from "@mui/material";

export default async function Terms() {
  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <PageTitleSetter pageTitle="Privacy Policy" />
      <Box
        sx={{
          maxWidth: { sm: "1080px" },
          mx: "auto",
          py: 3,
        }}
      >
        <Box
          sx={{
            color: "text.primary",
            px: 2,
            borderRadius: 2,
          }}
        >
          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              fontSize: "1rem",
              textAlign: { xs: "left", sm: "justify" },
            }}
          >
            {privacy}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
