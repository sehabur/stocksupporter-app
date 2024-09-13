"use client";
import React from "react";

import { DateTime } from "luxon";

import { Box, Typography, Avatar, Divider } from "@mui/material";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";

export default function Details() {
  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("IPO details"));

  const [data, setdata] = React.useState<any>(null);

  const [isLoading, setisLoading] = React.useState(false);

  const searchParams = useSearchParams();

  const ipoId = searchParams.get("id");

  const item = data?.find((item: any) => item._id == ipoId);

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
    <Box
      sx={{
        py: 2,
        px: 2,
      }}
    >
      <LoadingSpinner open={isLoading} />
      {item && (
        <Box sx={{ mb: 6 }}>
          {/* <Typography
            variant="h1"
            color="text.secondary"
            gutterBottom
            sx={{
              fontSize: "1.2rem",
              fontWeight: 500,
              textAlign: "center",
              my: 2,
            }}
          >
            Upcoming IPO Details
          </Typography> */}
          <Box sx={{ color: "text.primary" }}>
            <Typography
              sx={{
                color: "primary.main",
                fontSize: "1.3rem",
                mx: 2,
              }}
            >
              {item.companyName}
            </Typography>
            {/* <Divider light variant="middle" /> */}

            <Box
              sx={{
                py: 1,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                my: 1,
              }}
            >
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
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
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <DoDisturbAltRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Subscription ends at"
                  secondary={`${DateTime.fromISO(item.subscriptionEnd).toFormat(
                    "dd MMM, yyyy"
                  )}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
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
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <AddCardRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Max subscription amount"
                  secondary={`${item.maxSubscriptionAmount} BDT`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
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
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Min investment required (RB)"
                  secondary={`${item.minInvestmentRB} BDT`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Min investment required (NRB)"
                  secondary={`${item.minInvestmentNRB} BDT`}
                />
              </ListItem>
            </Box>
            <Divider light variant="middle" />
            <Box
              sx={{
                py: 1,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                my: 1,
              }}
            >
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <LightbulbOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Record date"
                  secondary={`${item.recordDate}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <LightbulbOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Face value"
                  secondary={`${item.faceValue} BDT`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <LightbulbOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Premium"
                  secondary={`${item.premium} BDT`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <LightbulbOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Cut off price"
                  secondary={`${item.cutOffPrice} BDT`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <LightbulbOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Discounted price"
                  secondary={`${item.discountedPrice} BDT`}
                />
              </ListItem>
            </Box>
            <Divider light variant="middle" />
            <Box
              sx={{
                py: 1,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                my: 1,
              }}
            >
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <BarChartRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="NAV (Audited)"
                  secondary={`${item.fundamentals.navAudited}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <BarChartRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="NAV (Unaudited)"
                  secondary={`${item.fundamentals.navUnaudited}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <BarChartRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="EPS (TTM)"
                  secondary={`${item.fundamentals.epsTtm}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <BarChartRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="EPS (5 years average)"
                  secondary={`${item.fundamentals.eps5yrAvg}`}
                />
              </ListItem>
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <BarChartRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="IPO share distribution"
                  secondary={`${item.fundamentals.ipoShareDistribution}`}
                />
              </ListItem>
            </Box>
            <Divider light variant="middle" />
            <Box
              sx={{
                py: 1,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                my: 1,
              }}
            >
              <ListItem sx={{ pt: 0, maxWidth: 300 }}>
                <ListItemAvatar>
                  <Avatar>
                    <PercentRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Shareholding Percentage"
                  secondary={
                    <Box>
                      <Box>
                        <Typography>
                          Institute:{" "}
                          {item.fundamentals.shareholdingPercentange.institute}%
                        </Typography>
                      </Box>
                      <Box>
                        <Typography>
                          General:{" "}
                          {item.fundamentals.shareholdingPercentange.general}%
                        </Typography>
                      </Box>
                      <Box>
                        <Typography>
                          Foreign:{" "}
                          {item.fundamentals.shareholdingPercentange.foreign}%
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
