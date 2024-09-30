"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Alert, Box } from "@mui/material";

import PricingCard from "@/components/cards/premium/PricingCard";
import FreeTrialCard from "@/components/cards/premium/FreeTrialCard";

export default function Pricing() {
  const auth = useSelector((state: any) => state.auth);

  const router = useRouter();

  const [packages, setpackages] = React.useState([]);

  const [errorMessage, setErrorMessage] = React.useState("");

  async function getPackageData() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/packages`,
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
    const data = await res.json();
    setpackages(data);
  }

  const handleCardClick = async (event: any, itemInfo: any) => {
    event.preventDefault();
    try {
      const queryString = new URLSearchParams(itemInfo).toString();

      if (!auth?.isLoggedIn) {
        router.push(
          `/signin?redirect=${encodeURIComponent(
            "/verify-phone?" + queryString
          )}&action=generate_otp`
        );
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/generateOtp`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        router.push(`/verify-phone?${queryString}`);
      } else {
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  React.useEffect(() => {
    getPackageData();
  }, []);

  return (
    <>
      {errorMessage && (
        <Box
          sx={{
            maxWidth: 400,
            mx: "auto",
            mb: 1,
          }}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <Box>
          <FreeTrialCard
            data={packages?.find((item: any) => item.product === "free_trial")}
            handleCardClick={handleCardClick}
          />
          {packages
            ?.filter((item: any) => item.product !== "free_trial")
            .map((item: any, index: number) => (
              <PricingCard
                handleCardClick={handleCardClick}
                data={item}
                key={index}
              />
            ))}
        </Box>
      </Box>
    </>
  );
}
