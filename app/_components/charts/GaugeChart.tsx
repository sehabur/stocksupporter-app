"use client";
import React from "react";

import dynamic from "next/dynamic";
import { Box, Stack, Typography, useTheme } from "@mui/material";

import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import { grey } from "@mui/material/colors";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function GaugeChart({ rsi }: any) {
  const theme = useTheme();

  const colors =
    theme.palette.mode == "light"
      ? ["#E74C3C ", "#F39C12  ", "#2ECC71 "]
      : ["#C0392B  ", "#F1C40F   ", "#27AE60  "];

  const valueColor = {
    needle: theme.palette.mode == "light" ? grey[400] : grey[800],
  };
  return (
    <Box
    // sx={{
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "center",
    // }}
    >
      <Box sx={{ width: "75vw", mx: "auto" }}>
        <GaugeComponent
          type="semicircle"
          pointer={{
            length: 0.7,
            width: 10,
            color: valueColor.needle,
          }}
          arc={{
            padding: 0.02,
            width: 0.13,
            subArcs: [
              {
                limit: 40,
                color: colors[0],
              },
              {
                limit: 60,
                color: colors[1],
              },
              {
                limit: 100,
                color: colors[2],
              },
            ],
          }}
          labels={{
            valueLabel: {
              matchColorWithArc: true,
              formatTextValue: (val) => val,
              style: {
                // fill: valueColor.text,
                fontSize: "50px",
                fontFamily: "'Nunito Sans', sans-serif",
                fontWeight: "bold",
                textShadow: "none",
              },
            },
            tickLabels: {
              hideMinMax: true,
            },
          }}
          value={rsi}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
        >
          <SquareRoundedIcon sx={{ color: colors[0], fontSize: ".875rem" }} />
          <Typography
            sx={{
              fontSize: ".875rem",
              color: "text.secondary",
            }}
          >
            Bear(0-40)
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
        >
          <SquareRoundedIcon sx={{ color: colors[1], fontSize: ".875rem" }} />
          <Typography
            sx={{
              fontSize: ".875rem",
              color: "text.secondary",
            }}
          >
            Neutral(40-60)
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
        >
          <SquareRoundedIcon sx={{ color: colors[2], fontSize: ".875rem" }} />
          <Typography
            sx={{
              fontSize: ".875rem",
              color: "text.secondary",
            }}
          >
            Bull(60-100)
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
