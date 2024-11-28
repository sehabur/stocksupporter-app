import React from "react";

import { Box, Grid, Paper, Typography, Stack, Chip } from "@mui/material";
import { useRouter } from "next/navigation";
import FavoriteButton from "../buttons/FavoriteButton";
import AlertButton from "../buttons/AlertButton";
import { isBetweenSpotRange, isWithinPreviousTwoDays } from "_helper";

const addPlusSign = (value: number) => {
  let result;
  if (value > 0) {
    result = "+" + value.toFixed(2);
  } else if (value < 0) {
    result = value.toFixed(2);
  } else {
    result = value;
  }
  return result;
};

export default function MobileViewPriceCard({ item }: any) {
  const router = useRouter();

  const itemType = item?.type;

  const isSpotEnabled = isBetweenSpotRange(item.spotRange);

  const handleButtonClick = () => {
    let href = "";
    switch (item.type) {
      case "index":
        href = `/index-details?tradingCode=${item.tradingCode}`;
        break;
      case "sector":
        href = `/sector/chart?sector=${item.sectorTag}`;
        break;
      case "stock":
        href = `/stock-details?tradingCode=${encodeURIComponent(
          item.tradingCode
        )}`;
        break;
    }
    router.push(href);
  };

  return (
    <Paper
      sx={{
        my: 1,
        pl: 1.5,
        pr: 1,
        pt: 1.2,
        pb: 0.8,
        borderRadius: 2,
        width: "100%",
        bgcolor: "priceCardBgColor",
      }}
      elevation={0}
    >
      <Grid container alignItems="center" justifyContent="flex-start">
        <Grid item xs={10} onClick={handleButtonClick}>
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            sx={{ mb: 1 }}
          >
            <Typography
              sx={{
                fontSize: ".9rem",
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              {itemType == "index"
                ? item.tradingCode?.slice(2)
                : item.tradingCode.slice(0, 22)}
            </Typography>

            {itemType == "stock" && (
              <Chip
                label={item.category}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  // fontSize: ".9rem",
                  ml: 0.7,
                  fontWeight: 700,
                  "& .MuiChip-label": {
                    px: 0.6,
                  },
                }}
              />
            )}

            {item.change !== 0 && (
              <Chip
                label={addPlusSign(item.change)}
                size="small"
                sx={{
                  // fontSize: ".9rem",
                  borderRadius: 1,
                  ml: 0.7,
                  fontWeight: 700,
                  "& .MuiChip-label": {
                    px: 0.5,
                  },
                  color:
                    item.change === 0
                      ? "primary.main"
                      : item.change < 0
                      ? "error.main"
                      : "success.main",
                }}
              />
            )}
            <Chip
              label={`${addPlusSign(item.percentChange)}%`}
              size="small"
              sx={{
                // fontSize: ".9rem",
                borderRadius: 1,
                ml: item.change !== 0 ? 0.7 : 1,
                fontWeight: 700,
                "& .MuiChip-label": {
                  px: item.change !== 0 ? 0.5 : 1,
                },
                color:
                  item.change === 0
                    ? "primary.main"
                    : item.change < 0
                    ? "error.main"
                    : "success.main",
              }}
            />
            {item.haltStatus &&
              item.haltStatus !== "none" &&
              !isSpotEnabled && (
                <Chip
                  label="Halt"
                  size="small"
                  variant="outlined"
                  color={item.haltStatus === "buy" ? "success" : "error"}
                  sx={{
                    borderRadius: 1,
                    ml: 0.7,
                    fontSize: ".7rem",
                    fontWeight: 600,
                    "& .MuiChip-label": {
                      px: 0.4,
                    },
                  }}
                />
              )}

            {isSpotEnabled && (
              <Chip
                label="Spot"
                size="small"
                variant="outlined"
                color="warning"
                sx={{
                  borderRadius: 1,
                  ml: 0.7,
                  fontSize: ".7rem",
                  fontWeight: 600,
                  "& .MuiChip-label": {
                    px: 0.4,
                  },
                }}
              />
            )}
          </Stack>
          <Typography
            sx={{ fontSize: ".875rem", textAlign: "left" }}
            color="text.primary"
          >
            {itemType == "index"
              ? `Vol: ${item.value} | Val: ${(item.volume / 10000000).toFixed(
                  2
                )}cr | Trd: ${item.trade}`
              : `Vol: ${item.volume} | Val: ${(item.value / 10).toFixed(
                  2
                )}cr | Trd: ${item.trade}`}
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Stack alignItems="flex-end" sx={{ mr: 0.7 }}>
            <Box>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  color:
                    item.change === 0
                      ? "primary.main"
                      : item.change < 0
                      ? "error.main"
                      : "success.main",
                }}
              >
                {item.close.toFixed(1)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 0.2 }}>
              <FavoriteButton
                tradingCode={item.tradingCode}
                variant="iconOnly"
              />
              <AlertButton tradingCode={item.tradingCode} variant="iconOnly" />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
