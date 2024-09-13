"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";

export default function SeeMoreButton({ href, title }: any) {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    router.push(href);
    dispatch(pageTitleActions.setPageTitle(title));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        onClick={() => handleButtonClick()}
        color="primary"
        endIcon={<EastRoundedIcon />}
        sx={{
          fontSize: "1rem",
          py: 1,
          ":hover": {
            bgcolor: "transparent",
          },
        }}
      >
        See More
      </Button>
    </Box>
  );
}
