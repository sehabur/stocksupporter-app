"use client";
import React from "react";

import { Box, Chip, Stack, Typography, Divider } from "@mui/material";
import { DateTime } from "luxon";

import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";

const addPlusSign = (value: number) => {
  if (!value) return "0";
  const sign = value > 0 ? "+" : "";
  return sign + value.toFixed(2);
};

const textColor = (value: number) => {
  if (!value) return "primary.main";
  return value > 0 ? "success.main" : value < 0 ? "error.main" : "primary.main";
};

export default function IndexInfoCard({ data }: any) {
  const { marketOpenStatus, indexLatestData } = data;
  return (
    <Box
      sx={{
        px: 2,
        py: 2,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="flex-start">
        <Typography
          sx={{
            fontSize: "1.3rem",
            color: "text,primary",
            fontWeight: 700,
            fontFamily: "'Nunito Sans', sans-serif",
          }}
        >
          {indexLatestData?.index?.toFixed(2)}
        </Typography>
        <Typography
          sx={{
            color: textColor(indexLatestData?.change),
            fontSize: "1rem",
            fontWeight: 700,
            ml: 3,
            mr: 2,
            mt: 0.3,
            fontFamily: "'Nunito Sans', sans-serif",
          }}
        >
          {addPlusSign(indexLatestData?.change)}
        </Typography>
        <Typography
          sx={{
            color: textColor(indexLatestData?.percentChange),
            fontSize: "1rem",
            fontWeight: 700,
            mt: 0.3,
            fontFamily: "'Nunito Sans', sans-serif",
          }}
        >
          {addPlusSign(indexLatestData?.percentChange)}%
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-start">
        <Box
          sx={{
            display: { xs: "flex", sm: "block" },
            alignItems: "baseline",
            mr: 1,
          }}
        >
          <Typography color="text.secondary" sx={{ ml: 0.5 }}>
            Last update{" "}
            {DateTime.fromISO(indexLatestData?.time).toFormat("dd MMM, HH:mm")}
          </Typography>
        </Box>

        <Chip
          label={marketOpenStatus}
          variant="outlined"
          size="small"
          icon={
            marketOpenStatus == "Open" ? (
              <RadioButtonCheckedRoundedIcon color="success" />
            ) : marketOpenStatus == "Closed" ? (
              <DoDisturbOnRoundedIcon color="error" />
            ) : (
              <DoDisturbOnRoundedIcon color="warning" />
            )
          }
        />
      </Stack>
      <Divider light sx={{ mt: 1.5, mb: 1.5 }} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography color="text.primary" sx={{ fontSize: ".8em" }}>
            VOLUME
          </Typography>
          <Stack direction="row" alignItems="baseline">
            <Typography
              color="text.primary"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              {(indexLatestData?.value / 10000000)?.toFixed(2)}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ ml: 0.5, fontSize: ".8rem" }}
            >
              CR
            </Typography>
          </Stack>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box>
          <Typography color="text.primary" sx={{ fontSize: ".8rem" }}>
            VALUE
          </Typography>
          <Stack direction="row" alignItems="baseline">
            <Typography
              color="text.primary"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              {(indexLatestData?.volume / 10000000)?.toFixed(2)}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ ml: 0.5, fontSize: ".8rem" }}
            >
              CR
            </Typography>
          </Stack>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box>
          <Typography color="text.primary" sx={{ fontSize: ".8rem" }}>
            TRADE
          </Typography>
          <Stack direction="row" alignItems="baseline">
            <Typography
              color="text.primary"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              {indexLatestData?.trade?.toFixed(0)}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
