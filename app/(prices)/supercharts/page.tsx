import { Box, Grid } from "@mui/material";

import TradingviewChart from "./TradingviewChart";

export default async function Page() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        height: "100vh",
      }}
    >
      <Box sx={{ height: 650, width: "100%" }}>
        <TradingviewChart />
      </Box>
    </Box>
  );
}
