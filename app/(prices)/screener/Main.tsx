"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { Preferences } from "@capacitor/preferences";
import Link from "next/link";

import {
  Box,
  Grid,
  Typography,
  Divider,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";

import { filterOptions } from "./filters";
import styles from "./Main.module.css";
import PremiumDialogContent from "@/components/dialogs/PremiumDialogContent";
import { pageTitleActions } from "_store";

const StripedDataGrid = styled(DataGrid)(({ theme }: any) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.stipedTableEvenRow,
  },
}));

const startingFields = [
  "category",
  "tradingCode",
  "sector",
  "close",
  "pricePercentChange",
  "volume",
  "pe",
  "marketCap",
  "totalShares",
];

const getQueryParamObject = (queryString: string) => {
  const queryParams: any = {};
  const urlSearchParams = new URLSearchParams(queryString);

  urlSearchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  if (window.location.pathname == "/screener") {
    return queryParams;
  } else {
    return {};
  }
};

const createQueryString = (params: any) => {
  const urlSearchParams = new URLSearchParams(params);
  return `?${urlSearchParams.toString()}`;
};

export default function Main() {
  const dispatch = useDispatch();

  const router = useRouter();

  const searchParams = useSearchParams();

  const theme = useTheme();

  dispatch(pageTitleActions.setPageTitle("Screener"));

  const auth = useSelector((state: any) => state.auth);

  const [queryParams, setQueryParams] = useState<any>({});

  const [formInputs, setFormInputs] = useState<any>({});

  const [textFieldInput, setTextFieldInput] = useState<any>({});

  const [openFilterOptionsDialog, setOpenFilterOptionsDialog] = useState(false);

  const [screenerData, setScreenerData] = useState<any>([]);

  const [screenerDatafields, setscreenerDatafields] = useState<any>([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<any>({});

  const [filters, setFilters] = useState<any>(filterOptions);

  const [resetKey, setresetKey] = useState(1);

  const [customRangeMenuContent, setCustomRangeMenuContent] = useState<any>({
    title: "",
    min: null,
    max: null,
    unit: "",
  });

  const [tabValue, setTabValue] = useState(0);

  const [loading, setLoading] = useState(false);

  const [openCustomRangeMenu, setCustomRangeMenuOpen] =
    useState<boolean>(false);

  const columns: GridColDef[] = [...filterOptions]
    .sort((a: any, b: any) => a.columnOrder - b.columnOrder)
    .map((item: any) => {
      const column: any = {
        field: item.name,
        headerName: item?.label,
        width: 140,
        align: "left",
        headerAlign: "left",
      };

      if (item.name === "tradingCode") {
        column.renderCell = (params: any) => {
          return (
            <Typography
              component={Link}
              href={`/stock-details?tradingCode=${params.value}`}
            >
              {params.value}
            </Typography>
          );
        };
        column.cellClassName = styles.tradingCodeCell;
      }
      if (item.suffix) {
        column.renderCell = (params: any) => {
          if (!params.value) {
            return params.value == 0 ? 0 + item.suffix : "--";
          }
          return params.value + item.suffix;
        };
      }

      return column;
    });

  const handleFilterOptionsDialogOpen = () => {
    setOpenFilterOptionsDialog(true);
  };

  const handleFilterOptionsDialogClose = () => {
    setOpenFilterOptionsDialog(false);
  };

  const handleTabChange = (event: any, newValue: number) => {
    setTabValue(newValue);
  };

  const handleResetFilters = () => {
    setFormInputs({});
    setTextFieldInput({});
    setFilters(filterOptions);
    setresetKey((state) => state + 1);
    router.push(createQueryString({}));
  };

  const handleMenuItemClick = (
    type: string,
    name: string,
    label: string,
    value: string,
    unit: string
  ) => {
    if (type === "custom") {
      const min = formInputs[name] ? formInputs[name].split(";")[0] : null;
      const max = formInputs[name] ? formInputs[name].split(";")[1] : null;

      setCustomRangeMenuOpen(true);
      setCustomRangeMenuContent({
        name,
        title: label,
        min,
        max,
        unit,
      });
    } else if (type === "default") {
      if (value === "any") {
        setQueryParams((state: any) => {
          delete state[name];
          return state;
        });
        router.push(createQueryString(queryParams));
      } else {
        router.push(
          createQueryString({
            ...queryParams,
            [name]: value,
          })
        );
      }
    }
  };

  const handleCustomRangeMenuClose = () => {
    setCustomRangeMenuOpen(false);
  };

  const handleCustomRangeMenuSubmit = (event: any) => {
    event.preventDefault();

    const name = event.target[0].value;
    const min = event.target[2].value !== "" ? event.target[2].value : "null";
    const max = event.target[4].value !== "" ? event.target[4].value : "null";

    setFilters((prevState: any) => {
      const index = prevState.findIndex((item: any) => item.name === name);
      const lastIndex = prevState[index].options.length - 1;
      prevState[index].options[
        lastIndex
      ].text = `Custom (Min: ${min}, Max: ${max} ${prevState[index].unit})`;
      // prevState[index].options[lastIndex].value = min + ";" + max;
      return prevState;
    });

    setCustomRangeMenuOpen(false);

    router.push(
      createQueryString({
        ...queryParams,
        [name]: min + ";" + max,
      })
    );
  };

  const customFilterMenu = (
    <>
      <Dialog
        disableEscapeKeyDown
        open={openCustomRangeMenu}
        onClose={handleCustomRangeMenuClose}
      >
        <Box
          component="form"
          onSubmit={handleCustomRangeMenuSubmit}
          sx={{ minWidth: 300 }}
        >
          <DialogTitle>
            Select range for {customRangeMenuContent.title}
          </DialogTitle>
          <DialogContent dividers>
            <Box
              sx={{
                my: 1,
                width: 200,
                mx: "auto",
              }}
            >
              <Box sx={{ mb: 1 }}>
                <TextField
                  name="title"
                  hidden
                  value={customRangeMenuContent.name}
                  sx={{ display: "none" }}
                />
                <Typography sx={{ fontSize: "1rem", mr: 2, mb: 1 }}>
                  Min value:
                </Typography>
                <TextField
                  type="number"
                  name="minValue"
                  defaultValue={customRangeMenuContent.min}
                  sx={{ mr: 1, mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" variant="filled">
                        {customRangeMenuContent.unit}
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    step: 0.01,
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: "1rem", mr: 2, mb: 1 }}>
                  Max value:
                </Typography>
                <TextField
                  type="number"
                  name="maxValue"
                  defaultValue={customRangeMenuContent.max}
                  sx={{ mr: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {customRangeMenuContent.unit}
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    step: 0.01,
                  }}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ mr: 2, my: 1 }}>
            <Button
              onClick={() => handleCustomRangeMenuClose()}
              variant="outlined"
              color="primary"
              sx={{ mr: 1, px: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ px: 3 }}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );

  const technicalFilters = filters
    .filter((item: any) => item.visible === 1 && item.placement == "technical")
    .map((filter: any) => (
      <Grid item xs={6} sm={2.4} key={filter.name + resetKey.toString()}>
        <TextField
          variant="outlined"
          select
          label={filter.label}
          name={filter.name}
          fullWidth
          size="small"
          value={
            textFieldInput[filter.name]
              ? filter.options.some(
                  (item: any) => item.value === textFieldInput[filter.name]
                )
                ? textFieldInput[filter.name]
                : "null;null"
              : ""
          }
          color="success"
          focused={formInputs[filter.name]}
        >
          <Typography
            sx={{
              px: 2,
              pb: 0.8,
              pt: 0.3,
              color: "primary.main",
              fontSize: ".9rem",
              fontWeight: 700,
            }}
          >
            {filter.desc}
          </Typography>
          <Divider />
          <MenuItem
            dense
            value="any"
            onClick={() =>
              handleMenuItemClick(
                "default",
                filter.name,
                filter.desc,
                "any",
                ""
              )
            }
          >
            Any
          </MenuItem>
          {filter.options.map((option: any) => (
            <MenuItem
              dense
              key={option.value}
              value={option.value}
              onClick={() =>
                handleMenuItemClick(
                  option.type,
                  filter.name,
                  filter.desc,
                  option.value,
                  filter.unit
                )
              }
            >
              {option.text} {option.value == "null;null" && "⭐"}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    ));

  const fundamentalalFilters = filters
    .filter((item: any) => item.visible === 1 && item.placement != "technical")
    .map((filter: any) => (
      <Grid item xs={6} sm={2.4} key={filter.name + resetKey.toString()}>
        <TextField
          variant="outlined"
          select
          label={filter.label}
          name={filter.name}
          fullWidth
          size="small"
          value={
            textFieldInput[filter.name]
              ? filter.options.some(
                  (item: any) => item.value === textFieldInput[filter.name]
                )
                ? textFieldInput[filter.name]
                : "null;null"
              : ""
          }
          color="success"
          focused={formInputs[filter.name]}
        >
          <Typography
            sx={{
              px: 2,
              pb: 0.8,
              pt: 0.3,
              color: "primary.main",
              fontSize: ".9rem",
              fontWeight: 700,
            }}
          >
            {filter.desc}
          </Typography>
          <Divider />
          <MenuItem
            dense
            value="any"
            onClick={() =>
              handleMenuItemClick(
                "default",
                filter.name,
                filter.desc,
                "any",
                ""
              )
            }
          >
            Any
          </MenuItem>
          {filter.options.map((option: any) => (
            <MenuItem
              dense
              key={option.value}
              value={option.value}
              onClick={() =>
                handleMenuItemClick(
                  option.type,
                  filter.name,
                  filter.desc,
                  option.value,
                  filter.unit
                )
              }
            >
              {option.text} {option.value == "null;null" && " ⭐"}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    ));

  const filterOptionsDialog = (
    <Dialog
      open={openFilterOptionsDialog}
      fullScreen
      disableScrollLock={true}
      PaperProps={{
        style: {
          backgroundColor: theme?.palette?.mode == "dark" ? "#000" : "#fff",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1,
          px: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
            Screener options
          </Typography>
        </Box>

        <Box>
          <IconButton
            onClick={handleFilterOptionsDialogClose}
            color="primary"
            sx={{ py: 0, mr: 1 }}
          >
            <Box sx={{ display: "block" }}>
              <CheckRoundedIcon sx={{ fontSize: "1.3rem" }} />
              <Typography sx={{ mt: -1.3 }}>Save</Typography>
            </Box>
          </IconButton>

          <IconButton onClick={handleFilterOptionsDialogClose} sx={{ py: 0 }}>
            <Box sx={{ display: "block" }}>
              <CloseIcon sx={{ fontSize: "1.3rem" }} />
              <Typography sx={{ color: "text.secondary", mt: -1.3 }}>
                Close
              </Typography>
            </Box>
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0, m: 0 }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            px: 1.5,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            centered
          >
            <Tab
              label="Fundamental"
              sx={{ color: "primary.main", fontWeight: 700 }}
            />
            <Tab
              label="Technical"
              sx={{ color: "primary.main", fontWeight: 700 }}
            />
            <Tab label="All" sx={{ color: "primary.main", fontWeight: 700 }} />
          </Tabs>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Typography sx={{ fontSize: "1rem", color: "text.primary" }}>
              {Object.keys(formInputs).length} filters selected
            </Typography>
            <Button variant="text" onClick={handleResetFilters}>
              Reset filters
            </Button>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              maxWidth: 1200,
              mx: "auto",
              px: 1.5,
              mt: 1.5,
            }}
          >
            <Box>
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 1.4 }}
                rowSpacing={1.4}
                sx={{ mb: 2, display: tabValue == 0 ? "flex" : "none" }}
              >
                {fundamentalalFilters}
              </Grid>
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 1.4 }}
                rowSpacing={1.4}
                sx={{ mb: 2, display: tabValue == 1 ? "flex" : "none" }}
              >
                {technicalFilters}
              </Grid>
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 1.4 }}
                rowSpacing={1.4}
                sx={{ mb: 2, display: tabValue == 2 ? "flex" : "none" }}
              >
                {fundamentalalFilters} {technicalFilters}
              </Grid>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );

  const fetchDataFromApi = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prices/screener`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  };

  const getScreenerData = async () => {
    try {
      setLoading(true);
      const fieldSet: any = new Set([
        ...startingFields,
        ...Object.keys(formInputs),
      ]);
      setscreenerDatafields([...fieldSet]);

      let data = [];

      if (Object.keys(formInputs).length === 0) {
        const storage: { value: any } = await Preferences.get({
          key: "screener",
        });

        if (storage.value) {
          const valueFormStorage = JSON.parse(storage.value);
          data = valueFormStorage.data;
        } else {
          data = await fetchDataFromApi();
        }
      } else {
        data = await fetchDataFromApi();
      }
      setScreenerData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    let column: any = {};
    for (let item of filterOptions) {
      column[item.name] =
        screenerDatafields.indexOf(item.name) === -1 ? false : true;
    }
    setColumnVisibilityModel(column);
  }, [screenerDatafields]);

  useEffect(() => {
    getScreenerData();
  }, [formInputs]);

  useEffect(() => {
    const queryParamObj = getQueryParamObject(window?.location?.search);
    setQueryParams({ ...queryParamObj });
    setTextFieldInput({ ...queryParamObj });
    setFormInputs({ ...queryParamObj });
  }, [searchParams]);

  useEffect(() => {}, [searchParams]);

  return (
    <Box>
      {customFilterMenu}

      {filterOptionsDialog}

      {!auth?.isPremiumEligible && (
        <Box
          sx={{
            pt: 6,
            pb: 6,
            px: 4,
          }}
        >
          <PremiumDialogContent />
        </Box>
      )}

      {auth?.isPremiumEligible && (
        <Box>
          <Box sx={{ maxWidth: 425, mx: 2, pt: 1.5 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleFilterOptionsDialogOpen}
              endIcon={<EastRoundedIcon />}
            >
              Screener options
            </Button>
          </Box>
          <Box
            sx={{
              maxWidth: 1200,
              mx: "auto",
              px: 2,
              pt: 1.5,
              pb: 2,
            }}
          >
            <Box sx={{ height: "77vmax" }}>
              <StripedDataGrid
                rows={screenerData}
                columns={columns}
                autoPageSize={true}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                  setColumnVisibilityModel(newModel)
                }
                initialState={{
                  filter: {
                    filterModel: {
                      items: [],
                      quickFilterExcludeHiddenColumns: true,
                    },
                  },
                }}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
                rowHeight={40}
                columnHeaderHeight={80}
                slots={{
                  toolbar: GridToolbar,
                }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    printOptions: { disableToolbarButton: true },
                    csvOptions: { disableToolbarButton: true },
                  },
                  filterPanel: { sx: { maxWidth: "90vw" } },
                }}
                loading={loading}
                sx={{
                  ".MuiDataGrid-columnHeader": {
                    color: "text.primary",
                  },
                  ".MuiDataGrid-columnHeaderTitle": {
                    overflow: "visible",
                    whiteSpace: "normal",
                    lineHeight: "normal",
                  },
                  ".MuiDataGrid-cell": {
                    fontWeight: 500,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
