"use client";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";

import Overview from "./Overview";
import Financials from "./Fiancials";
import MarketDepth from "./MarketDepth";
import BlockTransections from "./BlockTransections";
import News from "./News";
import Technical from "./Technical";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import Link from "next/link";

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

export default function TabView(props: any) {
  const { stock, tradingCode, prices, handleScrollToBottom } = props;

  const [value, setValue] = useState(0);

  const router = useRouter();

  const dispatch = useDispatch();

  const [isSticky, setIsSticky] = useState(false);

  const boxRef: any = useRef(null); // Reference to an empty Box component

  useEffect(() => {
    const handleScroll = () => {
      if (boxRef.current) {
        const offsetTop = boxRef.current.getBoundingClientRect().top;
        // console.log(offsetTop);
        if (offsetTop < 40) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleButtonClick = (href: string, title: string) => {
    router.push(href);
    dispatch(pageTitleActions.setPageTitle(title));
  };

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const tabItems = [
    {
      title: "Overview",
      component: (
        <Overview stock={stock} handleButtonClick={handleButtonClick} />
      ),
    },
    {
      title: "Fundamental",
      component: <Financials data={stock.fundamentals} />,
    },
    {
      title: "Market Depth",
      component: (
        <MarketDepth
          data={stock.minute}
          tradingCode={tradingCode}
          marketOpenStatus={stock.marketOpenStatus}
        />
      ),
    },
    {
      title: "Block Trnx",
      component: <BlockTransections tradingCode={tradingCode} />,
    },
    {
      title: "News",
      component: <News tradingCode={tradingCode} />,
    },
    {
      title: "Technical",
      component: (
        <Technical
          technicals={stock.fundamentals.technicals}
          tradingCode={tradingCode}
        />
      ),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: "divider",
          position: isSticky ? "fixed" : "inherit",
          top: isSticky ? 56 : "auto",
          zIndex: 1000,
          bgcolor: "background.default",
          overflowX: "auto",
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        {isSticky && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              pt: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  color: "text.primary",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                {prices.close}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: ".875rem",
                  ml: 0.8,
                  mr: 2,
                  mt: 0.4,
                }}
              >
                BDT
              </Typography>

              <Typography
                sx={{
                  color: prices.color,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                  mr: 2,
                }}
              >
                {prices.change}
              </Typography>

              <Typography
                sx={{
                  color: prices.color,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}
              >
                {stock.latest?.change !== 0 ? prices.percentChange : 0}
                {"%"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FavoriteButton tradingCode={tradingCode} variant="iconOnly" />
              <IconButton
                sx={{ ml: 0.4, py: 0 }}
                component={Link}
                href={`/supercharts?symbol=${tradingCode}`}
              >
                <AddchartOutlinedIcon color="primary" />
              </IconButton>
            </Box>
          </Box>
        )}

        <Tabs value={value} variant="scrollable" onChange={handleChange}>
          {tabItems.map((item, index) => (
            <Tab
              key={index}
              label={item.title}
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                color: "text.primary",
                px: 1.7,
                pt: 0,
                pb: 0,
              }}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ bgcolor: "red" }} ref={boxRef}></Box>

      {tabItems.map((item, index) => (
        <TabPanel value={value} index={index} key={index}>
          {item.component}
        </TabPanel>
      ))}
    </Box>
  );
}
