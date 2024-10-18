"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CandlestickChartRoundedIcon from "@mui/icons-material/CandlestickChartRounded";
import SsidChartRoundedIcon from "@mui/icons-material/SsidChartRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TroubleshootRoundedIcon from "@mui/icons-material/TroubleshootRounded";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import { DateTime } from "luxon";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useSelector } from "react-redux";
import PremiumDialogContent from "@/components/shared/PremiumDialogContent";

function formatPatternName(text: string) {
  return (text.charAt(0).toUpperCase() + text.slice(1)).replaceAll("_", " ");
}

export default function Technical(props: any) {
  const { technicals, tradingCode } = props;

  const auth = useSelector((state: any) => state.auth);

  const theme: any = useTheme();

  const [data, setData] = useState<any>({});

  const [datafetched, setdatafetched] = useState<boolean>(false);

  const {
    sma10,
    sma20,
    sma30,
    sma50,
    sma100,
    sma200,
    ema10,
    ema20,
    ema30,
    ema50,
    ema100,
    ema200,
    rsi,
    stoch,
    adx,
    williamR,
    mfi,
    macd,
    pivots,
  } = data;

  const getStockTechnicals = async (tradingCode: string) => {
    try {
      const res: any = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/technical/stock/${tradingCode}`,
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
      const techData = await res.json();
      setData(techData);
      setdatafetched(true);
    } catch (error) {
      setdatafetched(true);
    }
  };

  useEffect(() => {
    if (auth?.isPremiumEligible) {
      getStockTechnicals(tradingCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Box
      sx={{
        px: 2,
        pt: 2,
        pb: 4,
      }}
    >
      {!auth?.isPremiumEligible && (
        <Box
          sx={{
            pt: 2,
            pb: 2,
            px: 2,
          }}
        >
          <PremiumDialogContent details={false} />
        </Box>
      )}
      {auth?.isPremiumEligible && (
        <Box sx={{ mx: 2 }}>
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
            <Box sx={{ maxWidth: 600, mx: "auto", pt: 2 }}>
              <Box sx={{ mb: 6 }}>
                <Typography
                  sx={{ fontSize: "1.2rem", color: "text.primary", mb: 1 }}
                >
                  Simple Moving Averages
                </Typography>
                <TableContainer sx={{ maxWidth: 450 }}>
                  <Table
                    sx={{
                      ".MuiTableCell-body": { px: 0 },
                      ".MuiTableCell-head": {
                        color: "text.secondary",
                        pb: 1,
                        px: 0,
                      },
                    }}
                  >
                    <TableBody>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Simple moving average (10)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {sma10}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Simple moving average (20)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {sma20}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Simple moving average (30)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {sma30}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Simple moving average (50)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {sma50}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Simple moving average (100)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {sma100}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Simple moving average (200)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {sma200}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography
                  sx={{ fontSize: "1.2rem", color: "text.primary", mb: 1 }}
                >
                  Exponential Moving Averages
                </Typography>
                <TableContainer sx={{ maxWidth: 450 }}>
                  <Table
                    sx={{
                      ".MuiTableCell-body": { px: 0 },
                      ".MuiTableCell-head": {
                        color: "text.secondary",
                        pb: 1,
                        px: 0,
                      },
                    }}
                  >
                    <TableBody>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Exponential moving average (10)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {ema10}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Exponential moving average (20)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {ema20}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Exponential moving average (30)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {ema30}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Exponential moving average (50)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {ema50}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Exponential moving average (100)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {ema100}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Exponential moving average (200)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {ema200}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography
                  sx={{ fontSize: "1.2rem", color: "text.primary", mb: 1 }}
                >
                  Oscillators
                </Typography>
                <TableContainer sx={{ maxWidth: 450 }}>
                  <Table
                    sx={{
                      ".MuiTableCell-body": { px: 0 },
                      ".MuiTableCell-head": {
                        color: "text.secondary",
                        pb: 1,
                        px: 0,
                      },
                    }}
                  >
                    <TableBody>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Relative Strength Index (14)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {rsi || "-"}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Average Directional Index (14)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {adx || "-"}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Stochastic %K (14, 3, 3)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {stoch || "-"}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Money Flow Index (10)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {mfi || "-"}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">MACD Level (12, 26)</TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {macd || "-"}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">
                          Williams Percent Range (14)
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {williamR || "-"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography
                  sx={{ fontSize: "1.2rem", color: "text.primary", mb: 1 }}
                >
                  Pivots
                </Typography>
                <TableContainer sx={{ maxWidth: 450 }}>
                  <Table
                    sx={{
                      ".MuiTableCell-body": { px: 0 },
                      ".MuiTableCell-head": {
                        color: "text.secondary",
                        pb: 1,
                        px: 0,
                      },
                    }}
                  >
                    <TableBody>
                      <TableRow hover={true}>
                        <TableCell align="left">Support 3</TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {pivots?.S3}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">Support 2</TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {pivots?.S2}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">Support 1</TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {pivots?.S1}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">Pivot point</TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {pivots?.P}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">Resistance 1</TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {pivots?.R1}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">Resistance 2</TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {pivots?.R2}
                        </TableCell>
                      </TableRow>
                      <TableRow hover={true}>
                        <TableCell align="left">Resistance 3</TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, fontSize: "1rem" }}
                        >
                          {pivots?.R3}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Box>
                  <CandlestickChartRoundedIcon
                    color="primary"
                    sx={{
                      fontSize: "2.2rem",
                      borderRadius: 3,
                      border: `1.2px solid ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                      padding: 0.5,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      mb: 1,
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{ fontSize: "1.1rem", color: "text.primary" }}
                    >
                      Candlestick Pattern
                    </Typography>
                    <Typography
                      sx={{
                        // fontSize: "1rem",
                        color: "text.secondary",
                        mb: 1.5,
                        ml: 0.3,
                      }}
                    >
                      Last 3 days
                    </Typography>
                  </Box>

                  <Box sx={{ maxWidth: 350 }}>
                    {technicals?.candlestick.length > 0 ? (
                      technicals?.candlestick
                        .sort((a: any, b: any) => {
                          const date2: any = new Date(b.date);
                          const date1: any = new Date(a.date);
                          return date2 - date1;
                        })
                        .map((item: any) => (
                          <>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <InsightsRoundedIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={formatPatternName(item.value)}
                                secondary={DateTime.fromISO(item.date).toFormat(
                                  "dd MMM, yyyy"
                                )}
                                sx={{
                                  "& .MuiListItemText-primary": {
                                    fontSize: "1rem",
                                    color: "text.primary",
                                  },
                                }}
                              />
                            </ListItem>
                            {technicals?.candlestick?.length > 1 && (
                              <Divider light variant="middle" />
                            )}
                          </>
                        ))
                    ) : (
                      <Box sx={{ mt: 3 }}>
                        <Typography color="warning.main">
                          No patterns
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box>
                  <SsidChartRoundedIcon
                    color="primary"
                    sx={{
                      fontSize: "2.2rem",
                      borderRadius: 3,
                      border: `1.2px solid ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                      padding: 0.5,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      mb: 1,
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{ fontSize: "1.1rem", color: "text.primary" }}
                    >
                      Chart Pattern
                    </Typography>
                    <Typography
                      sx={{
                        // fontSize: "1rem",
                        color: "text.secondary",
                        mb: 1.5,
                        ml: 0.3,
                      }}
                    >
                      Last 1 year
                    </Typography>
                  </Box>
                  <Box sx={{ maxWidth: 350 }}>
                    {technicals?.patterns.length > 0 ? (
                      technicals?.patterns.map((item: any) => (
                        <>
                          <ListItem sx={{ py: 0.8 }}>
                            <ListItemAvatar sx={{ mt: 1 }}>
                              <TroubleshootRoundedIcon color="success" />
                            </ListItemAvatar>
                            <ListItemText
                              primary={formatPatternName(item)}
                              sx={{
                                "& .MuiListItemText-primary": {
                                  fontSize: ".9rem",
                                  color: "text.primary",
                                },
                              }}
                            />
                          </ListItem>
                          <Divider light variant="middle" />
                        </>
                      ))
                    ) : (
                      <Box sx={{ mt: 3 }}>
                        <Typography color="warning.main">
                          No patterns
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
