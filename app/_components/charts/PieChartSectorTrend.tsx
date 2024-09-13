"use client";
import { useTheme, useMediaQuery } from "@mui/material";

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PieChartSectorTrend(props: any) {
  const { data, colors, labels, height, width, donutSize } = props;

  const theme = useTheme();

  const chartOptions: {} = {
    chart: {
      type: "donut",
      foreColor: theme.palette.text.primary,
      fontFamily: "'DM Sans', sans-serif",
    },
    plotOptions: {
      pie: {
        donut: {
          size: donutSize,
        },
      },
    },
    stroke: {
      show: false,
    },
    colors: colors,
    labels: labels,
    legend: {
      itemMargin: {
        vertical: 6,
      },
      position: "right",
    },
  };

  return (
    <div id="chart-container">
      <ReactApexChart
        options={chartOptions}
        series={data}
        type="donut"
        height={height}
        width={width}
      />
    </div>
  );
}
