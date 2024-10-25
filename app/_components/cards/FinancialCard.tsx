"use client";
import {
  Box,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Button,
  IconButton,
  Chip,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { fundamentalsTooltip } from "@/data/info";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export default function FinancialCard(props: any) {
  const {
    data,
    title,
    unit = "",
    divideFactor = 1,
    titleShort,
    dialogtype,
    handleItemClick,
  } = props;

  const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
      marginLeft: 2,
      fontSize: 14,
      padding: "12px",
    },
  }));

  return (
    <Card
      elevation={0}
      sx={{
        "& .MuiCard-root": {
          "& :hover": {
            bgcolor: "transparent",
          },
        },
        "& .MuiCardContent-root:last-child": { pb: 0.3 },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ bgcolor: "financeCardTitlecolor", pl: 1.5, pr: 1.5, py: 0.5 }}
        >
          <Typography
            onClick={() => handleItemClick(dialogtype)}
            color="primary.main"
            sx={{
              textAlign: "left",
              fontSize: ".875rem",
              fontWeight: 700,
              p: 0,
              m: 0,
              ":hover": {
                bgcolor: "transparent",
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
          >
            {titleShort}
          </Typography>
          <CustomTooltip
            placement="top"
            title={fundamentalsTooltip[dialogtype]?.definition}
            enterTouchDelay={10}
            leaveTouchDelay={3000}
          >
            <IconButton
              disableRipple
              sx={{
                p: 0,
                m: 0,
                ":hover": {
                  bgcolor: "transparent",
                  color: "primary.main",
                },
              }}
            >
              <HelpOutlineRoundedIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </CustomTooltip>
        </Stack>
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              pl: 1.5,
              pr: 1.5,
              py: 0.5,
            }}
            component={Button}
            disableRipple
            onClick={() => handleItemClick(dialogtype)}
          >
            <Stack
              direction="row"
              flexWrap="wrap"
              alignItems="baseline"
              spacing={0}
              sx={{ mr: 1.3 }}
            >
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: 500,
                }}
              >
                {data?.value && (data.value / divideFactor).toFixed(2)}
              </Typography>
              <Typography
                sx={{ fontSize: ".875rem", color: "text.secondary", ml: 0.5 }}
              >
                {unit}
              </Typography>
            </Stack>

            <Chip
              label={data?.period}
              size="small"
              sx={{
                fontSize: ".85rem",
                display: data?.period ? "block" : "none",
              }}
            />
          </Stack>
          <Divider light />
          <Typography
            component={Button}
            disableRipple
            onClick={() => handleItemClick(dialogtype)}
            sx={{
              // fontFamily: "'DM Sans', sans-serif",
              color: data?.color || "text.secondary",
              fontSize: ".8rem",
              fontWeight: 500,
              pl: 1.5,
              pr: 1,
              py: 0.5,
              ":hover": {
                bgcolor: "transparent",
              },
              textAlign: "left",
            }}
          >
            {data?.comment?.replace("year", "yr") || "--"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
