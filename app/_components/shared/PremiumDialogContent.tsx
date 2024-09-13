"use client";
import { Box, Typography, Button, Avatar } from "@mui/material";

import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { pageTitleActions } from "_store";

export default function PremiumDialogContent(props: any) {
  const auth = useSelector((state: any) => state.auth);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleButtonClick = (href: string, title: string) => {
    router.push(href);
    dispatch(pageTitleActions.setPageTitle(title));
  };

  return (
    <Box sx={{ maxWidth: "500px", mx: "auto", px: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{ width: 50, height: 50, bgcolor: "text.secondary", mb: 2 }}
        >
          <WorkspacePremiumOutlinedIcon sx={{ fontSize: 35 }} />
        </Avatar>
        <Typography
          sx={{
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "text.primary",
            lineHeight: 1.1,
            mb: 1,
          }}
        >
          Premium feature
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "text.primary",
            lineHeight: 1.4,
          }}
        >
          Please subscribe to one of our premium packages to access this feature
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography
          sx={{
            fontSize: "1rem",
            textAlign: "justify",
            color: "text.primary",
          }}
        >
          Elevate your investing potential with a Premium membership. Gain
          personalised and actionable insights with enhanced features to
          maximize your investments!
        </Typography>
      </Box>

      <Box>
        <Button
          variant="contained"
          sx={{ py: 1.3, px: 4, fontSize: "1.1rem" }}
          fullWidth
          onClick={() =>
            handleButtonClick(
              auth?.isLoggedIn ? "/pricing" : "/signup",
              auth?.isLoggedIn ? "Pricing" : "Sign up"
            )
          }
        >
          Start 14 days free trial
        </Button>
      </Box>
    </Box>
  );
}
