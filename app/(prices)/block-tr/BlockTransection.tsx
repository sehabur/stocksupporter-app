"use client";
import React from "react";

import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography, Paper, Chip, Divider } from "@mui/material";

import { pageTitleActions } from "_store";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

function getBlockTrSummary(data: any) {
  let quantity = 0;
  let value = 0;
  let trades = 0;
  let scripts = 0;
  for (let row of data) {
    quantity += row.quantity;
    value += row.value;
    trades += row.trades;
    scripts++;
  }
  return {
    quantity,
    value,
    trades,
    scripts,
  };
}

export default function BlockTransection() {
  const [data, setdata] = React.useState<any>([]);

  const [summary, setsummary] = React.useState<any>({
    quantity: 0,
    value: 0,
    trades: 0,
    scripts: 0,
  });

  const [isLoading, setisLoading] = React.useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("Block Trnx"));

  const handleButtonClick = (href: string) => {
    router.push(href);
  };

  async function getData() {
    try {
      setisLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/blockTr/lastday`,
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

      setsummary(getBlockTrSummary(initdata));
      setdata(initdata);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      sx={{
        py: 1.5,
        px: 1.5,
      }}
    >
      <LoadingSpinner open={isLoading} />

      <Paper
        elevation={0}
        sx={{
          bgcolor: "appCardBgColor",
          px: 2,
          pb: 1,
          pt: 1.5,
          borderRadius: 2,
          mb: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography sx={{ mr: 2, fontSize: ".95rem" }}>
            Total{" "}
            <Typography
              sx={{ display: "inline", fontWeight: 700, fontSize: "1.2rem" }}
            >
              {summary.scripts}
            </Typography>{" "}
            scripts traded
          </Typography>
          <Chip
            label={DateTime.fromISO(data[0]?.date).toFormat("dd MMM, yyyy")}
            // variant="outlined"
            size="small"
            sx={{ fontSize: ".9rem", px: 0.5 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography color="text.primary" sx={{ fontSize: ".8rem" }}>
              Volume
            </Typography>
            <Typography
              color="text.primary"
              sx={{
                fontSize: "1.3rem",
                fontWeight: 700,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              {summary.quantity}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem variant="middle" />
          <Box>
            <Typography color="text.primary" sx={{ fontSize: ".8rem" }}>
              Value (Mn)
            </Typography>
            <Typography
              color="text.primary"
              sx={{
                fontSize: "1.3rem",
                fontWeight: 700,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              {summary.value.toFixed(2)}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem variant="middle" />
          <Box>
            <Typography color="text.primary" sx={{ fontSize: ".8rem" }}>
              Trades
            </Typography>
            <Typography
              color="text.primary"
              sx={{
                fontSize: "1.3rem",
                fontWeight: 700,
                fontFamily: "'Nunito Sans', sans-serif",
              }}
            >
              {summary.trades}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ maxHeight: "65vh", mb: 2 }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                ".MuiTableCell-head": {
                  fontWeight: 500,
                  color: "text.secondary",
                  lineHeight: 1.4,
                  py: 1.3,
                },
              }}
            >
              {/* <TableCell>DATE</TableCell> */}
              <TableCell>TRADING CODE</TableCell>
              <TableCell>VALUE (MN)</TableCell>
              <TableCell>VOLUME</TableCell>
              <TableCell>TRADES</TableCell>
              <TableCell>MAX PRICE</TableCell>
              <TableCell>MIN PRICE</TableCell>
              {/* <TableCell>AVERAGE PRICE</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any) => (
              <TableRow
                key={row._id}
                hover={true}
                sx={{
                  // ".MuiTableCell": {
                  //   fontSize: "1rem",
                  //   fontWeight: 500,
                  //   color: "text.secondary",
                  // },
                  "&:nth-of-type(odd)": {
                    backgroundColor: "stipedTableEvenRow",
                  },
                }}
              >
                {/* <TableCell component="th" scope="row" sx={{ minWidth: 80 }}>
                  {DateTime.fromISO(row.date).toFormat("dd MMM")}
                </TableCell> */}
                <TableCell align="left">
                  <Typography
                    onClick={() => {
                      handleButtonClick(
                        `/stock-details?tradingCode=${row.tradingCode}`
                      );
                    }}
                    sx={{
                      textAlign: "left",
                      color: "primary.main",
                      ":hover": { textDecoration: "underline" },
                    }}
                  >
                    {row.tradingCode}
                  </Typography>
                </TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.trades}</TableCell>
                <TableCell>{row.maxPrice}</TableCell>
                <TableCell>{row.minPrice}</TableCell>
                {/* <TableCell>
                  {calculateAverage([row.maxPrice, row.minPrice])}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
