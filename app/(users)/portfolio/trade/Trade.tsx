"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import SearchStockCard from "@/components/cards/SearchStockCard";
import Spinner from "@/components/shared/Spinner";
import ToastMessage from "@/components/shared/ToastMessage";
import { useSearchParams } from "next/navigation";

export default function Trade() {
  const searchParams = useSearchParams();

  const portfolio = searchParams.get("portfolio");
  const comm = searchParams.get("comm");

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const [searchResult, setSearchResult] = useState(latestPrice);

  const [formInputs, setFormInputs] = useState({
    price: "",
    quantity: "",
    tradingCode: "",
    portfolioId: portfolio,
    commission: comm,
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [message, setMessage] = React.useState({
    text: "",
    severity: "",
  });

  const [toastMessageOpen, setToastMessageOpen] = React.useState(false);

  const auth = useSelector((state: any) => state.auth);

  const [searchResultFallbackText, setSearchResultFallbackText] = useState("");

  const handleToastClose = (event: any) => {
    setToastMessageOpen(false);
  };

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const getSharesBySearch = async (init = false) => {
    const initdata = latestPrice || [];
    const data = initdata.filter(
      (item: any) =>
        item.tradingCode?.search(new RegExp(searchText, "i")) !== -1 ||
        item.companyName?.search(new RegExp(searchText, "i")) !== -1
    );
    if (data.length === 0) {
      setSearchResultFallbackText("No results found");
    } else {
      setSearchResultFallbackText("");
      setSearchResult(data);
    }
  };

  function handleTradeOpen(tradingCode: string) {
    const close = latestPrice.find(
      (item: any) => item.tradingCode === tradingCode
    ).close;
    setDialogOpen(true);
    setFormInputs((prevState: any) => ({
      ...prevState,
      tradingCode,
      price: close,
    }));
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setMessage({
      text: "",
      severity: "",
    });
  }

  function handleInputChange(e: any) {
    setFormInputs((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/trade/${formInputs.type}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
          body: JSON.stringify(formInputs),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage({
          text: "Request execution successful",
          severity: "success",
        });
      } else {
        setMessage({
          text: data.message || "Something went wrong",
          severity: "error",
        });
      }
      setDialogOpen(false);
      setIsLoading(false);
      setToastMessageOpen(true);
    } catch (error) {
      setMessage({
        text: "Something went wrong",
        severity: "error",
      });
      setIsLoading(false);
      setIsLoading(false);
      setToastMessageOpen(true);
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      const debounceFn = setTimeout(() => {
        getSharesBySearch();
      }, 500);
      return () => clearTimeout(debounceFn);
    }
  }, [searchText]);

  useEffect(() => {
    setSearchResult(latestPrice);
  }, [latestPrice]);

  return (
    <Box>
      {isLoading && <Spinner />}
      <TextField
        name="searchText"
        fullWidth
        autoFocus
        value={searchText}
        size="small"
        variant="filled"
        onChange={handleSearchTextChange}
        sx={{ fontSize: "1.1rem", mb: 1.5 }}
        placeholder="Search stocks"
      />

      {searchResult
        .filter((item: any) => item.type === "stock")
        .map((item: any) => (
          <Box
            key={item.tradingCode}
            onClick={() => handleTradeOpen(item.tradingCode)}
            sx={{
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            <SearchStockCard
              data={item}
              navigation={false}
              favoriteButton={false}
            />
          </Box>
        ))}

      <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
        {searchResultFallbackText}
      </Typography>

      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Share buy/sell request
        </DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent dividers sx={{ px: 4, py: 4 }}>
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              alignContent="stretch"
              wrap="wrap"
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Trading Code"
                  name="tradingCode"
                  inputProps={{
                    readOnly: true,
                  }}
                  value={formInputs.tradingCode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={formInputs.quantity}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Price"
                  name="price"
                  type="number"
                  value={formInputs.price}
                  onChange={handleInputChange}
                  helperText="Latest trading price"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Commission (%)"
                  name="commission"
                  value={formInputs.commission}
                  inputProps={{
                    readOnly: true,
                  }}
                  helperText="You have set it during portfolio creation"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  id="outlined-select-currency"
                  fullWidth
                  required
                  label="Trade type"
                  name="type"
                  value={formInputs.type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="buy">Buy</MenuItem>
                  <MenuItem value="sell">Sell</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ my: 1, mr: 3 }}>
            <Button
              onClick={handleDialogClose}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <ToastMessage
        open={toastMessageOpen}
        onClose={handleToastClose}
        severity={message.severity}
        message={message.text}
      />
    </Box>
  );
}
