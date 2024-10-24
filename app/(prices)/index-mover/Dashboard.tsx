"use client";
import * as React from "react";
import Link from "next/link";

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
import { styled } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import styles from "./Dashboard.module.css";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";
import { AUTO_RELOAD_TIME_MS } from "@/data/constants";
import AutoReload from "@/components/shared/AutoReload";

const variants: any = {
  gainer: {
    pageTitle: "Positive index movers",
    pageSubtitle: "Stocks with a positive impact on index move",
  },
  loser: {
    pageTitle: "Negative index movers",
    pageSubtitle: "Stocks with a negative impact on index move",
  },
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    // borderRadius: 5,
  },
}));
const StyledToggleButtonSuccess = styled(ToggleButton)(({ theme }) => ({
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "6px !important",
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
    borderRadius: "6px !important",
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

export default function Dashboard() {
  const [typeAlignment, setTypeAlignment] = React.useState("gainer");

  const initstate = {
    gainer: [],
    loser: [],
  };

  const [data, setdata] = React.useState<any>(initstate);

  const [isLoading, setisLoading] = React.useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("Index movers"));

  const handleButtonClick = (href: string) => {
    router.push(href);
  };

  async function getData() {
    try {
      setisLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/indexMover?type=all`,
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
      headerName: "Price (BDT)",
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
    <Box sx={{ p: { xs: 2, sm: 2 } }}>
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
            + Index Mover
          </StyledToggleButtonSuccess>
          <StyledToggleButtonError
            value="loser"
            sx={{ px: { xs: 1.4, sm: 4, fontSize: ".9rem" } }}
          >
            - Index Mover
          </StyledToggleButtonError>
        </StyledToggleButtonGroup>
      </Box>

      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "1.3rem", sm: "1.4rem" } }}
          color="text.primary"
          gutterBottom
        >
          {variants[typeAlignment].pageTitle}
        </Typography>
        <Typography
          sx={{ fontSize: "1rem", textAlign: "center" }}
          color="text.secondary"
        >
          {variants[typeAlignment].pageSubtitle}
        </Typography>
      </Box> */}
      <Box sx={{ mx: "auto" }}>
        <DataGrid
          rows={data[typeAlignment]}
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
      </Box>
    </Box>
  );
}
