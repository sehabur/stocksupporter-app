"use client";
import React, { useState, forwardRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Browser } from "@capacitor/browser";
import { Device } from "@capacitor/device";
import { App } from "@capacitor/app";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Typography,
  Paper,
  Badge,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import { yellow } from "@mui/material/colors";
import LoginIcon from "@mui/icons-material/Login";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import UpcomingRoundedIcon from "@mui/icons-material/UpcomingRounded";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DataSaverOffRoundedIcon from "@mui/icons-material/DataSaverOffRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import BatchPredictionRoundedIcon from "@mui/icons-material/BatchPredictionRounded";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { authActions, favoriteActions } from "_store";

import ToastMessage from "./shared/ToastMessage";

import DarkThemeButton from "./buttons/DarkThemeButton";

const marketMenu = [
  {
    title: "Supercharts",
    label: "Supercharts",
    icon: <AddchartOutlinedIcon />,
    href: "/supercharts?symbol=DSEX",
  },
  {
    title: "Sectors",
    label: "Sectors",
    icon: <WorkspacesRoundedIcon />,
    href: "/sector",
  },
  {
    title: "News",
    label: "News",
    icon: <NewspaperRoundedIcon />,
    href: "/latest-news",
  },
  {
    title: "Index movers",
    label: "Index movers",
    icon: <TrendingUpRoundedIcon />,
    href: "/index-mover",
  },
  {
    title: "Beta",
    label: "Beta",
    icon: <DataSaverOffRoundedIcon />,
    href: "/beta",
  },
  {
    title: "AI insight",
    label: "AI insight",
    icon: <AutoAwesomeRoundedIcon />,
    href: "/ai-insight",
    customIconColor: yellow[700],
  },

  {
    title: "Top shares",
    label: "Top shares",
    icon: <EmojiEventsOutlinedIcon />,
    href: "/gainer-loser?type=gainer&variant=day",
  },
  {
    title: "Latest price",
    label: "Latest price",
    icon: <DonutSmallIcon />,
    href: "/latest-price",
  },
  {
    title: "Screener",
    label: "Screener",
    icon: <FilterAltOutlinedIcon />,
    href: "/screener",
  },
  {
    title: "Block transections",
    label: "Block transections",
    icon: <BatchPredictionRoundedIcon />,
    href: "/block-tr",
  },

  {
    title: "IPO",
    label: "IPO",
    icon: <UpcomingRoundedIcon />,
    href: "/ipo",
  },
];

const packageMenu = [
  {
    title: "Premium",
    label: "Premium",
    icon: <WorkspacePremiumRoundedIcon />,
    href: "/pricing",
  },
];

const othersMenu = [
  {
    title: "Contact",
    label: "Contact",
    icon: <MailOutlineOutlinedIcon />,
    href: "/contact",
  },
  {
    title: "FAQ",
    label: "FAQ",
    icon: <LiveHelpOutlinedIcon />,
    href: "/faq",
  },
  {
    title: "Terms & condition",
    label: "Terms & condition",
    icon: <FeedOutlinedIcon />,
    href: "/terms",
  },
  {
    title: "Privacy policy",
    label: "Privacy policy",
    icon: <PrivacyTipOutlinedIcon />,
    href: "/privacy",
  },
  {
    title: "Youtube channel",
    label: "Youtube channel",
    icon: <YouTubeIcon />,
    href: "https://www.youtube.com/@Stocksupporter-x8l",
    customIconColor: "error.main",
    type: "external",
  },
  {
    title: "Join us on Facebook",
    label: "Join us on Facebook",
    icon: <FacebookRoundedIcon />,
    href: "https://www.facebook.com/profile.php?id=61566267416444",
    type: "external",
  },
];

const userMenu = [
  {
    title: "Notifications",
    label: "Notifications",
    icon: <NotificationsNoneRoundedIcon />,
    href: "/notifications",
  },
  {
    title: "Price alerts",
    label: "Price alerts",
    icon: <AlarmOutlinedIcon />,
    href: "/price-alerts",
  },
  {
    title: "Favorites",
    label: "Favorites",
    icon: <FavoriteBorderRoundedIcon />,
    href: "/favorites",
  },
  {
    title: "Portfolio",
    label: "Portfolio",
    icon: <BusinessCenterOutlinedIcon />,
    href: "/portfolio",
  },
  {
    title: "My account",
    label: "My account",
    icon: <Person2OutlinedIcon />,
    href: "/profile",
  },
];

const TransitionSlide = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function MoreMenu({
  openMoreMenuDialog,
  handleMoreMenuDialogClose,
}: any) {
  const theme: any = useTheme();

  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const [appVersion, setappVersion] = useState("");

  const router = useRouter();

  const auth = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const handleLogoutToastColse = () => {
    setLogoutSuccess(false);
  };

  const handleSignOut = () => {
    dispatch(authActions.logout());
    dispatch(favoriteActions.clearData());

    handleMoreMenuDialogClose();
    setLogoutSuccess(true);
  };

  const handleMenuItemClick = (href: string, type = null) => {
    handleMoreMenuDialogClose();

    if (type == "external") {
      openExternalLink(href);
    } else {
      router.push(href);
    }
  };

  const openExternalLink = async (url: string) => {
    try {
      await Browser.open({ url });
    } catch (error) {
      console.error("Error opening external link:", error);
    }
  };

  const getMenuItem = (item: any, index: any) => (
    <Box key={index}>
      <Paper
        sx={{
          bgcolor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 2,
          my: 1.2,
          px: 2,
          py: 0.4,
          width: "100%",
        }}
        component={Button}
        onClick={() => handleMenuItemClick(item.href, item.type)}
        variant="outlined"
      >
        <Button
          startIcon={item.icon}
          sx={{
            textAlign: "left",
            color: "text.primary",
            ".MuiButton-startIcon": {
              color: item.customIconColor || "primary.main",
            },
          }}
          disableRipple
        >
          {item.label}

          {item.label === "Notifications" && (
            <Badge
              badgeContent={auth?.newNotificationCount || 0}
              color="error"
              sx={{ ml: 2 }}
            />
          )}
        </Button>
        <KeyboardArrowRightRoundedIcon sx={{ color: "text.secondary" }} />
      </Paper>
    </Box>
  );

  useEffect(() => {
    const getAppVersion = async () => {
      const { platform } = await Device.getInfo();

      if (platform != "web") {
        const { version } = await App.getInfo();
        setappVersion(version);
      }
    };
    getAppVersion();
  }, [App]);

  return (
    <>
      <Dialog
        open={openMoreMenuDialog}
        onClose={handleMoreMenuDialogClose}
        fullScreen
        disableScrollLock={true}
        TransitionComponent={TransitionSlide}
        sx={{ ".MuiDialogContent-root": { p: 0 } }}
      >
        <DialogTitle sx={{ py: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              ml: 1,
              mr: 1.5,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Menu
            </Typography>
            <IconButton edge="end" onClick={handleMoreMenuDialogClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ px: 5, py: 2 }}>
            {/* test purpose */}
            <Box sx={{ pb: 2.5 }}>
              <Typography color="text.secondary">
                Theme (test purpose)
              </Typography>
              <DarkThemeButton />
            </Box>
            {/* test purpose */}

            <Box sx={{ pb: 2.5 }}>
              <Typography color="text.secondary">Packages</Typography>
              {packageMenu.map((item: any, index: number) =>
                getMenuItem(item, index)
              )}
            </Box>

            <Box sx={{ pb: 2.5 }}>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Market and stocks
              </Typography>
              {marketMenu.map((item: any, index: number) =>
                getMenuItem(item, index)
              )}
            </Box>

            <Box sx={{ pb: 2.5 }}>
              <Typography color="text.secondary">User menu</Typography>
              {userMenu.map((item: any, index: number) =>
                getMenuItem(item, index)
              )}

              {auth?.isLoggedIn ? (
                <Box>
                  <Paper
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 2,
                      my: 1.2,
                      px: 2,
                      py: 0.4,
                      width: "100%",
                      bgcolor: "transparent",
                    }}
                    component={Button}
                    onClick={handleSignOut}
                    disableRipple
                    variant="outlined"
                  >
                    <Button
                      startIcon={<LogoutOutlinedIcon />}
                      sx={{
                        color: "text.primary",
                        ".MuiButton-startIcon": {
                          color: "primary.main",
                        },
                      }}
                    >
                      Logout
                    </Button>
                    <KeyboardArrowRightRoundedIcon
                      sx={{ color: "text.secondary" }}
                    />
                  </Paper>
                </Box>
              ) : (
                <>
                  {getMenuItem(
                    {
                      href: "/signin",
                      label: "Sign in",
                      title: "Sign in",
                      icon: <LoginIcon />,
                    },
                    0
                  )}

                  {getMenuItem(
                    {
                      href: "/signup",
                      label: "Create new account",
                      title: "Create new account",
                      icon: <AddCircleOutlineIcon />,
                    },
                    1
                  )}
                </>
              )}
            </Box>

            <Box sx={{ pb: 2.5 }}>
              <Typography color="text.secondary">Others</Typography>
              {othersMenu.map((item: any, index: number) =>
                getMenuItem(item, index)
              )}
            </Box>
            <Box sx={{ pb: 2.5 }}>
              <Typography color="text.secondary">Theme</Typography>
              <DarkThemeButton />
            </Box>
          </Box>

          <Box sx={{ bgcolor: "financeInfoCard" }}>
            {/* <Divider light /> */}
            <Box
              sx={{
                pr: 6,
                pl: 5,
                py: 1.2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <img
                  src={
                    theme.palette.mode === "dark"
                      ? "/images/logo/logo-full-dark.png"
                      : "/images/logo/logo-full-light.png"
                  }
                  style={{
                    width: "auto",
                    marginTop: "5px",
                    height: "30px",
                  }}
                  alt="logo of stocksupporter"
                />
              </Box>

              <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>
                v{appVersion}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <ToastMessage
        open={logoutSuccess}
        onClose={handleLogoutToastColse}
        severity="success"
        message="Logout Successful!"
      />
    </>
  );
}
