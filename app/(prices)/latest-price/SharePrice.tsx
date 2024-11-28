"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Virtuoso } from "react-virtuoso";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { sectorList } from "@/data/dse";
import MobileViewPriceCard from "@/components/cards/MobileViewPriceCard";
import { pageTitleActions } from "_store";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "6px !important",
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

// const INIT_ITEM_TO_DISPLAY = 25;

export default function SharePrice() {
  const router = useRouter();

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("All shares"));

  const searchParams = useSearchParams();

  const sector: any = searchParams.get("sector");

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const initSharelist = latestPrice.filter((item: any) => item.type == "stock");

  const [listHeight, setListHeight] = useState(0);

  // const [isScroll, setisScroll] = useState(false);

  const [shares, setShares] = useState<any>(initSharelist);

  const [alignment, setAlignment] = useState(sector || "all");

  const [isLoading, setisLoading] = useState<boolean>(false);

  const buttonRefs: any = useRef([]);

  const scrollToButton = () => {
    if (buttonRefs.current[sector]) {
      buttonRefs.current[sector].scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
    }
  };

  // const handleScroll = () => {
  //   const currentScrollPos = window.scrollY;
  //   if (currentScrollPos > 0) {
  //     setisScroll(true);
  //   } else {
  //     setisScroll(false);
  //   }
  // };

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

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newvalue: string
  ) => {
    setAlignment(newvalue);
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    const calculateHeight = () => {
      // const headerHeight = document.getElementById("header")?.offsetHeight || 0;
      // const footerHeight = document.getElementById("footer")?.offsetHeight || 0;
      setListHeight(window.innerHeight - 173);
    };
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  useEffect(() => {
    scrollToButton();
  }, []);

  useEffect(() => {
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

      {/* {shares
        ?.slice(0, INIT_ITEM_TO_DISPLAY)
        .map((item: any, index: number) => (
          <Box key={index}>
            <MobileViewPriceCard item={item} />
          </Box>
        ))}

      {isScroll &&
        shares?.slice(INIT_ITEM_TO_DISPLAY).map((item: any, index: number) => (
          <Box key={index}>
            <MobileViewPriceCard item={item} />
          </Box>
        ))} */}

      <div
        id="virtual-list"
        style={{ height: `${listHeight}px`, overflow: "hidden" }}
      >
        <Virtuoso
          style={{ height: "100%" }}
          // totalCount={200}
          // useWindowScroll
          data={shares}
          itemContent={(_, item) => <MobileViewPriceCard item={item} />}
        />
      </div>
    </Box>
  );
}
