import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  useTheme,
} from "@mui/material";
import Link from "next/link";

import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { grey } from "@mui/material/colors";

export default function PricingCard({ data, handleCardClick }: any) {
  const { currentPrice, originalPrice, title, discount, product, isPopular } =
    data;

  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 1,
        textAlign: "center",
        my: 2,
        mx: "auto",
        minWidth: 280,
      }}
      elevation={16}
    >
      <CardContent
        sx={{
          p: 0,
          m: 0,
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={(e) =>
          handleCardClick(e, {
            type: "premium_package",
            product,
            price: currentPrice,
            validity: title,
          })
        }
      >
        <Box>
          <Box
            sx={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pt: 1.5,
                pb: 0.6,
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  color: grey[50],
                  fontSize: { xs: "1.2rem", sm: "1.4rem" },
                }}
              >
                {title}
              </Typography>

              {isPopular && (
                <Chip
                  label="Most Popular"
                  size="small"
                  color="warning"
                  sx={{ mb: 1, ml: 1 }}
                />
              )}
            </Box>
          </Box>

          <Box sx={{ mt: 1.5, mb: 1 }}>
            <Stack
              direction="row"
              alignItems="baseline"
              justifyContent="center"
            >
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.4rem",
                  textDecoration: "line-through red 2px",
                }}
              >
                {originalPrice}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontSize: "1rem", ml: 1 }}
              >
                BDT
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="baseline"
              justifyContent="center"
            >
              <Typography color="text.primary" sx={{ fontSize: "1.4rem" }}>
                {currentPrice}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontSize: "1rem", ml: 1 }}
              >
                BDT
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "1rem" }}>
              Now at {discount}% discount{" "}
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              endIcon={<EastRoundedIcon />}
              color="primary"
              sx={{
                fontSize: "1rem",
                px: 3,
              }}
            >
              Subscribe now
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}