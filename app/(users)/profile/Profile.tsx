"use client";
import React from "react";

import Link from "next/link";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

export default function Profile() {
  const auth = useSelector((state: any) => state.auth);

  return (
    <>
      <Box>
        {auth && (
          <>
            <Box sx={{ mb: 2, mt: 1 }}>
              <Avatar sx={{ width: 50, height: 50 }} />
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ fontSize: "1.5rem", fontWeight: 500, mt: 1 }}
              >
                {auth.name || "User"}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ my: 2 }}>
              <Typography
                color="text.secondary"
                sx={{ mb: 2, fontSize: "1rem" }}
              >
                Contact information
              </Typography>

              <Typography color="text.primary" sx={{ mt: 1 }}>
                Email: {auth.email || "No email"}
              </Typography>
              <Typography color="text.primary" sx={{ mt: 1 }}>
                Phone: {auth.phone || "No phone number"}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ my: 2 }}>
              <Typography
                sx={{ mb: 2, fontSize: "1rem" }}
                color="text.secondary"
                gutterBottom
              >
                Account type
              </Typography>
              {auth?.isPremium ? (
                <>
                  <Chip
                    size="small"
                    icon={<WorkspacePremiumRoundedIcon />}
                    label="PREMIUM"
                    color="warning"
                    variant="outlined"
                    sx={{ px: 0.6, py: 1 }}
                  />
                  <Typography color="text.primary" sx={{ mt: 2 }}>
                    Exipre on:{" "}
                    {DateTime.fromISO(auth?.premiumExpireDate).toFormat(
                      "dd MMM, yyyy"
                    )}
                  </Typography>
                </>
              ) : (
                <>
                  <Chip
                    icon={<CheckCircleOutlineRoundedIcon />}
                    label="FREE"
                    color="success"
                    variant="outlined"
                  />
                </>
              )}
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 4 }}>
              <Button
                size="small"
                component={Link}
                href="/profile/edit"
                variant="contained"
                color="primary"
                sx={{ px: 2, py: 0.8 }}
              >
                Edit profile
              </Button>
              {!auth?.isPremium && (
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  color="warning"
                  sx={{ px: 2, py: 0.8 }}
                >
                  Get Premium
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
