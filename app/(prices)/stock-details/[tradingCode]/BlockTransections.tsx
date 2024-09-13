"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  Divider,
  CircularProgress,
} from "@mui/material";
import { DateTime } from "luxon";
import { grey } from "@mui/material/colors";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function BlockTransections({ tradingCode }: any) {
  const [blocktr, setblocktr] = React.useState<any>([]);

  const [isLoading, setisLoading] = React.useState<boolean>(false);

  const [datafetched, setdatafetched] = React.useState<boolean>(false);

  async function getBlocktr() {
    try {
      setisLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/blockTr/${tradingCode}`,
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
      setblocktr(initdata);
      setdatafetched(true);
      setisLoading(false);
    } catch (error) {
      setdatafetched(false);
      setisLoading(false);
    }
  }

  React.useEffect(() => {
    getBlocktr();
  }, []);

  return (
    <Box sx={{ py: 2 }}>
      {/* <LoadingSpinner open={isLoading} /> */}
      {!datafetched && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "33vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {datafetched && (
        <Box
          sx={{
            px: 1.5,
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 400 }}
            variant="outlined"
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow
                  sx={{
                    ".MuiTableCell-head": {
                      fontWeight: 700,
                      py: 1,
                      lineHeight: 1.5,
                    },
                    "&:nth-of-type(odd)": {
                      backgroundColor: "stipedTableEvenRow",
                    },
                  }}
                >
                  <TableCell>DATE</TableCell>
                  <TableCell>VALUE (MN)</TableCell>
                  <TableCell>VOLUME</TableCell>
                  <TableCell>TRADES</TableCell>
                  <TableCell>MAX PRICE</TableCell>
                  <TableCell>MIN PRICE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blocktr?.map((row: any) => (
                  <TableRow
                    key={row._id}
                    hover={true}
                    sx={{
                      ".MuiTableCell": {
                        fontSize: "1rem",
                        fontWeight: 700,
                      },
                      "&:nth-of-type(odd)": {
                        backgroundColor: "financePageBgcolor",
                      },
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell sx={{ minWidth: 90 }}>
                      {DateTime.fromISO(row.date).toFormat("dd MMM")}
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.trades}</TableCell>
                    <TableCell>{row.maxPrice}</TableCell>
                    <TableCell>{row.minPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
