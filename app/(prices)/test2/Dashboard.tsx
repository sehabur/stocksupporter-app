"use client";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import MobileViewPriceCard from "@/components/cards/MobileViewPriceCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const variantMap = [
  {
    type: "gainer",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top gainers",
    pageSubtitle: "Stocks with a price gain against the previous day's price",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "gainer",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top gainers",
    pageSubtitle: "Stocks with a price gain against one week before price",
    datafieldName: "oneWeekPercentChange",
    columnTitle: "WEEKLY CHANGE (%)",
  },
  {
    type: "gainer",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top gainers",
    pageSubtitle: "Stocks with a price gain against one month before price",
    datafieldName: "oneMonthPercentChange",
    columnTitle: "MONTHLY CHANGE (%)",
  },
  {
    type: "gainer",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top gainers",
    pageSubtitle: "Stocks with a price gain against six months before price",
    datafieldName: "sixMonthPercentChange",
    columnTitle: "6 MONTHLY CHANGE (%)",
  },
  {
    type: "gainer",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top gainers",
    pageSubtitle: "Stocks with a price gain against one year before price",
    datafieldName: "oneYearPercentChange",
    columnTitle: "YEARLY CHANGE (%)",
  },
  {
    type: "gainer",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top gainers",
    pageSubtitle: "Stocks with a price gain against five years before price",
    datafieldName: "fiveYearPercentChange",
    columnTitle: "5 YEARLY CHANGE (%)",
  },
  {
    type: "loser",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top losers",
    pageSubtitle: "Stocks with a price lose against the previous day's price",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "loser",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top losers",
    pageSubtitle: "Stocks with a price lose against one week before price",
    datafieldName: "oneWeekPercentChange",
    columnTitle: "WEEKLY CHANGE (%)",
  },
  {
    type: "loser",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top losers",
    pageSubtitle: "Stocks with a price lose against one month before price",
    datafieldName: "oneMonthPercentChange",
    columnTitle: "MONTHLY CHANGE (%)",
  },
  {
    type: "loser",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top losers",
    pageSubtitle: "Stocks with a price lose against six months before price",
    datafieldName: "sixMonthPercentChange",
    columnTitle: "6 MONTHLY CHANGE (%)",
  },
  {
    type: "loser",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top losers",
    pageSubtitle: "Stocks with a price lose against one year before price",
    datafieldName: "oneYearPercentChange",
    columnTitle: "YEARLY CHANGE (%)",
  },
  {
    type: "loser",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top losers",
    pageSubtitle: "Stocks with a price lose against five years before price",
    datafieldName: "fiveYearPercentChange",
    columnTitle: "5 YEARLY CHANGE (%)",
  },
  {
    type: "value",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top values",
    pageSubtitle: "Stocks with top value for today",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "value",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top values",
    pageSubtitle: "Stocks with top value for last one week",
    datafieldName: "oneWeekTotalValue",
    columnTitle: "WEEK VALUE",
  },
  {
    type: "value",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top values",
    pageSubtitle: "Stocks with top value for last one month",
    datafieldName: "oneMonthTotalValue",
    columnTitle: "MONTH VALUE",
  },
  {
    type: "value",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top values",
    pageSubtitle: "Stocks with top value for last six months",
    datafieldName: "sixMonthTotalValue",
    columnTitle: "6 MONTH VALUE",
  },
  {
    type: "value",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top values",
    pageSubtitle: "Stocks with top value for last one year",
    datafieldName: "oneYearTotalValue",
    columnTitle: "YEAR VALUE",
  },
  {
    type: "value",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top values",
    pageSubtitle: "Stocks with top value for last five years",
    datafieldName: "fiveYearTotalValue",
    columnTitle: "5 YEAR VALUE",
  },
  {
    type: "volume",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top volumes",
    pageSubtitle: "Stocks with top volume for today",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "volume",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top volumes",
    pageSubtitle: "Stocks with top volume for last one week",
    datafieldName: "oneWeekTotalVolume",
    columnTitle: "WEEK VOLUME",
  },
  {
    type: "volume",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top volumes",
    pageSubtitle: "Stocks with top volume for last one month",
    datafieldName: "oneMonthTotalVolume",
    columnTitle: "MONTH VOLUME",
  },
  {
    type: "volume",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top volumes",
    pageSubtitle: "Stocks with top volume for last six months",
    datafieldName: "sixMonthTotalVolume",
    columnTitle: "6 MONTH VOLUME",
  },
  {
    type: "volume",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top volumes",
    pageSubtitle: "Stocks with top volume for last one year",
    datafieldName: "oneYearTotalVolume",
    columnTitle: "YEAR VOLUME",
  },
  {
    type: "volume",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top volumes",
    pageSubtitle: "Stocks with top volume for last five years",
    datafieldName: "fiveYearTotalVolume",
    columnTitle: "5 YEAR VOLUME",
  },
  {
    type: "trade",
    variant: "1d",
    title: "Day",
    titleSmall: "1D",
    pageTitle: "Daily top trades",
    pageSubtitle: "Stocks with top trade for today",
    datafieldName: null,
    columnTitle: null,
  },
  {
    type: "trade",
    variant: "1w",
    title: "Week",
    titleSmall: "1W",
    pageTitle: "Weekly top trades",
    pageSubtitle: "Stocks with top trade for last one week",
    datafieldName: "oneWeekTotalTrade",
    columnTitle: "WEEK TRADE",
  },
  {
    type: "trade",
    variant: "1m",
    title: "Month",
    titleSmall: "1M",
    pageTitle: "Monthly top trades",
    pageSubtitle: "Stocks with top trade for last one month",
    datafieldName: "oneMonthTotalTrade",
    columnTitle: "MONTH TRADE",
  },
  {
    type: "trade",
    variant: "6m",
    title: "6 Months",
    titleSmall: "6M",
    pageTitle: "6 Month top trades",
    pageSubtitle: "Stocks with top trade for last six months",
    datafieldName: "sixMonthTotalTrade",
    columnTitle: "6 MONTH TRADE",
  },
  {
    type: "trade",
    variant: "1y",
    title: "Year",
    titleSmall: "1Y",
    pageTitle: "Yearly top trades",
    pageSubtitle: "Stocks with top trade for last one year",
    datafieldName: "oneYearTotalTrade",
    columnTitle: "YEAR TRADE",
  },
  {
    type: "trade",
    variant: "5y",
    title: "5 Years",
    titleSmall: "5Y",
    pageTitle: "5 Year top trades",
    pageSubtitle: "Stocks with top trade for last five years",
    datafieldName: "fiveYearTotalTrade",
    columnTitle: "5 YEAR TRADE",
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
    borderRadius: "3px !important",
    marginRight: "12px",
    border: `1px solid ${theme.palette.text.secondary} !important`,
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
  const [initdata, setinitdata] = React.useState<any>([]);

  const [data, setdata] = React.useState<any>([]);

  const [isLoading, setisLoading] = React.useState(false);

  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const variant = searchParams.get("variant");

  const [typeAlignment, setTypeAlignment] = React.useState<any>(type);

  const [variantAlignment, setVariantAlignment] = React.useState<any>(variant);

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

  async function getData() {
    console.log("bb");
    try {
      setisLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/allGainerLoser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const resdata = await res.json();

      setinitdata(resdata);

      let newData;
      if (type === "gainer") {
        newData = [...resdata].sort(
          (a: any, b: any) => b.percentChange - a.percentChange
        );
      } else if (type === "loser") {
        newData = [...resdata].sort(
          (a: any, b: any) => a.percentChange - b.percentChange
        );
      } else {
        newData = resdata;
      }
      setdata(newData);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  React.useEffect(() => {
    console.log("aa");
    getData();
  }, []);

  console.log(data);

  return (
    <Box>
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
          <StyledToggleButton value="1d">1d</StyledToggleButton>
          <StyledToggleButton value="1m">1M</StyledToggleButton>
          {/* {variantMap
            .filter((item) => item.type === "gainer")
            .map((item) => (
              <StyledToggleButton value={item.variant} key={item.variant}>
                {item.titleSmall}
              </StyledToggleButton>
            ))} */}
        </StyledToggleButtonGroup>
      </Box>

      {data &&
        data.slice(0, 20).map((item: any, index: number) => (
          <Box key={index}>
            <MobileViewPriceCard item={item} />
          </Box>
        ))}
    </Box>
  );
}
