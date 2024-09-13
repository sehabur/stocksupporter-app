import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        minHeight: "90vh",
        color: "text.primary",
      }}
    >
      <Box sx={{ maxWidth: 800, mx: "auto", pt: 4, px: 3 }}>
        <Typography variant="h5" gutterBottom>
          Not Found
        </Typography>
        <Typography>Could not find requested resource</Typography>
        <Button component={Link} href="/" variant="outlined" sx={{ mt: 2 }}>
          Return Home
        </Button>
      </Box>
    </Box>
  );
}
