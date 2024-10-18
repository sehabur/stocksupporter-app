"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

import { Box, TextField, Button } from "@mui/material";
import Alert from "@mui/material/Alert/Alert";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { useRouter } from "next/navigation";
import Spinner from "@/components/shared/Spinner";

export default function CreatePortfolio() {
  const [formData, setFormData] = React.useState({
    name: "",
    commission: 0.4,
  });

  const router = useRouter();

  const [successMessage, setSuccessMessage] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const auth = useSelector((state: any) => state.auth);

  const [isLoading, setIsLoading] = React.useState(false);

  function handleInputChange(e: any) {
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const reqBody = {
        name: formData.name,
        commission: formData.commission,
        user: auth._id,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/portfolio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
          body: JSON.stringify(reqBody),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setErrorMessage("");
        setSuccessMessage("Portfolio creation successful");
        router.push("/portfolio");
      } else {
        setErrorMessage(data.message || "Something went wrong");
        setSuccessMessage("");
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Something went wrong");
      setSuccessMessage("");
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
      }}
    >
      {isLoading && <Spinner />}
      <Box sx={{ width: "100%" }}>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        <Button
          variant="text"
          color="primary"
          component={Link}
          href="/portfolio"
          startIcon={<KeyboardBackspaceRoundedIcon />}
          sx={{ mb: 1 }}
        >
          Go back
        </Button>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Portfolio name"
          name="name"
          autoFocus
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="commission"
          label="Commission"
          id="commission"
          value={formData.commission}
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}
