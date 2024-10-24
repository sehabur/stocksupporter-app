"use client";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
  useMediaQuery,
  Paper,
  Chip,
  Typography,
  Stack,
  alpha,
} from "@mui/material";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import { DateTime } from "luxon";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { grey } from "@mui/material/colors";
import ReactTimeAgo from "react-time-ago";

const colors = ["#00A25B", "#2962ff", "#f23645"];

const getType = (
  item: { close: number },
  prevItem: { close: number; type: string },
  lastType: string
) => {
  if (item.close > prevItem.close) {
    return {
      type: "Buy",
      color: colors[0],
    };
  } else if (item.close < prevItem.close) {
    return {
      type: "Sell",
      color: colors[2],
    };
  } else if (item.close === prevItem.close) {
    return {
      type: lastType,
      color: colors[1],
    };
  }
};

const formatData = (data: any) => {
  let rows: any = [];
  let lastType = "";
  let totalSell = 0;
  let totalBuy = 0;
  let lastTrade: any = {};

  if (data.length < 1) {
    return {
      rows,
      totalBuy,
      totalSell,
      lastTrade,
    };
  }

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (i > 0) {
      const prevItem = data[i - 1];

      const typeValue: any = getType(item, prevItem, lastType);

      const value = {
        id: i,
        time: DateTime.fromISO(item.time).toFormat("HH:mm"),
        timeIso: DateTime.fromISO(item.time),
        close: item.close,
        value: Number((item.value - prevItem.value).toFixed(3)),
        volume: Number((item.volume - prevItem.volume).toFixed(2)),
        trade: Number((item.trade - prevItem.trade).toFixed(2)),
        type: typeValue.type,
        color: typeValue.color,
      };
      if (typeValue.type === "Buy") {
        totalBuy += value.volume;
      } else if (typeValue.type === "Sell") {
        totalSell += value.volume;
      }

      lastType = typeValue.type;
      rows.push(value);
    } else {
      const value = {
        id: i,
        time: DateTime.fromISO(item.time).toFormat("HH:mm"),
        close: item.close,
        value: item.value,
        volume: item.volume,
        trade: item.trade,
        type: "",
        color: colors[1],
      };
      lastType = "";
      rows.push(value);
    }
  }
  rows.sort((a: { id: number }, b: { id: number }) => b.id - a.id);

  const lastTradeItems = rows.filter(
    (item: { volume: number }) => item.volume !== 0
  );

  lastTrade = lastTradeItems.length > 0 ? lastTradeItems[0] : {};

  return {
    rows,
    totalBuy,
    totalSell,
    lastTrade,
  };
};

export default function Trades(props: any) {
  const { data, tradingCode } = props;
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();

  const { rows, totalBuy, totalSell, lastTrade } = formatData(data);

  const handleClick = () => {
    handleDialogOpen();
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
        fullScreen
      >
        <DialogTitle sx={{ fontWeight: 700, pr: 6 }}>
          Latest trades of {tradingCode}
        </DialogTitle>
        <DialogContent dividers sx={{ py: 0 }}>
          <Box sx={{ maxWidth: "650px", mx: "auto", py: 2 }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <Chip
                label={`Buy: ${totalBuy}`}
                icon={<TrendingUpRoundedIcon />}
                color="success"
                sx={{
                  // color: "success.main",
                  borderRadius: 1,
                  fontSize: "1rem",
                  py: 2.5,
                  px: 1,
                }}
              />
              <Chip
                label={`Sell: ${totalSell}`}
                icon={<TrendingDownRoundedIcon />}
                color="error"
                sx={{
                  // color: "error.main",
                  borderRadius: 1,
                  fontSize: "1rem",
                  py: 2.5,
                  px: 1,
                }}
              />
            </Stack>
            <TableContainer
              component={Paper}
              elevation={0}
              variant="outlined"
              sx={{ borderRadius: 1, maxHeight: "75vh" }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow
                    sx={{
                      ".MuiTableCell-head": {
                        py: 1,
                      },
                    }}
                  >
                    <TableCell>TIME</TableCell>
                    <TableCell>TYPE</TableCell>
                    <TableCell>PRICE</TableCell>
                    <TableCell>VOLUME</TableCell>
                    <TableCell>VALUE (MN)</TableCell>
                    <TableCell>TRADE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .filter((row: any) => row.volume !== 0)
                    .map((row: any) => (
                      <TableRow
                        hover={true}
                        sx={{
                          backgroundColor: row.color + "0a",
                          ".MuiTableCell-root": {
                            color: row.color,
                          },
                        }}
                        key={row.id}
                      >
                        <TableCell>{row.time}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.close}</TableCell>
                        <TableCell>{row.volume}</TableCell>
                        <TableCell>{row.value}</TableCell>
                        <TableCell>{row.trade}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <CloseIcon sx={{ fontSize: "1.6rem" }} />
        </IconButton>
      </Dialog>
      <Alert
        sx={{
          ":hover": {
            cursor: "pointer",
          },
          pt: 0.6,
          pb: 0.3,
          ".MuiAlert-root, .MuiAlert-message, .MuiAlert-action": {
            py: 0,
            my: 0,
          },

          borderRadius: 1.5,
          fontWeight: 700,
          mb: { xs: 1, sm: 0 },
          bgcolor: alpha(
            theme.palette.primary.main,
            theme.palette.mode == "light" ? 0.1 : 0.2
          ),
        }}
        severity="warning"
        icon={false}
        onClick={handleClick}
        // icon={<LocalMallOutlinedIcon fontSize="inherit" />}
        action={
          <IconButton color="primary" size="small">
            <ZoomOutMapOutlinedIcon sx={{ fontSize: "1.1rem" }} />
          </IconButton>
        }
      >
        <Box sx={{ mt: 0.2 }}>
          <Typography
            sx={{
              display: "inline",
              mr: 1,
            }}
            color="text.primary"
          >
            {lastTrade?.volume || 0} shares @ {lastTrade?.close || 0} BDT
          </Typography>

          {lastTrade?.timeIso && (
            <Chip
              label={<ReactTimeAgo date={lastTrade?.timeIso} locale="en-US" />}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </Alert>
    </Box>
  );
}
