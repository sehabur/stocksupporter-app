"use client";
import React from "react";
import { DateTime } from "luxon";
import Link from "next/link";
import {
  Box,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import AreaChart from "@/components/charts/AreaChart";
import CandlestickVolumeChart from "@/components/charts/CandlestickVolumeChart";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    marginRight: "12px",
    border: `1px solid lightgrey !important`,
    paddingLeft: "18px",
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingRight: "18px",
    "&.Mui-selected": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  color: theme.palette.text.primary,
  // fontSize: ".9rem",
  // textTransform: "none",
}));

const changeDays = [
  {
    field: "today",
    title: "Today",
  },
  {
    field: "oneWeek",
    title: "1 Week",
  },
  {
    field: "oneMonth",
    title: "1 Month",
  },
  {
    field: "sixMonth",
    title: "6 Months",
  },
  {
    field: "oneYear",
    title: "1 Year",
  },
  {
    field: "fiveYear",
    title: "5 Years",
  },
];

const formatCandleChartData = (data: any) => {
  let candle = [];
  let volume = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const open = item.open !== 0 ? item.open : item.ycp;
    const close = item.close;

    if (close === 0) {
      candle.push({
        time: DateTime.fromISO(item.date).plus({ hours: 6 }).toUnixInteger(),
        open: item.ycp,
        high: item.ycp,
        low: item.ycp,
        close: item.ycp,
        color: close > open ? "#22ab94" : open > close ? "#f7525f" : "#2962ff",
      });
    } else {
      candle.push({
        time: DateTime.fromISO(item.date).plus({ hours: 6 }).toUnixInteger(),
        open: open,
        high: item.high,
        low: item.low,
        close: close,
        color: close > open ? "#22ab94" : open > close ? "#f23645" : "#2962ff",
      });
    }

    volume.push({
      time: DateTime.fromISO(item.date).plus({ hours: 6 }).toUnixInteger(),
      value: item.volume,
      color:
        close > open ? "#22ab9488" : open > close ? "#f7525f88" : "#2962ff88",
    });
  }

  return {
    candle,
    volume,
  };
};

const calcPercentChange = (current: any, previous: any) => {
  if (!previous) {
    return {
      text: "-",
      color: "",
    };
  }
  const stockchanged = current === 0 ? false : true;
  const change = stockchanged ? ((current - previous) / previous) * 100 : 0;
  return {
    text: (change === 0 ? change : change.toFixed(2)) + "%",
    color: change === 0 ? "#2962ff" : change < 0 ? "#f45e6a" : "#00A25B",
  };
};

const formatPercentChangeData = (latestdata: any, lastdaydata: any) => {
  const { close, ycp } = latestdata;

  const {
    oneWeekBeforeData,
    oneMonthBeforeData,
    sixMonthBeforeData,
    oneYearBeforeData,
    fiveYearBeforeData,
  } = lastdaydata;

  return {
    today: calcPercentChange(close, ycp),
    oneWeek: calcPercentChange(close, oneWeekBeforeData),
    oneMonth: calcPercentChange(close, oneMonthBeforeData),
    sixMonth: calcPercentChange(close, sixMonthBeforeData),
    oneYear: calcPercentChange(close, oneYearBeforeData),
    fiveYear: calcPercentChange(close, fiveYearBeforeData),
  };
};

function isValidDate(date: any) {
  return !isNaN(date);
}

const agmDateCalculation = (
  agmDateInit: string,
  recordDateInit: string,
  declarationDateInit: string
) => {
  const todayDate = DateTime.utc().startOf("day");

  let agmPrefix = "";
  let recordPrefix = "";
  let isCircuitEnabled = true;
  let agmDate = "";
  let recordDate = "";
  let declarationDate = "";

  if (agmDateInit) {
    const agmDateFormatted = DateTime.local(
      Number(agmDateInit.substring(6, 10)),
      Number(agmDateInit.substring(3, 5)),
      Number(agmDateInit.substring(0, 2))
    );

    if (isValidDate(agmDateFormatted)) {
      if (agmDateFormatted < todayDate) {
        agmPrefix = "Last";
      } else {
        agmPrefix = "Next";
      }
      agmDate = agmDateFormatted.toFormat("dd MMM yyyy");
    }
  }

  if (declarationDateInit) {
    const declarationDateFormatted = DateTime.fromISO(declarationDateInit);

    if (declarationDateFormatted.toMillis() == todayDate.toMillis()) {
      isCircuitEnabled = false;
    }
    declarationDate = declarationDateFormatted.toFormat("dd MMM yyyy");
  }

  if (recordDateInit) {
    const recordDateFormatted = DateTime.fromISO(recordDateInit);

    if (recordDateFormatted < todayDate) {
      recordPrefix = "Last";
    } else {
      recordPrefix = "Next";
    }
    recordDate = recordDateFormatted.toFormat("dd MMM yyyy");
  }

  return {
    agmPrefix,
    recordPrefix,
    isCircuitEnabled,
    agmDate,
    recordDate,
    declarationDate,
  };
};

export default function Overview({ stock, handleButtonClick }: any) {
  const [alignment, setAlignment] = React.useState("minute");

  const theme = useTheme();

  const matchesSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const chartColor =
    stock.latest.change === 0
      ? "#2962ff"
      : stock.latest.change < 0
      ? "#f45e6a"
      : "#00A25B";

  const minuteChartData: any = stock.minute.map(
    (item: { time: string; close: number; ycp: number }) => {
      return {
        time: DateTime.fromISO(item.time).plus({ hours: 6 }).toUnixInteger(),
        value: item.close !== 0 ? item.close : item.ycp,
      };
    }
  );

  const dailyCandleData = formatCandleChartData(stock.daily);
  const weeklyCandleData = formatCandleChartData(stock.weekly);
  const monthlyCandleData = formatCandleChartData(stock.monthly);

  const percentChangeData: any = formatPercentChangeData(
    stock.latest,
    stock.lastDay
  );

  const dates = agmDateCalculation(
    stock.fundamentals.lastAgm,
    stock.fundamentals.recordDate,
    stock.fundamentals.declarationDate
  );

  const handleAlignment = (
    event: any,
    newAlignment: React.SetStateAction<string>
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Box sx={{ maxWidth: 850, mx: "auto", py: 2, px: 2 }}>
      <Button
        onClick={() => {
          handleButtonClick(
            `/supercharts?symbol=${stock.fundamentals.tradingCode}`,
            `${stock.fundamentals.tradingCode} Supercharts`
          );
        }}
        color="primary"
        endIcon={<ArrowForwardIosRoundedIcon />}
        sx={{
          fontSize: "1.2rem",
          fontWeight: 700,
          ":hover": {
            bgcolor: "transparent",
            textDecoration: "underline",
          },
        }}
      >
        {stock.fundamentals.tradingCode} Chart
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
        >
          <StyledToggleButton value="minute">Minute</StyledToggleButton>
          <StyledToggleButton value="daily">Day</StyledToggleButton>
          <StyledToggleButton value="weekly">Week</StyledToggleButton>
          <StyledToggleButton value="monthly">Month</StyledToggleButton>
        </StyledToggleButtonGroup>
      </Box>
      <Box sx={{ my: 4 }}>
        {alignment === "minute" && (
          <Box sx={{ mt: 4 }}>
            <AreaChart
              data={minuteChartData}
              color={chartColor}
              height={matchesSmDown ? 300 : 360}
              chartWidthValue={1120}
            />
          </Box>
        )}
        {alignment === "daily" && (
          <Box>
            <CandlestickVolumeChart
              height={matchesSmDown ? 300 : 360}
              candledata={dailyCandleData.candle}
              volumedata={dailyCandleData.volume}
            />
          </Box>
        )}
        {alignment === "weekly" && (
          <Box>
            <CandlestickVolumeChart
              height={matchesSmDown ? 300 : 360}
              candledata={weeklyCandleData.candle}
              volumedata={weeklyCandleData.volume}
            />
          </Box>
        )}
        {alignment === "monthly" && (
          <Box>
            <CandlestickVolumeChart
              height={matchesSmDown ? 300 : 360}
              candledata={monthlyCandleData.candle}
              volumedata={monthlyCandleData.volume}
            />
          </Box>
        )}

        <Paper
          sx={{
            mt: 3,
            mb: 4,
            pt: 1.8,
            pb: 1.5,
            borderRadius: 2,
            bgcolor: "appCardBgColor",
          }}
          elevation={0}
        >
          <Grid container rowSpacing={2}>
            {changeDays.map((item: any) => (
              <Grid item xs={4} key={item.field}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontSize: ".9rem",
                      color: "text.primary",
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: percentChangeData[item.field].color,
                    }}
                  >
                    {percentChangeData[item.field].text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "text.primary",
              mt: 5,
              mb: 2,
            }}
          >
            Market Today
          </Typography>
        </Box>

        <Grid
          container
          alignItems="flex-start"
          justifyContent="flex-start"
          rowSpacing={2.5}
          columnSpacing={2}
        >
          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Open
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.5rem" },
                  fontWeight: 500,
                }}
              >
                {stock.latest.open}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".8rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Low
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {stock.latest.low}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".8rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              High
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {stock.latest.high}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".8rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Volume
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {stock.latest.volume}
              </Typography>
              {/* <Typography
                color="text.secondary"
                sx={{ ml: .7, fontSize: ".875rem" }}
              >
                BDT
              </Typography> */}
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Value
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {(stock.latest.value / 10).toFixed(2)}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".8rem" }}
              >
                Crore
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Trade
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {stock.latest.trade}
              </Typography>
              {/* <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".8rem" }}
              >
                Crore
              </Typography> */}
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              YCP
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {stock.latest.ycp}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".8rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              52W High
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {Math.max(stock.lastDay.oneYearHigh, stock.latest.high) || "--"}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".8rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              52W Low
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {Math.min(stock.lastDay.oneYearLow, stock.latest.low) || "--"}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".8rem" }}
              >
                BDT
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Beta (1 Year)
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals.technicals?.beta}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Circuit Up
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {dates.isCircuitEnabled
                  ? stock.fundamentals.circuitUp
                  : "No limit"}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".8rem" }}
              >
                {dates.isCircuitEnabled ? "BDT" : ""}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Circuit Low
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                {dates.isCircuitEnabled
                  ? stock.fundamentals.circuitLow
                  : "No limit"}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.7, fontSize: ".8rem" }}
              >
                {dates.isCircuitEnabled ? "BDT" : ""}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider light sx={{ my: 3 }} />

        <Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "text.primary",
              // mt: 5,
              mb: 2,
            }}
          >
            Financial Indicators
          </Typography>
        </Box>

        <Grid
          container
          alignItems="flex-start"
          justifyContent="flex-start"
          rowSpacing={2.5}
          columnSpacing={2}
        >
          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              P/E ratio
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals.pe?.value || "-"}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              {`EPS (${
                stock.fundamentals.screener?.epsQuarterly?.period ||
                stock.fundamentals.screener?.epsYearly?.period
              })`}
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals.screener?.epsQuarterly?.value ||
                  stock.fundamentals.screener?.epsYearly?.value}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              {`NAV (${
                stock.fundamentals.screener?.navQuarterly?.period ||
                stock.fundamentals.screener?.navYearly?.period
              })`}
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals.screener?.navQuarterly?.value ||
                  stock.fundamentals.screener?.navYearly?.value}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".85rem" }}>
              Market Capitalization
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {(stock.fundamentals.marketCap / 10).toFixed(2)}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".8rem" }}>
                CR
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".85rem" }}>
              Paid-up Capital
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {(stock.fundamentals.paidUpCap / 10).toFixed(2)}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".8rem" }}>
                CR
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".85rem" }}>
              Authorized Capital
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {(stock.fundamentals.authCap / 10).toFixed(2)}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".8rem" }}>
                CR
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Total Shares
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {(stock.fundamentals.totalShares / 10000000).toFixed(2)}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".8rem" }}>
                CR
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".85rem" }}>
              Short term Loan
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {stock.fundamentals.shortTermLoan !== 0
                  ? (stock.fundamentals.shortTermLoan / 10).toFixed(2)
                  : 0}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".8rem" }}>
                CR
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".85rem" }}>
              Long term Loan
            </Typography>
            <Stack direction="row" alignItems="baseline" flexWrap="wrap">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  mr: 0.7,
                }}
              >
                {stock.fundamentals.longTermLoan !== 0
                  ? (stock.fundamentals.longTermLoan / 10).toFixed(2)
                  : 0}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: ".8rem" }}>
                CR
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              {dates.agmPrefix} AGM date
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {dates.agmDate || "-"}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Typography
              // noWrap
              color="text.secondary"
              sx={{ fontSize: ".875rem" }}
            >
              {dates.recordPrefix} Rec date
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {dates.recordDate || "-"}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
              Year End
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals.yearEnd}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider light sx={{ my: 3 }} />

        <Box sx={{ mt: { xs: 0, sm: 8 }, mb: { xs: 2, sm: 4 } }}>
          <Typography
            color="text.primary"
            sx={{ fontSize: "1.2rem", fontWeight: 700 }}
          >
            About {stock.fundamentals.companyName}
          </Typography>
        </Box>

        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography color="text.secondary" sx={{ fontSize: ".9rem" }}>
              Sector
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography color="text.primary" sx={{ fontSize: "1rem" }}>
                {stock.fundamentals.sector}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography color="text.secondary" sx={{ fontSize: ".9rem" }}>
              Listing Year
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography color="text.primary" sx={{ fontSize: "1rem" }}>
                {stock.fundamentals.listingYear}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography color="text.secondary" sx={{ fontSize: ".9rem" }}>
              E-Mail
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{ fontSize: "1rem", fontWeight: 500 }}
              >
                {stock.fundamentals.address.email}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography color="text.secondary" sx={{ fontSize: ".9rem" }}>
              Website
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                component={Link}
                href={stock.fundamentals.address.website}
                color="text.primary"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  textDecoration: "underline",
                  color: "primary.main",
                }}
                target="_blank"
              >
                {stock.fundamentals.address.website}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: ".9rem",
              textAlign: { xs: "left", sm: "justify" },
            }}
          >
            {stock.fundamentals.about}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
