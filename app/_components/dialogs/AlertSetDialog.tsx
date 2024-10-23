"use client";
import React from "react";
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  Autocomplete,
  TextField,
  DialogActions,
  Dialog,
  MenuItem,
} from "@mui/material";
import ToastMessage from "../shared/ToastMessage";
import { useSelector } from "react-redux";

export default function AlertSetDialog({
  tradingCode = null,
  addItemToCurrAlerts = () => {},
  handleDialogClose,
  dialogOpen,
}: any) {
  const formInputsInitState = {
    price: "",
    tradingCode: tradingCode || "",
    type: "",
  };

  const auth = useSelector((state: any) => state.auth);

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const [toastOpen, setToastOpen] = React.useState(false);

  const [toastMessage, setToastMessage] = React.useState({
    severity: "",
    text: "",
  });

  const [formInputs, setFormInputs] = React.useState(formInputsInitState);

  function handleInputChange(e: any) {
    setFormInputs((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSelectStock = (e: any, newvalue: any, reason: any) => {
    if (reason == "selectOption") {
      setFormInputs((prevState: any) => ({
        ...prevState,
        tradingCode: newvalue.tradingCode,
      }));
    }
  };

  const handleSaveAlerts = async () => {
    try {
      // if (currAlerts?.length >= 3) {
      //   setToastOpen(true);
      //   setToastMessage({
      //     severity: "warning",
      //     text: "Max alert limit reached",
      //   });
      //   return;
      // }

      if (!auth?.isLoggedIn) {
        setToastMessage({
          text: "Please login to save favorites",
          severity: "error",
        });
        setToastOpen(true);
        return;
      }

      const newItem = {
        tradingCode: formInputs.tradingCode,
        type: formInputs.type,
        price: formInputs.price,
        details: "When price goes " + formInputs.type + " " + formInputs.price,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/priceAlerts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
          body: JSON.stringify(newItem),
        }
      );
      if (res.ok) {
        const data = await res.json();

        addItemToCurrAlerts(data);
        setFormInputs(formInputsInitState);
        setToastOpen(true);

        setToastMessage({
          severity: "success",
          text: "Alert successfully added!",
        });
      } else {
        setToastOpen(true);
        setToastMessage({
          severity: "error",
          text: "Something went wrong",
        });
      }
      handleDialogClose();
    } catch (error) {
      setToastOpen(true);
      setToastMessage({
        severity: "error",
        text: "Something went wrong",
      });
      handleDialogClose();
    }
  };

  const handleToastColse = () => {
    setToastOpen(false);
  };

  return (
    <>
      <ToastMessage
        open={toastOpen}
        onClose={handleToastColse}
        severity={toastMessage.severity}
        message={toastMessage.text}
        autoHideDuration={2000}
      />
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
        disableScrollLock={true}
      >
        <DialogTitle sx={{ fontWeight: 700, pr: 6 }}>Set new alert</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mt: 1, mb: 1 }}>
            <Box sx={{ mb: 2 }}>
              <Autocomplete
                onChange={handleSelectStock}
                options={latestPrice.filter(
                  (item: any) => item.type === "stock"
                )}
                value={latestPrice.find(
                  (option: any) => option.tradingCode === formInputs.tradingCode
                )}
                getOptionLabel={(option: any) => option.tradingCode}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Stock"
                    placeholder="Select to add items to your list"
                  />
                )}
              />
            </Box>
            <TextField
              select
              fullWidth
              required
              label="When price goes"
              name="type"
              value={formInputs.type}
              onChange={handleInputChange}
            >
              <MenuItem value="above">Above</MenuItem>
              <MenuItem value="below">Below</MenuItem>
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Price"
              name="price"
              type="number"
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ my: 1, mr: 2 }}>
          <Button
            onClick={handleDialogClose}
            variant="outlined"
            color="primary"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveAlerts}
            color="primary"
            sx={{ px: 3.3 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
