"use client";
import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";

import { Paper, Box, Typography, Button, Avatar } from "@mui/material";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

export default function Ipo(props: any) {
  const { data } = props;

  return (
    <Box sx={{ px: 2, pt: 2 }}>
      <Button
        component={Link}
        href="/ipo"
        color="primary"
        endIcon={<ArrowForwardIosRoundedIcon />}
        sx={{
          fontSize: "1.4rem",
          fontWeight: 700,
          ":hover": {
            bgcolor: "transparent",
            color: "primary.main",
            textDecoration: "underline",
          },
        }}
      >
        Upcoming IPO
      </Button>

      <Box>
        {data
          .filter((item: any) => new Date(item.subscriptionEnd) >= new Date())
          .map((item: any, index: number) => (
            <Paper
              sx={{
                mt: 2,
                mb: { xs: 2, sm: 3 },
                pt: { xs: 1.4, sm: 2.5 },
                pb: { xs: 0.5, sm: 1.5 },
                px: { xs: 1, sm: 2 },
                borderRadius: 2,
                ":hover": {
                  bgcolor: "secondaryBackground",
                  cursor: "pointer",
                },
                mr: { xs: 0, sm: 4 },
              }}
              elevation={6}
              key={index}
            >
              <Box component={Link} href={`/ipo/details?id=${item._id}`}>
                <Typography
                  noWrap
                  sx={{
                    color: "primary.main",
                    fontSize: "1.2rem",
                    mx: 1,
                    mt: 0.5,
                  }}
                >
                  {item.companyName}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ListItem
                    sx={{ px: 1, py: 0.5, width: { xs: 160, sm: 210 } }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PlayCircleOutlineRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Starts from"
                      secondary={`${DateTime.fromISO(
                        item.subscriptionStart
                      ).toFormat("dd MMM, yyyy")}`}
                    />
                  </ListItem>
                  <ListItem
                    sx={{ px: 1, py: 0.5, width: { xs: 160, sm: 210 } }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <DoDisturbAltRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Ends at"
                      secondary={`${DateTime.fromISO(
                        item.subscriptionStart
                      ).toFormat("dd MMM, yyyy")}`}
                    />
                  </ListItem>
                  <ListItem
                    sx={{ px: 1, py: 0.5, width: { xs: 160, sm: 210 } }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <AddCardRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Min amount"
                      secondary={`${item.minSubscriptionAmount} BDT`}
                    />
                  </ListItem>
                  <ListItem
                    sx={{ px: 1, py: 0.5, width: { xs: 160, sm: 210 } }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <AccountBalanceRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Min invest"
                      secondary={`${item.minInvestmentRB} BDT`}
                    />
                  </ListItem>
                </Box>
                <Box sx={{ textAlign: "left", ml: 0.5 }}>
                  <Button
                    variant="text"
                    size="small"
                    disableRipple
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
            </Paper>
          ))}
        {data.filter(
          (item: any) => new Date(item.subscriptionEnd) >= new Date()
        ).length < 1 && (
          <Box
            sx={{
              ml: 1.2,
              pt: 2,
              pb: 2,
            }}
          >
            <Typography color="text.primary">
              No upcoming IPO to display.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
