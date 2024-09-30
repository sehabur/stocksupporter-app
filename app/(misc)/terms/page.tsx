import { terms } from "@/data/info";
import { Box, Typography } from "@mui/material";
import PageTitleSetter from "@/components/shared/PageTitleSetter";

export default async function Terms() {
  return (
    <Box component="main" sx={{ bgcolor: "background.default" }}>
      <PageTitleSetter pageTitle="Terms & Condition" />
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
