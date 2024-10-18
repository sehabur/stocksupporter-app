"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import SectorChart from "./SectorChart";
import { sectorList } from "@/data/dse";

import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";
import { DateTime } from "luxon";
import FavoriteButton from "@/components/buttons/FavoriteButton";

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

const getLatestPrice = (latest: any) => {
  if (!latest) {
    return {
      price: "",
      time: "",
    };
  }
  const price = latest.close.toFixed(2);
  const time = DateTime.fromISO(latest.time)
    .plus({ hours: 6 })
    .toFormat("dd MMM, HH:mm");
  return {
    price,
    time: "Last update on " + time,
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

export default function Dashboard({ sectorTag }: any) {
  const [data, setdata] = React.useState<any>(null);

  const [fetched, setfetched] = React.useState<boolean>(false);

  const [isLoading, setisLoading] = React.useState<boolean>(false);

  const sector = sectorList.find((item: any) => item.tag === sectorTag);

  const router = useRouter();

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle(sector.name));

  const percentChangeData: any = formatPercentChangeData(
    data?.latest,
    data?.lastDay
  );

  const handleButtonClick = (href: string, title: string) => {
    router.push(href);
  };

  const latestPriceData = getLatestPrice(data?.latest);

  const textColor =
    data?.latest?.change === 0
      ? "primary.main"
      : data?.latest?.change < 0
      ? "error.main"
      : "success.main";

  async function getData() {
    try {
      setisLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/dailySectorPrice/${sectorTag}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const initdata = await res.json();
      setdata(initdata);
      setfetched(true);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <LoadingSpinner open={isLoading} />
      {fetched && (
        <Box>
          <Box
            sx={{
              maxWidth: 1200,
              mx: "auto",
              px: 2,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-start",
              bgcolor: "secondaryBackground",
              pt: 2,
              pb: 3,
              borderRadius: 0,
            }}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{
                  color: "text.primary",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                }}
              >
                {sector.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  mt: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "text.primary",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    fontFamily: "'Nunito Sans', sans-serif",
                  }}
                >
                  {latestPriceData.price}
                </Typography>

                <Typography
                  sx={{
                    color: textColor,
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    fontFamily: "'Nunito Sans', sans-serif",
                    mx: 2,
                  }}
                >
                  {addPlusSign(data.latest?.change)}
                </Typography>

                <Typography
                  sx={{
                    color: textColor,
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    fontFamily: "'Nunito Sans', sans-serif",
                    mr: 3,
                  }}
                >
                  {data.latest?.change !== 0
                    ? addPlusSign(data.latest?.percentChange)
                    : 0}
                  {"%"}
                </Typography>

                {/* <Tooltip
                  title={`Market is ${data.marketOpenStatus?.toLowerCase()} now`}
                  enterTouchDelay={10}
                  arrow
                >
                  <Chip
                    label={data.marketOpenStatus}
                    variant="outlined"
                    size="small"
                    icon={
                      data?.marketOpenStatus == "Open" ? (
                        <RadioButtonCheckedRoundedIcon color="success" />
                      ) : stock?.marketOpenStatus == "Closed" ? (
                        <DoDisturbOnRoundedIcon color="error" />
                      ) : (
                        <DoDisturbOnRoundedIcon color="warning" />
                      )
                    }
                    sx={{ fontSize: ".875rem", px: 0.3 }}
                  />
                </Tooltip> */}
              </Box>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "1rem",
                  mt: { xs: 0.8, sm: 0 },
                }}
              >
                {latestPriceData.time}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <FavoriteButton tradingCode={sector.name} />
              <Button
                component={Link}
                href={`/supercharts?symbol=${encodeURIComponent(sector.name)}`}
                sx={{ borderRadius: 2, py: 1.05 }}
                variant="contained"
              >
                See on Supercharts
              </Button>
            </Box>
          </Box>
          <Box sx={{ pt: 2, pb: 1, px: 1.5 }}>
            <SectorChart data={data} />
          </Box>

          <Box>
            <Paper
              sx={{
                mt: 3,
                mb: 4,
                pt: 1.8,
                pb: 1.5,
                mx: 1.5,
                borderRadius: 2,
                bgcolor: "appCardBgColor",
              }}
              elevation={0}
            >
              <Grid container rowGap={2}>
                {changeDays.map((item: any) => (
                  <Grid item xs={4}>
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
                          fontSize: "1.2rem",
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
          </Box>

          {/* <Box>
            <Paper
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                mx: 1.5,
                mt: 3,
                mb: 3,
                pt: 1.8,
                pb: 1.5,
                px: 2,
                borderRadius: 2,
                bgcolor: "appCardBgColor",
                rowGap: 2,
                columnGap: 6,
              }}
              elevation={0}
            >
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  Today
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: percentChangeData.today.color,
                  }}
                >
                  {percentChangeData.today.text}
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  1 Week
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: percentChangeData.oneWeek.color,
                  }}
                >
                  {percentChangeData.oneWeek.text}
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  1 Month
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: percentChangeData.oneMonth.color,
                  }}
                >
                  {percentChangeData.oneMonth.text}
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  6 Month
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: percentChangeData.sixMonth.color,
                  }}
                >
                  {percentChangeData.sixMonth.text}
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  1 Year
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: percentChangeData.oneYear.color,
                  }}
                >
                  {percentChangeData.oneYear.text}
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: ".9rem",
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                >
                  5 Year
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: percentChangeData.fiveYear.color,
                  }}
                >
                  {percentChangeData.fiveYear.text}
                </Typography>
              </Box>
            </Paper>
          </Box> */}

          <Box sx={{ px: 2, mb: 4 }}>
            <Box>
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.4rem", fontWeight: 700 }}
              >
                Key Stats
              </Typography>
            </Box>

            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              rowSpacing={2}
              sx={{ mt: 1, ml: 1 }}
            >
              <Grid item xs={4}>
                <Typography color="text.secondary" sx={{ fontSize: ".875rem" }}>
                  Open
                </Typography>
                <Stack direction="row" alignItems="baseline">
                  <Typography
                    color="text.primary"
                    sx={{
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.ycp}
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
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.high}
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
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.low}
                  </Typography>
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
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.ycp}
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
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {Math.max(
                      data?.lastDay?.oneYearHigh,
                      data.latest.close
                    )?.toFixed(2) || "--"}
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
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {Math.min(
                      data?.lastDay?.oneYearLow,
                      data.latest.close
                    )?.toFixed(2) || "--"}
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
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.volume}
                    {/* {(data.latest.volume / 10000000).toFixed(2)} */}
                  </Typography>
                  {/* <Typography
                    color="text.secondary"
                    sx={{ ml: 0.7, fontSize: ".875rem" }}
                  >
                    Crore
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
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {(data.latest.value / 10).toFixed(2)}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ ml: 0.7, fontSize: ".875rem" }}
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
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontWeight: 500,
                    }}
                  >
                    {data.latest.trade}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ px: 2, pt: 2, pb: 2 }}>
            <Typography
              sx={{ fontSize: "1.2rem", color: "text.primary", mb: 2 }}
            >
              Other Sectors
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {sectorList
                .filter((item: any) => item.tag !== sectorTag)
                .map((item: any, index: number) => (
                  <Paper
                    key={index}
                    sx={{
                      mr: 1.5,
                      mb: 1.5,
                      py: 0.6,
                      minWidth: 70,
                      // textAlign: "center",
                      // borderRadius: 2,
                      // ":hover": {
                      //   bgcolor: "secondaryBackground",
                      //   cursor: "pointer",
                      // },
                    }}
                    component={Button}
                    onClick={() => {
                      handleButtonClick(
                        `/sector/chart/${item.tag}`,
                        `${item.name} sector`
                      );
                    }}
                    variant="outlined"
                  >
                    <Typography
                      sx={{ fontSize: { xs: ".875rem", sm: "1rem" } }}
                      color="primary.main"
                    >
                      {item.name}
                    </Typography>
                  </Paper>
                ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
