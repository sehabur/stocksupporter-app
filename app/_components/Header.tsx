"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Preferences } from "@capacitor/preferences";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useTheme,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  InputBase,
  Slide,
  Chip,
  Popover,
} from "@mui/material";

import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import { TransitionProps } from "@mui/material/transitions";

import {
  authActions,
  favoriteActions,
  indexInfoActions,
  latestPriceActions,
  marketOpenStatusActions,
  themeColorActions,
} from "_store";

import SearchStockCard from "./cards/SearchStockCard";

import IndexInfoCard from "./cards/IndexInfoCard";

import {
  INDEX_INFO_FETCH_TIME_MS,
  LATEST_PRICE_FETCH_TIME_MS,
  GAINER_LOSER_FETCH_TIME_MS,
  SCREENER_FETCH_TIME_MS,
} from "@/data/constants";

import { getUser } from "_helper/dataFetch";

const TransitionSlide = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const addPlusSign = (value: number) => {
  if (!value) return "0";
  const sign = value > 0 ? "+" : "";
  return sign + value.toFixed(2);
};

const textColor = (value: number) => {
  if (!value) return "primary.main";
  return value > 0 ? "success.main" : value < 0 ? "error.main" : "primary.main";
};

export default function Header() {
  const dispatch = useDispatch();

  const router = useRouter();

  const theme: any = useTheme();

  const pageTitle = useSelector((state: any) => state.pageTitle);

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const indexInfo = useSelector((state: any) => state.indexInfo);

  const auth = useSelector((state: any) => state.auth);

  const marketOpenStatusReduxSlice = useSelector(
    (state: any) => state.marketOpenStatus
  );

  const [searchText, setSearchText] = useState("");

  const [searchResultFallbackText, setSearchResultFallbackText] = useState(
    "Type trading code or company name"
  );
  const [searchResult, setSearchResult] = useState(latestPrice);

  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  const [indexInfoAnchorEl, setindexInfoAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleReloadPage = async () => {
    await getIndexInfo(marketOpenStatusReduxSlice);

    const { pathname, search } = window.location;
    const url = pathname + search;

    // const url =
    //   pathname +
    //   search +
    //   (search == "" ? "?" : "&") +
    //   "scrollY=" +
    //   Math.floor(window.scrollY);

    router.push(`/reload?redirect=${encodeURIComponent(url)}`);
  };

  const handleIndexInfoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setindexInfoAnchorEl(event.currentTarget);
  };

  const handleIndexInfoClose = () => {
    setindexInfoAnchorEl(null);
  };

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleSearchDialogOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpenSearchDialog(true);
  };
  const handleSearchDialogClose = (
    navigate: boolean = false,
    href: string = "",
    title: string = ""
  ) => {
    setOpenSearchDialog(false);
    setSearchResult([]);
    setSearchResultFallbackText("Type trading code or company name");
    setSearchText("");
    if (navigate) {
      router.push(href);
    }
  };

  const getSharesBySearch = async (init = false) => {
    setSearchResultFallbackText("Loading..");
    const initdata = latestPrice || [];
    const data = initdata.filter(
      (item: any) =>
        item.tradingCode?.search(new RegExp(searchText, "i")) !== -1 ||
        item.companyName?.search(new RegExp(searchText, "i")) !== -1
    );
    if (data.length === 0) {
      setSearchResultFallbackText("No results found");
    } else {
      setSearchResult(data);
    }
  };

  const calcDataFetchEndTime = (marketOpenStatus: any) => {
    const {
      dataFetchStartHour,
      dataFetchStartMinute,
      dataFetchEndHour,
      dataFetchEndMinute,
    } = marketOpenStatus;

    const now = new Date();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();

    const currentTimeInMinutes = hours * 60 + minutes;
    const startTimeInMinutes = dataFetchStartHour * 60 + dataFetchStartMinute;

    if (currentTimeInMinutes < startTimeInMinutes) {
      const previousDay = new Date(now);
      previousDay.setUTCDate(now.getUTCDate() - 1);
      previousDay.setUTCHours(dataFetchEndHour, dataFetchEndMinute);
      return previousDay;
    } else {
      const sameDay = new Date(now);
      sameDay.setUTCHours(dataFetchEndHour, dataFetchEndMinute);
      return sameDay;
    }
  };

  const getIsMarketOpen = (marketOpenStatus: any) => {
    const {
      dataInsertionEnable,
      openHour,
      openMinute,
      closeHour,
      closeMinute,
    } = marketOpenStatus;

    const now = new Date();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();

    const currentTimeInMinutes = hours * 60 + minutes;
    const startTimeInMinutes = openHour * 60 + openMinute;
    const endTimeInMinutes = closeHour * 60 + closeMinute;

    return (
      dataInsertionEnable == 1 &&
      currentTimeInMinutes >= startTimeInMinutes &&
      currentTimeInMinutes <= endTimeInMinutes
    );
  };

  const fetchLatestPriceFromApi = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/latestPrice`,
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
    const initdata = await res.json();

    await Preferences.set({
      key: "latestPrice",
      value: JSON.stringify({
        data: initdata,
        updatedAt: initdata[101].time,
        pullTime: new Date().toISOString(),
      }),
    });

    dispatch(latestPriceActions.setData(initdata));
  };

  const fetchGainerLoserDataFromApi = async () => {
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
    const initdata = await res.json();

    await Preferences.set({
      key: "allGainerLoser",
      value: JSON.stringify({
        data: initdata,
        updatedAt: initdata[101].time,
        pullTime: new Date().toISOString(),
      }),
    });
  };

  const fetchScreenerDataFromApi = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/screener`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const initdata = await res.json();

    await Preferences.set({
      key: "screener",
      value: JSON.stringify({
        data: initdata,
        pullTime: new Date().toISOString(),
      }),
    });
  };

  const fetchIndexInfoFromApi = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/getIndexInfo`,
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
    const initdata = await res.json();

    await Preferences.set({
      key: "indexInfo",
      value: JSON.stringify({
        data: initdata.Data,
        pullTime: new Date().toISOString(),
      }),
    });

    dispatch(indexInfoActions.setData(initdata.Data));
  };

  const getMarketOpenStatus = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/getMarketStatus`,
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
    const initdata = await res.json();
    dispatch(marketOpenStatusActions.setData(initdata));
    return { status: "success", data: initdata };
  };

  const getLatestPriceData = async (marketOpenStatus: any) => {
    if (getIsMarketOpen(marketOpenStatus)) {
      return await fetchLatestPriceFromApi();
    }
    const storage: { value: any } = await Preferences.get({
      key: "latestPrice",
    });
    if (!storage.value) {
      return await fetchLatestPriceFromApi();
    }

    const { data: latestPriceFromStorage, pullTime: pullTimeFromStorage } =
      JSON.parse(storage.value);

    const dataFetchEndTime = calcDataFetchEndTime(marketOpenStatus);

    if (new Date(pullTimeFromStorage) < new Date(dataFetchEndTime)) {
      return await fetchLatestPriceFromApi();
    } else {
      dispatch(latestPriceActions.setData(latestPriceFromStorage));
    }
  };

  const getGainerLoserData = async (marketOpenStatus: any) => {
    if (getIsMarketOpen(marketOpenStatus)) {
      return await fetchGainerLoserDataFromApi();
    }
    const storage: { value: any } = await Preferences.get({
      key: "allGainerLoser",
    });
    if (!storage.value) {
      return await fetchGainerLoserDataFromApi();
    }

    const { pullTime: pullTimeFromStorage } = JSON.parse(storage.value);

    const dataFetchEndTime = calcDataFetchEndTime(marketOpenStatus);

    if (new Date(pullTimeFromStorage) < new Date(dataFetchEndTime)) {
      return await fetchGainerLoserDataFromApi();
    }
  };

  const getScreenerData = async (marketOpenStatus: any, authData: any) => {
    if (!authData?.isPremiumEligible) {
      return;
    }

    if (getIsMarketOpen(marketOpenStatus)) {
      return await fetchScreenerDataFromApi();
    }
    const storage: { value: any } = await Preferences.get({
      key: "screener",
    });
    if (!storage.value) {
      return await fetchScreenerDataFromApi();
    }

    const { pullTime: pullTimeFromStorage } = JSON.parse(storage.value);

    const dataFetchEndTime = calcDataFetchEndTime(marketOpenStatus);

    if (new Date(pullTimeFromStorage) < new Date(dataFetchEndTime)) {
      return await fetchScreenerDataFromApi();
    }
  };

  const getIndexInfo = async (marketOpenStatus: any) => {
    if (getIsMarketOpen(marketOpenStatus)) {
      return await fetchIndexInfoFromApi();
    }
    const storage: { value: any } = await Preferences.get({
      key: "indexInfo",
    });
    if (!storage.value) {
      return await fetchIndexInfoFromApi();
    }

    const { data: indexInfoFromStorage, pullTime: pullTimeFromStorage } =
      JSON.parse(storage.value);

    const dataFetchEndTime = calcDataFetchEndTime(marketOpenStatus);

    if (new Date(pullTimeFromStorage) < new Date(dataFetchEndTime)) {
      return await fetchIndexInfoFromApi();
    } else {
      dispatch(indexInfoActions.setData(indexInfoFromStorage));
    }
  };

  const getUserData = async () => {
    const data = await getUser();
    if (data) {
      dispatch(authActions.login(data));
      dispatch(favoriteActions.setData(data.favorites));
    }
  };

  const setTheme = () => {
    const themeColor = localStorage.getItem("theme");
    if (themeColor) {
      dispatch(themeColorActions.setThemeColor(themeColor));
    } else {
      localStorage.setItem("theme", "light");
      dispatch(themeColorActions.setThemeColor("light"));
    }
  };

  const getAppInitData = async () => {
    setTheme();
    getUserData();
    const market: any = await getMarketOpenStatus();
    if (market?.status === "success") {
      getLatestPriceData(market.data);
      getGainerLoserData(market.data);
      getIndexInfo(market.data);
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      const debounceFn = setTimeout(() => {
        getSharesBySearch();
      }, 1000);
      return () => clearTimeout(debounceFn);
    }
  }, [searchText]);

  useEffect(() => {
    const interval = setInterval(() => {
      getLatestPriceData(marketOpenStatusReduxSlice);
    }, LATEST_PRICE_FETCH_TIME_MS);
    return () => {
      clearInterval(interval);
    };
  }, [marketOpenStatusReduxSlice]);

  useEffect(() => {
    const interval = setInterval(() => {
      getGainerLoserData(marketOpenStatusReduxSlice);
    }, GAINER_LOSER_FETCH_TIME_MS);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getScreenerData(marketOpenStatusReduxSlice, auth);
    }, SCREENER_FETCH_TIME_MS);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const { pathname } = window.location;
      if (pathname != "/") {
        getIndexInfo(marketOpenStatusReduxSlice);
      }
    }, INDEX_INFO_FETCH_TIME_MS);
    return () => {
      clearInterval(interval);
    };
  }, [marketOpenStatusReduxSlice]);

  useEffect(() => {
    getAppInitData();
  }, []);

  useEffect(() => {
    getScreenerData(marketOpenStatusReduxSlice, auth);
  }, [marketOpenStatusReduxSlice, auth]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "background.default",
          borderBottom: `1px solid ${theme.palette.appbarBorderBottom}`,
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box sx={{ maxWidth: "45vw" }}>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "text.primary",
                }}
                noWrap
              >
                {pageTitle}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {indexInfo?.indexLatestData?.index !== 0 && (
                <Chip
                  label={addPlusSign(indexInfo.indexLatestData.change)}
                  size="small"
                  icon={
                    indexInfo.marketOpenStatus == "Open" ? (
                      <RadioButtonCheckedRoundedIcon color="success" />
                    ) : indexInfo.marketOpenStatus == "Closed" ? (
                      <DoDisturbOnRoundedIcon color="error" />
                    ) : (
                      <DoDisturbOnRoundedIcon color="warning" />
                    )
                  }
                  sx={{
                    "& .MuiChip-label": {
                      color: textColor(indexInfo.indexLatestData.change),
                      fontSize: "1rem",
                      fontWeight: 700,
                    },
                    mr: 1,
                  }}
                  component={Button}
                  onClick={handleIndexInfoClick}
                />
              )}

              {/* <IconButton onClick={handleClick}>
                {indexInfo.marketOpenStatus == "Open" ? (
                  <RadioButtonCheckedRoundedIcon
                    color="success"
                    sx={{ fontSize: "1rem" }}
                  />
                ) : indexInfo.marketOpenStatus == "Closed" ? (
                  <DoDisturbOnRoundedIcon
                    color="error"
                    sx={{ fontSize: "1rem" }}
                  />
                ) : (
                  <DoDisturbOnRoundedIcon
                    color="warning"
                    sx={{ fontSize: "1rem" }}
                  />
                )}
              </IconButton>

              <Typography
                onClick={handleClick}
                sx={{
                  color: textColor(indexInfo.indexLatestData.change),
                  fontWeight: 700,
                  fontSize: "1rem",
                  mr: 1,
                  // fontFamily: "'Nunito Sans'",
                }}
              >
                {addPlusSign(indexInfo.indexLatestData.change)}
              </Typography> */}

              <IconButton onClick={handleReloadPage}>
                <SyncRoundedIcon color="primary" />
              </IconButton>

              <IconButton onClick={handleSearchDialogOpen}>
                <SearchRoundedIcon color="primary" />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ bgcolor: "background.default" }} />

      <Dialog
        open={openSearchDialog}
        onClose={() => {
          handleSearchDialogClose(false);
        }}
        fullWidth
        fullScreen
        disableScrollLock={true}
        TransitionComponent={TransitionSlide}
        // PaperProps={{
        //   style: {
        //     backgroundColor: theme?.palette?.mode == "dark" ? "#000" : "#fff",
        //   },
        // }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon color="primary" sx={{ fontSize: "1.5rem" }} />
            <InputBase
              name="searchText"
              fullWidth
              autoFocus
              value={searchText}
              onChange={handleSearchTextChange}
              sx={{ mx: 2, fontSize: "1.1rem" }}
              placeholder="Search stocks"
            />
            <IconButton
              onClick={() => {
                handleSearchDialogClose(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ px: 1.5 }}>
          <Box sx={{ height: "450px" }}>
            <Box sx={{ pb: 1 }}>
              {searchResult.map((item: any) => (
                <Box key={item.tradingCode}>
                  {item.tradingCode && (
                    <SearchStockCard
                      data={item}
                      handleSearchDialogClose={handleSearchDialogClose}
                    />
                  )}
                </Box>
              ))}
              {searchResult.length === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: { xs: 200, sm: 350 },
                    mx: "auto",
                    textAlign: "center",
                    mt: { xs: 4, sm: 2 },
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: "1.1rem" }}
                  >
                    {searchResultFallbackText}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Popover
        open={Boolean(indexInfoAnchorEl)}
        anchorEl={indexInfoAnchorEl}
        onClose={handleIndexInfoClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <IndexInfoCard data={indexInfo} />
      </Popover>
    </>
  );
}
