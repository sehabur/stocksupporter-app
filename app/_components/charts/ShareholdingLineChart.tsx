"use client";
import React, { Component } from "react";
import { Box, Grid, useTheme, Typography, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function ShareholdingLineChart(props: any) {
  const { data, categories, lineColors } = props;

  const theme: any = useTheme();

  const chartOptions: {} = {
    colors: lineColors,
    chart: {
      type: "line",
      foreColor: theme.palette.text.primary,
      fontFamily: "'DM Sans', sans-serif",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
        tools: {
          download: false,
        },
      },
    },
    markers: {
      size: 5,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: any) => {
          return Number.isInteger(value) ? value : value.toFixed(2);
        },
      },
    },
    stroke: {
      show: true,
      width: 4,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (
          value: any,
          { series, seriesIndex, dataPointIndex, w }: any
        ) => {
          let change;
          if (dataPointIndex == 0) {
            change = 0;
          } else {
            change = Number(
              (value - series[seriesIndex][dataPointIndex - 1]).toFixed(2)
            );
            if (change > 0) change = "+" + change;
          }
          return value + "% (" + change + "%)";
        },
      },
    },
    grid: {
      borderColor: theme.palette.chartGridColor,
    },
    legend: {
      itemMargin: {
        horizontal: 15,
        vertical: 5,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={data}
        type="line"
        height={200}
      />
    </div>
  );
}
