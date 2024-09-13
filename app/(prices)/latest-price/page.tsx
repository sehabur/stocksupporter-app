import { Box } from "@mui/material";

import SharePrice from "./SharePrice";

export default async function Page() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "secondaryBackground", py: 2, px: 1, minHeight: "100vh" }}
    >
      <SharePrice />
    </Box>
  );
}
