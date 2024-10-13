"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { AUTO_RELOAD_TIME_MS } from "@/data/constants";

// const getMarketOpenStatusByTime = async () => {
//   const now = new Date();
//   const hours = now.getUTCHours();
//   const minutes = now.getUTCMinutes();

//   const currentTimeInMinutes = hours * 60 + minutes;

//   const startTimeInMinutes = MARKET_OPEN_HOUR * 60 + MARKET_OPEN_MINUTE;
//   const endTimeInMinutes = MARKET_CLOSE_HOUR * 60 + MARKET_CLOSE_MINUTE;

//   return (
//     currentTimeInMinutes >= startTimeInMinutes &&
//     currentTimeInMinutes <= endTimeInMinutes
//   );
// };

const getIsMarketOpen = (status: any) => {
  const { dataInsertionEnable, openHour, openMinute, closeHour, closeMinute } =
    status;

  const now = new Date();
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();

  const currentTimeInMinutes = hours * 60 + minutes;
  const startTimeInMinutes = openHour * 60 + openMinute;
  const endTimeInMinutes = closeHour * 60 + closeMinute;

  return (
    dataInsertionEnable == 1 &&
    currentTimeInMinutes >= startTimeInMinutes &&
    currentTimeInMinutes <= endTimeInMinutes
  );
};

export default function ({ enable = true }: { enable?: boolean }) {
  const router = useRouter();

  const marketOpenStatus = useSelector((state: any) => state.marketOpenStatus);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const isMarketOpen = getIsMarketOpen(marketOpenStatus);

      if (enable && isMarketOpen) {
        const { pathname, search } = window.location;
        router.push(
          `/reload?redirect=${encodeURIComponent(pathname + search)}`
        );
      }
    }, AUTO_RELOAD_TIME_MS);

    return () => {
      clearInterval(interval);
    };
  }, [marketOpenStatus]);

  return <></>;
}
