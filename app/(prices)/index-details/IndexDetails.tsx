"use client";
import React from "react";

import { DateTime } from "luxon";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Box, Typography, Chip, Button, Tooltip, Divider } from "@mui/material";
import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";

import Overview from "./Overview";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import News from "./News";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";

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
    time: "Last updated on " + time,
  };
};

const indexDataInitState = {
  latest: null,
  lastDay: null,
  fundamentals: null,
  minute: [],
  daily: [],
  weekly: [],
  monthly: [],
  marketOpenStatus: "Closed",
};

export default function IndexDetails() {
  const searchParams = useSearchParams();

  const tradingCode: string = searchParams.get("tradingCode") || "";

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle(tradingCode.slice(2)));

  const [stock, setstock] = React.useState<any>(indexDataInitState);

  const [news, setnews] = React.useState<any>([]);

  const [fetched, setfetched] = React.useState<boolean>(false);

  const [isLoading, setisLoading] = React.useState(false);

  const latestPriceData = getLatestPrice(stock?.latest);

  const textColor =
    stock.latest?.change === 0
      ? "primary.main"
      : stock.latest?.change < 0
      ? "error.main"
      : "success.main";

  async function getIndexData() {
    try {
      setisLoading(true);
      const indexRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/index/${tradingCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!indexRes.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await indexRes.json();
      setstock(data);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  async function getNewsData() {
    try {
      setisLoading(true);
      const indexRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/news/EXCH?limit=25`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!indexRes.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await indexRes.json();
      setnews(data);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  async function getData() {
    await Promise.all([getIndexData(), getNewsData()]);
    setfetched(true);
  }

  React.useEffect(() => {
    getData();
  }, [tradingCode]);

  return (
    <Box>
      <LoadingSpinner open={isLoading} />

      {fetched && (
        <Box sx={{ pt: { xs: 0, sm: 2 }, pb: { xs: 2, sm: 4 } }}>
          <Box
            sx={{
              maxWidth: 1210,
              mx: "auto",
              px: { xs: 2, sm: 8 },
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: { xs: "flex-start", sm: "space-between" },
              bgcolor: "secondaryBackground",
              pt: { xs: 3, sm: 4 },
              pb: { xs: 4, sm: 4 },
              borderRadius: { xs: 0, sm: 4 },
            }}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "1.5rem", sm: "1.6rem" },
                  fontWeight: 500,
                }}
              >
                {stock.fundamentals?.companyName}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  mt: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "2.1rem", sm: "2.5rem" },
                    fontWeight: 700,
                    fontFamily: "'Nunito Sans', sans-serif",
                  }}
                >
                  {latestPriceData.price}
                </Typography>

                <Typography
                  sx={{
                    color: textColor,
                    fontSize: { xs: "1.3rem", sm: "1.5rem" },
                    fontWeight: 700,
                    fontFamily: "'Nunito Sans', sans-serif",
                    mx: 2,
                  }}
                >
                  {addPlusSign(stock.latest?.change)}
                </Typography>

                <Typography
                  sx={{
                    color: textColor,
                    fontSize: { xs: "1.3rem", sm: "1.5rem" },
                    fontWeight: 700,
                    fontFamily: "'Nunito Sans', sans-serif",
                    mr: 3,
                  }}
                >
                  {stock.latest?.change !== 0
                    ? addPlusSign(stock.latest?.percentChange)
                    : 0}
                  {"%"}
                </Typography>

                <Tooltip
                  title={`Market is ${stock.marketOpenStatus?.toLowerCase()} now`}
                  enterTouchDelay={10}
                  arrow
                >
                  <Chip
                    label={stock.marketOpenStatus}
                    variant="outlined"
                    size="small"
                    icon={
                      stock?.marketOpenStatus == "Open" ? (
                        <RadioButtonCheckedRoundedIcon color="success" />
                      ) : stock?.marketOpenStatus == "Closed" ? (
                        <DoDisturbOnRoundedIcon color="error" />
                      ) : (
                        <DoDisturbOnRoundedIcon color="warning" />
                      )
                    }
                    sx={{ fontSize: ".875rem", px: 0.3 }}
                  />
                </Tooltip>
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
              <FavoriteButton tradingCode={tradingCode} />
              <Button
                component={Link}
                href={`/supercharts?symbol=${tradingCode.slice(2)}`}
                sx={{ borderRadius: 2, py: 1.05 }}
                variant="contained"
              >
                See on Supercharts
              </Button>
            </Box>
          </Box>

          <Divider light />

          <Box>
            <Overview stock={stock} />
          </Box>

          <Box>
            <News news={news} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
