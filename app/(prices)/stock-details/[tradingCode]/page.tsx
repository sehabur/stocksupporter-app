import React from "react";

import Dashboard from "./Dashboard";
import { Box } from "@mui/material";

export async function generateStaticParams() {
  const symbols = await fetch(
    `${process.env.BACKEND_URL}/api/prices/getStocksList`
  ).then((res) => res.json());

  return symbols.map((symbol: string) => ({
    tradingCode: symbol,
  }));
}

export default async function StockDetails({ params }: any) {
  const { tradingCode } = params;

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        maxWidth: 1200,
        minHeight: "95vh",
        mx: "auto",
      }}
    >
      <Dashboard tradingCode={tradingCode} />
    </Box>
  );
}
