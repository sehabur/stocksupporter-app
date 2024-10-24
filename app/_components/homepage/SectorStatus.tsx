"use client";
import React from "react";

import { Paper, Typography } from "@mui/material";

import HorizontalStackedBarChartValue from "@/components/charts/HorizontalStackedBarChartValue";
import HorizontalStackedBarChartGain from "@/components/charts/HorizontalStackedBarChartGain";

const formatSectorTrendData = (sectorData: any) => {
  let categories = [];
  let uptrend = [];
  let downtrend = [];
  let neutral = [];

  for (let item of sectorData) {
    categories.push(item.sector);
    uptrend.push(item.uptrend);
    downtrend.push(item.downtrend);
    neutral.push(item.neutral);
  }
  return {
    categories,
    series: [
      {
        name: "Uptrend",
        data: uptrend,
      },
      {
        name: "Neutral",
        data: neutral,
      },
      {
        name: "Downtrend",
        data: downtrend,
      },
    ],
  };
};

const formatSectorValueData = (initSectorData: any) => {
  const sectorData = [...initSectorData].sort(
    (a: { valueTotal: number }, b: { valueTotal: number }) =>
      b.valueTotal - a.valueTotal
  );

  let categories = [];
  // let valueTotal = [];
  let valueCatA = [];
  let valueCatB = [];
  let valueCatN = [];
  let valueCatZ = [];

  for (let item of sectorData) {
    categories.push(item.sector);
    // valueTotal.push((item.valueTotal / 10).toFixed(2));
    valueCatA.push((item.valueCategoryA / 10).toFixed(2));
    valueCatB.push((item.valueCategoryB / 10).toFixed(2));
    valueCatN.push((item.valueCategoryN / 10).toFixed(2));
    valueCatZ.push((item.valueCategoryZ / 10).toFixed(2));
  }

  return {
    categories,
    series: [
      {
        name: "A",
        data: valueCatA,
      },
      {
        name: "B",
        data: valueCatB,
      },
      {
        name: "N",
        data: valueCatN,
      },
      {
        name: "Z",
        data: valueCatZ,
      },
    ],
  };
};

export default function SectorStatus(props: any) {
  const { sectorData } = props;

  const formattedSectorTrendData = formatSectorTrendData(sectorData);
  const formattedSectorValueData = formatSectorValueData(sectorData);

  return (
    <>
      <Paper elevation={0} sx={{ bgcolor: "background.default", px: 1, pt: 2 }}>
        <Typography
          color="text.primary"
          sx={{ fontSize: "1.5rem", mb: 2, textAlign: "center" }}
        >
          Top sector by gain
        </Typography>
        <HorizontalStackedBarChartGain
          data={formattedSectorTrendData}
          colors={["#24b29b", "#448aff", "#ff4081"]}
        />
      </Paper>

      <Paper elevation={0} sx={{ bgcolor: "background.default", px: 1, pt: 1 }}>
        <Typography
          color="text.primary"
          sx={{ fontSize: "1.5rem", mb: 2, textAlign: "center" }}
        >
          Top sector by value
        </Typography>
        <HorizontalStackedBarChartValue
          data={formattedSectorValueData}
          colors={["#4dd0e1", "#b388ff", "#f57f17", "#fbc02d"]}
        />
      </Paper>
    </>
  );
}
