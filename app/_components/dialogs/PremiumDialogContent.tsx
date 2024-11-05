"use client";
import { Box, Typography, Button, Avatar, Paper } from "@mui/material";

import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function PremiumDialogContent(props: any) {
  const { details = true } = props;

  const auth = useSelector((state: any) => state.auth);

  const router = useRouter();

  const handleButtonClick = (href: string) => {
    router.push(href);
  };

  return (
    <Paper
      variant="outlined"
      sx={{ maxWidth: "500px", mx: "auto", px: 3, py: 3, borderRadius: 3 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Avatar sx={{ bgcolor: "text.secondary", mb: 3 }}>
          <WorkspacePremiumOutlinedIcon sx={{ fontSize: 25 }} />
        </Avatar>
        <Typography
          sx={{
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "text.primary",
            lineHeight: 1.1,
            mb: 2.5,
          }}
        >
          Premium Content
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "text.secondary",
            lineHeight: 1.5,
          }}
        >
          Please subscribe to premium package to access this feature
        </Typography>
      </Box>

      {details && (
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: ".875rem",
              textAlign: "left",
              color: "text.primary",
            }}
          >
            Elevate your investing potential with a Premium membership. Get more
            personalised information and actionable insights with enhanced
            features to maximize your investments!
          </Typography>
        </Box>
      )}

      <Box>
        <Button
          variant="contained"
          sx={{ py: 1.3, px: 4, mt: 1, fontSize: "1.1rem" }}
          fullWidth
          onClick={() => handleButtonClick("/pricing")}
        >
          Start 14 days free trial
        </Button>
      </Box>
    </Paper>
  );
}
