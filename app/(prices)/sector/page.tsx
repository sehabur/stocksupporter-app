import Sector from "./Sector";
import { Box, Typography } from "@mui/material";

export default async function Page() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "100vh" }}
    >
      <Sector />
    </Box>
  );
}
