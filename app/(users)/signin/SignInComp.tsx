"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton, InputAdornment } from "@mui/material";
import Alert from "@mui/material/Alert/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { authActions, pageTitleActions } from "_store";
import Spinner from "@/components/shared/Spinner";
import { pushNotificationInit } from "_helper/fcm";

export default function SignInComp() {
  const dispatch = useDispatch();

  const router = useRouter();

  const [formData, setFormData] = React.useState({
    phone: "",
    password: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  // const [successMessage, setSuccessMessage] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleButtonClick = (href: string, title: string) => {
    router.push(href);
    // dispatch(pageTitleActions.setPageTitle(title));
  };

  const handleInputChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (res.ok) {
        dispatch(authActions.login(data.user));
        pushNotificationInit(data.user);
        setErrorMessage("");
        handleButtonClick("/", "Home");
      } else {
        setErrorMessage("Login failed. " + data.message);
      }
      setIsLoading(false);
    } catch (error: any) {
      setErrorMessage("Login failed");
      setIsLoading(false);
    }
  };

  return (
    <Box>
      {isLoading && <Spinner />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone number"
            name="phone"
            type="number"
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Box>
        <Box sx={{ mt: 2 }}>
          <Typography
            component={Link}
            href="/forget-passwprd"
            sx={{
              textDecoration: "underline",
              color: "primary.main",
            }}
          >
            Forgot password?
          </Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            onClick={() => handleButtonClick("/signup", "Create new account")}
            sx={{
              textDecoration: "underline",
              color: "primary.main",
            }}
          >
            Don't have an account? Sign up
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
