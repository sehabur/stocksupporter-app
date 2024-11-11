"use client";
import React from "react";
import { Box, Grid, Paper, Typography, Stack, Chip } from "@mui/material";
import { useRouter } from "next/navigation";
import FavoriteButton from "../buttons/FavoriteButton";
import { isWithinPreviousTwoDays } from "_helper";

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

export default function SearchStockCard(props: any) {
  const {
    data: item,
    navigation = true,
    favoriteButton = true,
    handleSearchDialogClose = () => {},
  } = props;

  const router = useRouter();

  const itemType = item.type;

  const isSpotEnabled = isWithinPreviousTwoDays(item.recordDate);

  const handleButtonClick = () => {
    handleSearchDialogClose();

    if (navigation) {
      let href = "";
      switch (item.type) {
        case "index":
          href = `/index-details?tradingCode=${item.tradingCode}`;
          break;
        case "sector":
          href = `/sector/chart?sector=${item.sectorTag}`;
          break;
        case "stock":
          href = `/stock-details?tradingCode=${item.tradingCode}`;
          break;
      }
      router.push(href);
    }
  };

  return (
    <Paper
      sx={{
        mb: 1,
        pl: 1.2,
        pr: 0.6,
        pt: 1.5,
        pb: 1.2,
        borderRadius: 1.5,
        bgcolor: "searchCardBgColor",
      }}
      variant="outlined"
    >
      <Grid container alignItems="center">
        <Grid item xs={10} onClick={handleButtonClick} sx={{ pr: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            sx={{ mb: 1 }}
          >
            <Typography
              sx={{
                fontSize: ".9rem",
                fontWeight: 600,
                color: "text.primary",
                mr: itemType !== "stock" ? 0.5 : 0,
              }}
            >
              {itemType === "index"
                ? item.tradingCode?.slice(2)
                : item.tradingCode}
            </Typography>

            {itemType === "stock" && (
              <Chip
                label={item.category}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  // fontSize: "1rem",
                  ml: 0.6,
                  fontWeight: 700,
                  "& .MuiChip-label": {
                    px: 0.5,
                  },
                }}
              />
            )}

            {item.change !== 0 && (
              <Chip
                label={addPlusSign(item.change)}
                size="small"
                sx={{
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
          <Typography sx={{ fontSize: ".875rem" }} color="text.secondary">
            {itemType === "index"
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
            <Typography
              sx={{
                fontSize: "1.3rem",
                fontWeight: 500,
                color:
                  item.change === 0
                    ? "primary.main"
                    : item.change < 0
                    ? "error.main"
                    : "success.main",
              }}
            >
              {item.close.toFixed(2)}
            </Typography>

            {favoriteButton && (
              <Box>
                <FavoriteButton
                  tradingCode={item.tradingCode}
                  variant="iconOnly"
                />
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
