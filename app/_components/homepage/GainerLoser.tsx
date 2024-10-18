"use client";
import {
  Box,
  Grid,
  useTheme,
  Typography,
  Paper,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useState } from "react";

import { styled } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";

import SeeMoreButton from "../buttons/SeeMoreButton";
import MobileViewPriceCard from "../cards/MobileViewPriceCard";

const dataFormatter = (inputdata: any) => {
  const data = inputdata.slice(0, 6);
  return data;
};

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
  // fontSize: ".9rem",
  // textTransform: "none",
}));

export default function GainerLoser({ data, handleButtonClick }: any) {
  const theme = useTheme();

  const matchesSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [alignmentGainer, setAlignmentGainer] = useState("gainer");
  const [alignmentLoser, setAlignmentLoser] = useState("loser");

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

  return (
    <Box sx={{ bgcolor: "secondaryBackground", py: 2 }}>
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
              <StyledToggleButton value="topVolume" sx={{ px: 2 }}>
                Volume
              </StyledToggleButton>
              <StyledToggleButton value="topValue" sx={{ px: 2 }}>
                Value
              </StyledToggleButton>
              <StyledToggleButton value="topTrade" sx={{ px: 2 }}>
                Trade
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </Box>
        </Box>
        <Box sx={{ px: 1.5, pt: 1.5 }}>
          {dataFormatter(data[alignmentGainer]).map((item: any) => (
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
            <StyledToggleButton value="bottomVolume" sx={{ px: 2 }}>
              Volume
            </StyledToggleButton>
            <StyledToggleButton value="bottomValue" sx={{ px: 2 }}>
              Value
            </StyledToggleButton>
            <StyledToggleButton value="bottomTrade" sx={{ px: 2 }}>
              Trade
            </StyledToggleButton>
          </StyledToggleButtonGroup>
        </Box>
      </Box>

      <Box sx={{ px: 1.5, pt: 1.5 }}>
        {dataFormatter(data[alignmentLoser]).map((item: any) => (
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
