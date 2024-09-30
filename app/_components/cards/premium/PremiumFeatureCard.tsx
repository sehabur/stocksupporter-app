import React from "react";

import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

export default function PremiumFeatureCard({ item }: any) {
  return (
    <>
      <Card
        sx={{ borderRadius: 2, bgcolor: "background.default" }}
        variant="outlined"
      >
        <CardContent sx={{ pb: 0, pl: 3 }}>
          <Avatar
            sx={{
              bgcolor: item.color,
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ mt: 1.3 }}>
            <Typography
              gutterBottom
              color="text.primary"
              sx={{ fontSize: "1.2rem" }}
            >
              {item.title}
            </Typography>
            <Typography color="text.secondary" fontSize="1rem">
              {item.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
