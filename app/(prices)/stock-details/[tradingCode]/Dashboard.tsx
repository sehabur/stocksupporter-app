"use client";
import React from "react";

import CandlestickChart from "@/components/charts/CandlestickChart";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Stack,
  Tab,
  Tabs,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import TabView from "./TabView";
import { DateTime } from "luxon";
import { grey } from "@mui/material/colors";
import Link from "next/link";

import { redirect, useParams, useRouter } from "next/navigation";

import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";

import Trades from "./_component/Trades";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";
import AlertButton from "@/components/buttons/AlertButton";

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
  let price, time;
  if (latest.isNullDataAtDse === "YES") {
    price = latest.ycp;
    time = DateTime.fromISO(latest.date)
      .minus({ days: 1 })
      .toFormat("dd MMM, 14:30");
  } else {
    price = latest.ltp;
    time = DateTime.fromISO(latest.time)
      // .plus({ hours: 6 })
      .toFormat("dd MMM, HH:mm");
  }
  return {
    price: price.toFixed(2),
    time: "Last update " + time,
  };
};

const getTextColor = (change: number) => {
  if (!change) return "primary.main";

  return change === 0
    ? "primary.main"
    : change < 0
    ? "error.main"
    : "success.main";
};

const stockInitState = {
  latest: null,
  lastDay: null,
  fundamentals: null,
  minute: [],
  daily: [],
  weekly: [],
  monthly: [],
  marketOpenStatus: "Closed",
  haltStatus: "none",
};

export default function Dashboard({ tradingCode }: any) {
  const dispatch = useDispatch();

  const router = useRouter();

  dispatch(pageTitleActions.setPageTitle(tradingCode));

  const [stock, setstock] = React.useState<any>(stockInitState);

  const [isLoading, setisLoading] = React.useState<boolean>(false);

  const [fetched, setfetched] = React.useState<boolean>(false);

  const latestPriceData = getLatestPrice(stock.latest);

  const textColor = getTextColor(stock.latest?.change);

  async function getStockDetails() {
    try {
      setisLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/stock/${tradingCode}`,
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
      setstock(initdata);
      setfetched(true);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  React.useEffect(() => {
    getStockDetails();
  }, []);

  const handleButtonClick = (href: string, title: string) => {
    router.push(href);
    // dispatch(pageTitleActions.setPageTitle(title));
  };

  return (
    <Box>
      <LoadingSpinner open={isLoading} />
      {fetched && (
        <Box>
          <Box sx={{ py: { xs: 2, sm: 4 } }}>
            <Box
              sx={{
                maxWidth: 500,
                mx: "auto",
                px: 2,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: { xs: "flex-start", sm: "space-around" },
              }}
            >
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    color: "text.primary",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                  }}
                >
                  {stock.fundamentals?.companyName}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {/* <Chip
                    label={stock.fundamentals?.tradingCode}
                    variant="outlined"
                    sx={{
                      borderRadius: 1,
                      fontSize: "1rem",
                      mt: 1,
                    }}
                  /> */}
                  <Chip
                    label={`Category ${stock.fundamentals?.category}`}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      mr: 1,
                      fontSize: ".875rem",
                      mt: 1,
                    }}
                  />
                  <Chip
                    size="small"
                    label={stock.fundamentals?.sector}
                    sx={{
                      borderRadius: 1,
                      fontSize: ".875rem",
                      mt: 1,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    mt: 1.5,
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.primary",
                      fontSize: "2rem",
                      fontWeight: 700,
                      fontFamily: "'Nunito Sans', sans-serif",
                    }}
                  >
                    {latestPriceData.price}
                  </Typography>

                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "1rem",
                      ml: 0.6,
                      mr: 2,
                      mt: 1,
                    }}
                  >
                    BDT
                  </Typography>

                  <Typography
                    sx={{
                      color: textColor,
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      fontFamily: "'Nunito Sans', sans-serif",
                      mr: 2,
                    }}
                  >
                    {addPlusSign(stock.latest?.change)}
                  </Typography>

                  <Typography
                    sx={{
                      color: textColor,
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      fontFamily: "'Nunito Sans', sans-serif",
                      mr: 2,
                    }}
                  >
                    {stock.latest?.change !== 0
                      ? addPlusSign(stock.latest?.percentChange)
                      : 0}
                    {"%"}
                  </Typography>

                  {stock.haltStatus && stock.haltStatus != "none" && (
                    <Chip
                      label="Halt"
                      size="small"
                      variant="outlined"
                      color={stock.haltStatus == "buy" ? "success" : "error"}
                      sx={{
                        borderRadius: 6,
                        fontSize: ".875rem",
                        mr: 1.5,
                      }}
                    />
                  )}

                  <Tooltip
                    title={`Market is ${stock.marketOpenStatus.toLowerCase()} now`}
                    enterTouchDelay={10}
                    arrow
                  >
                    <Chip
                      label={stock.marketOpenStatus}
                      variant="outlined"
                      size="small"
                      icon={
                        stock.marketOpenStatus == "Open" ? (
                          <RadioButtonCheckedRoundedIcon color="success" />
                        ) : stock.marketOpenStatus == "Closed" ? (
                          <DoDisturbOnRoundedIcon color="error" />
                        ) : (
                          <DoDisturbOnRoundedIcon color="warning" />
                        )
                      }
                      sx={{ fontSize: ".875rem", px: 0.3, mr: 1.5 }}
                    />
                  </Tooltip>

                  <Box>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: "1rem",
                      }}
                    >
                      {latestPriceData.time}
                    </Typography>
                  </Box>
                </Box>

                <Trades
                  data={stock.minute}
                  tradingCode={stock.fundamentals?.tradingCode}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1.5 }}>
                <FavoriteButton
                  tradingCode={stock.fundamentals?.tradingCode}
                  variant="detailed"
                />
                <AlertButton
                  tradingCode={stock.fundamentals?.tradingCode}
                  variant="detailed"
                />
                <Button
                  onClick={() => {
                    handleButtonClick(
                      `/supercharts?symbol=${stock.fundamentals.tradingCode}`,
                      `${stock.fundamentals.tradingCode} Supercharts`
                    );
                  }}
                  sx={{ borderRadius: 2, py: 1.05 }}
                  variant="contained"
                >
                  See on Supercharts
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <TabView stock={stock} tradingCode={tradingCode} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
