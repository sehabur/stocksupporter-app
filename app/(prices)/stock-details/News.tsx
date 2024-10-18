"use client";
import React from "react";

import {
  Box,
  Grid,
  Typography,
  Stack,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  Paper,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ReactTimeAgo from "react-time-ago";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { DateTime } from "luxon";

export default function News({ tradingCode }: any) {
  const [openDialog, setOpenDialog] = useState(false);

  const [dialogContent, setDialogContent] = useState<any>({});

  const [news, setnews] = React.useState<any>([]);

  const [isLoading, setisLoading] = React.useState<boolean>(false);

  async function getNews() {
    try {
      setisLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/news/${tradingCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const initdata = await res.json();
      setnews(initdata);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleItemClick = (item: {}) => {
    handleDialogOpen();
    setDialogContent(item);
  };

  React.useEffect(() => {
    getNews();
  }, []);

  return (
    <Box sx={{ bgcolor: "secondaryBackground" }}>
      <Dialog
        onClose={handleDialogClose}
        open={openDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "1.1rem",
            mr: 2,
          }}
        >
          {dialogContent?.title}
        </DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
            <ScheduleRoundedIcon
              color="success"
              sx={{ fontSize: "1.2rem", mr: 1.3 }}
            />
            <ReactTimeAgo
              date={dialogContent?.date}
              locale="en-US"
              style={{ fontSize: "1rem", color: "#089981" }}
            />
          </Stack>
          <Typography sx={{ fontSize: "1rem", pb: 2 }}>
            {dialogContent?.description}
          </Typography>
        </DialogContent>

        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: "absolute",
            right: 4,
            top: 4,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>

      <Box
        sx={{
          maxWidth: "1250px",
          mx: "auto",
          py: { xs: 2, sm: 4 },
          px: 2,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={{ xs: 1.5, sm: 3 }}
        >
          {news?.map((item: any) => (
            <Grid item xs={12} sm={4} key={item._id}>
              <Card
                sx={{ minWidth: 275, bgcolor: "priceCardBgColor" }}
                elevation={0}
              >
                <CardContent
                  sx={{ pb: 1 }}
                  onClick={() => handleItemClick(item)}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: { xs: 700, sm: 500 },
                      fontSize: { xs: "1.1rem", sm: "1.3rem" },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <Stack direction="row" alignItems="center">
                      <ScheduleRoundedIcon
                        color="success"
                        sx={{ fontSize: "1.2rem", mr: 1.3 }}
                      />
                      <ReactTimeAgo
                        date={item.time || item.date}
                        locale="en-US"
                        style={{ fontSize: "1rem", color: "#089981" }}
                      />
                      <Chip
                        label={DateTime.fromISO(item.date).toFormat(
                          "dd MMM, yyyy"
                        )}
                        size="small"
                        sx={{
                          ml: 3,
                          borderRadius: 1,
                          fontSize: ".9rem",
                        }}
                      />
                    </Stack>
                  </Typography>
                  <Typography sx={{ fontSize: ".9rem" }}>
                    {item.description.slice(0, 125) +
                      (item.description.length > 125 ? ".." : "")}
                  </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0, pl: 1.5 }}>
                  <Button
                    size="small"
                    endIcon={<ChevronRightRoundedIcon sx={{ ml: -0.7 }} />}
                    onClick={() => handleItemClick(item)}
                  >
                    Read more
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
