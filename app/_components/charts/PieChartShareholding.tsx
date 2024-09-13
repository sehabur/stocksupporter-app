"use client";
import { useTheme } from "@mui/material";

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PieChartShareHolding(props: any) {
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
    dataLabels: {
      formatter: function (val: any) {
        return val.toFixed(2) + "%";
      },
    },
    colors: colors,
    labels: labels,
    legend: {
      itemMargin: {
        vertical: 5,
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
