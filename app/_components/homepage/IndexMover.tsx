"use client";
import * as React from "react";

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import SeeMoreButton from "../buttons/SeeMoreButton";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
  },
}));

const StyledToggleButtonSuccess = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    marginRight: "12px",
    border: `1px solid #4caf50 !important`,
    paddingLeft: "16px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "16px",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.success.main,
    },
  },
  color: theme.palette.success.main,
}));

const StyledToggleButtonError = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "24px !important",
    marginRight: "12px",
    border: `1px solid #d32f2f !important`,
    paddingLeft: "16px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "16px",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.error.main,
    },
  },
  color: theme.palette.error.main,
}));

export default function IndexMover({ data, handleButtonClick }: any) {
  const [typeAlignment, setTypeAlignment] = React.useState("gainer");

  const columns: GridColDef[] = [
    {
      field: "tradingCode",
      headerName: "TRADING CODE",
      width: 140,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Typography
            onClick={() => {
              handleButtonClick(
                `/stock-details/${params.value}`,
                `${params.value} Details`
              );
            }}
            sx={{
              color: "primary.main",
              ":hover": { textDecoration: "underline" },
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "ltp",
      headerName: "LTP (BDT)",
      align: "left",
      headerAlign: "left",
      width: 100,
      disableColumnMenu: true,
    },
    {
      field: "indexMove",
      headerName: "INDEX MOVE",
      align: "left",
      headerAlign: "left",
      width: 100,
      disableColumnMenu: true,
    },
  ];

  const handleTypeAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setTypeAlignment(newAlignment);
    }
  };

  return (
    <Box sx={{ px: 2, maxWidth: 500 }}>
      <Box>
        <Button
          onClick={() => {
            handleButtonClick(`/index-mover`, `Index movers`);
          }}
          color="primary"
          endIcon={<ArrowForwardIosRoundedIcon />}
          sx={{
            fontSize: "1.4rem",
            fontWeight: 700,
            ":hover": {
              bgcolor: "transparent",
              color: "primary.main",
              textDecoration: "underline",
            },
          }}
        >
          Index Movers
        </Button>
      </Box>
      <Box
        sx={{
          mb: 3,
          mt: 1,
          ml: 0.8,
          textAlign: "center",
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={typeAlignment}
          exclusive
          onChange={handleTypeAlignmentChange}
        >
          <StyledToggleButtonSuccess value="gainer" sx={{ px: 1.5 }}>
            + Index Mover
          </StyledToggleButtonSuccess>
          <StyledToggleButtonError value="loser" sx={{ px: 1.5 }}>
            - Index Mover
          </StyledToggleButtonError>
        </StyledToggleButtonGroup>
      </Box>

      <Box>
        <DataGrid
          rows={data[typeAlignment]}
          columns={columns}
          hideFooter={true}
          rowHeight={41}
          sx={{
            ".MuiDataGrid-columnHeader": {
              color: "text.secondary",
              // fontSize: { xs: ".8rem", sm: ".9rem" },
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              overflow: "visible",
              lineHeight: "1.43rem",
              whiteSpace: "normal",
            },
            border: "none",
            width: "90vw",
            fontSize: ".9rem",
            fontWeight: 500,
          }}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <SeeMoreButton href="/index-mover" title="Index movers" />
      </Box>
    </Box>
  );
}
