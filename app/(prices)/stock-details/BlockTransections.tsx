"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Paper, CircularProgress } from "@mui/material";
import { DateTime } from "luxon";

export default function BlockTransections({ tradingCode }: any) {
  const targetRef: any = React.useRef(null);

  const [blocktr, setblocktr] = React.useState<any>([]);

  const [datafetched, setdatafetched] = React.useState<boolean>(false);

  async function getBlocktr() {
    try {
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
    } catch (error) {
      setdatafetched(true);
    }
  }

  React.useEffect(() => {
    getBlocktr();
  }, []);

  React.useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetRef, datafetched]);

  return (
    <Box sx={{ py: 2 }}>
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
            sx={{ maxHeight: "65vh" }}
            variant="outlined"
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow
                  sx={{
                    ".MuiTableCell-head": {
                      fontWeight: 500,
                      color: "text.secondary",
                      py: 1,
                      lineHeight: 1.3,
                    },
                    "&:nth-of-type(odd)": {
                      backgroundColor: "stipedTableEvenRow",
                    },
                  }}
                >
                  <TableCell align="center">DATE</TableCell>
                  <TableCell align="center">VALUE (MN)</TableCell>
                  <TableCell align="center">VOLUME</TableCell>
                  <TableCell align="center">TRADES</TableCell>
                  <TableCell align="center">MAX PRICE</TableCell>
                  <TableCell align="center">MIN PRICE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blocktr?.map((row: any) => (
                  <TableRow
                    key={row._id}
                    hover={true}
                    sx={{
                      ".MuiTableCell-body": {
                        fontWeight: 500,
                      },
                      "&:nth-of-type(odd)": {
                        backgroundColor: "financePageBgcolor",
                      },
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell align="center" sx={{ minWidth: 110 }}>
                      {DateTime.fromISO(row.date).toFormat("dd-MM-yy")}
                    </TableCell>
                    <TableCell align="center">{row.value}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.trades}</TableCell>
                    <TableCell align="center">{row.maxPrice}</TableCell>
                    <TableCell align="center">{row.minPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box ref={targetRef}></Box>
        </Box>
      )}
    </Box>
  );
}
