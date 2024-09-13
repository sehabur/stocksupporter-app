"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { LocalNotifications } from "@capacitor/local-notifications";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
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
  themeColorActions,
} from "_store";
import SearchStockCard from "./cards/SearchStockCard";
import IndexInfoCard from "./cards/IndexInfoCard";
import {
  INDEX_INFO_FETCH_TIME_MS,
  LATEST_PRICE_FETCH_TIME_MS,
} from "@/data/constants";

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

  const [searchText, setSearchText] = useState("");

  const [searchResultFallbackText, setSearchResultFallbackText] = useState(
    "Type trading code or company name"
  );
  const [searchResult, setSearchResult] = useState(latestPrice);

  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  const [indexInfoAnchorEl, setindexInfoAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleReloadPage = () => {
    const { pathname, search } = window.location;
    router.push(`/reload?redirect=${encodeURIComponent(pathname + search)}`);
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

  const getData = async () => {
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
    dispatch(latestPriceActions.setData(initdata));
  };

  const getIndexInfo = async () => {
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

    dispatch(indexInfoActions.setData(initdata.Data));
  };

  const getFavorites = async () => {
    if (!auth) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/favorite/${auth?._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        next: { revalidate: 0 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const initdata = await res.json();
    dispatch(favoriteActions.setData(initdata.favorites));
  };

  useEffect(() => {
    const themeColor = localStorage.getItem("theme");
    if (themeColor) {
      dispatch(themeColorActions.setThemeColor(themeColor));
    } else {
      localStorage.setItem("theme", "light");
      dispatch(themeColorActions.setThemeColor("light"));
    }
  }, [dispatch]);

  useEffect(() => {
    if (searchText !== "") {
      const debounceFn = setTimeout(() => {
        getSharesBySearch();
      }, 1000);
      return () => clearTimeout(debounceFn);
    }
  }, [searchText]);

  // async function alertPermission() {
  //   await LocalNotifications.requestPermissions();
  // }
  // async function alertSchedule() {
  //   if (!auth || !latestPrice) return;

  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/priceAlerts/user/${auth?._id}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${auth?.token}`,
  //       },
  //       next: { revalidate: 0 },
  //     }
  //   );

  //   if (!res.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await res.json();

  //   if (data?.priceAlerts?.length < 1) return;

  //   let notificationList = [];

  //   for (let alert of data?.priceAlerts) {
  //     const stockPrice = latestPrice.find(
  //       (item: any) => item.tradingCode === alert.tradingCode
  //     );

  //     if (
  //       (alert.type == "above" && stockPrice.ltp > alert.price) ||
  //       (alert.type == "below" && stockPrice.ltp < alert.price)
  //     ) {
  //     }

  //     notificationList.push({
  //       id: Math.random(),
  //       title: alert.tradingCode + " Price Alert",
  //       body:
  //         "Latest trading price is now " +
  //         alert.type +
  //         " your set value (BDT " +
  //         alert.price.toFixed(2) +
  //         ")",
  //     });
  //   }

  //   const result = await LocalNotifications.schedule({
  //     notifications: notificationList,
  //   });

  //   console.log(latestPrice, auth, result);
  // }

  useEffect(() => {
    getData();
    getIndexInfo();
    // alertPermission();
  }, []);

  useEffect(() => {
    getFavorites();
  }, [auth]);

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, LATEST_PRICE_FETCH_TIME_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getIndexInfo();
    }, INDEX_INFO_FETCH_TIME_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     alertSchedule();
  //   }, 60000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [auth, latestPrice]);

  useEffect(() => {
    const authDataFromStorage: any = localStorage.getItem("userInfo");
    const data = JSON.parse(authDataFromStorage);

    if (data) {
      dispatch(authActions.login(data));
    }
  }, []);

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
