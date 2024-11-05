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
  Paper,
  Typography,
} from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import SigninDialogContent from "@/components/dialogs/SigninDialogContent";

export default function Profile() {
  const auth = useSelector((state: any) => state.auth);

  return (
    <>
      {!auth?.isLoggedIn && (
        <Box sx={{ px: 2, py: 4 }}>
          <SigninDialogContent redirect="/profile" />
        </Box>
      )}

      <Box>
        {auth?.isLoggedIn && (
          <>
            <Box sx={{ mb: 2, mt: 1 }}>
              <Avatar sx={{ width: 50, height: 50 }} />
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ fontSize: "1.5rem", fontWeight: 500, mt: 2 }}
              >
                {auth.name || "User"}
              </Typography>
            </Box>

            {/* <Divider /> */}

            <Paper
              variant="outlined"
              sx={{ mt: 3, mb: 3, p: 2, borderRadius: 3 }}
            >
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
            </Paper>

            {/* <Divider /> */}

            <Paper variant="outlined" sx={{ my: 2, p: 2, borderRadius: 3 }}>
              <Typography
                sx={{ mb: 2, fontSize: "1rem" }}
                color="text.secondary"
                gutterBottom
              >
                Account type
              </Typography>
              {auth?.isPremiumEligible ? (
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
                    size="small"
                    icon={<CheckCircleOutlineRoundedIcon />}
                    label="FREE"
                    color="success"
                    variant="outlined"
                    sx={{ px: 0.6, py: 1 }}
                  />
                </>
              )}
            </Paper>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
              <Button
                size="small"
                component={Link}
                href="/profile/edit"
                variant="outlined"
                color="primary"
                sx={{ px: 2, py: 0.8 }}
              >
                Edit profile
              </Button>
              {!auth?.isPremiumEligible && (
                <Button
                  component={Link}
                  href="/pricing"
                  variant="contained"
                  color="primary"
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
