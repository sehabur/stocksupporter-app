"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useRouter } from "next/navigation";

export default function SeeMoreButton({ href }: any) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(href);
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
