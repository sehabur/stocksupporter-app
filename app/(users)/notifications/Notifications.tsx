"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Chip, Paper, Typography } from "@mui/material";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

import { authActions, pageTitleActions } from "_store";

import SigninDialogContent from "@/components/shared/SigninDialogContent";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";
import ReactTimeAgo from "react-time-ago";

export default function Notifications() {
  const router = useRouter();

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("Notification"));

  const auth = useSelector((state: any) => state.auth);

  const [datafetched, setdatafetched] = React.useState(false);

  const [data, setdata] = React.useState([]);

  const handleClick = (tradingCode: string) => {
    const url = `/stock-details?tradingCode=${tradingCode}`;
    router.push(url);
  };

  async function getData() {
    if (!auth) {
      return setdatafetched(true);
    }
    const res: any = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/notification/${auth._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const initdata = await res.json();
    setdata(initdata);
    setdatafetched(true);
    return;
  }

  async function resetNewNotifications() {
    if (!auth) return;

    const res: any = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/notification/resetNew`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    dispatch(authActions.resetNewNotificationCount());
    return;
  }

  React.useEffect(() => {
    getData();
    resetNewNotifications();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        pt: 1.5,
      }}
    >
      {datafetched && (
        <>
          {!auth?.isLoggedIn && (
            <Box sx={{ px: 2, py: 4 }}>
              <SigninDialogContent redirect="/notifications" />
            </Box>
          )}
          {auth?.isLoggedIn && (
            <>
              <Box>
                {data?.map((item: any, index: number) => (
                  <Paper
                    variant="outlined"
                    sx={{ pr: 2, pl: 1.4, pt: 1.5, pb: 1.5, mb: 1 }}
                    onClick={() => handleClick(item.tradingCode)}
                    key={index}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box sx={{ mr: 1 }}>
                        <FiberManualRecordRoundedIcon
                          sx={{
                            fontSize: ".7rem",
                            mt: 0.8,
                            color: item?.isUnread ? "error.main" : "divider",
                          }}
                        />
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            sx={{
                              color: "primary.main",
                              fontSize: "1rem",
                              mr: 1.5,
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Chip
                            label={
                              <ReactTimeAgo
                                date={item.deliveryTime}
                                locale="en-US"
                              />
                            }
                            size="small"
                            sx={{
                              borderRadius: 1,
                              fontSize: ".875rem",
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            sx={{ color: "text.primary", fontSize: ".875rem" }}
                          >
                            {item.body}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>

              {data?.length < 1 && (
                <Box sx={{ textAlign: "center", py: 4, px: 1 }}>
                  <Typography
                    color="text.primary"
                    sx={{ fontSize: "1.1rem", mb: 2 }}
                  >
                    No notification to show
                  </Typography>
                </Box>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
}
