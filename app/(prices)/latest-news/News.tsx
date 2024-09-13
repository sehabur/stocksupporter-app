"use client";
import React from "react";

import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
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

import { styled } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { DateTime } from "luxon";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";
import { useRouter } from "next/navigation";
import { AUTO_RELOAD_TIME_MS } from "@/data/constants";

const options: any = [
  {
    title: "All",
    search: " ",
  },
  {
    title: "EPS",
    search: "eps",
  },
  {
    title: "DIVIDEND",
    search: "dividend",
  },
  {
    title: "AGM",
    search: "agm",
  },
  {
    title: "FINANCIALS",
    search: "Q[0-9]",
  },

  {
    title: "RECORD DATE",
    search: "record date",
  },
];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    border: `1px solid lightgrey !important`,
    marginRight: "8px",
    paddingLeft: "12px",
    paddingTop: "3px",
    paddingBottom: "3px",
    paddingRight: "12px",
    whiteSpace: "nowrap",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.primary.main,
    },
  },
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.divider,
}));

export default function News() {
  const router = useRouter();

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("News"));

  const [openDialog, setOpenDialog] = useState(false);

  const [dialogContent, setDialogContent] = useState<any>({});

  const [alignment, setAlignment] = useState(" ");

  const [data, setdata] = React.useState<any>([]);

  const [news, setNews] = useState<any>([]);

  const [isLoading, setisLoading] = React.useState(false);

  async function getData() {
    try {
      setisLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/news/all?limit=2500`,
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
      setdata(initdata);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    setNews(data.slice(0, 300));
  }, [data]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const { pathname, search } = window.location;
      router.push(`/reload?redirect=${encodeURIComponent(pathname + search)}`);
    }, AUTO_RELOAD_TIME_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);

      let text = new RegExp(newAlignment, "i");

      const newData = data
        .filter((item: any) => {
          const position =
            newAlignment === "Q[0-9]"
              ? item.title.search(text)
              : item.description.search(text);
          if (position !== -1) return item;
        })
        .slice(0, 300);

      console.log(newData.length);
      setNews(newData);
    }
  };

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

  return (
    <Box>
      <LoadingSpinner open={isLoading} />
      <Dialog
        onClose={handleDialogClose}
        open={openDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.1rem", mr: 2 }}>
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

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 55,
            left: 0,
            right: 0,
            bgcolor: "background.default",
            py: 1.5,
            px: 2,
            zIndex: 1000,
          }}
        >
          <StyledToggleButtonGroup
            size="small"
            value={alignment}
            exclusive
            onChange={handleAlignmentChange}
            aria-label="Platform"
            sx={{
              display: "flex",
              overflowX: "auto",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            {options.map((item: any, index: number) => (
              <StyledToggleButton value={item.search} key={index}>
                {item.title}
              </StyledToggleButton>
            ))}
          </StyledToggleButtonGroup>
        </Box>
        <Grid container spacing={1.5} sx={{ mt: 4 }}>
          {news.map((item: any) => (
            <Grid item xs={12} key={item._id}>
              <Card
                sx={{ minWidth: 275, bgcolor: "priceCardBgColor" }}
                variant="outlined"
                key={item._id}
              >
                <CardContent sx={{ pb: 0 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ mb: 0.7 }} color="text.secondary">
                    <Stack direction="row" alignItems="center">
                      <ScheduleRoundedIcon
                        color="success"
                        sx={{ fontSize: "1rem", mr: 1 }}
                      />
                      <ReactTimeAgo
                        date={item.time || item.date}
                        locale="en-US"
                        style={{ color: "#089981" }}
                      />
                      <Chip
                        label={DateTime.fromISO(item.date).toFormat(
                          "dd MMM, yyyy"
                        )}
                        size="small"
                        sx={{
                          ml: 2,
                          borderRadius: 1,
                          fontSize: ".875rem",
                        }}
                      />
                    </Stack>
                  </Typography>
                  <Typography>
                    {item.description.slice(0, 135) +
                      (item.description.length > 135 ? ".." : "")}
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
