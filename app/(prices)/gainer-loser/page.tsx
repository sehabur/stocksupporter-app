import { Box } from "@mui/material";
import Dashboard from "./Dashboard";

export default async function GainerLooser() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        minHeight: "95vh",
      }}
    >
      <Dashboard />
    </Box>
  );
}
