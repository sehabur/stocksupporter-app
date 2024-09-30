"use client";
import React from "react";

import Link from "next/link";
import { DateTime } from "luxon";

import { Paper, Box, Typography, Button, Avatar, Divider } from "@mui/material";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";

export default function Ipo() {
  const [data, setdata] = React.useState<any>(null);

  const [isLoading, setisLoading] = React.useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("IPO"));

  const handleButtonClick = (href: string, title: string) => {
    router.push(href);
    // dispatch(pageTitleActions.setPageTitle(title));
  };

  async function getData() {
    try {
      setisLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/ipo`,
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
      setdata(initdata);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <LoadingSpinner open={isLoading} />
      {data && (
        <Box sx={{ mx: 2 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h1"
              color="text.secondary"
              gutterBottom
              sx={{
                fontSize: "1.2rem",
                fontWeight: 500,
              }}
            >
              Upcoming
            </Typography>
            <Box>
              {data
                .filter(
                  (item: any) => new Date(item.subscriptionEnd) >= new Date()
                )
                .map((item: any, index: number) => (
                  <Paper
                    key={index}
                    sx={{
                      my: 2,
                      borderRadius: 2,
                      maxWidth: 400,
                    }}
                    elevation={6}
                  >
                    <Box
                      onClick={() => {
                        handleButtonClick(
                          `/ipo/details?id=${item._id}`,
                          "IPO Details"
                        );
                      }}
                    >
                      <Typography
                        gutterBottom
                        sx={{
                          color: "primary.main",
                          fontSize: { xs: "1.1rem", sm: "1.2rem" },
                          mx: 2,
                          pt: 2,
                          pb: 0.6,
                        }}
                      >
                        {item.companyName}
                      </Typography>
                      <Divider />

                      <Box sx={{ py: 1 }}>
                        <ListItem sx={{ pt: 0 }}>
                          <ListItemAvatar>
                            <Avatar>
                              <PlayCircleOutlineRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Subscription starts from"
                            secondary={`${DateTime.fromISO(
                              item.subscriptionStart
                            ).toFormat("dd MMM, yyyy")}`}
                          />
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                          <ListItemAvatar>
                            <Avatar>
                              <DoDisturbAltRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Subscription ends at"
                            secondary={`${DateTime.fromISO(
                              item.subscriptionEnd
                            ).toFormat("dd MMM, yyyy")}`}
                          />
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                          <ListItemAvatar>
                            <Avatar>
                              <AddCardRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Min subscription amount"
                            secondary={`${item.minSubscriptionAmount} BDT`}
                          />
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                          <ListItemAvatar>
                            <Avatar>
                              <DoDisturbAltRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Cut-off date for investment"
                            secondary={`${DateTime.fromISO(
                              item.investmentCutoffDate
                            ).toFormat("dd MMM, yyyy")}`}
                          />
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                          <ListItemAvatar>
                            <Avatar>
                              <AccountBalanceRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Min investment required"
                            secondary={`${item.minInvestmentRB} BDT`}
                          />
                        </ListItem>
                        <Box sx={{ textAlign: "right", mr: 2 }}>
                          <Button
                            variant="text"
                            endIcon={<KeyboardArrowRightOutlinedIcon />}
                            sx={{
                              ":hover": {
                                bgcolor: "transparent",
                              },
                            }}
                          >
                            See Details
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              {data.filter(
                (item: any) => new Date(item.subscriptionEnd) >= new Date()
              ).length < 1 && (
                <Typography sx={{ mt: 2 }}>
                  There is no upcoming IPO to display
                </Typography>
              )}
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h1"
              color="text.secondary"
              gutterBottom
              sx={{
                fontSize: "1.2rem",
                fontWeight: 500,
              }}
            >
              Previous
            </Typography>
            <Box>
              {data
                .filter(
                  (item: any) => new Date(item.subscriptionEnd) < new Date()
                )
                .map((item: any, index: number) => (
                  <Paper
                    key={index}
                    sx={{
                      my: 2,
                      borderRadius: 2,
                      maxWidth: 400,
                    }}
                    elevation={6}
                  >
                    <Box
                      onClick={() => {
                        handleButtonClick(
                          `/ipo/details?id=${item._id}`,
                          "IPO Details"
                        );
                      }}
                    >
                      <Typography
                        gutterBottom
                        sx={{
                          color: "primary.main",
                          fontSize: { xs: "1.1rem", sm: "1.2rem" },
                          mx: 2,
                          pt: 2,
                          pb: 0.6,
                        }}
                      >
                        {item.companyName}
                      </Typography>
                      <Divider />

                      <Box sx={{ py: 1 }}>
                        <ListItem sx={{ pt: 0 }}>
                          <ListItemAvatar>
                            <Avatar>
                              <PlayCircleOutlineRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Subscription starts from"
                            secondary={`${DateTime.fromISO(
                              item.subscriptionStart
                            ).toFormat("dd MMM, yyyy")}`}
                          />
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                          <ListItemAvatar>
                            <Avatar>
                              <DoDisturbAltRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Subscription ends at"
                            secondary={`${DateTime.fromISO(
                              item.subscriptionEnd
                            ).toFormat("dd MMM, yyyy")}`}
                          />
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                          <ListItemAvatar>
                            <Avatar>
                              <AddCardRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Min subscription amount"
                            secondary={`${item.minSubscriptionAmount} BDT`}
                          />
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                          <ListItemAvatar>
                            <Avatar>
                              <DoDisturbAltRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Cut-off date for investment"
                            secondary={`${DateTime.fromISO(
                              item.investmentCutoffDate
                            ).toFormat("dd MMM, yyyy")}`}
                          />
                        </ListItem>
                        <ListItem sx={{ pt: 0 }}>
                          <ListItemAvatar>
                            <Avatar>
                              <AccountBalanceRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Min investment required"
                            secondary={`${item.minInvestmentRB} BDT`}
                          />
                        </ListItem>
                        <Box sx={{ textAlign: "right", mr: 2 }}>
                          <Button
                            variant="text"
                            endIcon={<KeyboardArrowRightOutlinedIcon />}
                            sx={{
                              ":hover": {
                                bgcolor: "transparent",
                              },
                            }}
                          >
                            See Details
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
            </Box>
          </Box>
          <Box>
            {data.length < 1 && (
              <Typography sx={{ mt: 2 }}>
                {" "}
                There is no IPO to display.
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
