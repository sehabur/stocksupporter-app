"use client";
import React from "react";
import { authActions, favoriteActions } from "_store";
import { useDispatch, useSelector } from "react-redux";
import { alpha } from "@mui/material/styles";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { IconButton, useTheme } from "@mui/material";
import ToastMessage from "../shared/ToastMessage";

export default function FavoriteButton({
  tradingCode,
  variant = "detailed",
}: any) {
  const dispatch = useDispatch();

  const theme: any = useTheme();

  const auth = useSelector((state: any) => state.auth);

  const favorite = useSelector((state: any) => state.favorite);

  const [isFavorite, setIsFavorite] = React.useState(
    favorite?.includes(tradingCode)
  );

  const [toastMessage, setToastMessage] = React.useState({
    text: "",
    severity: "success",
  });

  const [openToast, setOpenToast] = React.useState(false);

  const handleToastClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  const handleFavorite = async (favorite: any) => {
    if (!auth?.isLoggedIn) {
      setToastMessage({
        text: "Please login to save favorites",
        severity: "error",
      });
      setOpenToast(true);
      return;
    }

    setIsFavorite(favorite);

    const type = favorite ? "add" : "remove";

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
            tradingCode,
            type,
            userId: auth?._id,
          }),
        }
      );
      const data = await res.json();

      setToastMessage({
        text: data.message,
        severity: "success",
      });

      favorite
        ? dispatch(favoriteActions.addItemToFavorite(tradingCode))
        : dispatch(favoriteActions.removeItemFromFavorite(tradingCode));

      setOpenToast(true);
    } catch (error) {
      setToastMessage({
        text: "Something went wrong",
        severity: "error",
      });
    }
  };

  return (
    <>
      <ToastMessage
        open={openToast}
        onClose={handleToastClose}
        severity={toastMessage.severity}
        message={toastMessage.text}
      />

      {variant == "detailed" && (
        <IconButton
          aria-label="delete"
          size="small"
          sx={{
            borderRadius: 2,
            border: `1.2px solid ${
              isFavorite
                ? alpha(theme.palette.error.main, 0.5)
                : alpha(theme.palette.primary.main, 0.5)
            }`,
            bgcolor: isFavorite
              ? alpha(theme.palette.error.main, 0.07)
              : alpha(theme.palette.primary.main, 0.07),
            mr: 1.5,
            px: 1.1,
            py: 1.1,
          }}
          onClick={() => handleFavorite(!isFavorite)}
        >
          {isFavorite ? (
            <FavoriteOutlinedIcon color="error" />
          ) : (
            <FavoriteBorderRoundedIcon color="primary" />
          )}
        </IconButton>
      )}
      {variant == "iconOnly" && (
        <IconButton size="small" onClick={() => handleFavorite(!isFavorite)}>
          {isFavorite ? (
            <FavoriteOutlinedIcon
              color="error"
              fontSize="small"
              sx={{ fontSize: 18 }}
            />
          ) : (
            <FavoriteBorderRoundedIcon
              color="primary"
              fontSize="small"
              sx={{ fontSize: 18 }}
            />
          )}
        </IconButton>
      )}
    </>
  );
}
