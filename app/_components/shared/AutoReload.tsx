"use client";
import React from "react";

import {
  AUTO_RELOAD_TIME_MS,
  MARKET_CLOSE_HOUR,
  MARKET_CLOSE_MINUTE,
  MARKET_OPEN_HOUR,
  MARKET_OPEN_MINUTE,
} from "@/data/constants";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const getMarketOpenStatusByTime = async () => {
  const now = new Date();
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();

  const currentTimeInMinutes = hours * 60 + minutes;

  const startTimeInMinutes = MARKET_OPEN_HOUR * 60 + MARKET_OPEN_MINUTE;
  const endTimeInMinutes = MARKET_CLOSE_HOUR * 60 + MARKET_CLOSE_MINUTE;

  return (
    currentTimeInMinutes >= startTimeInMinutes &&
    currentTimeInMinutes <= endTimeInMinutes
  );
};

export default function ({ enable = true }: { enable?: boolean }) {
  const router = useRouter();

  const indexInfo = useSelector((state: any) => state.indexInfo);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const isMarketOpenByTime = await getMarketOpenStatusByTime();
      const isMarketClosedFromIndexInfo =
        indexInfo?.marketOpenStatus === "Closed";

      if (enable && isMarketOpenByTime && !isMarketClosedFromIndexInfo) {
        const { pathname, search } = window.location;
        router.push(
          `/reload?redirect=${encodeURIComponent(pathname + search)}`
        );
      }
    }, AUTO_RELOAD_TIME_MS);

    return () => {
      clearInterval(interval);
    };
  }, [indexInfo]);

  return <></>;
}
