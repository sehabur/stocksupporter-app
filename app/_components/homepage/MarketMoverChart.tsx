"use client";
import { Typography, Stack, Box } from "@mui/material";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";

import PieChartSectorTrend from "@/components/charts/PieChartSectorTrend";
import GaugeChart from "../charts/GaugeChart";

const colors = ["#24b29b", "#448aff", "#f45e6a"];
const labels = ["Uptrend", "Neutral", "Downtrend"];

export default function MarketMoverChart({ data, rsi }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 3,
        pb: 3,
        px: 2,
      }}
    >
      <Typography color="text.primary" sx={{ fontSize: "1.3rem" }}>
        Market trend
      </Typography>
      <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            m: 0,
            p: 0,
            ":hover": {
              background: "transparent",
            },
          }}
        >
          <KeyboardDoubleArrowUpRoundedIcon
            sx={{
              color: colors[0],
              fontSize: "1.8rem",
              mr: 1,
            }}
          />
          <Typography
            sx={{
              color: colors[0],
              fontWeight: 700,
              mr: 4,
              fontSize: "1.8rem",
            }}
          >
            {data.issuesAdvanced}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            m: 0,
            p: 0,
            ":hover": {
              background: "transparent",
            },
          }}
        >
          <PauseCircleOutlineRoundedIcon
            sx={{ color: colors[1], mr: 1, fontSize: "1.8rem" }}
          />
          <Typography
            sx={{
              color: colors[1],
              mr: 4,
              fontSize: "1.8rem",
              fontWeight: 700,
            }}
          >
            {data.issuesUnchanged}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            m: 0,
            p: 0,
            ":hover": {
              background: "transparent",
            },
          }}
        >
          <KeyboardDoubleArrowDownRoundedIcon
            sx={{
              color: colors[2],
              fontSize: { xs: "1.6rem", sm: "2rem" },
              mr: 1,
            }}
          />
          <Typography
            sx={{
              color: colors[2],
              fontSize: { xs: "1.6rem", sm: "2rem" },
              fontWeight: 700,
            }}
          >
            {data.issuesDeclined}
          </Typography>
        </Box>
      </Stack>
      <Box>
        <PieChartSectorTrend
          data={[
            data.issuesAdvanced,
            data.issuesUnchanged,
            data.issuesDeclined,
          ]}
          colors={colors}
          labels={labels}
          width={360}
          donutSize="60%"
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography
          color="text.primary"
          sx={{ fontSize: "1.3rem", fontWeight: 500, textAlign: "center" }}
        >
          Sentiment
        </Typography>

        <GaugeChart rsi={rsi} />
      </Box>
    </Box>
  );
}
