import { Box } from "@mui/material";
import Main from "./Main";

export default async function Screener() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        minHeight: "90vh",
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <Main />
    </Box>
  );
}
