import React from "react";

import { Grid, Typography, Box } from "@mui/material";

import StackedBarChartRoundedIcon from "@mui/icons-material/StackedBarChartRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";

import PremiumFeatureCard from "@/components/cards/premium/PremiumFeatureCard";

const features = [
  {
    icon: <DoNotDisturbAltOutlinedIcon />,
    title: "No Advertisement",
    description: "No buzzing advertisements while you are working",
    color: "#e74c3c",
  },
  {
    icon: <AccountBalanceRoundedIcon />,
    title: "Fundamental Analysis",
    description: "Fundamental data analysis and visualization for all stocks",
    color: "#1abc9c",
  },
  {
    icon: <StackedBarChartRoundedIcon />,
    title: "Technical Analysis",
    description: "Better insight with tailored technical analysis",
    color: "#3498db",
  },
  {
    icon: <FilterAltOutlinedIcon />,
    title: "Advanced Screener",
    description: "Stay ahead with our advanced screener having 65+ filters",
    color: "#27ae60",
  },
  {
    icon: <TuneRoundedIcon />,
    title: "Custom Indicators",
    description: "Custom made indicators to make your analysis easier",
    color: "#9b59b6",
  },
  {
    icon: <AlarmOutlinedIcon />,
    title: "Price Alerts",
    description: "Unlimited price alerts to keep you updated",
    color: "#f39c12",
  },
];

export default function Features() {
  return (
    <Box sx={{ bgcolor: "homepageBackground", pt: 2, pb: 2 }}>
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          pb: 2,
          bgcolor: "homepageBackground",
        }}
      >
        <Typography
          color="text.primary"
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.8rem" },
            fontWeight: 700,
            color: "text.primary",
            mb: 3,
            mt: 3,
            textAlign: "center",
          }}
        >
          Our Premium Features
        </Typography>
        <Box sx={{ px: 2 }}>
          <Grid container spacing={2}>
            {features.map((item: any, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <PremiumFeatureCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
