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
          sx={{ bgcolor: "financeCardTitlecolor", px: 2, py: 1.2 }}
        >
          <Typography
            onClick={() => handleItemClick(dialogtype)}
            color="primary.main"
            sx={{
              textAlign: "left",
              fontSize: ".92rem",
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
              <HelpOutlineRoundedIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
          </CustomTooltip>
        </Stack>
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              px: 2,
              py: 0,
              mx: 0,
              mt: 0.8,
              mb: 0.5,
              ":hover": {
                bgcolor: "transparent",
              },
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
            >
              <Typography
                color="text.primary"
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: 500,
                }}
              >
                {data?.value && (data.value / divideFactor).toFixed(2)}
              </Typography>
              <Typography sx={{ fontSize: "1rem", color: "text.secondary" }}>
                {unit}
              </Typography>
            </Stack>

            <Chip
              label={data?.period}
              // variant="outlined"
              // color="info"
              size="small"
              sx={{
                ml: 1,
                fontSize: ".875rem",
                display: data?.period ? "block" : "none",
                // borderRadius: 1,
              }}
            />
          </Stack>
          <Divider light />
          <Typography
            component={Button}
            disableRipple
            onClick={() => handleItemClick(dialogtype)}
            sx={{
              color: data?.color || "text.secondary",
              fontSize: ".9rem",
              fontWeight: 500,
              px: 2,
              py: 1,
              ":hover": {
                bgcolor: "transparent",
              },
              textAlign: "left",
            }}
          >
            {data?.comment || "--"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
