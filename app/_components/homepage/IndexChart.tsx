"use client";
import * as React from "react";

import Link from "next/link";
import AreaChart from "@/components/charts/AreaChart";
import { DateTime } from "luxon";

import {
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import Tooltip from "@mui/material/Tooltip";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

// const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
//   [`& .${toggleButtonGroupClasses.grouped}`]: {
//     marginRight: "24px",
//     border: 0,
//     borderRadius: 3,
//   },
// }));
// const StyledToggleButton = styled(ToggleButton)(({ theme }: any) => ({
//   "&.MuiToggleButtonGroup-grouped": {
//     borderRadius: "24px !important",
//     marginRight: "16px",
//     paddingLeft: "20px",
//     paddingTop: "2px",
//     paddingBottom: "2px",
//     paddingRight: "20px",
//     "&.Mui-selected": {
//       color: grey[50],
//       backgroundColor: theme.palette.toggleButtonBgColor,
//     },
//   },
//   color: theme.palette.text.primary,
//   backgroundColor: theme.palette.financeCardTitlecolor,
//   fontSize: ".9rem",
//   textTransform: "none",
// }));
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  // [`& .${toggleButtonGroupClasses.grouped}`]: {
  //   marginRight: "24px",
  //   border: 0,
  //   borderRadius: 3,
  // },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }: any) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    border: `1px solid lightgrey !important`,
    marginRight: "16px",
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingTop: "2px",
    paddingBottom: "2px",
    "&.Mui-selected": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  color: theme.palette.text.primary,
  fontSize: ".9rem",
}));

const dseMap = [
  {
    tag: "dsex",
    title: "DSEX",
    tradingCode: "00DSEX",
  },
  {
    tag: "dses",
    title: "DSES",
    tradingCode: "00DSES",
  },
  {
    tag: "dse30",
    title: "DS30",
    tradingCode: "00DS30",
  },
];

const formatChartData = (data: any) => {
  let dsex = [];
  let dses = [];
  let dse30 = [];

  for (let item of data) {
    const plotTime = DateTime.fromISO(item.time)
      .plus({ hours: 6 })
      .toUnixInteger();

    item.dsex.index !== 0 &&
      dsex.push({
        time: plotTime,
        value: item.dsex.index,
      });
    item.dses.index !== 0 &&
      dses.push({
        time: plotTime,
        value: item.dses.index,
      });
    item.dse30.index !== 0 &&
      dse30.push({
        time: plotTime,
        value: item.dse30.index,
      });
  }
  return { dsex, dses, dse30 };
};

export default function IndexChart({ indexData, handleButtonClick }: any) {
  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [alignment, setAlignment] = React.useState("dsex");

  const [currentIndex, setCurrentIndex] = React.useState({
    tag: "dsex",
    title: "DSEX",
    tradingCode: "00DSEX",
  });

  const chartColor =
    indexData?.latest[alignment].change === 0
      ? "#5381ff"
      : indexData?.latest[alignment].change < 0
      ? "#f45e6a"
      : "#00A25B";

  const textColor =
    indexData?.latest[alignment].change === 0
      ? "#2962ff"
      : indexData?.latest[alignment].change < 0
      ? "#f23645"
      : "#00A25B";

  const changeLabel = () => {
    const data = indexData?.latest[alignment].change.toFixed(2);
    const sign = data > 0 ? "+" : "";
    return sign + data;
  };

  const percenChangeLabel = () => {
    const data = indexData?.latest[alignment].percentChange.toFixed(2);
    const sign = data > 0 ? "+" : "";
    return sign + data + "%";
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      const current: any = dseMap.find(
        (item: any) => item.tag === newAlignment
      );
      setCurrentIndex(current);
    }
  };

  const chartData: any = formatChartData(indexData.minute);

  return (
    <Box sx={{ px: 2, py: 1 }}>
      <Box>
        <Button
          onClick={() => {
            handleButtonClick(
              `/index-details/${currentIndex.tradingCode}`,
              `${currentIndex.title} Details`
            );
          }}
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          sx={{
            fontSize: "1.3rem",
            fontWeight: 700,
            ":hover": {
              bgcolor: "transparent",
              color: "primary.main",
              textDecoration: "underline",
            },
            ml: -0.8,
          }}
        >
          {currentIndex.title} Index
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          {dseMap.map((item) => (
            <StyledToggleButton value={item.tag} key={item.tag} sx={{ px: 2 }}>
              {item.title}
            </StyledToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </Box>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "appCardBgColor",
          px: 2,
          pb: 1.5,
          pt: 1,
          borderRadius: 2,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
          <Typography
            sx={{
              fontSize: "1.8rem",
              color: "text,primary",
              fontWeight: 700,
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            {indexData?.latest[alignment].index.toFixed(2)}
          </Typography>
          <Typography
            sx={{
              color: textColor,
              fontSize: "1.2rem",
              fontWeight: 700,
              ml: 3,
              mr: 2,
              mt: 0.3,
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            {changeLabel()}
          </Typography>
          <Typography
            sx={{
              color: textColor,
              fontSize: "1.2rem",
              fontWeight: 700,
              mt: 0.3,
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            {percenChangeLabel()}
          </Typography>
          {/* <Chip
            label={changeLabel()}
            size="small"
            sx={{
              borderRadius: 1,
              ml: 2,
              mr: 1.5,
              py: 1.8,
              fontSize: "1rem",
              fontWeight: 700,
              color: textColor,
            }}
          />
          <Chip
            label={percenChangeLabel()}
            size="small"
            sx={{
              borderRadius: 1,
              py: 1.8,
              fontSize: "1rem",
              fontWeight: 700,
              color: textColor,
            }}
          /> */}
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
          <Box
            sx={{
              display: { xs: "flex", sm: "block" },
              alignItems: "baseline",
              mr: 2,
            }}
          >
            <Typography color="text.primary" sx={{ ml: 0.5 }}>
              Last update{" "}
              {DateTime.fromISO(indexData.latest.time).toFormat(
                "dd MMM, HH:mm"
              )}
            </Typography>
          </Box>
          <Tooltip
            title={`Market is ${indexData.marketOpenStatus.toLowerCase()} now`}
            enterTouchDelay={10}
            arrow
          >
            <Chip
              label={indexData.marketOpenStatus}
              variant="outlined"
              size="small"
              icon={
                indexData.marketOpenStatus == "Open" ? (
                  <RadioButtonCheckedRoundedIcon color="success" />
                ) : indexData.marketOpenStatus == "Closed" ? (
                  <DoDisturbOnRoundedIcon color="error" />
                ) : (
                  <DoDisturbOnRoundedIcon color="warning" />
                )
              }
            />
          </Tooltip>
        </Stack>
        <Divider light sx={{ mt: 1.5, mb: 1.5 }} />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography color="text.primary" sx={{ fontSize: ".8rem" }}>
              VOLUME
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                {(indexData?.latest.totalVolume / 10000000)?.toFixed(2)}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.5, fontSize: ".8rem" }}
              >
                Crore
              </Typography>
            </Stack>
          </Box>
          <Divider orientation="vertical" flexItem variant="middle" />
          <Box>
            <Typography color="text.primary" sx={{ fontSize: ".8rem" }}>
              VALUE
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                {(indexData?.latest.totalValue / 10)?.toFixed(2)}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ ml: 0.5, fontSize: ".8rem" }}
              >
                Crore
              </Typography>
            </Stack>
          </Box>
          <Divider orientation="vertical" flexItem variant="middle" />
          <Box>
            <Typography color="text.primary" sx={{ fontSize: ".8rem" }}>
              TRADE
            </Typography>
            <Stack direction="row" alignItems="baseline">
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                {indexData?.latest.totalTrade?.toFixed(0)}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mt: 2 }}>
        <AreaChart
          data={chartData[alignment]}
          color={chartColor}
          height={280}
          chartWidthValue={645}
        />
      </Box>
    </Box>
  );
}
