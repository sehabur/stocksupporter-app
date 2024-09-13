"use client";
import React, { useState } from "react";
import { Box, Button, Typography, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useDispatch, useSelector } from "react-redux";
import { pageTitleActions } from "_store";
import ToastMessage from "@/components/shared/ToastMessage";
import SigninDialogContent from "@/components/shared/SigninDialogContent";
import Link from "next/link";
import AlertSetDialog from "@/components/shared/AlertSetDialog";

const formInputsInitState = {
  price: "",
  tradingCode: "",
  type: "",
};

export default function Alerts() {
  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("Price alerts"));

  const auth = useSelector((state: any) => state.auth);

  const [currAlerts, setcurrAlerts] = useState([]);

  const [formInputs, setFormInputs] = useState(formInputsInitState);

  // const latestPrice = useSelector((state: any) => state.latestPrice);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [toastOpen, setToastOpen] = React.useState(false);

  // console.log(currAlerts);

  const [toastMessage, setToastMessage] = React.useState({
    severity: "",
    text: "",
  });

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleToastColse = () => {
    setToastOpen(false);
  };

  // function handleInputChange(e: any) {
  //   setFormInputs((prevState: any) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // }

  // const handleSelectStock = (e: any, newvalue: any, reason: any) => {
  //   if (reason == "selectOption") {
  //     setFormInputs((prevState: any) => ({
  //       ...prevState,
  //       tradingCode: newvalue.tradingCode,
  //     }));
  //   }
  // };

  const addItemToCurrAlerts = (payload: any) => {
    setcurrAlerts((prevState: any) => {
      let newstate = prevState;
      newstate.push(payload);
      return newstate;
    });
  };

  const removeItemFromCurrAlerts = (id: string) => {
    setcurrAlerts((prevState: any) => {
      const newState = prevState.filter((item: any) => item._id !== id);
      return newState;
    });
  };

  const handleDeleteAlert = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/priceAlerts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (res.ok) {
        removeItemFromCurrAlerts(id);
        setToastOpen(true);
        setToastMessage({
          severity: "success",
          text: "Alert successfully deleted!",
        });
      } else {
        setToastOpen(true);
        setToastMessage({
          severity: "error",
          text: "Something went wrong",
        });
      }
    } catch (error) {
      setToastOpen(true);
      setToastMessage({
        severity: "error",
        text: "Something went wrong",
      });
    }
  };

  // const handleSaveAlerts = async () => {
  //   try {
  //     if (currAlerts?.length >= 3) {
  //       setToastOpen(true);
  //       setToastMessage({
  //         severity: "warning",
  //         text: "Max alert limit reached",
  //       });
  //       return;
  //     }

  //     const newItem = {
  //       tradingCode: formInputs.tradingCode,
  //       type: formInputs.type,
  //       price: formInputs.price,
  //       details: "When price goes " + formInputs.type + " " + formInputs.price,
  //     };

  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/priceAlerts`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${auth?.token}`,
  //         },
  //         body: JSON.stringify(newItem),
  //       }
  //     );
  //     if (res.ok) {
  //       const data = await res.json();
  //       addItemToCurrAlerts(data);
  //       setFormInputs(formInputsInitState);
  //       setToastOpen(true);
  //       setToastMessage({
  //         severity: "success",
  //         text: "Alert successfully added!",
  //       });
  //     } else {
  //       setToastOpen(true);
  //       setToastMessage({
  //         severity: "error",
  //         text: "Something went wrong",
  //       });
  //     }
  //     handleDialogClose();
  //   } catch (error) {
  //     setToastOpen(true);
  //     setToastMessage({
  //       severity: "error",
  //       text: "Something went wrong",
  //     });
  //     handleDialogClose();
  //   }
  // };

  const getAlerts = async () => {
    if (!auth) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/priceAlerts/user/${auth?._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const initdata = await res.json();

    setcurrAlerts(initdata.priceAlerts);
  };

  React.useEffect(() => {
    getAlerts();
  }, [auth]);

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <ToastMessage
        open={toastOpen}
        onClose={handleToastColse}
        severity={toastMessage.severity}
        message={toastMessage.text}
        autoHideDuration={2000}
      />
      <AlertSetDialog
        addItemToCurrAlerts={addItemToCurrAlerts}
        handleDialogClose={handleDialogClose}
        dialogOpen={dialogOpen}
      />
      {!auth?.isLoggedIn && (
        <Box sx={{ px: 2, py: 4 }}>
          <SigninDialogContent />
        </Box>
      )}
      {auth?.isLoggedIn && (
        <>
          <Paper
            variant="outlined"
            sx={{ mt: 1, px: 2, py: 1.5, bgcolor: "priceCardBgColor" }}
          >
            <Typography gutterBottom sx={{ color: "text.secondary" }}>
              You can set maximum 10 price alerts.
            </Typography>
            <Typography sx={{ color: "text.primary" }}>
              For setting unlimited alert please get our premuim packages
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Button
                variant="outlined"
                size="small"
                sx={{ fontSize: ".9rem", px: 3 }}
              >
                Get premium
              </Button>
            </Box>
          </Paper>

          <Typography
            sx={{
              pl: 0.5,
              fontSize: "1rem",
              color: "text.primary",
              mb: 1,
              mt: 4,
            }}
          >
            My Alerts
          </Typography>

          <Box sx={{ mt: 1.5 }}>
            {currAlerts?.length > 0 ? (
              <>
                {currAlerts?.map((alert: any) => (
                  <Paper
                    variant="outlined"
                    key={alert._id}
                    sx={{
                      pl: 2,
                      pr: 1,
                      py: 0.8,
                      mb: 1,
                      bgcolor: "priceCardBgColor",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Typography
                        component={Link}
                        href={`/stock-details/${alert.tradingCode}`}
                        sx={{
                          color: "primary.main",
                          fontSize: "1rem",
                        }}
                      >
                        {alert.tradingCode}
                      </Typography>
                      <Typography
                        sx={{
                          color: "text.secondary",
                          fontSize: ".9rem",
                          lineHeight: 1.2,
                        }}
                      >
                        {alert.details}
                      </Typography>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteAlert(alert._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
              </>
            ) : (
              <Box sx={{ pb: 2, pl: 0.5 }}>
                <Typography sx={{ color: "text.secondary" }}>
                  Currently no price alert is set.
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ mt: 1.5 }}>
            <Button
              startIcon={<AddRoundedIcon />}
              variant="contained"
              onClick={handleDialogOpen}
            >
              Set new alert
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
