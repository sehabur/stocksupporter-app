"use client";

import React from "react";

import SectorSummaryCard from "./sectorCard";
import { Box } from "@mui/material";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";
import { AUTO_RELOAD_TIME_MS } from "@/data/constants";
import { useRouter } from "next/navigation";

export default function Sector() {
  const router = useRouter();

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("Sectors"));

  const [data, setdata] = React.useState<any>(null);

  const [isLoading, setisLoading] = React.useState(false);

  async function getData() {
    try {
      setisLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/sectorLatestPrice`,
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
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const { pathname, search } = window.location;
      router.push(`/reload?redirect=${encodeURIComponent(pathname + search)}`);
    }, AUTO_RELOAD_TIME_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box>
      <LoadingSpinner open={isLoading} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          py: 1,
        }}
      >
        {data &&
          data.map((item: { _id: string }) => (
            <SectorSummaryCard data={item} key={item._id} />
          ))}
      </Box>
    </Box>
  );
}