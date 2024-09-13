"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
  IconButton,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { favoriteActions, pageTitleActions } from "_store";
import ToastMessage from "@/components/shared/ToastMessage";
import MobileViewPriceCard from "@/components/cards/MobileViewPriceCard";
import SigninDialogContent from "@/components/shared/SigninDialogContent";
import { useRouter } from "next/navigation";
import { AUTO_RELOAD_TIME_MS } from "@/data/constants";

export default function Favorites() {
  const router = useRouter();

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("Favorites"));

  const auth = useSelector((state: any) => state.auth);

  const favorite = useSelector((state: any) => state.favorite);

  const latestPrice = useSelector((state: any) => state.latestPrice);

  const [favStock, setFavStock] = React.useState<any>([]);

  const [favStockCard, setFavStockCard] = React.useState<any>([]);

  const [toastOpen, setToastOpen] = React.useState(false);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [toastMessage, setToastMessage] = React.useState("");

  console.log(favorite, favStockCard);

  const handleLogoutToastColse = () => {
    setToastOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddStock = (e: any, newvalue: any, reason: any) => {
    if (reason == "selectOption") {
      setFavStock((prevstate: any) => [...prevstate, newvalue]);
    }
  };

  const handleDeleteItem = (tradingCode: string) => {
    setFavStock((prevstate: any) =>
      prevstate.filter((item: any) => item.tradingCode !== tradingCode)
    );
  };

  const handleSaveItems = async () => {
    const addItems = favStock.map((option: any) => option.tradingCode);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/favorite`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
          body: JSON.stringify({
            tradingCode: addItems,
            type: "bulk_add",
            userId: auth?._id,
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        dispatch(favoriteActions.resetFavoritesWithNewValue(addItems));
        setToastOpen(true);
        setToastMessage(data.message);
        setFavStockCard(favStock);
      } else {
        setToastOpen(true);
        setToastMessage("Something went wrong");
      }
      handleDialogClose();
    } catch (error) {
      setToastOpen(true);
      setToastMessage("Something went wrong");
      handleDialogClose();
    }
  };

  React.useEffect(() => {
    if (!dialogOpen) {
      const favs = latestPrice.filter((item: any) =>
        favorite.includes(item.tradingCode)
      );
      setFavStock(favs);
      setFavStockCard(favs);
    }
  }, [favorite, latestPrice]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!dialogOpen) {
        const { pathname, search } = window.location;
        router.push(
          `/reload?redirect=${encodeURIComponent(pathname + search)}`
        );
      }
    }, AUTO_RELOAD_TIME_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <ToastMessage
        open={toastOpen}
        onClose={handleLogoutToastColse}
        severity="success"
        message={toastMessage}
      />
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
        disableScrollLock={true}
      >
        <DialogTitle sx={{ fontWeight: 700, pr: 6 }}>
          Edit my favorites
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ py: 2, px: { xs: 2, sm: 4 } }}>
            <Autocomplete
              onChange={handleAddStock}
              options={latestPrice}
              getOptionLabel={(option: any) => option.tradingCode}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Stock"
                  placeholder="Select to add items to your list"
                />
              )}
            />
            <List>
              {favStock?.map((stock: any, index: number) => (
                <ListItem
                  sx={{
                    bgcolor: "appCardBgColor",
                    borderRadius: 2,
                    mb: 0.7,
                  }}
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon
                        onClick={() => handleDeleteItem(stock.tradingCode)}
                      />
                    </IconButton>
                  }
                >
                  {/* <ListItemIcon>
                    <CheckCircleOutlineOutlinedIcon color="success" />
                  </ListItemIcon> */}

                  <ListItemText primary={stock?.tradingCode} />
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions sx={{ py: 2, pr: 5 }}>
          <Button
            onClick={handleDialogClose}
            variant="outlined"
            color="primary"
            sx={{ mr: 1, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveItems}
            sx={{ px: 4 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {!auth?.isLoggedIn && (
        <Box sx={{ px: 2, py: 4 }}>
          <SigninDialogContent />
        </Box>
      )}

      {auth?.isLoggedIn && (
        <>
          <Box>
            {favStockCard?.map((stock: any, index: number) => (
              <MobileViewPriceCard item={stock} key={index} />
            ))}
          </Box>

          {favStockCard?.length < 1 && (
            <Box sx={{ textAlign: "center", py: 4, px: 1 }}>
              <Typography
                color="text.primary"
                sx={{ fontSize: "1.3rem", mb: 2 }}
              >
                No items in favorite
              </Typography>
              <Typography color="text.primary" sx={{ fontSize: "1rem" }}>
                Add your favorite and target items in your favorite list to
                track them with ease
              </Typography>
            </Box>
          )}

          <Box sx={{ my: 1.5, display: "flex", justifyContent: "flex-end" }}>
            <Button
              startIcon={
                favStockCard?.length < 1 ? (
                  <AddRoundedIcon />
                ) : (
                  <EditNoteRoundedIcon />
                )
              }
              size="small"
              onClick={() => setDialogOpen(true)}
              variant="outlined"
              sx={{ px: 2 }}
            >
              {favStockCard?.length < 1 ? "Add new items" : "Edit list"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
