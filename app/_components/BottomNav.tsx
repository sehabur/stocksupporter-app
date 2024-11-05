"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dialog as CapDialog } from "@capacitor/dialog";
import { App } from "@capacitor/app";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";

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
    icon: <DonutSmallRoundedIcon />,
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
    title: "AI insight",
    label: "AI",
    icon: <AutoAwesomeRoundedIcon />,
    href: "/ai-insight",
    pathname: "/ai-insight",
  },
];

export default function BottomNav() {
  const [value, setValue] = useState<number>(0);

  const router = useRouter();

  const pathname = usePathname();

  const handleChange = (newValue: number) => {
    setValue(newValue);
    const currItem: any = mainMenu.find((item) => item.value === newValue);
    router.push(currItem.href);
  };

  useEffect(() => {
    const curr: any = mainMenu.find((item: any) => item.pathname === pathname);
    if (curr) {
      setValue(curr?.value);
    } else {
      setValue(100);
    }
  }, [pathname]);

  useEffect(() => {
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
      </Paper>
      <BottomNavigation
        sx={{
          height: 65,
        }}
      ></BottomNavigation>
    </>
  );
}
