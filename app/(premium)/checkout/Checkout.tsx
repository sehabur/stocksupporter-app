"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { App } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
// import { InAppBrowser, DefaultWebViewOptions } from "@capacitor/inappbrowser";
import { getUser } from "_helper/dataFetch";
import { authActions } from "_store";

export default function Checkout() {
  const auth = useSelector((state: any) => state.auth);

  const searchParams = useSearchParams();

  const router = useRouter();

  const dispatch = useDispatch();

  const price = searchParams.get("price");
  const product = searchParams.get("product");
  const validity = searchParams.get("validity");
  const otp = searchParams.get("otp");

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/init?product=${product}&otp=${otp}&platform=app`,
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
        // router.push(data.url);
        openExternalLink(data.url);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  const openExternalLink = async (url: string) => {
    // await InAppBrowser.openInWebView({
    //   url: "https://www.google.com",
    //   options: DefaultWebViewOptions,
    // });
    // await InAppBrowser.addListener("browserClosed", () => {
    //   console.log("browser was closed.");
    // });
    // await InAppBrowser.addListener("browserPageLoaded", () => {
    //   console.log("browser was loaded.");
    // });

    await Browser.open({ url });

    // App.addListener("appUrlOpen", (data) => {
    //   setErrorMessage(url);
    //   if (url.includes("https://www.stocksupporter.com")) {
    //     getUser().then((data) => {
    //       dispatch(authActions.login(data));
    //       Browser.close();
    //     });
    //   }
    // });

    Browser.addListener("browserFinished", () => {
      getUser().then((data) => dispatch(authActions.login(data)));
    });
  };

  React.useEffect(() => {
    return () => {
      Browser.removeAllListeners();
    };
  }, []);

  return (
    <>
      <Box sx={{ px: 2, pb: 4, pt: 2, maxWidth: 400, mx: "auto" }}>
        {errorMessage && (
          <Alert sx={{ mt: 1 }} severity="error">
            {errorMessage}
          </Alert>
        )}
        <Box
          sx={{
            textAlign: "center",
            mt: 2,
            mb: 2,
            py: 1,
            bgcolor: "financeCardTitlecolor",
            borderRadius: 1,
          }}
        >
          <Typography
            color="primary.main"
            sx={{
              fontSize: "1.3rem",
              fontWeight: 700,
              fontFamily: "'Nunito Sans', sans-serif",
            }}
          >
            {price} BDT for {validity}
          </Typography>
        </Box>

        <Box>
          <img
            src="/images/ssl-banner.jpg"
            width="100%"
            style={{ borderRadius: "4px" }}
          />
        </Box>

        <Box sx={{ mt: 2 }} component="form" onSubmit={handleSubmit}>
          <FormGroup>
            <FormControlLabel
              required
              control={<Checkbox />}
              label={
                <Box
                  sx={{
                    display: "flex",
                    color: "text.primary",
                  }}
                >
                  <Typography>
                    I have read and agree to the{" "}
                    <Typography
                      component={Link}
                      sx={{
                        textDecoration: "underline",
                        color: "primary.main",
                      }}
                      href="/terms"
                    >
                      Terms & Conditions
                    </Typography>
                    ,{" "}
                    <Typography
                      component={Link}
                      sx={{
                        textDecoration: "underline",
                        color: "primary.main",
                      }}
                      href="/privacy-policy"
                    >
                      Privacy Policy
                    </Typography>{" "}
                    and{" "}
                    <Typography
                      component={Link}
                      sx={{
                        textDecoration: "underline",
                        color: "primary.main",
                      }}
                      href="/refund-policy"
                    >
                      Refund Policy
                    </Typography>
                  </Typography>
                </Box>
              }
            />
          </FormGroup>
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 4 }}>
            Pay now
          </Button>
        </Box>
      </Box>
    </>
  );
}
