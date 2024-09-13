import { Box, Typography } from "@mui/material";
import News from "./News";

export default async function LatestNews() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "100vh", py: 2, px: 2 }}
    >
      <News />
    </Box>
  );
}
