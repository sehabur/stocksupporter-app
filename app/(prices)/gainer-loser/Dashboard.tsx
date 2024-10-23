"use client";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import MobileViewPriceCard from "@/components/cards/MobileViewPriceCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

import { pageTitleActions } from "_store";

const typeList = [
  {
    value: "gainer",
    title: "Gainer",
  },
  {
    value: "loser",
    title: "Loser",
  },
  {
    value: "volume",
    title: "Volume",
  },
  {
    value: "value",
    title: "Value",
  },
  {
    value: "trade",
    title: "Trade",
  },
];

const variantList = [
  {
    value: "day",
    title: "Day",
    titleSmall: "1D",
  },
  {
    value: "oneWeek",
    title: "Week",
    titleSmall: "1W",
  },
  {
    value: "oneMonth",
    title: "Month",
    titleSmall: "1M",
  },
  {
    value: "sixMonth",
    title: "6 Months",
    titleSmall: "6M",
  },
  {
    value: "oneYear",
    title: "Year",
    titleSmall: "1Y",
  },
  {
    value: "fiveYear",
    title: "5 Years",
    titleSmall: "5Y",
  },
];

const StyledMainToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    marginRight: "8px",
    marginLeft: "8px",
  },
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
  },
}));

const StyledMainToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "4px !important",
    marginRight: "10px",
    border: `1px solid lightgray !important`,
    paddingLeft: "8px",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingRight: "8px",
    "&.Mui-selected": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  color: theme.palette.text.primary,
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "5px !important",
    marginRight: "12px",
    border: `1px solid #2962ff !important`,
    paddingLeft: "12px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "12px",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.primary.main,
    },
  },
  color: theme.palette.primary.main,
}));

export default function Dashboard() {
  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("Top shares"));

  const router = useRouter();

  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const variant = searchParams.get("variant");

  const allGainerLoser = useSelector((state: any) => state.allGainerLoser);

  const [data, setdata] = React.useState<any>([]);

  const [initdata, setinitdata] = React.useState<any>([]);

  const [isScroll, setisScroll] = React.useState(false);

  const [typeAlignment, setTypeAlignment] = React.useState<any>(type);

  const [variantAlignment, setVariantAlignment] = React.useState<any>(variant);

  React.useEffect(() => {
    setinitdata(allGainerLoser?.data);
  }, [allGainerLoser]);

  React.useEffect(() => {
    let newData = initdata.map((item: any) => ({
      id: item._id,
      tradingCode: item.tradingCode,
      type: item.type,
      close: item.close,
      sector: item.sector,
      category: item.category,
      haltStatus: item.haltStatus,
      recordDate: item.recordDate,
      change: item[variantAlignment].change,
      percentChange: item[variantAlignment].percentChange,
      volume: item[variantAlignment].volume,
      value: item[variantAlignment].value,
      trade: item[variantAlignment].trade,
    }));

    if (typeAlignment == "gainer") {
      newData.sort((a: any, b: any) => b.percentChange - a.percentChange);
    } else if (typeAlignment == "loser") {
      newData.sort((a: any, b: any) => a.percentChange - b.percentChange);
    } else {
      newData.sort((a: any, b: any) => b[typeAlignment] - a[typeAlignment]);
    }
    setdata(newData);

    router.push(`?type=${typeAlignment}&variant=${variantAlignment}`);
  }, [initdata, typeAlignment, variantAlignment]);

  const handleTypeAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setTypeAlignment(newAlignment);
    }
  };

  const handleVariantAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setVariantAlignment(newAlignment);
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

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box sx={{ py: 0 }}>
      <LoadingSpinner open={!allGainerLoser?.dataFetched} />
      <Box
        sx={{
          pt: 1.5,
          pb: 0.5,
          px: 2,
          // position: "fixed",
          // top: 55,
          // left: 0,
          // right: 0,
          // zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1.3,
          }}
        >
          <StyledMainToggleButtonGroup
            size="small"
            value={typeAlignment}
            exclusive
            onChange={handleTypeAlignmentChange}
          >
            {typeList.map((item: any) => (
              <StyledMainToggleButton
                key={item.value}
                value={item.value}
                sx={{ px: { xs: 1.2, sm: 3 } }}
              >
                {item.title}
              </StyledMainToggleButton>
            ))}
          </StyledMainToggleButtonGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <StyledToggleButtonGroup
            size="small"
            value={variantAlignment}
            exclusive
            onChange={handleVariantAlignmentChange}
          >
            {variantList.map((item) => (
              <StyledToggleButton
                value={item.value}
                key={item.value}
                sx={{ px: { xs: 1.5, sm: 2.5 } }}
              >
                {item.titleSmall}
              </StyledToggleButton>
            ))}
          </StyledToggleButtonGroup>
        </Box>
      </Box>
      {/* <Box sx={{ height: 90 }}></Box> */}
      <Box sx={{ px: 1, pt: 0.1, pb: 2, bgcolor: "secondaryBackground" }}>
        {data &&
          data
            .slice(0, 25)
            .map((item: any, index: number) => (
              <MobileViewPriceCard item={item} key={index} />
            ))}

        {isScroll &&
          data
            .slice(25)
            .map((item: any, index: number) => (
              <MobileViewPriceCard item={item} key={index} />
            ))}
      </Box>
    </Box>
  );
}
