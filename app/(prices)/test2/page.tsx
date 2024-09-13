import { Box } from "@mui/material";
import Dashboard from "./Dashboard";

export default async function IndexMover() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Dashboard />
    </Box>
  );
}
