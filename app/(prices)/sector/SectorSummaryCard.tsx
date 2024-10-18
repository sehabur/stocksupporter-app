"use client";
import { useState } from "react";
import Link from "next/link";

import {
  Paper,
  Grid,
  Typography,
  Stack,
  Button,
  Chip,
  Popover,
  Box,
} from "@mui/material";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useRouter } from "next/navigation";
import { pageTitleActions } from "_store";
import { useDispatch } from "react-redux";

export default function SectorSummaryCard({ data }: { data: any }) {
  const sectorTag = data.sector.split(" ")[0].toLowerCase();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [type, setType] = useState<any>("uptrendItems");

  const router = useRouter();

  const dispatch = useDispatch();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    setAnchorEl(event.currentTarget);
    setType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = (href: string) => {
    router.push(href);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const textColor =
    data.change === 0
      ? "primary.main"
      : data.change < 0
      ? "error.main"
      : "success.main";

  return (
    <Box>
      <Paper
        sx={{
          width: 360,
          my: 0.7,
          px: 2,
          pt: 1,
          pb: 1.7,
          bgcolor: "priceCardBgColor",
        }}
        variant="outlined"
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={9}>
            <Typography
              color="text.primary"
              sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 0.3 }}
            >
              {data.sector}
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: ".9rem",
                color: "text.primary",
              }}
            >
              Total value: {(data.valueTotal / 10).toFixed(2)} crore
            </Typography>
            <Stack direction="row" alignItems="center">
              <Box
                component={Button}
                onClick={(e) => handleClick(e, "uptrendItems")}
                sx={{
                  m: 0,
                  p: 0,
                  ":hover": {
                    background: "transparent",
                  },
                }}
              >
                <KeyboardDoubleArrowUpIcon
                  sx={{ color: "success.main", fontSize: "1.3rem" }}
                />
                <Typography
                  sx={{ color: "success.main", mr: 3, fontSize: "1.3rem" }}
                >
                  {data.uptrend}
                </Typography>
              </Box>

              <Box
                component={Button}
                onClick={(e) => handleClick(e, "neutralItems")}
                sx={{
                  m: 0,
                  p: 0,
                  ":hover": {
                    background: "transparent",
                  },
                }}
              >
                <PauseCircleOutlineIcon
                  sx={{ color: "primary.main", mr: 0.5, fontSize: "1.3rem" }}
                />
                <Typography
                  sx={{ color: "primary.main", mr: 1, fontSize: "1.3rem" }}
                >
                  {data.neutral}
                </Typography>
              </Box>
              <Box
                component={Button}
                onClick={(e) => handleClick(e, "downtrendItems")}
                sx={{
                  m: 0,
                  p: 0,
                  ":hover": {
                    background: "transparent",
                  },
                }}
              >
                <KeyboardDoubleArrowDownIcon
                  sx={{ color: "error.main", fontSize: "1.3rem" }}
                />
                <Typography sx={{ color: "error.main", fontSize: "1.3rem" }}>
                  {data.downtrend}
                </Typography>
              </Box>
            </Stack>
            <Box sx={{ mt: 0.5 }}>
              <Button
                onClick={() => {
                  handleButtonClick(`/sector/chart?sector=${sectorTag}`);
                }}
                variant="outlined"
                size="small"
                color="info"
                sx={{
                  fontSize: ".9rem",
                  mr: 2,
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.2,
                }}
                endIcon={<ArrowForwardRoundedIcon />}
              >
                Chart
              </Button>
              <Button
                onClick={() => {
                  handleButtonClick(`/latest-price?sector=${sectorTag}`);
                }}
                variant="outlined"
                size="small"
                color="info"
                sx={{ fontSize: ".9rem", borderRadius: 1, px: 1.5, py: 0.2 }}
                endIcon={<ArrowForwardRoundedIcon />}
              >
                Stocks
              </Button>{" "}
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: "1.6rem",
                color:
                  data.change == 0
                    ? "primary.main"
                    : data.change < 0
                    ? "error.main"
                    : "success.main",
              }}
            >
              {data.close.toFixed(1)}
            </Typography>
            <Chip
              label={data.change}
              size="small"
              sx={{
                fontSize: ".9rem",
                borderRadius: 1,
                color: textColor,
                mt: 1,
                mr: 1,
              }}
            />
            {data.change !== 0 && (
              <Chip
                label={data.percentChange + "%"}
                size="small"
                sx={{
                  fontSize: ".9rem",
                  borderRadius: 1,
                  mt: 1,
                  color: textColor,
                }}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableScrollLock={true}
        sx={{ maxHeight: 550 }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          {data[type]
            .filter((item: string | number) => item !== 0)
            .sort()
            .map((item: string) => (
              <Button
                key={item}
                onClick={() => {
                  handleButtonClick(`/stock-details?tradingCode=${item}`);
                }}
                variant="text"
                size="small"
                color="info"
                sx={{
                  display: "block",
                  fontSize: ".85rem",
                  ":hover": {
                    background: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                {item}
              </Button>
            ))}
        </Box>
      </Popover>
    </Box>
  );
}
