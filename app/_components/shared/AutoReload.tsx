"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { AUTO_RELOAD_TIME_MS } from "@/data/constants";

import { getIsMarketOpen } from "_helper";

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
