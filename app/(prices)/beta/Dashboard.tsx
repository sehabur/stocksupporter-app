"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { Box, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

import styles from "./Dashboard.module.css";

import { pageTitleActions } from "_store";
import AutoReload from "@/components/shared/AutoReload";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
  },
}));

const StyledToggleButtonSuccess = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "6px !important",
    marginRight: "16px",
    marginLeft: "16px",
    border: `1px solid #4caf50 !important`,
    paddingLeft: "24px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "24px",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.success.main,
    },
  },
  color: theme.palette.success.main,
}));

const StyledToggleButtonError = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "6px !important",
    marginRight: "12px",
    border: `1px solid #d32f2f !important`,
    paddingLeft: "24px",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "24px",
    "&.Mui-selected": {
      color: grey[50],
      backgroundColor: theme.palette.error.main,
    },
  },
  color: theme.palette.error.main,
}));

export default function Dashboard() {
  const initstate = {
    gainer: [],
    loser: [],
  };
  const [data, setdata] = React.useState<any>(initstate);

  const [isLoading, setisLoading] = React.useState(false);

  const [typeAlignment, setTypeAlignment] = React.useState("gainer");

  const router = useRouter();

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("Beta"));

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
              handleButtonClick(`/stock-details?tradingCode=${params.value}`);
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
      cellClassName: styles.tradingCodeCell,
    },
    {
      field: "close",
      headerName: "PRICE (BDT)",
      align: "left",
      headerAlign: "left",
      width: 100,
      disableColumnMenu: true,
    },
    {
      field: "beta",
      headerName: "BETA (1 YEAR)",
      align: "left",
      headerAlign: "left",
      width: 100,
      disableColumnMenu: true,
    },
  ];

  async function getData() {
    try {
      setisLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/allStockBeta?type=all`,
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
      const data = await res.json();
      setdata(data);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  const handleTypeAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setTypeAlignment(newAlignment);
    }
  };

  const handleButtonClick = (href: string) => {
    router.push(href);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <LoadingSpinner open={isLoading} />
      <AutoReload />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          mt: 1,
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={typeAlignment}
          exclusive
          onChange={handleTypeAlignmentChange}
          aria-label="Platform"
        >
          <StyledToggleButtonSuccess
            value="gainer"
            sx={{ px: { xs: 1.4, sm: 4, fontSize: ".9rem" } }}
          >
            + Beta
          </StyledToggleButtonSuccess>
          <StyledToggleButtonError
            value="loser"
            sx={{ px: { xs: 1.4, sm: 4, fontSize: ".9rem" } }}
          >
            - Beta
          </StyledToggleButtonError>
        </StyledToggleButtonGroup>
      </Box>

      <Box>
        <DataGrid
          rows={data && data[typeAlignment]}
          columns={columns}
          hideFooter={true}
          sx={{
            ".MuiDataGrid-columnHeader": {
              color: "text.secondary",
              fontSize: { xs: ".8rem", sm: ".9rem" },
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              overflow: "visible",
              lineHeight: "1.43rem",
              whiteSpace: "normal",
            },
            border: "none",
            width: "90vw",
            mx: "auto",
            mb: 6,
            fontSize: ".9rem",
            fontWeight: 500,
          }}
        />
        {data[typeAlignment].length < 1 && (
          <Typography textAlign="center" sx={{ py: 2 }}>
            No data to display
          </Typography>
        )}
      </Box>
    </Box>
  );
}
