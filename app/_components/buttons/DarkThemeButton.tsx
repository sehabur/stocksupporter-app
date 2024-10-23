"use client";
import { FormControl, FormControlLabel, Switch } from "@mui/material";
import { themeColorActions } from "_store";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export default function DarkThemeButton() {
  const dispatch = useDispatch();
  const themeColor = useSelector((state: any) => state.themeColor);

  const handleChange = (e: any) => {
    const theme = e.target.checked ? "dark" : "light";
    localStorage.setItem("theme", theme);
    dispatch(themeColorActions.setThemeColor(theme));
  };

  return (
    <Stack direction="row" alignItems="center" sx={{ py: 1, pl: 2.5, pr: 1.2 }}>
      <DarkModeOutlinedIcon color="primary" />
      <FormControl fullWidth>
        <FormControlLabel
          sx={{
            ".MuiFormControlLabel-label": { fontSize: "1rem" },
            display: "flex",
            justifyContent: "space-between",
          }}
          value="colorMode"
          control={
            <Switch
              color="primary"
              onClick={handleChange}
              checked={themeColor === "dark"}
            />
          }
          label="Dark mode"
          labelPlacement="start"
        />
      </FormControl>
    </Stack>
  );
}
