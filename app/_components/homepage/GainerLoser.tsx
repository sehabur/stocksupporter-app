"use client";
import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import Link from "next/link";

import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import SeeMoreButton from "../buttons/SeeMoreButton";
import MobileViewPriceCard from "../cards/MobileViewPriceCard";
import LoadingSpinner from "../shared/LoadingSpinner";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    borderRadius: 3,
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    marginRight: "12px",
    border: `1px solid lightgrey !important`,
    paddingLeft: "16px",
    paddingTop: "3px",
    paddingBottom: "3px",
    paddingRight: "16px",
    "&.Mui-selected": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  color: theme.palette.text.primary,
}));

export default function GainerLoser({ handleButtonClick }: any) {
  const [alignmentGainer, setAlignmentGainer] = useState("gainer");

  const [alignmentLoser, setAlignmentLoser] = useState("loser");

  const allGainerLoser = useSelector((state: any) => state.allGainerLoser);

  const [gainerData, setgainerData] = React.useState<any>([]);

  const [loserData, setloserData] = React.useState<any>([]);

  const [initdata, setinitdata] = React.useState<any>([]);

  const handleGainerChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignmentGainer(newAlignment);
    }
  };
  const handleLoserChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignmentLoser(newAlignment);
    }
  };

  useEffect(() => {
    const dataset = allGainerLoser?.data.map((item: any) => ({
      id: item._id,
      tradingCode: item.tradingCode,
      type: item.type,
      close: item.close,
      sector: item.sector,
      category: item.category,
      haltStatus: item.haltStatus,
      recordDate: item.recordDate,
      change: item.day.change,
      percentChange: item.day.percentChange,
      volume: item.day.volume,
      value: item.day.value,
      trade: item.day.trade,
    }));
    setinitdata(dataset);
  }, [allGainerLoser]);

  useEffect(() => {
    let gainerDataSet = [...initdata];
    let loserDataSet = [...initdata];

    switch (alignmentGainer) {
      case "gainer":
        gainerDataSet.sort(
          (a: any, b: any) => b.percentChange - a.percentChange
        );
        break;
      case "volume":
        gainerDataSet.sort((a: any, b: any) => b.volume - a.volume);
        break;
      case "value":
        gainerDataSet.sort((a: any, b: any) => b.value - a.value);
        break;
      case "trade":
        gainerDataSet.sort((a: any, b: any) => b.trade - a.trade);
        break;
    }

    switch (alignmentLoser) {
      case "loser":
        loserDataSet.sort(
          (a: any, b: any) => a.percentChange - b.percentChange
        );
        break;
      case "volume":
        loserDataSet.sort((a: any, b: any) => a.volume - b.volume);
        break;
      case "value":
        loserDataSet.sort((a: any, b: any) => a.value - b.value);
        break;
      case "trade":
        loserDataSet.sort((a: any, b: any) => a.trade - b.trade);
        break;
    }

    setgainerData(gainerDataSet);
    setloserData(loserDataSet);
  }, [initdata, alignmentGainer, alignmentLoser]);

  return (
    <Box sx={{ bgcolor: "secondaryBackground", py: 2 }}>
      <LoadingSpinner open={!allGainerLoser?.dataFetched} />
      <Box sx={{ mb: 2 }}>
        <Box sx={{ mx: 1 }}>
          <Button
            onClick={() => {
              handleButtonClick(`/gainer-loser?type=gainer&variant=day`);
            }}
            color="primary"
            endIcon={<ArrowForwardIosRoundedIcon />}
            sx={{
              fontSize: "1.4rem",
              fontWeight: 700,
              ":hover": {
                bgcolor: "transparent",
                color: "primary.main",
                textDecoration: "underline",
              },
              mb: 1.5,
            }}
          >
            Stock Gainer
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <StyledToggleButtonGroup
              size="small"
              value={alignmentGainer}
              exclusive
              onChange={handleGainerChange}
              aria-label="Platform"
              sx={{ mx: 1 }}
            >
              <StyledToggleButton value="gainer" sx={{ px: 2 }}>
                Gainer
              </StyledToggleButton>
              <StyledToggleButton value="volume" sx={{ px: 2 }}>
                Volume
              </StyledToggleButton>
              <StyledToggleButton value="value" sx={{ px: 2 }}>
                Value
              </StyledToggleButton>
              <StyledToggleButton value="trade" sx={{ px: 2 }}>
                Trade
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </Box>
        </Box>
        <Box sx={{ px: 1.5, pt: 1.5 }}>
          {gainerData?.slice(0, 6).map((item: any) => (
            <MobileViewPriceCard item={item} key={item.id} />
          ))}
        </Box>
        <Box sx={{ mx: 1.5 }}>
          <SeeMoreButton
            href="/gainer-loser?type=gainer&variant=day"
            title="Top shares"
          />
        </Box>
      </Box>

      <Box sx={{ mx: { xs: 1, sm: 0 } }}>
        <Button
          component={Link}
          href="/gainer-loser?type=loser&variant=day"
          color="primary"
          endIcon={<ArrowForwardIosRoundedIcon />}
          sx={{
            fontSize: "1.4rem",
            fontWeight: 700,
            ":hover": {
              bgcolor: "transparent",
              color: "primary.main",
              textDecoration: "underline",
            },
            mb: 1.5,
          }}
        >
          Stock Loser
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <StyledToggleButtonGroup
            size="small"
            value={alignmentLoser}
            exclusive
            onChange={handleLoserChange}
            aria-label="Platform"
            sx={{ mx: 1 }}
          >
            <StyledToggleButton value="loser" sx={{ px: 2 }}>
              Loser
            </StyledToggleButton>
            <StyledToggleButton value="volume" sx={{ px: 2 }}>
              Volume
            </StyledToggleButton>
            <StyledToggleButton value="value" sx={{ px: 2 }}>
              Value
            </StyledToggleButton>
            <StyledToggleButton value="trade" sx={{ px: 2 }}>
              Trade
            </StyledToggleButton>
          </StyledToggleButtonGroup>
        </Box>
      </Box>

      <Box sx={{ px: 1.5, pt: 1.5 }}>
        {loserData?.slice(0, 6).map((item: any) => (
          <MobileViewPriceCard item={item} key={item.id} />
        ))}
      </Box>

      <Box sx={{ mx: 1.5 }}>
        <SeeMoreButton
          href="/gainer-loser?type=loser&variant=day"
          title="Top shares"
        />
      </Box>
    </Box>
  );
}
