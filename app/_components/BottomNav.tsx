"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dialog as CapDialog } from "@capacitor/dialog";
import { useDispatch, useSelector } from "react-redux";
import { App } from "@capacitor/app";

import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { TransitionProps } from "@mui/material/transitions";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import CandlestickChartRoundedIcon from "@mui/icons-material/CandlestickChartRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
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
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
// import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
// import CandlestickChartOutlinedIcon from "@mui/icons-material/CandlestickChartOutlined";
// import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import { authActions, favoriteActions } from "_store";
import ToastMessage from "./shared/ToastMessage";
import DarkThemeButton from "./buttons/DarkThemeButton";

// const menuOutlined = [
//   {
//     value: 0,
//     title: "Home",
//     label: "Home",
//     icon: <HomeOutlinedIcon />,
//     href: "/",
//   },
//   {
//     value: 1,
//     title: "Favorites",
//     label: "Favorites",
//     icon: <FavoriteBorderRoundedIcon />,
//     href: "/",
//   },
//   {
//     value: 2,
//     title: "Top",
//     label: "Top",
//     icon: <EmojiEventsOutlinedIcon />,
//     href: "/",
//   },
//   {
//     value: 3,
//     title: "Shares",
//     label: "Shares",
//     icon: <CandlestickChartOutlinedIcon />,
//     href: "/",
//   },
//   {
//     value: 4,
//     title: "Screener",
//     label: "Screener",
//     icon: <FilterAltOutlinedIcon />,
//     href: "/",
//   },
//   {
//     value: 5,
//     title: "More",
//     label: "More",
//     icon: <MenuRoundedIcon />,
//     href: "/",
//   },
// ];

const mainMenu = [
  {
    value: 0,
    title: "Home",
    label: "Home",
    icon: <HomeRoundedIcon />,
    href: "/",
    pathname: "/",
  },
  {
    value: 1,
    title: "Favorites",
    label: "Favorite",
    icon: <FavoriteRoundedIcon />,
    href: "/favorites",
    pathname: "/favorites",
  },
  {
    value: 2,
    title: "Top shares",
    label: "Top",
    icon: <EmojiEventsRoundedIcon />,
    href: "/gainer-loser?type=gainer&variant=day",
    pathname: "/gainer-loser",
  },
  {
    value: 3,
    title: "All Shares",
    label: "Shares",
    icon: <DonutSmallIcon />,
    href: "/latest-price",
    pathname: "/latest-price",
  },
  {
    value: 4,
    title: "Screener",
    label: "Screener",
    icon: <FilterAltRoundedIcon />,
    href: "/screener",
    pathname: "/screener",
  },
  {
    value: 5,
    title: "More",
    label: "More",
    icon: <MenuRoundedIcon />,
    href: "#",
  },
];

const marketMenu = [
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
    title: "Sectors",
    label: "Sectors",
    icon: <WorkspacesRoundedIcon />,
    href: "/sector",
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
    title: "Block transections",
    label: "Block transections",
    icon: <BatchPredictionRoundedIcon />,
    href: "/block-tr",
  },
  {
    title: "Latest news",
    label: "News",
    icon: <NewspaperRoundedIcon />,
    href: "/latest-news",
  },
  {
    title: "IPO",
    label: "IPO",
    icon: <UpcomingRoundedIcon />,
    href: "/ipo",
  },
  {
    title: "Screener",
    label: "Screener",
    icon: <FilterAltOutlinedIcon />,
    href: "/screener",
  },
  {
    title: "Supercharts",
    label: "Supercharts",
    icon: <AddchartOutlinedIcon />,
    href: "/supercharts?symbol=DSEX",
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
  },
  {
    title: "Join us on Facebook",
    label: "Join us on Facebook",
    icon: <FacebookRoundedIcon />,
    href: "https://www.facebook.com/profile.php?id=61566267416444",
  },
];

const userMenu = [
  {
    title: "Favorites",
    label: "Favorites",
    icon: <FavoriteBorderRoundedIcon />,
    href: "/favorites",
  },
  {
    title: "Price alerts",
    label: "Price alerts",
    icon: <AlarmOutlinedIcon />,
    href: "/price-alerts",
  },
  {
    title: "Notifications",
    label: "Notifications",
    icon: <NotificationsNoneRoundedIcon />,
    href: "/notifications",
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

const TransitionSlide = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BottomNav() {
  const theme: any = useTheme();

  const [value, setValue] = React.useState<number>(0);

  const [openDialog, setOpenDialog] = React.useState(false);

  const [logoutSuccess, setLogoutSuccess] = React.useState(false);

  const router = useRouter();

  const pathname = usePathname();

  const auth = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const handleLogoutToastColse = () => {
    setLogoutSuccess(false);
  };

  const handleSignOut = () => {
    dispatch(authActions.logout());
    dispatch(favoriteActions.clearData());
    handleDialogClose();
    setLogoutSuccess(true);
  };

  const handleChange = (newValue: number) => {
    if (newValue === 5) {
      handleDialogOpen();
    } else {
      setValue(newValue);

      const currItem: any = mainMenu.find((item) => item.value === newValue);
      router.push(currItem.href);
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleMenuItemClick = (href: string) => {
    router.push(href);
    handleDialogClose();
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
          my: 1,
          px: 2,
          py: 0.5,
          width: "100%",
        }}
        component={Button}
        onClick={() => handleMenuItemClick(item.href)}
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

  React.useEffect(() => {
    const curr: any = mainMenu.find((item: any) => item.pathname === pathname);
    if (curr) {
      setValue(curr?.value);
    } else {
      setValue(5);
    }
  }, [pathname]);

  React.useEffect(() => {
    const backButtonListener: any = App.addListener(
      "backButton",
      ({ canGoBack }) => {
        if (canGoBack) {
          router.back(); // Navigate back in the browser history
        } else {
          const handleCapDialog = async () => {
            const { value }: any = await CapDialog.confirm({
              title: "Exit App",
              message: "Are you sure you want to exit the app?",
              okButtonTitle: "Yes",
              cancelButtonTitle: "No",
            });
            if (value) {
              App.exitApp(); // Exit the app if the user confirms
            }
          };
          handleCapDialog();
        }
      }
    );
    // Cleanup the listener when the component is unmounted
    return () => {
      backButtonListener.remove();
    };
  }, [router]);

  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        elevation={4}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            handleChange(newValue);
          }}
          sx={{
            ".MuiBottomNavigationAction-root": { minWidth: "50px" },
            height: 62,
          }}
        >
          {mainMenu.map((item: any, index: number) => (
            <BottomNavigationAction
              label={item.label}
              icon={item.icon}
              key={index}
            />
          ))}
        </BottomNavigation>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullScreen
          disableScrollLock={true}
          TransitionComponent={TransitionSlide}
          // PaperProps={{
          //   style: {
          //     backgroundColor: theme?.palette?.mode == "dark" ? "#000" : "#fff",
          //   },
          // }}
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
              <Box>Menu</Box>
              <IconButton edge="end" onClick={handleDialogClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ px: 1 }}>
              {/* test purpose */}
              <Box sx={{ pb: 2.5 }}>
                <Typography color="text.secondary">
                  Theme (test purpose)
                </Typography>
                <DarkThemeButton />
              </Box>
              {/* test purpose */}

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
                        my: 1,
                        px: 2,
                        py: 0.5,
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
                <Typography color="text.secondary">Packages</Typography>
                {packageMenu.map((item: any, index: number) =>
                  getMenuItem(item, index)
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
          </DialogContent>
        </Dialog>
        <ToastMessage
          open={logoutSuccess}
          onClose={handleLogoutToastColse}
          severity="success"
          message="Logout Successful!"
        />
      </Paper>
      <BottomNavigation
        sx={{
          height: 65,
        }}
      ></BottomNavigation>
    </>
  );
}
