import { Box, Typography } from "@mui/material";
import BlockTransection from "./BlockTransection";

export default async function BlockTr() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <BlockTransection />
    </Box>
  );
}
