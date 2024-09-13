"use client";
import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";

import MobileViewPriceCard from "@/components/cards/MobileViewPriceCard";

import { styled } from "@mui/material/styles";

import { sectorList } from "@/data/dse";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { grey } from "@mui/material/colors";
import { pageTitleActions } from "_store";
import { AUTO_RELOAD_TIME_MS } from "@/data/constants";

// const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
//   [`& .${toggleButtonGroupClasses.grouped}`]: {
//     border: 0,
//   },
// }));
// const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
//   "&.MuiToggleButtonGroup-grouped": {
//     borderRadius: "24px !important",
//     border: `1px solid lightgrey !important`,
//     marginRight: "8px",
//     paddingLeft: "12px",
//     paddingTop: "3px",
//     paddingBottom: "3px",
//     paddingRight: "12px",
//     whiteSpace: "nowrap",
//     "&.Mui-selected": {
//       color: grey[50],
//       backgroundColor: theme.palette.primary.main,
//     },
//   },
//   color: theme.palette.text.primary,
//   backgroundColor: theme.palette.divider,
//   textTransform: "none",
// }));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    marginRight: "8px",
    border: `1px solid lightgrey !important`,
    paddingLeft: "10px",
    paddingTop: "3px",
    paddingBottom: "3px",
    paddingRight: "10px",
    whiteSpace: "nowrap",
    "&.Mui-selected": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  color: theme.palette.text.primary,
  textTransform: "none",
}));

export default function SharePrice() {
  const router = useRouter();

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("All shares"));

  const searchParams = useSearchParams();

  const sector: any = searchParams.get("sector");

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const initSharelist = latestPrice.filter((item: any) => item.type == "stock");

  const [isScroll, setisScroll] = React.useState(false);

  const [shares, setShares] = React.useState<any>(initSharelist);

  const [alignment, setAlignment] = React.useState(sector || "all");

  const [isLoading, setisLoading] = React.useState<boolean>(false);

  const buttonRefs: any = React.useRef([]);

  const scrollToButton = () => {
    if (buttonRefs.current[sector]) {
      buttonRefs.current[sector].scrollIntoView({
        behavior: "auto", // Smooth scrolling
        block: "center", // Align to the center of the scrollable container
        inline: "center",
      });
    }
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > 0) {
      setisScroll(true);
    } else {
      setisScroll(false);
    }
  };

  const filterShares = (sector: string) => {
    if (!shares) return [];

    setisLoading(true);
    let shareData = [];
    if (sector !== "all") {
      shareData = latestPrice.filter(
        (share: any) =>
          share.type !== "index" &&
          share?.sector?.split(" ")[0].toLowerCase() === sector
      );
    } else {
      shareData = latestPrice.filter((item: any) => item.type == "stock");
    }
    router.push(`?sector=${alignment}`);

    setisLoading(false);
    return shareData;
  };

  // console.log(shares);

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newvalue: string
  ) => {
    setAlignment(newvalue);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    scrollToButton();
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

  React.useEffect(() => {
    setShares(filterShares(alignment));
  }, [latestPrice, alignment]);

  return (
    <Box>
      <LoadingSpinner open={isLoading} />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            position: "fixed",
            top: 55,
            left: 0,
            right: 0,
            pb: 1,
            pt: 1.2,
            px: 1.8,
            zIndex: 1,
            bgcolor: "background.default",
          }}
        >
          <StyledToggleButtonGroup
            size="small"
            value={alignment}
            exclusive
            onChange={handleAlignmentChange}
            aria-label="Platform"
            sx={{
              display: "flex",
              overflowX: "auto",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            <StyledToggleButton value="all" sx={{ minWidth: 48 }}>
              All
            </StyledToggleButton>
            {sectorList.map((item: any, index: number) => (
              <StyledToggleButton
                value={item.tag}
                key={index}
                ref={(el) => (buttonRefs.current[item.tag] = el)}
              >
                {item.name}
              </StyledToggleButton>
            ))}
          </StyledToggleButtonGroup>
        </Box>
        <Box sx={{ height: 30 }}></Box>
      </Box>

      {shares?.slice(0, 25).map((item: any, index: number) => (
        <Box key={index}>
          <MobileViewPriceCard item={item} />
        </Box>
      ))}
      {isScroll &&
        shares?.slice(25).map((item: any, index: number) => (
          <Box key={index}>
            <MobileViewPriceCard item={item} />
          </Box>
        ))}
    </Box>
  );
}
