import { Box } from "@mui/material";
import Home from "@/components/homepage/Home";

export default async function Page() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "90vh" }}
    >
      <Home />
    </Box>
  );
}
